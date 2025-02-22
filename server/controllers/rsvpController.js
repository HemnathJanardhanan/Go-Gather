import { readData, writeData } from "../utils/fileUtils.js";

// controllers/rsvpController.js
export const rsvpEvent = async (req, res) => {
    const rsvps = await readData("rsvps.json");
    const events = await readData("events.json");
    const users = await readData("users.json");
    const { eventId, seats } = req.params;

    const event = events.find(e => e.id === eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.noOfSeats < seats) return res.status(400).json({ error: "Not enough seats available" });

    if (rsvps.find(r => r.eventId === eventId && r.userId === req.user)) {
        return res.status(400).json({ error: "Already RSVP'd" });
    }

    event.noOfSeats -= seats;
    event.attendees.push({ userId: req.user, seats });
    await writeData("events.json", events);

    const user = users.find(u => u.id === req.user);
    user.bookedEvents.push({ eventId, seats });
    await writeData("users.json", users);

    rsvps.push({ id: Date.now().toString(), eventId, userId: req.user, seats });
    await writeData("rsvps.json", rsvps);

    res.status(201).json({ message: "RSVP successful" });
};

export const cancelRsvp = async (req, res) => {
    const rsvps = await readData("rsvps.json");
    const events = await readData("events.json");
    const users = await readData("users.json");
    const { eventId } = req.params;

    const rsvpIndex = rsvps.findIndex(r => r.eventId === eventId && r.userId === req.user);
    if (rsvpIndex === -1) return res.status(400).json({ error: "RSVP not found" });

    const seats = rsvps[rsvpIndex].seats;
    rsvps.splice(rsvpIndex, 1);
    await writeData("rsvps.json", rsvps);

    const event = events.find(e => e.id === eventId);
    if (event) {
        event.noOfSeats += seats;
        event.attendees = event.attendees.filter(a => a.userId !== req.user);
        await writeData("events.json", events);
    }

    const user = users.find(u => u.id === req.user);
    if (user) {
        user.bookedEvents = user.bookedEvents.filter(e => e.eventId !== eventId);
        await writeData("users.json", users);
    }

    res.json({ message: "RSVP cancelled" });
};

