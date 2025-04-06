import User from "../models/User.js";
import supabase from "../config/supabaseClient.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("name email profilePhoto hostedEvents bookedEvents")
            .populate("hostedEvents", "title image location date")
            .populate("bookedEvents", "title image location date");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Fetching profile failed" });
    }
};



export const updateProfilePhoto = async (req, res) => {
    try {
        const userId = req.user.id;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: "No image file provided" });
        }

        // Fetch the current user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // If user already has a profile photo, delete the old one from Supabase
        if (user.profilePhoto) {
            const fileName = user.profilePhoto.split("/").pop(); // Extract filename from URL
            await supabase.storage.from("profiles").remove([`profiles/${fileName}`]);
        }

        // Generate a new unique file path
        const filePath = `profiles/${userId}_${Date.now()}.jpg`;

        // Upload the new image
        const { data, error } = await supabase.storage
            .from("profiles")
            .upload(filePath, imageFile.buffer, { contentType: imageFile.mimetype });

        if (error) {
            console.error("Supabase upload error:", error);
            return res.status(500).json({ error: "Failed to upload image" });
        }

        // Get the new public URL
        const { data: publicURLData } = supabase.storage.from("profiles").getPublicUrl(filePath);
        const profileImageUrl = publicURLData.publicUrl;

        // Update user's profile in MongoDB
        user.profilePhoto = profileImageUrl;
        await user.save();

        res.status(200).json({ message: "Profile photo updated successfully", profileImageUrl });

    } catch (error) {
        console.error("Error updating profile photo:", error);
        res.status(500).json({ error: "Profile photo update failed" });
    }
};

export const uploadProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the authenticated request
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: "No image file provided" });
        }

        // Generate a unique filename
        const filePath = `profiles/${userId}_${Date.now()}.jpg`;


        // Upload image to Supabase Storage
        const { data, error } = await supabase.storage
            .from("profiles")
            .upload(filePath, imageFile.buffer, { contentType: imageFile.mimetype });

        if (error) {
            console.error("Supabase upload error:", error);
            return res.status(500).json({ error: "Failed to upload image" });
        }

        // Generate a public URL for the uploaded image
        const { data: publicURLData, error: urlError } = supabase
            .storage
            .from("profiles")
            .getPublicUrl(filePath);

        if (urlError || !publicURLData.publicUrl) {
            console.error("Supabase URL error:", urlError);
            return res.status(500).json({ error: "Failed to retrieve image URL" });
        }

        const profileImageUrl = publicURLData.publicUrl;

        // Update user's profile in MongoDB
        const user = await User.findByIdAndUpdate(userId, { profilePhoto: profileImageUrl }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Profile picture uploaded successfully", profileImageUrl });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ error: "Profile picture upload failed" });
    }
};
