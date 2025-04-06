import Transaction from "../models/Transaction.js";
import pkg from "json2csv"; // Import the json2csv library
const {parse} = pkg

// Add Income/Expense
export const addTransaction = async (req, res) => {
    try {
        const { type, category, amount, date, note } = req.body;

        const transaction = new Transaction({
            user: req.user._id,
            type,
            category,
            amount,
            date,
            note,
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Transactions for a User
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//download transactions
export const downloadTransactions = async (req, res) => {
    const userId = req.user.id; // Assuming JWT provides user ID

    try {
        // Fetch all transactions for the user
        const transactions = await Transaction.find({ user: userId });

        // If no transactions found, send a message
        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found." });
        }

        // Classify and clean up the transaction data
        const classifiedTransactions = classifyTransactions(transactions);

        // Convert the cleaned-up and classified transactions to CSV
        const csvData = parse(classifiedTransactions); // Use parse from json2csv

        // Set headers for file download
        res.header('Content-Type', 'text/csv');
        res.attachment('transactions.csv'); // The file will be named transactions.csv

        // Send the CSV data as the response
        return res.send(csvData);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        return res.status(500).json({ message: "Failed to fetch transactions." });
    }
};

// Function to classify and clean up transaction data
const classifyTransactions = (transactions) => {
    return transactions.map((transaction) => {
        let categoryLabel;

        // Classify based on type (Income or Expense)
        if (transaction.type === "income") {
            categoryLabel = "Income";
        } else if (transaction.type === "expense") {
            categoryLabel = "Expense";
        } else {
            categoryLabel = "Unclassified"; // In case there are other types
        }

        // Return cleaned and classified data
        return {
            "Date": new Date(transaction.date).toLocaleDateString(),
            "type": categoryLabel,
            "Description": transaction.note || "No description",
            "Amount": transaction.amount,
            "category": transaction.category,
        };
    });
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await transaction.deleteOne();
        res.json({ message: "Transaction deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
