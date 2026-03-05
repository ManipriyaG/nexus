import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthPage from './features/auth/components/AuthPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import Workspace from './components/Workspace'
import { useAppDispatch, useAppSelector } from './app/store'
import { useEffect } from 'react'
import { refreshThunk } from './features/auth/authThunk'
import { selectIsAuthenticated } from './features/auth/authSlice'

function App() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  useEffect(()=>{
    dispatch(refreshThunk())
  },[dispatch])
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Workspace/> : <AuthPage/>

    },
    {
      element: <ProtectedRoutes/>,
      children: [
        {
          path: "/workspace",
          element: <Workspace/>
        }
      ]
    },
    {
      path:"*",
      element: <Navigate to="/" replace/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App
