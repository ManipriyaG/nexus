import useAuth from "../features/auth/hooks/useAuth"

const Workspace = () => {
    const {logout} = useAuth()
    return (
        <div>
            <h1>Workspace</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
export default Workspace