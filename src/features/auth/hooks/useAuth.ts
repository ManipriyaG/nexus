import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { selectAccessToken, selectError, selectIsAuthenticated, selectIsLoading, selectUser, clearError } from "../authSlice"
import type { LoginCredentials, RegisterCredentials } from "../../../types/auth.types"
import { loginThunk, logoutThunk, refreshThunk, registerThunk } from "../authThunk"

const useAuth = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const isLoading = useAppSelector(selectIsLoading)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const error = useAppSelector(selectError)
    const accessToken = useAppSelector(selectAccessToken)

    const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
        const result = await dispatch(loginThunk(credentials))
        return loginThunk.fulfilled.match(result)
    }, [dispatch])

    const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
        const result = await dispatch(registerThunk(credentials))
        return registerThunk.fulfilled.match(result)
    }, [dispatch])

    const refreshToken = useCallback(async (): Promise<void> => {
        dispatch(refreshThunk())
    }, [dispatch])

    const logout = useCallback(async (): Promise<void> => {
        dispatch(logoutThunk())
    }, [dispatch])

    const dismissError = useCallback(() => { dispatch(clearError()) }, [dispatch])

    return { user, isLoading, isAuthenticated, error, accessToken, login, register, refreshToken, logout, dismissError }
}
export default useAuth