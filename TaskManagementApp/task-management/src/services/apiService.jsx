import axios from 'axios';

const API_URL = 'http://localhost:7157/api';

export const login = async (username, password) => {
    try {
        const response = await axios.get(`${API_URL}/Authentication/login`, {
            params: {
                userName: username,
                Password: password
            }
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post(`${API_URL}/User/register`, { username, email, password });
        return response.data;
    } catch (error) {

        console.error('Error during registration:', error.response?.data || error.message);
        return null;
    }
};


export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/${id}`);
        return response.data;
    } catch (error) {
        console.log(response.data.data);
        console.error('Error fetching user by ID:', error);
        return null;
    }
};


export const getMissionsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/mission/byUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching missions by user ID:', error);
        return null;
    }
};


