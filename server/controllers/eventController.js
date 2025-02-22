// controllers/eventController.js
import { readData, writeData } from "../utils/fileUtils.js";

export const createEvent = async (req, res) => {
    const events = await readData("events.json");
    const { title, description, location, date, image, noOfSeats, price, category } = req.body;
    const newEvent = { id: Date.now().toString(), title, description, location, date, image, noOfSeats, price, category, createdBy: req.user, attendees: [] };
    events.push(newEvent);
    await writeData("events.json", events);
    res.status(201).json(newEvent);
};

export const updateEvent = async (req, res) => {
    const events = await readData("events.json");
    const index = events.findIndex(event => event.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Event not found" });
    events[index] = { ...events[index], ...req.body };
    await writeData("events.json", events);
    res.json(events[index]);
};

export const getEvents = async (req, res) => {
    const events = await readData("events.json");
    const { category, location } = req.query;
    let filteredEvents = events;

    if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    if (location) {
        filteredEvents = filteredEvents.filter(event => event.location.city === location || event.location.state === location);
    }

    res.json(filteredEvents);
};

export const deleteEvent = async (req, res) => {
    const events = (await readData("events.json")).filter(event => event.id !== req.params.id);
    await writeData("events.json", events);
    res.json({ message: "Event deleted" });
};

export const getMyHostedEvents = async (req, res) => {
    const events = await readData("events.json");
    const myEvents = events.filter(event => event.createdBy === req.user);
    res.json(myEvents);
};

export const getEventById = async (req, res) => {
    const events = await readData("events.json");
    const event = events.find(event => event.id === req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
};