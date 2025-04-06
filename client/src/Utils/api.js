import axios from "axios";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (credentials) => {
    const { data } = await API.post("/auth/login", credentials);
    return data;
};

export const registerUser = async (userData) => {
    const { data } = await API.post("/auth/register", userData);
    return data;
};

export const getUserProfile = async () => {
    const { data } = await API.get("/auth/profile");
    return data;
};

export const getTransactions = async () => {
    const { data } = await API.get("/transactions");
    return data;
};

export const getInvestments = async () => {
    const { data } = await API.get("/investments");
    return data;
};

export default API;
