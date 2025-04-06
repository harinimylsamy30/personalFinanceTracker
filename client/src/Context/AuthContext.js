import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("token");

                if (!token) {
                    console.error("No token found")
                    return;
                }
                if (token) {
                    const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    
                    setUser(data);
                }
            } catch (error) {
                console.error("Error fetching user", error);
                localStorage.removeItem("token"); // Remove token if there's an error
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", credentials);
            localStorage.setItem("token", data.token); // Store JWT token

            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; // Set default header for axios
            
            setUser(data);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token"); // Remove JWT token
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
