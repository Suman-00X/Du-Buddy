import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return getCurrentUser();
};

const register = async (name, roll, bio, email, password, type) => {
    const response = await axios.post(`${API_URL}/users/register`, { name, roll, bio, email, password, type });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return getCurrentUser();
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export default {
    login,
    register,
    logout,
    getCurrentUser
};
