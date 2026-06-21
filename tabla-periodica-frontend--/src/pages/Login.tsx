import { useState } from 'react';
import { login } from '../services/authService';

function Login() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const handleSubmit = async(e: React.FormEvent) => {       
         e.preventDefault()
           try {
            const data = await login(email, contraseña);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login