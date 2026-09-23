const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const connectDB = require("./config/database");

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const lhoRoutes = require("./routes/lhoRoutes");

let webPush = null;
try {
  webPush = require("web-push");
} catch (error) {
  console.warn("[EMMC Push] web-push package is not installed yet. Run npm install.");
}

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// ============================================================
// IN-MEMORY REAL-TIME GPS STATE
// ============================================================
const policeLocations = new Map();
const ambulanceLocations = new Map();
const policeSockets = new Map();
const pushSubscriptions = new Map();
const activeAlerts = new Set();

const ALERT_RADIUS_KM = Number(process.env.POLICE_ALERT_RADIUS_KM || 1);
const AUTHORIZED_POLICE_ID = process.env.AUTHORIZED_POLICE_ID || "TP001";

// ============================================================
// VAPID / WEB PUSH
// ============================================================
let vapidPublicKey = process.env.VAPID_PUBLIC_KEY || "";
let vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || "";
const vapidSubject = process.env.VAPID_SUBJECT || "mailto:admin@emmc.local";

if (webPush) {
  if (!vapidPublicKey || !vapidPrivateKey) {
    // This fallback is useful for first deployment/testing. For production,
    // set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in Render Environment Variables
    // so subscriptions survive backend restarts.
    const generated = webPush.generateVAPIDKeys();
    vapidPublicKey = generated.publicKey;
    vapidPrivateKey = generated.privateKey;
    console.warn("[EMMC Push] VAPID keys were generated at startup.");
    console.warn("[EMMC Push] For stable production push, save these as Render env vars:");
    console.warn(`VAPID_PUBLIC_KEY=${vapidPublicKey}`);
    console.warn(`VAPID_PRIVATE_KEY=${vapidPrivateKey}`);
  }

  webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
}

const pushConfigured = Boolean(webPush && vapidPublicKey && vapidPrivateKey);

// ============================================================
// CORS
// ============================================================
function normalizeOrigin(value) {
  return String(value || "").trim().replace(/\/$/, "");
}

const configuredOrigins = String(process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  const normalized = normalizeOrigin(origin);

  if (configuredOrigins.includes(normalized)) return true;
  if (/^https:\/\/([a-z0-9-]+\.)*vercel\.app$/i.test(normalized)) return true;
  if (/^https:\/\/([a-z0-9-]+\.)*onrender\.com$/i.test(normalized)) return true;
  if (/^http:\/\/localhost(:\d+)?$/i.test(normalized)) return true;
  if (/^http:\/\/127\.0\.0\.1(:\d+)?$/i.test(normalized)) return true;

  return false;
}

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) return callback(null, true);
    console.warn(`[CORS] Blocked origin: ${origin}`);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ============================================================
// DATABASE
// ============================================================
connectDB();

// ============================================================
// EXISTING EMMC ROUTES
// ============================================================
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/lho", lhoRoutes);

// ============================================================
// HELPERS
// ============================================================
function validCoordinate(latitude, longitude) {
  return Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180;
}

function distanceKm(a, b) {
  if (!a || !b) return null;
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLng = (b.longitude - a.longitude) * rad;
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.latitude * rad) *
    Math.cos(b.latitude * rad) *
    Math.sin(dLng / 2) ** 2;
  const safeX = Math.min(1, Math.max(0, x));
  return R * 2 * Math.atan2(Math.sqrt(safeX), Math.sqrt(1 - safeX));
}

function alertKey(policeId, ambulanceId) {
  return `${policeId}::${ambulanceId}`;
}

function getSocketForPolice(policeId) {
  return policeSockets.get(String(policeId));
}

async function sendPolicePush(policeId, payload) {
  const key = String(policeId);
  const subscription = pushSubscriptions.get(key);
  if (!subscription || !webPush || !pushConfigured) return;

  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    console.error(`[EMMC Push] Notification failed for ${key}:`, error.statusCode || error.message);
    if (error.statusCode === 404 || error.statusCode === 410) {
      pushSubscriptions.delete(key);
    }
  }
}

