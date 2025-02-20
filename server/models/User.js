import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: { type: String, default: "https://www.istockphoto.com/photos/profile-avatar" }, // Store Image URL
    hostedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    bookedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
