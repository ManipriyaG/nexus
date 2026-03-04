import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_ACTIONS } from "../../shared/constants/actionTypes";
import type { LoginCredentials, RegisterCredentials } from "../../types/auth.types";
import { loginApi, logoutApi, refreshTokenApi, registerApi } from "./utils/authApi";

export const loginThunk = createAsyncThunk(AUTH_ACTIONS.LOGIN,
    async (credentials: LoginCredentials, { rejectWithValue }
    ) => {
        try {
            const data = await loginApi(credentials)
            return data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Invalid Email or Password"
            return rejectWithValue(errorMessage)
        }
    }
)

export const registerThunk = createAsyncThunk(AUTH_ACTIONS.REGISTER,
    async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            const data = await registerApi(credentials)
            return data
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Registration Failed"
            return rejectWithValue(errorMessage)
        }
    }
)

export const refreshThunk = createAsyncThunk(AUTH_ACTIONS.REFRESH,
    async (_, { rejectWithValue }) => {
        try {
            const data = await refreshTokenApi()
            return data
        }
        catch {
            return rejectWithValue("Session Expired. Please Login")
        }
    }
)

export const logoutThunk = createAsyncThunk(AUTH_ACTIONS.LOGOUT,
    async () => {
        try {
            const data = await logoutApi()
            return data;
        }
        catch {

        }
    }
)