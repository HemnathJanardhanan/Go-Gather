import Event from "../models/Event.js";
import User from "../models/User.js";

// 📌 RSVP to an Event
export const rsvpEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Check if already RSVP'd
        if (event.attendees.includes(userId)) {
            return res.status(400).json({ error: "Already RSVP'd to this event" });
        }

        // Add user to event attendees list
        event.attendees.push(userId);
        await event.save();

        // Add event to user's bookedEvents list
        await User.findByIdAndUpdate(userId, { $push: { bookedEvents: eventId } });

        res.json({ message: "RSVP successful", event });
    } catch (error) {
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