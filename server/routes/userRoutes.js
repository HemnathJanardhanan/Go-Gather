import express from "express";
import {getUserProfile, updateProfilePhoto} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile/photo", authMiddleware, updateProfilePhoto);

export default router;
