import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

function Verificar() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('Verificando tu cuenta...');
    const [error, setError] = useState('');

    useEffect(() => {
        const verificar = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/verify/${token}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setMensaje(data.message);
                setTimeout(() => navigate('/login'), 3000)
            } catch (err: any) {
                setError(err.message);
            }
        };
        verificar();
    }, [token]);

    return (
        <div style={{
            backgroundColor: '#000',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
        }}>
            <div style={{
                backgroundColor: '#0b0e14',
                border: '1px solid #3b9eff44',
                borderRadius: '16px',
                padding: '48px 40px',
                textAlign: 'center',
                maxWidth: '400px',
            }}>
                <h1 style={{ color: '#3b9eff', letterSpacing: '3px', fontSize: '16px', marginBottom: '24px' }}>
                    VERIFICACIÓN DE CUENTA
                </h1>
                {error ? (
                    <p style={{ color: '#ff4444', fontSize: '14px' }}>{error}</p>
                ) : (
                    <>
                        <p style={{ color: '#00f5a0', fontSize: '14px', marginBottom: '12px' }}>{mensaje}</p>
                        <p style={{ color: '#555', fontSize: '12px' }}>Redirigiendo al login...</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Verificar;