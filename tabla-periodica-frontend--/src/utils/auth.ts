// Decodifica el payload del JWT sin verificar firma (solo frontend)
export const getTokenPayload = (): { id: number; rol: string; nombre: string } | null => {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
        const payload = token.split('.')[1]
        return JSON.parse(atob(payload))
    } catch {
        return null
    }
}

export const isAdmin = (): boolean => {
    const payload = getTokenPayload()
    return payload?.rol === 'ADMIN'
}

export const isLoggedIn = (): boolean => {
    return !!localStorage.getItem('token')
}