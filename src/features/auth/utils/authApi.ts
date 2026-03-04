import { API_ENDPOINTS } from "../../../shared/constants/apiEndpoints";
import apiClient from "../../../shared/utils/apiClient";
import type { AuthResponse, LoginCredentials, RegisterCredentials } from "../../../types/auth.types";

export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
}

export const registerApi = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, credentials)
    return response.data
}

export const refreshTokenApi = async (): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH)
    return response.data
}

export const logoutApi = async (): Promise<void> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    return response.data
}