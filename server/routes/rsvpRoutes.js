import express from "express";
import {authenticate} from "../middlewares/authenticate.js";
import { rsvpEvent, cancelRsvp} from "../controllers/rsvpController.js";

const router = express.Router();

// 📌 RSVP to an Event (Protected)
router.post("/", authenticate, rsvpEvent);

// 📌 Cancel RSVP (Protected)
router.delete("/", authenticate, cancelRsvp);

export default router;
