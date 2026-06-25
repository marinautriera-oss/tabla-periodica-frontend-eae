const API_URL = import.meta.env.VITE_API_URL

export const login = async (email: string, contraseña: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
    });
    const data = await response.json();
    if (!response.ok) { throw new Error(data.message); }
    return data;
}

export const register = async (nombre: string, email: string, contraseña: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, contraseña }),
    });
    const data = await response.json();
    if (!response.ok) { throw new Error(data.message); }
    return data;
};

