import { useState, useEffect } from 'react'
import { getElementos, createElement, updateElemento, deleteElemento } from '../services/elementService'

function Admin() {
    const [elementos, setElementos] = useState([])
    const [error, setError] = useState('')
    const [editando, setEditando] = useState<any>(null)

    const [form, setForm] = useState({
        NOMBRE: '', SIMBOLO: '', NUMERO_ATOMICO: '',
        MASA_ATOMICA: '', GRUPO: '', PERIODO: '', CATEGORIA: ''
    })

    useEffect(() => {
        cargarElementos()
    }, [])

    const cargarElementos = async () => {
        try {
            const data = await getElementos()
            setElementos(data)
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (editando) {
                await updateElemento(editando.ID, form)
                setEditando(null)
            } else {
                await createElement(form)
            }
            setForm({ NOMBRE: '', SIMBOLO: '', NUMERO_ATOMICO: '', MASA_ATOMICA: '', GRUPO: '', PERIODO: '', CATEGORIA: '' })
            cargarElementos()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleEditar = (el: any) => {
        setEditando(el)
        setForm({
            NOMBRE: el.NOMBRE, SIMBOLO: el.SIMBOLO,
            NUMERO_ATOMICO: el.NUMERO_ATOMICO, MASA_ATOMICA: el.MASA_ATOMICA,
            GRUPO: el.GRUPO, PERIODO: el.PERIODO, CATEGORIA: el.CATEGORIA
        })
    }

    const handleBorrar = async (id: number) => {
        try {
            await deleteElemento(id)
            cargarElementos()
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>Admin - Elementos</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h2>{editando ? 'Editar elemento' : 'Nuevo elemento'}</h2>
            <form onSubmit={handleSubmit}>
                <input name="NOMBRE" placeholder="Nombre" value={form.NOMBRE} onChange={handleChange} />
                <input name="SIMBOLO" placeholder="Símbolo" value={form.SIMBOLO} onChange={handleChange} />
                <input name="NUMERO_ATOMICO" placeholder="Número atómico" value={form.NUMERO_ATOMICO} onChange={handleChange} />
                <input name="MASA_ATOMICA" placeholder="Masa atómica" value={form.MASA_ATOMICA} onChange={handleChange} />
                <input name="GRUPO" placeholder="Grupo" value={form.GRUPO} onChange={handleChange} />
                <input name="PERIODO" placeholder="Período" value={form.PERIODO} onChange={handleChange} />
                <input name="CATEGORIA" placeholder="Categoría" value={form.CATEGORIA} onChange={handleChange} />
                <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
                {editando && <button type="button" onClick={() => setEditando(null)}>Cancelar</button>}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th><th>Símbolo</th><th>Nº Atómico</th>
                        <th>Masa</th><th>Grupo</th><th>Período</th><th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {elementos.map((el: any) => (
                        <tr key={el.ID}>
                            <td>{el.NOMBRE}</td>
                            <td>{el.SIMBOLO}</td>
                            <td>{el.NUMERO_ATOMICO}</td>
                            <td>{el.MASA_ATOMICA}</td>
                            <td>{el.GRUPO}</td>
                            <td>{el.PERIODO}</td>
                            <td>{el.CATEGORIA}</td>
                            <td>
                                <button onClick={() => handleEditar(el)}>Editar</button>
                                <button onClick={() => handleBorrar(el.ID)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Admin