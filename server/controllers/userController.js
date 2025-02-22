// import User from "../models/User.js";
//
// export const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("name email profilePhoto hostedEvents bookedEvents").populate("hostedEvents", "title image location date").populate("bookedEvents", "title image location date");
//         if (!user) return res.status(404).json({ error: "User not found" });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Fetching profile failed" });
//     }
// };
//
//
//
// export const updateProfilePhoto = async (req, res) => {
//     try {
//         const { profilePhoto } = req.body;
//         const userId = req.user.id;
//
//         const user = await User.findByIdAndUpdate(userId, { profilePhoto }, { new: true });
//         res.json({ message: "Profile photo updated", profilePhoto: user.profilePhoto });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to update profile photo" });
//     }
// };
