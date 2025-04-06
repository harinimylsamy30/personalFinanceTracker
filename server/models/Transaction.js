import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["income", "expense"], required: true },
        category: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        note: { type: String },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
