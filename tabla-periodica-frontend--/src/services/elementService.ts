const API_URL = import.meta.env.VITE_API_URL

export const getElementos = async () => {
    const response = await fetch(`${API_URL}/elements`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export const createElement = async (elemento: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/elements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(elemento)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export const updateElemento = async (id: number, elemento: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/elements/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(elemento)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export const deleteElemento = async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/elements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}