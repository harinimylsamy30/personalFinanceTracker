import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    cors({
        origin: "http://localhost:3000", // Adjust for frontend
        credentials: true, // Allows sending credentials like tokens
        allowedHeaders: ["Content-Type", "Authorization"], // ✅ Ensure Authorization is allowed
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(helmet());

app.set("trust proxy", 1); // Trust first proxy (for Heroku)

// ✅ Removed CSRF Middleware (`csurf`)
// ✅ Removed `cookie-parser`

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);

// Connect to DB
connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
