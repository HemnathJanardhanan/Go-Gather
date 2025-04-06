import express from "express";
import {getUserProfile, updateProfilePhoto,uploadProfilePicture} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-profile",authMiddleware, upload.single("profilePicture"), uploadProfilePicture);

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile/photo", authMiddleware, updateProfilePhoto);

export default router;