async function evaluateAmbulanceAgainstPolice(ambulanceId) {
  const ambulance = ambulanceLocations.get(String(ambulanceId));
  if (!ambulance) return;

  for (const [policeId, police] of policeLocations.entries()) {
    const distance = distanceKm(police, ambulance);
    if (distance === null) continue;

    const key = alertKey(policeId, ambulanceId);
    const socket = getSocketForPolice(policeId);

    if (distance <= ALERT_RADIUS_KM) {
      const payload = {
        policeId,
        ambulanceId: String(ambulanceId),
        distanceMeters: Math.round(distance * 1000),
        emergencyCategory: ambulance.emergencyCategory || "Critical / High Priority",
        destination: ambulance.destination || "Emergency Hospital",
        message: "Ambulance is within 1 km. Please clear traffic and assist the ambulance.",
        title: `🚨 EMMC Traffic Alert • ${ambulanceId}`,
        body: `Ambulance ${ambulanceId} is ${Math.round(distance * 1000)} m from Traffic Police ${policeId}. Please clear traffic.`,
        data: {
          ambulanceId: String(ambulanceId),
          distanceMeters: Math.round(distance * 1000),
          latitude: ambulance.latitude,
          longitude: ambulance.longitude,
        },
      };

      if (!activeAlerts.has(key)) {
        activeAlerts.add(key);
        console.log(`[EMMC ALERT] ${ambulanceId} -> ${policeId}: ${Math.round(distance * 1000)}m`);
        if (socket) {
          socket.emit("trafficPoliceAlert", payload);
          socket.emit("policeAlert", payload);
        }
        await sendPolicePush(policeId, payload);
      } else if (socket) {
        // Keep the live UI distance updated while inside the 1 km radius.
        socket.emit("ambulanceLocation", ambulance);
      }
    } else if (activeAlerts.has(key)) {
      activeAlerts.delete(key);
      const cleared = {
        policeId,
        ambulanceId: String(ambulanceId),
        distanceMeters: Math.round(distance * 1000),
      };
      if (socket) socket.emit("trafficPoliceAlertCleared", cleared);
    }
  }
}

// ============================================================
// HEALTH
// ============================================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    success: true,
    status: "EMMC Backend Operational",
    pushConfigured,
    socket: true,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// WEB PUSH
// ============================================================
app.get("/api/push/public-key", (req, res) => {
  if (!pushConfigured) {
    return res.status(503).json({ ok: false, message: "Web Push is not configured" });
  }
  return res.json({ ok: true, publicKey: vapidPublicKey });
});

app.post("/api/push/subscribe", (req, res) => {
  const { policeId, subscription } = req.body || {};
  if (!policeId || !subscription?.endpoint || !subscription?.keys) {
    return res.status(400).json({ ok: false, message: "policeId and valid push subscription are required" });
  }
  if (String(policeId) !== AUTHORIZED_POLICE_ID) {
    return res.status(403).json({ ok: false, message: "Unauthorized police ID" });
  }

  pushSubscriptions.set(String(policeId), subscription);
  console.log(`[EMMC Push] Subscription saved for ${policeId}`);
  return res.json({ ok: true, message: "Push subscription saved" });
});

// ============================================================
// TRAFFIC POLICE
// ============================================================
app.get("/api/traffic-police", (req, res) => {
  const police = policeLocations.get(AUTHORIZED_POLICE_ID) || null;
  return res.json({
    ok: true,
    policeOnline: Boolean(police),
    police: police ? { policeId: AUTHORIZED_POLICE_ID, ...police } : null,
    ambulancesOnline: ambulanceLocations.size,
  });
});

app.post("/api/traffic-police/location", async (req, res) => {
  const { policeId, latitude, longitude, accuracy } = req.body || {};
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (String(policeId) !== AUTHORIZED_POLICE_ID) {
    return res.status(403).json({ ok: false, message: "Unauthorized Traffic Police ID" });
  }
  if (!validCoordinate(lat, lng)) {
    return res.status(400).json({ ok: false, message: "Invalid GPS coordinates" });
  }

  const police = {
    policeId: AUTHORIZED_POLICE_ID,
    latitude: lat,
    longitude: lng,
    accuracy: Number.isFinite(Number(accuracy)) ? Number(accuracy) : null,
    updatedAt: Date.now(),
  };
  policeLocations.set(AUTHORIZED_POLICE_ID, police);

  io.emit("policeLocation", police);

  for (const ambulanceId of ambulanceLocations.keys()) {
    await evaluateAmbulanceAgainstPolice(ambulanceId);
  }

  return res.json({ ok: true, message: "Police GPS saved", police });
});

// ============================================================
// AMBULANCES
// ============================================================
app.get("/api/ambulances", (req, res) => {
  return res.json({
    ok: true,
    ambulances: Array.from(ambulanceLocations.values()),
  });
});

