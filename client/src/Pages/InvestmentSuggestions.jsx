import { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, CircularProgress, Grid } from "@mui/material";
import axios from "axios";

const InvestmentSuggestions = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                // Replace with a real stock API or backend call
                const { data } = await axios.get("/api/investment/suggestions");
                setStocks(data);
            } catch (error) {
                console.error("Error fetching stock data", error);
            }
            setLoading(false);
        };

        fetchStockData();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
                Investment Suggestions
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    {stocks.map((stock) => (
                        <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6">{stock.name} ({stock.symbol})</Typography>
                                    <Typography variant="body1">Price: ₹{stock.price}</Typography>
                                    <Typography variant="body2" color={stock.change >= 0 ? "green" : "red"}>
                                        Change: {stock.change}%
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default InvestmentSuggestions;
