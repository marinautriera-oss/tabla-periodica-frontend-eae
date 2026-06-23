import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            {token ? (
                <button onClick={handleLogout}>Cerrar sesión</button>
            ) : (
                <>
                    <Link to="/login">Iniciar sesión</Link>
                    <Link to="/register">Registrarse</Link>
                </>
            )}
        </nav>
    )
}

export default Navbar