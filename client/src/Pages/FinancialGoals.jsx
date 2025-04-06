import React, { useState, useEffect } from "react";
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, LinearProgress } from "@mui/material";
import axios from "axios";

const FinancialGoals = () => {
    const [goals, setGoals] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        targetAmount: "",
        deadline: "",
        currentProgress: 0
    });

    const token = localStorage.getItem("token")
    useEffect(() => {
        axios.get("http://localhost:5000/api/goals", {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then(res => setGoals(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post("http://localhost:5000/api/goals", formData, {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then(res => {
                setGoals([...goals, res.data]);
                setOpen(false);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/goals/${id}`, {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then(() => setGoals(goals.filter(goal => goal._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <Container>
            <h2>Financial Goals & Budgeting</h2>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Goal</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Goal</TableCell>
                        <TableCell>Target Amount</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {goals.map(goal => (
                        <TableRow key={goal._id}>
                            <TableCell>{goal.title}</TableCell>
                            <TableCell>₹{goal.targetAmount}</TableCell>
                            <TableCell>{goal.deadline}</TableCell>
                            <TableCell>
                                <LinearProgress variant="determinate" value={(goal.currentProgress / goal.targetAmount) * 100} />
                                {goal.currentProgress} / {goal.targetAmount}
                            </TableCell>
                            <TableCell>
                                <Button color="secondary" onClick={() => handleDelete(goal._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Add Goal Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Financial Goal</DialogTitle>
                <DialogContent>
                    <TextField label="Goal Title" name="title" value={formData.title} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Target Amount" name="targetAmount" type="number" value={formData.targetAmount} onChange={handleChange} fullWidth margin="dense" />
                    <TextField label="Deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} fullWidth margin="dense" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default FinancialGoals;
