import { createContext, useState, useEffect } from "react";
import axios from "axios";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinanceData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const { data: transactionData } = await axios.get("/api/transactions", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setTransactions(transactionData);

                    const { data: investmentData } = await axios.get("/api/investments", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setInvestments(investmentData);
                }
            } catch (error) {
                console.error("Error fetching finance data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFinanceData();
    }, []);

    return (
        <FinanceContext.Provider value={{ transactions, investments, loading }}>
            {children}
        </FinanceContext.Provider>
    );
};

export default FinanceContext;
