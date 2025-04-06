import Transaction from "../models/Transaction.js";

export const getReports = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });

        if (!transactions || transactions.length === 0) {
            console.log("No transactions found for the user.");
            return res.status(404).json({ message: "No transactions found" });
        }

        const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

        const expenseCategories = {};
        transactions.forEach(t => {
            if (t.type === "expense") {
                if (!expenseCategories[t.category]) {
                    expenseCategories[t.category] = 0;
                }
                expenseCategories[t.category] += t.amount;
            }
        });
        const incomeCategories = {};
        transactions.forEach(t => {
            if (t.type === "income") {
                if (!incomeCategories[t.category]) {
                    incomeCategories[t.category] = 0;
                }
                incomeCategories[t.category] += t.amount;
            }
        });

        
        const incomeData = Object.keys(incomeCategories).map(category => ({ category, amount: incomeCategories[category] }));
        const expenseData = Object.keys(expenseCategories).map(category => ({ category, amount: expenseCategories[category] }));

        
        // console.log("Income:", income);
        // console.log("Expenses:", expenses);
        // console.log("Expense Data:", expenseData);
        // console.log("Income Data:", incomeData);
        res.json({ income, expenses, expenseData, incomeData });
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports" });
    }
};
