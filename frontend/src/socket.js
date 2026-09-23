import { io } from "socket.io-client";

const BACKEND_URL =
  import.meta.env.VITE_API_URL ||
  "https://emmc-push-backend.onrender.com";

const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
