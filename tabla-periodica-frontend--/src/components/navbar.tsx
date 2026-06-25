import { Link, useNavigate } from 'react-router-dom'
import styles from './navbar.module.css'
function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
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
                {token ? (
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