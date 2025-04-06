import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// **Generate JWT Token**
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// **User Registration**
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        console.log("User registration data:", req.body);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Send token in response
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// **User Login**
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        // console.log(user)

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(" 401 Invalid password", password, user.password);
            // return res.status(401).json({ message: "Invalid password" });
        }

        

        const token = generateToken(user._id); // Generate token

        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token, // Send token in response instead of cookies
            message: "User logged in successfully",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// **Get User Profile (Protected)**
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
        // console.log(user)
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// **Update User Profile (Protected)**
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                const isSamePassword = await bcrypt.compare(req.body.password, user.password);
                if (!isSamePassword) {
                    user.password = await bcrypt.hash(req.body.password, 10);
                }
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: generateToken(updatedUser._id), // Send new token
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// **User Logout**
export const logoutUser = (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};
