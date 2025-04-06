import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token")
    useEffect(() =>
    {
        axios.get("http://localhost:5000/api/dashboard/", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) =>
            {
                setData(res.data);
                setLoading(false);
            }).catch((err) =>
            {
                console.error(err);
                setLoading(false);
            });

    }, []);
    

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) return <Typography variant="h6" align="center">No data available</Typography>;

    const { totalIncome, totalExpenses, savings, recentTransactions = [], activeGoals = [] } = data;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Grid container spacing={3}>
                {/* Income Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Income</Typography>
                            <Typography variant="h5">₹{totalIncome || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Expense Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Expenses</Typography>
                            <Typography variant="h5">₹{totalExpenses || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Savings Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Savings</Typography>
                            <Typography variant="h5">₹{savings || 0}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Recent Transactions */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Recent Transactions</Typography>
                            {recentTransactions.length > 0 ? (
                                recentTransactions.map((t, index) => (
                                    <Typography key={index}>{t.type}: ₹{t.amount}</Typography>
                                ))
                            ) : (
                                <Typography color="textSecondary">No recent transactions</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Financial Goals */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Active Financial Goals</Typography>
                            {activeGoals.length > 0 ? (
                                activeGoals.map((g, index) => (
                                    <Typography key={index}>{g.title} - ₹{g.currentAmount} / ₹{g.targetAmount}</Typography>
                                ))
                            ) : (
                                <Typography color="textSecondary">No active goals</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Expense Chart */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Income vs Expenses</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={[
                                    { name: "Income", value: totalIncome || 0 },
                                    { name: "Expenses", value: totalExpenses || 0 }
                                ]}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
