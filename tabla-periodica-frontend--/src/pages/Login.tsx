import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';


function Login() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();
const [error, setError] = useState('');
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
    <div>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
)


};
export default Login;