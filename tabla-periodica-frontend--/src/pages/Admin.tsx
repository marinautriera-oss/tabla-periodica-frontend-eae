import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getElementos, createElement, updateElemento, deleteElemento } from '../services/elementService'
import { isAdmin } from '../utils/auth'

function Admin() {
    const navigate = useNavigate()
    const [elementos, setElementos] = useState([])
    const [error, setError] = useState('')
    const [editando, setEditando] = useState<any>(null)

    const [form, setForm] = useState({
        NOMBRE: '', SIMBOLO: '', NUMERO_ATOMICO: '',
        MASA_ATOMICA: '', GRUPO: '', PERIODO: '', CATEGORIA: '',
        FOTO_URL: '', DESCRIPCION: ''
    })

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login')
        } else {
            cargarElementos()
        }
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
        setError('')
        try {
            if (editando) {
                await updateElemento(editando.ID || editando.id, form)
                setEditando(null)
            } else {
                await createElement(form)
            }
            setForm({ NOMBRE: '', SIMBOLO: '', NUMERO_ATOMICO: '', MASA_ATOMICA: '', GRUPO: '', PERIODO: '', CATEGORIA: '', FOTO_URL: '', DESCRIPCION: '' })
            cargarElementos()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleEditar = (el: any) => {
        setEditando(el)
        setForm({
            NOMBRE: el.NOMBRE || el.nombre || '',
            SIMBOLO: el.SIMBOLO || el.simbolo || '',
            NUMERO_ATOMICO: el.NUMERO_ATOMICO || el.numero_atomico || '',
            MASA_ATOMICA: el.MASA_ATOMICA || el.masa_atomica || '',
            GRUPO: el.GRUPO || el.grupo || '',
            PERIODO: el.PERIODO || el.periodo || '',
            CATEGORIA: el.CATEGORIA || el.categoria || '',
            FOTO_URL: el.FOTO_URL || el.foto_url || '',
            DESCRIPCION: el.DESCRIPCION || el.descripcion || ''
        })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleBorrar = async (id: number) => {
        if (!confirm('¿Seguro que querés borrar este elemento?')) return
        try {
            await deleteElemento(id)
            cargarElementos()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleCancelar = () => {
        setEditando(null)
        setForm({ NOMBRE: '', SIMBOLO: '', NUMERO_ATOMICO: '', MASA_ATOMICA: '', GRUPO: '', PERIODO: '', CATEGORIA: '', FOTO_URL: '', DESCRIPCION: '' })
    }

    const inputStyle = {
        backgroundColor: '#111',
        border: '1px solid #3b9eff44',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#fff',
        fontSize: '13px',
        fontFamily: 'monospace',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box' as const,
    }

    return (
        <div style={{
            backgroundColor: '#000',
            minHeight: '100vh',
            fontFamily: 'monospace',
            padding: '32px 24px',
            color: '#fff'
        }}>
            <h1 style={{ color: '#3b9eff', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '32px' }}>
                ⚙️ Panel Admin — Elementos
            </h1>

            {error && (
                <p style={{
                    color: '#ff4444', backgroundColor: '#ff444411',
                    border: '1px solid #ff4444', borderRadius: '8px',
                    padding: '12px 16px', marginBottom: '24px'
                }}>
                    {error}
                </p>
            )}

            {/* Formulario */}
            <div style={{
                backgroundColor: '#0b0e14',
                border: '1px solid #3b9eff44',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '40px'
            }}>
                <h2 style={{ color: editando ? '#00f5a0' : '#3b9eff', marginBottom: '20px', fontSize: '14px', letterSpacing: '3px' }}>
                    {editando ? '✏️ EDITAR ELEMENTO' : '➕ NUEVO ELEMENTO'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                        {[
                            { name: 'NOMBRE', placeholder: 'Nombre', required: true },
                            { name: 'SIMBOLO', placeholder: 'Símbolo', required: true },
                            { name: 'NUMERO_ATOMICO', placeholder: 'Número atómico', required: true },
                            { name: 'MASA_ATOMICA', placeholder: 'Masa atómica', required: true },
                            { name: 'GRUPO', placeholder: 'Grupo', required: true },
                            { name: 'PERIODO', placeholder: 'Período', required: true },
                            { name: 'CATEGORIA', placeholder: 'Categoría', required: true },
                        ].map(field => (
                            <input
                                key={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={(form as any)[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                style={inputStyle}
                            />
                        ))}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <input
                            name="FOTO_URL"
                            placeholder="URL de imagen (opcional)"
                            value={form.FOTO_URL}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <textarea
                            name="DESCRIPCION"
                            placeholder="Descripción / dato curioso (opcional)"
                            value={form.DESCRIPCION}
                            onChange={handleChange}
                            rows={3}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="submit" style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${editando ? '#00f5a0' : '#3b9eff'}`,
                            borderRadius: '8px', padding: '10px 24px',
                            color: editando ? '#00f5a0' : '#3b9eff',
                            fontSize: '13px', fontWeight: 'bold',
                            letterSpacing: '2px', cursor: 'pointer', fontFamily: 'monospace',
                        }}>
                            {editando ? 'ACTUALIZAR' : 'CREAR'}
                        </button>
                        {editando && (
                            <button type="button" onClick={handleCancelar} style={{
                                backgroundColor: 'transparent', border: '1px solid #555',
                                borderRadius: '8px', padding: '10px 24px', color: '#888',
                                fontSize: '13px', cursor: 'pointer', fontFamily: 'monospace',
                            }}>
                                CANCELAR
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Tabla */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #3b9eff44' }}>
                            {['Nombre', 'Símbolo', 'Nº Atómico', 'Masa', 'Grupo', 'Período', 'Categoría', 'Imagen', 'Acciones'].map(h => (
                                <th key={h} style={{
                                    padding: '12px 16px', textAlign: 'left',
                                    color: '#3b9eff', letterSpacing: '2px',
                                    fontSize: '11px', fontWeight: 'normal',
                                }}>
                                    {h.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {elementos.map((el: any) => (
                            <tr key={el.ID || el.id}
                                style={{ borderBottom: '1px solid #ffffff11' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0b0e14')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td style={{ padding: '12px 16px', color: '#fff' }}>{el.NOMBRE || el.nombre}</td>
                                <td style={{ padding: '12px 16px', color: '#3b9eff', fontWeight: 'bold' }}>{el.SIMBOLO || el.simbolo}</td>
                                <td style={{ padding: '12px 16px', color: '#aaa' }}>{el.NUMERO_ATOMICO || el.numero_atomico}</td>
                                <td style={{ padding: '12px 16px', color: '#aaa' }}>{el.MASA_ATOMICA || el.masa_atomica}</td>
                                <td style={{ padding: '12px 16px', color: '#aaa' }}>{el.GRUPO || el.grupo}</td>
                                <td style={{ padding: '12px 16px', color: '#aaa' }}>{el.PERIODO || el.periodo}</td>
                                <td style={{ padding: '12px 16px', color: '#aaa' }}>{el.CATEGORIA || el.categoria}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    {(el.FOTO_URL || el.foto_url) ? (
                                        <img src={el.FOTO_URL || el.foto_url} alt={el.NOMBRE} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} />
                                    ) : (
                                        <span style={{ color: '#444', fontSize: '11px' }}>—</span>
                                    )}
                                </td>
                                <td style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
                                    <button onClick={() => handleEditar(el)} style={{
                                        backgroundColor: 'transparent', border: '1px solid #00f5a0',
                                        borderRadius: '6px', padding: '6px 12px', color: '#00f5a0',
                                        fontSize: '11px', cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '1px',
                                    }}>EDITAR</button>
                                    <button onClick={() => handleBorrar(el.ID || el.id)} style={{
                                        backgroundColor: 'transparent', border: '1px solid #ff4444',
                                        borderRadius: '6px', padding: '6px 12px', color: '#ff4444',
                                        fontSize: '11px', cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '1px',
                                    }}>BORRAR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {elementos.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#555', padding: '40px', letterSpacing: '2px' }}>
                        No hay elementos cargados
                    </p>
                )}
            </div>
        </div>
    )
}

export default Admin