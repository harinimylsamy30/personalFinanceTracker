import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Transactions from "./Pages/Transaction";
import Reports from "./Pages/Report";
import FinancialGoals from "./Pages/FinancialGoals";
import InvestmentSuggestions from "./Pages/InvestmentSuggestions.jsx";
import Settings from "./Pages/Settings";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/auth" />;
};

const theme = createTheme({
    palette: {
        background: {
          paper: '#00A9A6', // Robin Egg Blue
            default: '#3B3C36', // Black Olive
          
        },
        text: {
          primary: '#FFFFFF', // white text to contrast the dark background
        },
    },
    components: {
        // Applying hover effect to all Card components globally
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    },
                },
            },
        },
    },
    });

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                        <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />
                        <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
                        <Route path="/goals" element={<PrivateRoute element={<FinancialGoals />} />} />
                        <Route path="/investment" element={<PrivateRoute element={<InvestmentSuggestions />} />} />
                        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
