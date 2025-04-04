import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    venue: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    mapLink: { type: String, required: true } // Ensuring it's stored as a string
}, { _id: false });  // Prevents MongoDB from creating a separate _id for embedded docs

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: LocationSchema, required: true }, // Embedded location object
    date: { type: Date, required: true },
    image: { type: String, required: true }, // Changed from array to string
    noOfSeats: { type: Number, required: true },  
    price: { type: Number, required: true }, // New field
    category: { type: String, required: true }, // New field
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);
export default Event;
