import express from "express";
import protect from "../middleware/authMiddleware.js";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/authControllers.js"; // Fixed filename typo
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again later",
});

// **Register New User**
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ],
    registerUser
);

// **Login User**
router.post("/login", loginLimiter, loginUser);

// **Get & Update User Profile (Protected with JWT)**
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
