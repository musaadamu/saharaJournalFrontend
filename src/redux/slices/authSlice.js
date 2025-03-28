import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

// Retrieve token and user from localStorage if available
const storedToken = localStorage.getItem('authToken');
const storedUser = localStorage.getItem('authUser');

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
};

// Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Async Thunk for registering a user
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post('/register', userData);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Async Thunk for logging in a user
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post('/login', credentials);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Async Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (userData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const response = await axiosInstance.put('/profile', userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.setItem('authUser', JSON.stringify(response.data)); // Update stored user data
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Profile update failed');
        }
    }
);

// Redux Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
        }
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })

            // Update Profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(updateUserProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

// Export actions properly
export const { logout } = authSlice.actions;

// Export async thunks
export default authSlice.reducer;
