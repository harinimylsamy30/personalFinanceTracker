import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    addTransaction,
    getTransactions,
    deleteTransaction,
    downloadTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.get("/download", protect, downloadTransactions); // Assuming you have a downloadTransactions function in your controller

export default router;
