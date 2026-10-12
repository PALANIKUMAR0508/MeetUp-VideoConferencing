import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { handleClerkWebhooks } from "./controllers/webhookContoller.js";
import meetingRouter from "./routes/meetingRoutes.js";
import { Server } from "socket.io";
import { setupSocketIO } from "./socket.js";

const app = express();
const server = http.createServer(app);

// Connect to Neon & Initialize Tables
await initDB();

const allowdOrigins = process.env.ORIGINS.split(",");
app.use(cors({ origin: allowdOrigins, credentials: true }));
app.use(cookieParser());

app.use(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  handleClerkWebhooks,
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API is Live"));
app.use("/api/meetings", meetingRouter);

const io = new Server(server, {
  cors: { origin: allowdOrigins, credentials: true },
});

setupSocketIO(io);

// Centralized Error Handler
app.use((error, req, res, next) => {
  console.error(`[Error]$(err.message)`);
  res.status(500).json({ error: error.message });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
