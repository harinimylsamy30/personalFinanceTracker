import Goal from "../models/Goal.js";

// Create Financial Goal
export const createGoal = async (req, res) => {
    try {
        const { title, targetAmount, deadline } = req.body;

        const goal = new Goal({
            user: req.user._id,
            title,
            targetAmount,
            deadline,
        });

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Goals for a User
export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id }).sort({ deadline: 1 });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update Financial Goal
export const updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        goal.currentAmount = req.body.currentAmount || goal.currentAmount;
        goal.status = goal.currentAmount >= goal.targetAmount ? "achieved" : "in-progress";

        const updatedGoal = await goal.save();
        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Financial Goal
export const deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        if (goal.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await goal.deleteOne();
        res.json({ message: "Goal deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
