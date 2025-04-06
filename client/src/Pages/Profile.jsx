import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });


    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/profile", {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then((res) =>
            {
                
                setUser(res.data);
                setFormData({
                    name: user.name,
                    email: user.email,
                    password: ""
                });
            })
            .catch((err) => console.error(err));
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        axios.put("http://localhost:5000/api/auth/profile", formData, {
            headers: {Authorization : `Bearer ${token}`}
        })
            .then((res) => {
                setUser(res.data);
                setEditMode(false);
            })
            .catch((err) => console.error(err));
    };

    const handleDownload = () => {
            axios
                .get("http://localhost:5000/api/transactions/download", {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob', // Important to receive the file as a blob
                })
                .then((res) => {
                    const link = document.createElement("a");
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    link.href = url;
                    link.setAttribute("download", "transactions.csv"); // Set the filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link); // Clean up
                })
                .catch((err) => {
                    console.error("Error downloading the file:", err);
                });
        };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Profile & Settings</Typography>
            {user ? (
                <>
                    <Card>
                        <CardContent>
                            {editMode ? (
                                <>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        disabled
                                    />
                                    <TextField
                                        label="New Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
                                    <Button onClick={() => setEditMode(false)} variant="outlined" color="secondary" style={{ marginLeft: "10px" }}>Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6">Name: {user.name}</Typography>
                                    <Typography variant="h6">Email: {user.email}</Typography>
                                    <Button onClick={() => setEditMode(true)} variant="contained" color="primary">Edit</Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                    <Typography variant="h4">Transactions record</Typography>
                    <Button variant="contained" color="primary" onClick={handleDownload}>
                        Download your file
                    </Button>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Container>
    );
};

export default Profile;
