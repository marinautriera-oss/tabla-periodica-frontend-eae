import { Link, useNavigate } from 'react-router-dom'
import { isAdmin, isLoggedIn } from '../utils/auth'
import styles from './navbar.module.css'

function Navbar() {
    const navigate = useNavigate()
    const loggedIn = isLoggedIn()
    const admin = isAdmin()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>
                <span className={styles.dot}></span>
                TABLA PERIODICA
            </Link>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/quiz" className={styles.link}>Quiz</Link>
                {admin && (
                    <Link to="/admin" className={styles.link}>Admin</Link>
                )}
                {loggedIn ? (
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Cerrar sesión
                    </button>
                ) : (
                    <>
                        <Link to="/login" className={styles.linkMuted}>Iniciar sesión</Link>
                        <Link to="/register" className={styles.ctaButton}>Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar