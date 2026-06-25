import { useEffect, useState } from 'react'
import styles from './quiz.module.css'

const API_URL = import.meta.env.VITE_API_URL
interface Elemento {
    ID: number
    NOMBRE: string
    SIMBOLO: string
    NUMERO_ATOMICO: number
    CATEGORIA: string
    MASA_ATOMICA: number
}

interface Pregunta {
    texto: string
    opciones: string[]
    correcta: string
}

const TIPOS = ['simbolo', 'numero', 'categoria']

function generarPreguntas(elementos: Elemento[]): Pregunta[] {
    const shuffled = [...elementos].sort(() => Math.random() - 0.5)
    const seleccionados = shuffled.slice(0, 5)

    return seleccionados.map(el => {
        const tipo = TIPOS[Math.floor(Math.random() * TIPOS.length)]
        const otros = elementos.filter(e => e.ID !== el.ID)
        const tresAleatorios = [...otros].sort(() => Math.random() - 0.5).slice(0, 3)

        let texto = ''
        let correcta = ''
        let opciones: string[] = []

        if (tipo === 'simbolo') {
            texto = `¿Cuál es el símbolo de ${el.NOMBRE}?`
            correcta = el.SIMBOLO
            opciones = [correcta, ...tresAleatorios.map(e => e.SIMBOLO)]
        } else if (tipo === 'numero') {
            texto = `¿Cuál es el número atómico de ${el.NOMBRE}?`
            correcta = String(el.NUMERO_ATOMICO)
            opciones = [correcta, ...tresAleatorios.map(e => String(e.NUMERO_ATOMICO))]
        } else {
            texto = `¿A qué categoría pertenece ${el.NOMBRE}?`
            correcta = el.CATEGORIA
            const cats = ['METAL', 'NO METAL', 'METALOIDE', 'GAS NOBLE']
            const unicas = [...new Set([correcta, ...tresAleatorios.map(e => e.CATEGORIA)])]
            while (unicas.length < 4) {
                const extra = cats.find(c => !unicas.includes(c))
                if (extra) unicas.push(extra)
                else break
            }
            opciones = unicas.slice(0, 4)
        }

        opciones = opciones.sort(() => Math.random() - 0.5)
        return { texto, opciones, correcta }
    })
}

function Quiz() {
    const [elementos, setElementos] = useState<Elemento[]>([])
    const [preguntas, setPreguntas] = useState<Pregunta[]>([])
    const [actual, setActual] = useState(0)
    const [seleccionada, setSeleccionada] = useState<string | null>(null)
    const [respondida, setRespondida] = useState(false)
    const [puntaje, setPuntaje] = useState(0)
    const [terminado, setTerminado] = useState(false)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/elements`)
            .then(r => r.json())
            .then(data => {
                setElementos(data)
                setPreguntas(generarPreguntas(data))
                setCargando(false)
            })
            .catch(() => setCargando(false))
    }, [])

    const handleSeleccionar = (op: string) => {
        if (respondida) return
        setSeleccionada(op)
        setRespondida(true)
        if (op === preguntas[actual].correcta) {
            setPuntaje(p => p + 1)
        }
    }

    const handleSiguiente = () => {
        if (actual + 1 >= preguntas.length) {
            setTerminado(true)
        } else {
            setActual(a => a + 1)
            setSeleccionada(null)
            setRespondida(false)
        }
    }

    const handleReintentar = () => {
        setPreguntas(generarPreguntas(elementos))
        setActual(0)
        setSeleccionada(null)
        setRespondida(false)
        setPuntaje(0)
        setTerminado(false)
    }

    const getClaseOpcion = (op: string) => {
        if (!respondida) return seleccionada === op ? styles.opcionSeleccionada : styles.opcion
        if (op === preguntas[actual].correcta) return styles.opcionCorrecta
        if (op === seleccionada) return styles.opcionIncorrecta
        return styles.opcion
    }

    if (cargando) return (
        <div className={styles.page}>
            <p style={{ color: '#ffc60a', fontFamily: 'monospace', letterSpacing: '2px' }}>CARGANDO QUIZ...</p>
        </div>
    )

    if (terminado) return (
        <div className={styles.page}>
            <div className={styles.resultCard}>
                <p className={styles.resultTag}>RESULTADO FINAL</p>
                <p className={styles.resultScore}>{puntaje}/{preguntas.length}</p>
                <p className={styles.resultMessage}>
                    {puntaje === preguntas.length ? '¡Perfecto! Sos un experto en Química.' :
                     puntaje >= 3 ? '¡Muy bien! Seguí practicando.' :
                     'Seguí estudiando, ¡podés mejorar!'}
                </p>
                <button className={styles.retryButton} onClick={handleReintentar}>
                    INTENTAR DE NUEVO
                </button>
            </div>
        </div>
    )

    if (preguntas.length === 0) return (
        <div className={styles.page}>
            <p style={{ color: '#ff4444', fontFamily: 'monospace' }}>No hay elementos para generar el quiz.</p>
        </div>
    )

    const pregunta = preguntas[actual]
    const esCorrecto = respondida && seleccionada === pregunta.correcta
    const esIncorrecto = respondida && seleccionada !== pregunta.correcta
    const progreso = (actual / preguntas.length) * 100

    return (
        <div className={styles.page}>
            <div className={styles.quizCard}>
                <div className={styles.header}>
                    <span className={styles.progressLabel}>
                        {actual + 1} / {preguntas.length}
                    </span>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progreso}%` }} />
                    </div>
                </div>

                <p className={styles.preguntaTexto}>{pregunta.texto}</p>

                <div className={styles.opciones}>
                    {pregunta.opciones.map((op, i) => (
                        <button
                            key={i}
                            className={getClaseOpcion(op)}
                            onClick={() => handleSeleccionar(op)}
                        >
                            {op}
                        </button>
                    ))}
                </div>

                <div className={styles.feedback}>
                    {esCorrecto && <span className={styles.feedbackCorrecto}>✓ ¡CORRECTO!</span>}
                    {esIncorrecto && <span className={styles.feedbackIncorrecto}>✗ INCORRECTO — Era: {pregunta.correcta}</span>}
                </div>

                <button
                    className={styles.nextButton}
                    onClick={handleSiguiente}
                    disabled={!respondida}
                >
                    {actual + 1 === preguntas.length ? 'VER RESULTADO' : 'SIGUIENTE →'}
                </button>
            </div>
        </div>
    )
}

export default Quiz