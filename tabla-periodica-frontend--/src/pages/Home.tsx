import { useEffect, useState } from 'react'

function Home() {
    const [elementos, setElementos] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchElementos = async () => {
            try {
                const response = await fetch('http://localhost:8080/elements')
                const data = await response.json()
                if (!response.ok) throw new Error(data.message)
                setElementos(data)
            } catch (err: any) {
                setError(err.message)
            }
        }
        fetchElementos()
    }, [])

    return (
        <div>
            <h1>Tabla Periódica</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Símbolo</th>
                        <th>Número Atómico</th>
                    </tr>
                </thead>
                <tbody>
                    {elementos.map((el: any) => (
                        <tr key={el.NUMERO_ATOMICO}>
                            <td>{el.NOMBRE}</td>
                            <td>{el.SIMBOLO}</td>
                            <td>{el.NUMERO_ATOMICO}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home