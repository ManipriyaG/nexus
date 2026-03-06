import type { AuthState, User } from "../../types/auth.types";
import authReducer, { clearError, selectAccessToken, selectError, selectIsAuthenticated, selectIsInitialised, selectIsLoading, selectUser } from "../auth/authSlice"
import { loginThunk, logoutThunk, refreshThunk, registerThunk } from "./authThunk";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    isInitialised: false
}

const mockUser: User = {
    id: "1",
    email: "test@gmail.com",
    name: "Test",
    createdAt: "2026-03-01T00:00:00Z"
}

const mockAuthPayload = {
    user: mockUser,
    accessToken: "mock-access-token"
}

const pending = (thunk: any) => ({ type: thunk.pending.type })
const fulfilled = (thunk: any, payload: any) => ({ type: thunk.fulfilled.type, payload })
const rejected = (thunk: any, payload: any) => ({ type: thunk.rejected.type, payload, error: { message: "Rejected" } })

describe('authSlice', () => {
    it("should return initial state when no action is given", () => {
        const state = authReducer(undefined, { type: '@INIT' })
        expect(state).toEqual(initialState)
    })

    it("should clear error when clearError is dispatched", () => {
        const errorState = { ...initialState, error: "Invalid Password" }
        const state = authReducer(errorState, clearError())
        expect(state.error).toBeNull()
    })
})

describe('authSlice Login Thunk', () => {
    it("should set isLoading to true during pending state", () => {
        const errorState: AuthState = {
            ...initialState,
            error: "Some error"
        }
        const state = authReducer(errorState, pending(loginThunk))
        expect(state.isLoading).toEqual(true)
        expect(state.error).toBeNull()
    })

    it("should set AuthState with actual data during fulfilled state", () => {
        const state = authReducer(initialState, fulfilled(loginThunk, mockAuthPayload))
        expect(state.user).toEqual(mockAuthPayload.user)
        expect(state.accessToken).toEqual(mockAuthPayload.accessToken)
        expect(state.isAuthenticated).toEqual(true)
        expect(state.isInitialised).toEqual(true)
        expect(state.isLoading).toEqual(false)
        expect(state.error).toBeNull
    })

    it("should set error during rejected state", () => {
        const state = authReducer(initialState, rejected(loginThunk, "Something wrong"))
        expect(state.error).toEqual("Something wrong")
        expect(state.isLoading).toEqual(false)
        expect(state.isAuthenticated).toEqual(false)
    })
})

describe("authSlice Register Thunk", () => {
    it("should set isLoading to true during pending state", () => {
        const state = authReducer(initialState, pending(registerThunk))
        expect(state.isLoading).toEqual(true)
    })

    it("should set AuthState with actual data during fulfilled state", () => {
        const state = authReducer(initialState, fulfilled(registerThunk, mockAuthPayload))
        expect(state.user).toEqual(mockAuthPayload.user)
        expect(state.accessToken).toEqual(mockAuthPayload.accessToken)
        expect(state.isAuthenticated).toEqual(true)
        expect(state.isInitialised).toEqual(true)
        expect(state.isLoading).toEqual(false)
        expect(state.error).toBeNull
    })

    it("should set error during rejected state", () => {
        const state = authReducer(initialState, rejected(registerThunk, "Something wrong"))
        expect(state.error).toEqual("Something wrong")
        expect(state.isLoading).toEqual(false)
        expect(state.isAuthenticated).toEqual(false)
    })
})

describe("authSlice RefreshToken Thunk", () => {
    it("should set AuthState with actual data during fulfilled state", () => {
        const state = authReducer(initialState, fulfilled(refreshThunk, mockAuthPayload))
        expect(state.user).toEqual(mockAuthPayload.user)
        expect(state.accessToken).toEqual(mockAuthPayload.accessToken)
        expect(state.isAuthenticated).toEqual(true)
        expect(state.isInitialised).toEqual(true)
        expect(state.isLoading).toEqual(false)
        expect(state.error).toBeNull
    })

    it("should reset AuthState to initialState during rejected state", () => {
        const loggedInState = {
            user: mockUser,
            accessToken: "some-access-token",
            isLoading: false,
            isAuthenticated: true,
            error: null,
            isInitialised: true
        }
        const state = authReducer(loggedInState, rejected(refreshThunk, "Session expired"))
        expect(state.user).toBeNull()
        expect(state.accessToken).toBeNull()
        expect(state.isAuthenticated).toEqual(false)
    })
})

describe("authSlice LOgout Thunk", () => {
    it("should reset AuthState to initialState on logout", () => {
        const loggedInState = {
            user: mockUser,
            accessToken: "some-access-token",
            isLoading: false,
            isAuthenticated: true,
            error: null,
            isInitialised: true
        }
        const state = authReducer(loggedInState, fulfilled(logoutThunk, undefined))
        expect(state).toEqual(initialState)
    })
})

describe("authSlice selectors", () => {
    const mockStoreState = (authState: AuthState) => ({auth: authState})
    it("should return user for selectUser selector when logged in", () => {
        const state = mockStoreState({...initialState, user:mockUser})
        expect(selectUser(state)).toEqual(mockUser)
    })

    it("should return null for selectUser selector when not logged in", () => {
        const state = mockStoreState({...initialState})
        expect(selectUser(state)).toBeNull()
    })

    it("should return true for selectIsAuthenticated selector when logged in", () => {
        const state = mockStoreState({...initialState, isAuthenticated: true})
        expect(selectIsAuthenticated(state)).toEqual(true)
    })

    it("should return false for selectIsAuthenticated selector when not logged in", () => {
        const state = mockStoreState({...initialState, isAuthenticated: false})
        expect(selectIsAuthenticated(state)).toEqual(false)
    })

    it("should return selectIsLoading state", () => {
        const state = mockStoreState({...initialState, isLoading: true})
        expect(selectIsLoading(state)).toBe(true)
    })

     it("should return error for selectError selector", () => {
        const state = mockStoreState({...initialState, error: "Some error"})
        expect(selectError(state)).toEqual("Some error")
    })

    it("should return accessToken for selectAccessToken selector when logged in", () => {
        const state = mockStoreState({...initialState, accessToken: "Some-token"})
        expect(selectAccessToken(state)).toEqual("Some-token")
    })
    
    it("should return null as accessToken for selectAccessToken selector when logged out", () => {
        const state = mockStoreState({...initialState})
        expect(selectAccessToken(state)).toBeNull
    })  

    it("should return selectIsInitialised state", () => {
        const state = mockStoreState({...initialState, isInitialised: true})
        expect(selectIsInitialised(state)).toBe(true)
    })
})