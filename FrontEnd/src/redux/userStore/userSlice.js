import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Login
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Logout
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user'); // Remove from localStorage
        },

        // Email Verification
        verifyEmailStart: (state) => {
            state.loading = true;
        },
        verifyEmailSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        verifyEmailFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Resend Verification Code
        resendVerificationStart: (state) => {
            state.loading = true;
        },
        resendVerificationSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        resendVerificationFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Forgot Password
        forgotPasswordStart: (state) => {
            state.loading = true;
        },
        forgotPasswordSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        forgotPasswordFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Reset Password
        resetPasswordStart: (state) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        resetPasswordFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Update User Profile
        updateProfileStart: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Update persisted user data
        },
        updateProfileFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    verifyEmailStart,
    verifyEmailSuccess,
    verifyEmailFailure,
    resendVerificationStart,
    resendVerificationSuccess,
    resendVerificationFailure,
    forgotPasswordStart,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailure,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
} = userSlice.actions;

export default userSlice.reducer;
