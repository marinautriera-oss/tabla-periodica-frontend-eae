const API_URL = import.meta.env.VITE_API_URL

export const getFavoritos = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/favoritos`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const addFavorito = async (elementoId: number) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/favoritos/${elementoId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}

export const removeFavorito = async (elementoId: number) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/favoritos/${elementoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
}