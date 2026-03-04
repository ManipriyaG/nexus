export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    createdAt: string
}

export interface LoginCredentials {
    name: string
    password: string
}

export interface RegisterCredentials {
    name: string
    password: string
    email: string
}

export interface AuthState{
    user: User | null
    accessToken: string | null
    isLoading: boolean  // true when api call is in progress
    isAuthenticated: boolean  // true when accessToken + user details exist
    error: string | null
    isInitialised: boolean   // check this , if not needed remove
}