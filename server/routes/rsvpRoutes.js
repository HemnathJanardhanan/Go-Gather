import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { rsvpEvent, cancelRsvp,getMyBookedEvents } from "../controllers/rsvpController.js";

const router = express.Router();

// 📌 RSVP to an Event (Protected)
router.post("/:eventId", authMiddleware, rsvpEvent);
router.get("/my-bookings", authMiddleware, getMyBookedEvents);
// 📌 Cancel RSVP (Protected)
router.delete("/:eventId", authMiddleware, cancelRsvp);

export default router;
