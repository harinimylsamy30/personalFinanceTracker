import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getDashboardData, getFinancialReport } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/report", protect, getFinancialReport);

export default router;
