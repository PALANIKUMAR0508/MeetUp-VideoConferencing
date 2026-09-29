import express from "express";
import {
  createMeeting,
  getMeeting,
  getMeetingStats,
  getSessionDetails,
  getUserSessions,
} from "../controllers/meetingController";
import { protect } from "../middleware/auth";

const meetingRouter = express.Router();

meetingRouter.post("/", protect, createMeeting);
meetingRouter.get("/:meetingId", protect, getMeeting);
meetingRouter.post("/stats", protect, getMeetingStats);
meetingRouter.post("/sessions/:id", protect, getSessionDetails);
meetingRouter.post("/sessions", protect, getUserSessions);

export default meetingRouter;
