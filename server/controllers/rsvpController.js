import Event from "../models/Event.js";

import { sendRSVPConfirmation } from "../utils/sendEmail.js";
import User from "../models/User.js";

export const rsvpEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { seats } = req.body;
        const userId = req.user.id;

        if (!seats || seats <= 0) {
            return res.status(400).json({ error: "Invalid number of seats" });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Check if user already RSVP'd
        const alreadyRSVPed = event.attendees.find(
            (attendee) => attendee.user.toString() === userId
        );
        if (alreadyRSVPed) {
            return res.status(400).json({ error: "Already RSVP'd to this event" });
        }
        if (event.remainingSeats < seats) {
            return res.status(400).json({ error: "Not enough seats available" });
        }
        event.remainingSeats -= seats;
        // Push { user, seats } into attendees array
        event.attendees.push({ user: userId, seats });
        await event.save();

        // Update user's bookedEvents
        await User.findByIdAndUpdate(userId, {
            $push: { bookedEvents: eventId },
        });
        const user = await User.findById(userId);
        if (user?.email) {
            await sendRSVPConfirmation(user.email, user.name, event.title, seats);
        }

        res.json({ message: "RSVP successful", event });
    } catch (error) {
        console.error("RSVP Error:", error);
        res.status(500).json({ error: "Failed to RSVP" });
    }
};

// 📌 Cancel RSVP
export const cancelRsvp = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Remove user from attendees list
        event.attendees = event.attendees.filter(att => att.toString() !== userId);
        await event.save();

        // Remove event from user's bookedEvents list
        await User.findByIdAndUpdate(userId, { $pull: { bookedEvents: eventId } });

        res.json({ message: "RSVP canceled", event });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel RSVP" });
    }
};

export const getMyBookedEvents = async (req, res) => {
    try {
        const userId = req.user;

        // Find user and populate the booked events
        const user = await User.findById(userId).populate("bookedEvents");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ bookedEvents: user.bookedEvents });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch booked events" });
    }
};