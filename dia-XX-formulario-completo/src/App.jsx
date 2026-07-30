import { useEffect, useState } from 'react'
import './App.css'

const initialForm = {
  nombre: '',
  correo: '',
  password: '',
  edad: '',
  fechaNacimiento: '',
  experiencia: '5',
  terminos: false,
  lenguajes: [],
  modalidad: 'presencial',
  pais: 'Argentina',
  comentarios: '',
  foto: null,
  color: '#4f46e5',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [submittedData, setSubmittedData] = useState(null)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target

    if (type === 'checkbox' && name === 'lenguajes') {
      const lenguaje = value
      setForm((prev) => ({
        ...prev,
        lenguajes: prev.lenguajes.includes(lenguaje)
          ? prev.lenguajes.filter((item) => item !== lenguaje)
          : [...prev.lenguajes, lenguaje],
      }))
      return
    }

    if (name === 'foto' && files && files[0]) {
      const file = files[0]
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(newPreviewUrl)
      setForm((prev) => ({ ...prev, foto: file }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(form.correo)) {
      setError('El correo debe tener un formato válido.')
      return
    }

    if (Number(form.edad) <= 0) {
      setError('La edad debe ser mayor a 0.')
      return
    }

    setError('')
    setSubmittedData({ ...form, fotoName: form.foto?.name || 'Sin foto' })
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Registro de estudiante</h1>
        <p className="subtitle">Completa todos los campos para crear tu perfil.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            <span>Nombre</span>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>

          <label>
            <span>Correo electrónico</span>
            <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
          </label>

          <label>
            <span>Contraseña</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          <label>
            <span>Edad</span>
            <input type="number" name="edad" value={form.edad} onChange={handleChange} min="1" required />
          </label>

          <label>
            <span>Fecha de nacimiento</span>
            <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
          </label>

          <label>
            <span>Nivel de experiencia: {form.experiencia}</span>
            <input type="range" name="experiencia" min="1" max="10" value={form.experiencia} onChange={handleChange} />
          </label>

          <label className="checkbox-row">
            <input type="checkbox" name="terminos" checked={form.terminos} onChange={handleChange} />
            <span>Acepto los términos y condiciones</span>
          </label>

          <fieldset>
            <legend>Lenguajes que conoce</legend>
            <div className="checkbox-group">
              {['JavaScript', 'Python', 'Java', 'C#'].map((lenguaje) => (
                <label key={lenguaje}>
                  <input
                    type="checkbox"
                    name="lenguajes"
                    value={lenguaje}
                    checked={form.lenguajes.includes(lenguaje)}
                    onChange={handleChange}
                  />
                  <span>{lenguaje}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Modalidad</legend>
            <div className="radio-group">
              <label>
                <input type="radio" name="modalidad" value="presencial" checked={form.modalidad === 'presencial'} onChange={handleChange} />
                <span>Presencial</span>
              </label>
              <label>
                <input type="radio" name="modalidad" value="virtual" checked={form.modalidad === 'virtual'} onChange={handleChange} />
                <span>Virtual</span>
              </label>
            </div>
          </fieldset>

          <label>
            <span>País</span>
            <select name="pais" value={form.pais} onChange={handleChange}>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="México">México</option>
              <option value="España">España</option>
            </select>
          </label>

          <label>
            <span>Comentarios</span>
            <textarea name="comentarios" rows="4" value={form.comentarios} onChange={handleChange} />
          </label>

          <label>
            <span>Foto de perfil</span>
            <input type="file" name="foto" accept="image/*" onChange={handleChange} />
          </label>

          <label>
            <span>Color favorito</span>
            <input type="color" name="color" value={form.color} onChange={handleChange} />
          </label>

          <button type="submit" disabled={!form.terminos}>
            Enviar registro
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {submittedData && (
          <section className="summary">
            <h2>Resumen del registro</h2>
            <ul>
              <li><strong>Nombre:</strong> {submittedData.nombre}</li>
              <li><strong>Correo:</strong> {submittedData.correo}</li>
              <li><strong>Edad:</strong> {submittedData.edad}</li>
              <li><strong>Fecha de nacimiento:</strong> {submittedData.fechaNacimiento}</li>
              <li><strong>Experiencia:</strong> {submittedData.experiencia}</li>
              <li><strong>Modalidad:</strong> {submittedData.modalidad}</li>
              <li><strong>País:</strong> {submittedData.pais}</li>
              <li><strong>Lenguajes:</strong> {submittedData.lenguajes.join(', ') || 'Ninguno'}</li>
              <li><strong>Comentarios:</strong> {submittedData.comentarios || 'Sin comentarios'}</li>
              <li><strong>Foto:</strong> {submittedData.fotoName}</li>
              <li><strong>Color favorito:</strong> {submittedData.color}</li>
            </ul>
            {previewUrl && <img src={previewUrl} alt="Vista previa de perfil" className="preview" />}
          </section>
        )}
      </section>
    </main>
  )
}

export default App
