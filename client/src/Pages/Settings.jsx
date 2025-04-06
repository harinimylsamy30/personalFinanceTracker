import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const Settings = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData({
                    name: data.name,
                    email: data.email,
                    password: "*******"
                });
            } catch (error) {
                toast.error("Failed to load user data");
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:5000/api/auth/profile", userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Profile updated successfully");
            setEditMode(false);
        } catch (error) {
            toast.error("Failed to update profile");
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "30px" }}>
                <Typography variant="h5" gutterBottom>
                    User Settings
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={!editMode}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={!editMode}
                    />
                    {editMode && (
                        <TextField
                            label="New Password"
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    )}
                    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                        {!editMode ? (
                            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                                Edit
                            </Button>
                        ) : (
                            <>
                                <Button type="submit" variant="contained" color="success" disabled={loading}>
                                    {loading ? "Saving..." : "Save"}
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Paper>
        </Container>
    );
};

export default Settings;
