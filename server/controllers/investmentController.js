import yahooFinance from "yahoo-finance2";
import Transaction from "../models/Transaction.js";
import Goal from "../models/Goal.js";

// Fetch Stock Data
export const getStockData = async (req, res) => {
    try {
        const { symbol } = req.params;
        const stockData = await yahooFinance.quoteSummary(symbol, { modules: ["price", "summaryDetail"] });
        res.json(stockData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stock data" });
    }
};

// Generate Investment Suggestions
export const getInvestmentSuggestions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        const goals = await Goal.find({ user: req.user._id });

        const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
        const savings = totalIncome - totalExpenses;
        const activeGoals = goals.filter(g => g.status === "in-progress");

        let investmentAdvice = "Focus on saving before investing.";

        if (savings > 5000) {
            investmentAdvice = "You have good savings. Consider investing in mutual funds or index funds.";
        } else if (savings > 10000) {
            investmentAdvice = "You can explore stocks, ETFs, or cryptocurrency.";
        }

        res.json({
            totalIncome,
            totalExpenses,
            savings,
            activeGoals,
            investmentAdvice,
        });
    } catch (error) {
        res.status(500).json({ message: "Error generating investment suggestions" });
    }
};
