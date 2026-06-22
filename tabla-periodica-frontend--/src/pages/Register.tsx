import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';


function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [exito, setExito] = useState('');
    const navigate = useNavigate();
const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await register(nombre, email, contraseña);
            setExito('Cuenta creada. Revisá tu email para verificarla.');
            setNombre('');
            setEmail('');
            setContraseña('');
        } catch (err: any) {
            setError(err.message);
        }
    } 

return (
    <div>
        <h1>Register</h1>
        {exito && <p style={{ color: 'green' }}>{exito}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
    
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    </div>
)


};
export default Register;