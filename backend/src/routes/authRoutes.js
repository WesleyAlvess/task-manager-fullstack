// Express
import express from "express";
// Imports Controller
import { registerUser, loginUser } from "../controllers/authController.js";
// Multer imagens
import { uploadAvatar } from "../controllers/authController.js"
import upload from "../middleware/uploadMiddleware.js"
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/avatar
router.post("/avatar", protect, upload.single("avatar"), uploadAvatar)

export default router;
