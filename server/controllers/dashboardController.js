import Transaction from "../models/Transaction.js";
import Goal from "../models/Goal.js";

// Get Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        const goals = await Goal.find({ user: req.user._id });

        const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
        const savings = totalIncome - totalExpenses;
        const activeGoals = goals.filter(g => g.status === "in-progress");

        res.json({
            totalIncome,
            totalExpenses,
            savings,
            activeGoals,
            recentTransactions: transactions.slice(-5), // Last 5 transactions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
};

// Get Financial Report (Monthly & Yearly)
export const getFinancialReport = async (req, res) => {
    try {
        const { year, month } = req.query;
        const startDate = new Date(year, month ? month - 1 : 0, 1);
        const endDate = new Date(year, month ? month : 12, 0);

        const transactions = await Transaction.find({
            user: req.user._id,
            date: { $gte: startDate, $lte: endDate },
        });

        const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

        res.json({ year, month, totalIncome, totalExpenses });
    } catch (error) {
        res.status(500).json({ message: "Error generating financial report" });
    }
};
