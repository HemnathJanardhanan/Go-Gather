import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent,getMyHostedEvents } from "../controllers/eventController.js";

const router = express.Router();

// 📌 Create Event (Protected)
router.post("/", authMiddleware, createEvent);

// 📌 Get All Events (Public)
router.get("/", getEvents);
router.get("/my-hosted", authMiddleware, getMyHostedEvents);
// 📌 Get Single Event by ID (Public)
router.get("/:id", getEventById);

// 📌 Update Event (Only Owner Can Update)
router.put("/:id", authMiddleware, updateEvent);

// 📌 Delete Event (Only Owner Can Delete)
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
