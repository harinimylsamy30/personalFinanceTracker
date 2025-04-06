import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ backgroundColor: "black" }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Personal Finance Tracker
                </Typography>
                
                {token ? (
                    <>
                        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
                        <Button color="inherit" component={Link} to="/reports">Reports</Button>
                        <Button color="inherit" component={Link} to="/goals">Goals</Button>
                        <Button color="inherit" component={Link} to="/profile">Profile</Button>
                        <Button color="inherit" component={Link} to="/settings">Settings</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/auth">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
