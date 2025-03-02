import express from "express";
import {authenticate} from "../middlewares/authenticate.js";
import { createEvent, getEvents, updateEvent, deleteEvent,getMyHostedEvents,getEventById } from "../controllers/eventController.js";

const router = express.Router();

// 📌 Create Event (Protected)
router.post("/",authenticate,createEvent);

// 📌 Get All Events (Public)
router.get("/", getEvents);

router.get("/my-hosted", authenticate, getMyHostedEvents);

// 📌 Get Single Event by ID (Public)
router.get("/:id", getEventById);

// 📌 Update Event (Only Owner Can Update)
router.put("/:id",authenticate,updateEvent);

// 📌 Delete Event (Only Owner Can Delete)
router.delete("/:id",authenticate,deleteEvent);



export default router;
