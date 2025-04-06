import express from "express";
import { getReports } from "../controllers/reportsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getReports);
 
export default router;
