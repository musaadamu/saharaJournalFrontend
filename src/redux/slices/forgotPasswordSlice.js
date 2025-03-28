import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:5000/api/auth';

// Send password reset email
export const sendResetEmail = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'Failed to send reset link');
            return data.message;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Reset password with new credentials
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'Failed to reset password');
            return data.message;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: { message: null, error: null, loading: false },
    reducers: {
        clearMessages: (state) => {
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendResetEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(sendResetEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(sendResetEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMessages } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
