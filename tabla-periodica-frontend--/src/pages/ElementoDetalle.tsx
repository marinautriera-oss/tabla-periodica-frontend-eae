import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const NEON: Record<string, string> = {
    'METAL':     '#3b9eff',
    'NO METAL':  '#00f5a0',
    'METALOIDE': '#ffc60a',
    'GAS NOBLE': '#e84fff',
}

function ElementoDetalle() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [elemento, setElemento] = useState<any>(null)
    const [error, setError] = useState('')
const API_URL = import.meta.env.VITE_API_URL
    useEffect(() => {
        fetch(`${API_URL}/elements`)
            .then(r => r.json())
            .then(data => setElemento(data))
            .catch(() => setError('No se pudo cargar el elemento'))
    }, [id])

    if (error) return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#ff4444', fontFamily: 'monospace' }}>{error}</p>
        </div>
    )

    if (!elemento) return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#ffc60a', fontFamily: 'monospace', letterSpacing: '2px' }}>CARGANDO...</p>
        </div>
    )

    const color = NEON[elemento.CATEGORIA] || '#fff'

    return (
        <div style={{
            backgroundColor: '#000',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            padding: '32px'
        }}>
            <div style={{
                backgroundColor: '#0b0e14',
                border: `1px solid ${color}`,
                borderRadius: '16px',
                padding: '48px',
                maxWidth: '480px',
                width: '100%',
                boxShadow: `0 0 40px ${color}33`,
                textAlign: 'center'
            }}>
                <p style={{ color: '#aaa', fontSize: '16px', letterSpacing: '2px', marginBottom: '8px' }}>
                    N° ATÓMICO: {elemento.NUMERO_ATOMICO}
                </p>
                <h1 style={{
                    fontSize: '96px',
                    fontWeight: 'bold',
                    color: color,
                    textShadow: `0 0 30px ${color}`,
                    lineHeight: 1,
                    marginBottom: '8px'
                }}>
                    {elemento.SIMBOLO}
                </h1>
                <h2 style={{
                    color: '#fff',
                    fontSize: '24px',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    marginBottom: '32px'
                }}>
                    {elemento.NOMBRE}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    {[
                        { label: 'MASA ATÓMICA', value: elemento.MASA_ATOMICA },
                        { label: 'CATEGORÍA', value: elemento.CATEGORIA },
                        { label: 'GRUPO', value: elemento.GRUPO },
                        { label: 'PERÍODO', value: elemento.PERIODO },
                    ].map(({ label, value }) => (
                        <div key={label} style={{
                            backgroundColor: '#111',
                            border: `1px solid ${color}44`,
                            borderRadius: '8px',
                            padding: '16px',
                        }}>
                            <p style={{ color: '#888', fontSize: '10px', letterSpacing: '2px', marginBottom: '4px' }}>{label}</p>
                            <p style={{ color: color, fontSize: '16px', fontWeight: 'bold' }}>{value}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: `1px solid ${color}`,
                        borderRadius: '8px',
                        padding: '10px 24px',
                        color: color,
                        fontSize: '13px',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        transition: 'all 0.2s',
                    }}
                >
                    ← VOLVER
                </button>
            </div>
        </div>
    )
}

export default ElementoDetalle