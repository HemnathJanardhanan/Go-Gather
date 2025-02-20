import Event from "../models/Event.js";
import User from "../models/User.js";

// 📌 Create Event
export const createEvent = async (req, res) => {
    try {
        const { title, description, location, date, image } = req.body;
        const userId = req.user; // Extracted from authMiddleware

        const newEvent = new Event({
            title,
            description,
            location,
            date,
            image,
            createdBy: userId,
            attendees: [],
        });

        await newEvent.save();

        // Add event to user's hostedEvents array
        await User.findByIdAndUpdate(userId, { $push: { hostedEvents: newEvent._id } });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
};

// 📌 Get All Events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy", "name profilePhoto");
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

// 📌 Get Single Event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("createdBy", "name profilePhoto");
        if (!event) return res.status(404).json({ error: "Event not found" });

        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event" });
    }
};

// 📌 Update Event
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Only the creator can update the event
        if (event.createdBy.toString() !== req.user) {
            return res.status(403).json({ error: "Unauthorized to update this event" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

// 📌 Delete Event
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        // Only the creator can delete the event
        if (event.createdBy.toString() !== req.user) {
            return res.status(403).json({ error: "Unauthorized to delete this event" });
        }

        await Event.findByIdAndDelete(req.params.id);

        // Remove event from user's hostedEvents
        await User.findByIdAndUpdate(req.user, { $pull: { hostedEvents: req.params.id } });

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};


// 📌 Get My Hosted Events
export const getMyHostedEvents = async (req, res) => {
    try {
        const userId = req.user;

        // Find events created by the logged-in user
        const hostedEvents = await Event.find({ createdBy: userId });

        res.json({ hostedEvents });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch hosted events" });
    }
};
