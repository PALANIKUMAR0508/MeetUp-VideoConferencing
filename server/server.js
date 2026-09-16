import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { handleClerkWebhooks } from "./controllers/webhookContoller.js";

const app = express();

// Connect to Neon & Initialize Tables
initDB();

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
