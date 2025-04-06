import React, { useState, useEffect } from "react";
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { Note } from "@mui/icons-material";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: "income",
        category: "",
        amount: "",
        date: "",
        note: "",
    });

    const token = localStorage.getItem("token")
    useEffect(() => {
        axios.get("http://localhost:5000/api/transactions", {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then(res => setTransactions(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post("http://localhost:5000/api/transactions", formData, {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then(res => {
                setTransactions([...transactions, res.data]);
                setOpen(false);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/transactions/${id}`, {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then(() => setTransactions(transactions.filter(tx => tx._id !== id)))
            .catch(err => console.error(err));
    };

    

    return (
        <Container>
            <h2>Income & Expense Management</h2>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Transaction</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(tx => (
                        <TableRow key={tx._id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.category}</TableCell>
                            <TableCell>{tx.type}</TableCell>
                            <TableCell>{tx.amount}</TableCell>
                            <TableCell>{tx.note }</TableCell>
                            <TableCell>
                                <Button color="secondary" onClick={() => handleDelete(tx._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Add Transaction Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth margin="dense" />
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        fullWidth margin="dense" />
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        fullWidth margin="dense" />
                    <TextField
                        select label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        fullWidth margin="dense">
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </TextField>
                    <TextField
                        label="Note"
                        name="note"
                        type="text" 
                        value={formData.note}
                        onChange={handleChange}
                        fullWidth margin="dense"
                        multiline
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">Save</Button>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Transactions;
