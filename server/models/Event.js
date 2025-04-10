import mongoose from "mongoose";

// const LocationSchema = new mongoose.Schema({
//     venue: { type: String, required: true },
//     area: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: Number, required: true },
//     mapLink: { type: String, required: true } // Ensuring it's stored as a string
// }, { _id: false });  // Prevents MongoDB from creating a separate _id for embedded docs
//
// const EventSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     location: { type: LocationSchema, required: true },
//     date: { type: Date, required: true },
//     image: { type: String, required: true },
//     noOfSeats: { type: Number, required: true },
//     remainingSeats: { type: Number, required: true }, // 👈 ADD THIS
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     attendees: [
//         {
//             user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//             seats: { type: Number, required: true }
//         }
//     ],
// }, { timestamps: true });
const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: {
        venue: String,
        area: String,
        city: String,
        state: String,
        pincode: Number,
        mapLink: String,
    },
    date: Date,
    image: String,
    noOfSeats: Number,
    remainingSeats: Number,
    price: Number,
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            seats: { type: Number, required: true }
        }
    ],
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
