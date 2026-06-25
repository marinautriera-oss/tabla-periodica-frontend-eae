import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(email, contraseña);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div style={{
            backgroundColor: '#000',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            padding: '24px'
        }}>
            <div style={{
                backgroundColor: '#0b0e14',
                border: '1px solid #3b9eff',
                borderRadius: '16px',
                padding: '48px 40px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 0 40px #3b9eff22',
            }}>
                {/* Logo / título */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#3b9eff',
                        boxShadow: '0 0 20px #3b9eff',
                        margin: '0 auto 16px',
                    }} />
                    <h1 style={{
                        color: '#fff',
                        fontSize: '20px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        margin: 0,
                        textShadow: '0 0 10px #3b9eff'
                    }}>
                        Iniciar Sesión
                    </h1>
                    <p style={{ color: '#555', fontSize: '11px', letterSpacing: '2px', marginTop: '8px' }}>
                        TABLA PERIÓDICA EAE
                    </p>
                </div>

                {error && (
                    <p style={{
                        color: '#ff4444',
                        fontSize: '12px',
                        textAlign: 'center',
                        marginBottom: '16px',
                        letterSpacing: '1px'
                    }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ color: '#888', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
                            EMAIL
                        </label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#111',
                                border: '1px solid #3b9eff44',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                color: '#fff',
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ color: '#888', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
                            CONTRASEÑA
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#111',
                                border: '1px solid #3b9eff44',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                color: '#fff',
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: '1px solid #3b9eff',
                            borderRadius: '8px',
                            padding: '13px',
                            color: '#3b9eff',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            boxShadow: '0 0 10px #3b9eff44',
                            transition: 'all 0.2s',
                        }}
                    >
                        INGRESAR
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: '#555', fontSize: '12px' }}>
                    ¿No tenés cuenta?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        style={{ color: '#00f5a0', cursor: 'pointer', letterSpacing: '1px' }}
                    >
                        Registrarse
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login;