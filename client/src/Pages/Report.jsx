import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const Reports = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/reports", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (res.data) {
                    setIncomeData(res.data.incomeData || []);
                    setExpenseData(res.data.expenseData || []);

                } else {
                    console.error("No data returned from API.");
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [token]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    if (!Array.isArray(expenseData) || !Array.isArray(incomeData)) {
        console.error("Invalid data format:", { expenseData, incomeData });
        return <Typography variant="h6">Error: Invalid report data.</Typography>;
    }

    // Combine income and expense data for the bar chart
    const combinedData = [...incomeData, ...expenseData];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Financial Reports & Insights
            </Typography>

            {/* Bar Chart: Income vs Expenses by Category */}
            {combinedData.length > 0 ? (
                <ResponsiveContainer width="80%" height={500}>
                    <BarChart data={combinedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#82ca9d" name="Income" />
                        <Bar dataKey="amount" fill="#FF8042" name="Expenses" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <Typography variant="h6">No financial data available.</Typography>
            )}

            {/* Pie Charts: Income & Expense Distribution Side by Side */}
            <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={4}>
                {/* Expense Pie Chart */}
                {expenseData.length > 0 && (
                    <PieChart width={400} height={400}>
                        <Pie
                            data={expenseData}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {expenseData.map((entry, index) => (
                                <Cell key={`exp-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}

                {/* Income Pie Chart */}
                {incomeData.length > 0 && (
                    <PieChart width={400} height={400}>
                        <Pie
                            data={incomeData}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {incomeData.map((entry, index) => (
                                <Cell key={`inc-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </Box>
        </Container>
    );
};

export default Reports;
