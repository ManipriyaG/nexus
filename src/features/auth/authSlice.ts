import { createSlice, } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/auth.types";
import { loginThunk, logoutThunk, refreshThunk, registerThunk } from "./authThunk";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    isInitialised: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Synchronous actions — simple state changes
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.accessToken = action.payload.accessToken
                state.isLoading = false
                state.isInitialised = true
                state.error = null
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.error = action.payload as string
                state.isAuthenticated = false
                state.user = null
                state.accessToken = null
                state.isLoading = false
            })

        builder
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isLoading = false
                state.isAuthenticated = true
                state.isInitialised = true
                state.error = null
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.error = action.payload as string
            })

        builder
            .addCase(refreshThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.isAuthenticated = true
                state.isInitialised = true
                state.error = null
            })
            .addCase(refreshThunk.rejected, (state) => {
                state.isAuthenticated = false
                state.isInitialised = false
                state.user = null
                state.accessToken = null
            })

        builder
            .addCase(logoutThunk.fulfilled, () => {
                return initialState
            })
    }
})

export const { clearError } = authSlice.actions

export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectError = (state: { auth: AuthState }) => state.auth.error
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectIsInitialised = (state: { auth: AuthState }) => state.auth.isInitialised

export default authSlice.reducer