app.post("/api/ambulance/location", async (req, res) => {
  const {
    ambulanceId,
    latitude,
    longitude,
    accuracy,
    heading,
    destination,
    emergencyCategory,
    priorityLevel,
    priorityColor,
    tripStage,
  } = req.body || {};

  const id = String(ambulanceId || "").trim();
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!id) return res.status(400).json({ ok: false, message: "ambulanceId is required" });
  if (!validCoordinate(lat, lng)) return res.status(400).json({ ok: false, message: "Invalid GPS coordinates" });

  const ambulance = {
    ambulanceId: id,
    latitude: lat,
    longitude: lng,
    accuracy: Number.isFinite(Number(accuracy)) ? Number(accuracy) : null,
    heading: Number.isFinite(Number(heading)) ? Number(heading) : null,
    destination: destination || "Emergency Hospital",
    emergencyCategory: emergencyCategory || "Critical / High Priority",
    priorityLevel: priorityLevel || "red",
    priorityColor: priorityColor || "red",
    tripStage: tripStage || "enroute",
    updatedAt: Date.now(),
  };

  ambulanceLocations.set(id, ambulance);
  io.emit("ambulanceLocation", ambulance);
  await evaluateAmbulanceAgainstPolice(id);

  return res.json({ ok: true, message: "Ambulance GPS saved", ambulance });
});

app.post("/api/ambulance/traffic-clearance", async (req, res) => {
  const { ambulanceId, latitude, longitude, destination, emergencyCategory, reason, tripStage } = req.body || {};
  const id = String(ambulanceId || "").trim();
  const lat = Number(latitude);
  const lng = Number(longitude);

  if (!id || !validCoordinate(lat, lng)) {
    return res.status(400).json({ ok: false, message: "ambulanceId and valid GPS coordinates are required" });
  }

  const payload = {
    ambulanceId: id,
    latitude: lat,
    longitude: lng,
    destination: destination || "Emergency Hospital",
    emergencyCategory: emergencyCategory || "Critical / High Priority",
    reason: reason || "Traffic Clearance Request",
    tripStage: tripStage || "enroute",
    title: `🚨 Traffic Clearance • ${id}`,
    message: "Ambulance requests traffic clearance.",
  };

  io.emit("trafficClearanceRequest", payload);

  // If the ambulance is already inside the police radius, also trigger the
  // normal police alert path immediately.
  const old = ambulanceLocations.get(id);
  ambulanceLocations.set(id, {
    ...(old || {}),
    ambulanceId: id,
    latitude: lat,
    longitude: lng,
    destination: payload.destination,
    emergencyCategory: payload.emergencyCategory,
    tripStage: payload.tripStage,
    updatedAt: Date.now(),
  });
  await evaluateAmbulanceAgainstPolice(id);

  return res.json({ ok: true, message: "Traffic clearance request sent" });
});

// ============================================================
// SOCKET.IO
// ============================================================
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error("Socket.IO CORS blocked"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`[Socket.IO] Connected: ${socket.id}`);

  socket.on("registerPolice", ({ policeId } = {}) => {
    const id = String(policeId || "").trim();
    if (!id) return;
    policeSockets.set(id, socket);
    socket.data.policeId = id;
    socket.join(`police:${id}`);
    console.log(`[Socket.IO] Police registered: ${id}`);

    const police = policeLocations.get(id);
    if (police) socket.emit("policeLocation", police);

    for (const ambulance of ambulanceLocations.values()) {
      socket.emit("ambulanceLocation", ambulance);
    }
  });

  socket.on("disconnect", () => {
    const id = socket.data.policeId;
    if (id && policeSockets.get(id) === socket) {
      policeSockets.delete(id);
    }
    console.log(`[Socket.IO] Disconnected: ${socket.id}`);
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================
app.use((err, req, res, next) => {
  console.error("[Unhandled Error]:", err.stack || err.message);
  if (res.headersSent) return next(err);
  res.status(500).json({
    ok: false,
    success: false,
    message: err.message || "An internal server error occurred.",
  });
});

// ============================================================
// START SERVER
// ============================================================
server.listen(PORT, () => {
  console.log(`[EMMC Server] Listening on port ${PORT}`);
  console.log(`[EMMC API] Health: /api/health`);
  console.log(`[EMMC API] Police GPS: /api/traffic-police/location`);
  console.log(`[EMMC API] Ambulance GPS: /api/ambulance/location`);
  console.log(`[EMMC Push] Configured: ${pushConfigured}`);
});
