import axios from 'axios';

const API = 'http://localhost:8080/api/auth/';
export const login = async (email: string, contraseña: string) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, contraseña });
    return data;
}

export const register = async (name: string, email: string, contraseña: string) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, contraseña });
    return data;
}
