const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const connectDB = require("./config/database");

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const lhoRoutes = require("./routes/lhoRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// ============================================================
// CONNECT TO DATABASE
// ============================================================

connectDB();


// ============================================================
// CORS SETTINGS
// ============================================================

app.use(
  cors({
    origin: (origin, callback) => {

      // Allow requests without an Origin
      // Example: Postman / curl
      if (!origin) {
        callback(null, true);
        return;
      }


      // Allow localhost on any port
      //
      // Examples:
      // http://localhost:5173
      // http://localhost:3000
      // http://localhost:5000
      //
      if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
        callback(null, true);
        return;
      }


      // Allow configured frontend origin
      if (
        process.env.FRONTEND_ORIGIN &&
        origin === process.env.FRONTEND_ORIGIN
      ) {
        callback(null, true);
        return;
      }


      callback(new Error("CORS blocked"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// ============================================================
// BODY PARSERS
// ============================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ============================================================
// COOKIE PARSER
// ============================================================

app.use(cookieParser());


// ============================================================
// API ROUTES
// ============================================================


// ------------------------------------------------------------
// PATIENT
// ------------------------------------------------------------

app.use(
  "/api/patients",
  patientRoutes
);


// ------------------------------------------------------------
// GENERAL AUTH
// ------------------------------------------------------------

app.use(
  "/api/auth",
  authRoutes
);


// ------------------------------------------------------------
// HOSPITAL
// ------------------------------------------------------------

app.use(
  "/api/hospitals",
  hospitalRoutes
);


// ------------------------------------------------------------
// LHO
// ------------------------------------------------------------

app.use(
  "/api/lho",
  lhoRoutes
);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  "/api/health",
  (req, res) => {

    res.status(200).json({
      success: true,
      status: "EMMC Backend Operational",
      timestamp: new Date(),
    });

  }
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (err, req, res, next) => {

    console.error(
      "[Unhandled Error]:",
      err.stack
    );

    res.status(500).json({
      success: false,

      message:
        err.message ||
        "An internal server error occurred.",
    });

  }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  () => {

    console.log(
      `[EMMC Server] Running on http://localhost:${PORT}`
    );

    console.log(
      `[EMMC API] Hospital login: http://localhost:${PORT}/api/hospitals/login`
    );

  }
);