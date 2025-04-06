import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    // Extract token from Authorization header (Bearer token)
    const token = req.headers.authorization && req.headers.authorization && req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("401 not authorized, no token")
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Verify token and extract userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            console.log("401 user is not found")
            return res.status(401).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export default protect;
