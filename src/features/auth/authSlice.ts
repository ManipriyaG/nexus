import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/auth.types";
import type { User } from "../../types/auth.types"

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
        setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
            state.isLoading = false
            state.error = null
            state.isInitialised = true
        },

        clearCredentials: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
            state.isInitialised = false
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setError: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        clearError: (state) => {
            state.error = null
        }
    }
})

export const { setCredentials, clearCredentials, setLoading, setError, clearError } = authSlice.actions

export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectError = (state: { auth: AuthState }) => state.auth.error

export default authSlice.reducer