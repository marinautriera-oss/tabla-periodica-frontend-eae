import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Verificar() {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState('Verificando tu cuenta...');
    const [error, setError] = useState('');

    useEffect(() => {
        const verificar = async () => {
            try {
                const response = await fetch(`http://localhost:8080/auth/verify/${token}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setMensaje(data.message);
            } catch (err: any) {
                setError(err.message);
            }
        };
        verificar();
    }, [token]);

    return (
        <div>
            <h1>Verificación de cuenta</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <p style={{ color: 'green' }}>{mensaje}</p>
            )}
        </div>
    );
}

export default Verificar;