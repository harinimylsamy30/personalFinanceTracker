import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        targetAmount: { type: Number, required: true },
        currentAmount: { type: Number, default: 0 },
        deadline: { type: Date, required: true },
        status: { type: String, enum: ["in-progress", "achieved", "failed"], default: "in-progress" },
    },
    { timestamps: true }
);

const Goal = mongoose.model("Goal", GoalSchema);
export default Goal;
