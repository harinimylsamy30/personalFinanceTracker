import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import AuthContext from "../Context/AuthContext";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const toggleAuth = () => {
        setIsLogin(!isLogin);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setError("");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Check if passwords match before registration
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const url = isLogin
                ? "http://localhost:5000/api/auth/login"
                : "http://localhost:5000/api/auth/register";

            const { data } = await axios.post(url, formData, {
                headers: { "Content-Type": "application/json" }
            });

            
            // Store JWT in localStorage
            localStorage.setItem("token", data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; // Set default header for axios

            // Redirect to dashboard after login
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            console.log(err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    {isLogin ? "Login" : "Register"}
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    {!isLogin && (
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        {isLogin ? "Login" : "Register"}
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Link href="#" onClick={toggleAuth}>{isLogin ? "Register" : "Login"}</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Auth;
