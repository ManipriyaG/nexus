import type { AuthState, User } from "../../types/auth.types";
import authReducer, { clearCredentials, clearError, setCredentials, setError, setLoading } from "../auth/authSlice"

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

describe('authSlice', ()=> {
    it('should return initial state when no action is given', () => {
        const state = authReducer(undefined, {type: '@INIT'})
        expect(state).toEqual(initialState)
    })

    it('should store user credentials when setCredentials action is dispatched', () => {
        const state = authReducer(initialState, setCredentials({
            user: mockUser, accessToken: "abc-1"
        }))
        expect(state.user).toEqual(mockUser)
        expect(state.accessToken).toEqual("abc-1")
        expect(state.isAuthenticated).toEqual(true)
        expect(state.isLoading).toEqual(false)
        expect(state.error).toBeNull()
    })

    it('should clear user credentials when clearCredentials action is dispatched', () => {
        const loggedInState = {
            ...initialState,
            user: mockUser,
            accessToken: "abc-1",
            isAuthenticated: true,
            isInitialised: true
        }
        const state = authReducer(loggedInState, clearCredentials())
        expect(state.user).toBeNull()
        expect(state.accessToken).toBeNull()
        expect(state.isAuthenticated).toEqual(false)
        expect(state.isInitialised).toEqual(false)
    })

    it("should set isLoading to true when setLoading action is dispatched", () => {
        const state = authReducer(initialState, setLoading(true))
        expect(state.isLoading).toEqual(true)
    })

    it('should set error when setError action is dispatched', () => {
        const loadingState = {...initialState, isLoading: true}
        const state = authReducer(loadingState, setError("Invalid Password"))
        expect(state.isLoading).toEqual(false)
    })

    it('should clear error when clearError is dispatched', () => {
        const errorState = {...initialState, error: "Invalid Password"}
        const state = authReducer(errorState, clearError())
        expect(state.error).toBeNull()
    })
})