import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getStockData, getInvestmentSuggestions } from "../controllers/investmentController.js";

const router = express.Router();

router.get("/stocks/:symbol", protect, getStockData);
router.get("/suggestions", protect, getInvestmentSuggestions);

export default router;
