import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../app/store"
import { selectIsAuthenticated } from "../features/auth/authSlice"

const ProtectedRoutes = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    if(!isAuthenticated){
       return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}
export default ProtectedRoutes