import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your API base URL

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDashboardData = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
