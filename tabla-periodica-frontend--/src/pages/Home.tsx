import { useEffect, useState } from 'react'
import { getFavoritos, addFavorito, removeFavorito } from '../services/favoritoService'
import { useNavigate } from 'react-router-dom'
 import styles from './home.module.css'
const NEON: Record<string, string> = {
    'METAL':     '#3b9eff',
    'NO METAL':  '#00f5a0',
    'METALOIDE': '#ffc60a',
    'GAS NOBLE': '#e84fff',
}

function Home() {
    const [elementos, setElementos] = useState<any[]>([])
    const [favoritos, setFavoritos] = useState<number[]>([])
    const [error, setError] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        cargarElementos()
        if (token) cargarFavoritos()
    }, [])

    const cargarElementos = async () => {
        try {
            const response = await fetch('http://localhost:8080/elements')
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            setElementos(data)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const cargarFavoritos = async () => {
        try {
            const data = await getFavoritos()
            setFavoritos(data.map((f: any) => f.ID))
        } catch (err: any) {
            console.error(err.message)
        }
    }

    const toggleFavorito = async (elementoId: number) => {
        if (!token) {
            setError('Tenés que iniciar sesión para guardar favoritos')
            return
        }
        try {
            if (favoritos.includes(elementoId)) {
                await removeFavorito(elementoId)
                setFavoritos(favoritos.filter(id => id !== elementoId))
            } else {
                await addFavorito(elementoId)
                setFavoritos([...favoritos, elementoId])
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    const grilla: any[][] = Array.from({ length: 7 }, () => Array(18).fill(null))
    elementos.forEach(el => {
        const fila = el.PERIODO - 1
        const col = el.GRUPO - 1
        if (fila >= 0 && fila < 7 && col >= 0 && col < 18) {
            grilla[fila][col] = el
        }
    })

return (
    <div className={styles.container}>
        <h1 className={styles.titulo}>Tabla Periódica</h1>

        {error && <p className={styles.error}>{error}</p>}

        {/* Leyenda */}
        <div className={styles.leyenda}>
            {Object.entries(NEON).map(([cat, color]) => (
                <div key={cat} className={styles.leyendaItem}>
                    <div className={styles.leyendaDot} style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`
                    }} />
                    <span className={styles.leyendaLabel} style={{ color }}>{cat}</span>
                </div>
            ))}
        </div>

        {/* Hint de scroll en mobile */}
        <p className={styles.scrollHint}>← deslizá para ver la tabla →</p>

        {/* Grilla con scroll horizontal */}
        <div className={styles.grillaWrapper}>
            <div className={styles.grilla}>
                {grilla.map((fila, fi) =>
                    fila.map((el, ci) => {
                        const color = el ? NEON[el.CATEGORIA] : null
                        const esFav = el && favoritos.includes(el.ID)
                        return (
                            <div
                                key={`${fi}-${ci}`}
                                style={{
                                    width: '64px',
                                    height: '76px',
                                    backgroundColor: el ? '#0b0e14' : 'transparent',
                                    border: color ? `1px solid ${color}` : 'none',
                                    borderRadius: '6px',
                                    boxShadow: color ? `0 0 8px ${color}55, inset 0 0 10px ${color}11` : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    cursor: el ? 'pointer' : 'default',
                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                }}
                                onClick={() => el && navigate(`/elemento/${el.ID}`)}
                                onMouseEnter={e => {
                                    if (el && color) {
                                        const d = e.currentTarget as HTMLDivElement
                                        d.style.transform = 'scale(1.15)'
                                        d.style.boxShadow = `0 0 20px ${color}, inset 0 0 14px ${color}33`
                                        d.style.zIndex = '10'
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (el && color) {
                                        const d = e.currentTarget as HTMLDivElement
                                        d.style.transform = 'scale(1)'
                                        d.style.boxShadow = `0 0 8px ${color}55, inset 0 0 10px ${color}11`
                                        d.style.zIndex = '1'
                                    }
                                }}
                            >
                                {el && color && (
                                    <>
                                        <span style={{ fontSize: '9px', color: '#aaa', alignSelf: 'flex-start', paddingLeft: '5px', lineHeight: 1 }}>
                                            {el.NUMERO_ATOMICO}
                                        </span>
                                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: color, textShadow: `0 0 12px ${color}`, lineHeight: 1.1 }}>
                                            {el.SIMBOLO}
                                        </span>
                                        <span style={{ fontSize: '8px', color: '#ccc', textAlign: 'center', paddingBottom: '1px' }}>
                                            {el.NOMBRE}
                                        </span>
                                        <span style={{ fontSize: '7px', color: '#888' }}>
                                            {el.MASA_ATOMICA}
                                        </span>
                                        {token && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleFavorito(el.ID)
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    right: '3px',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    fontSize: '10px',
                                                    padding: 0,
                                                    lineHeight: 1,
                                                    color: esFav ? 'gold' : '#555',
                                                    filter: esFav ? 'drop-shadow(0 0 4px gold)' : 'none'
                                                }}
                                            >
                                                {esFav ? '⭐' : '☆'}
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    </div>
)}