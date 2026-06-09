import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias por contactarnos, ${formData.nombre}! Pronto nos comunicaremos contigo.`);
  };

  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo text-white">Contáctenos</h2>
          <p className="text-light opacity-75">
            ¿Necesita una instalación eléctrica, mantenimiento o una solución
            energética para su hogar o empresa? Nuestro equipo está listo para
            asesorarlo y brindarle un servicio seguro y profesional.
          </p>
        </div>

        <div className="row g-5">

          {/* Columna izquierda: información de contacto */}
          <div className="col-lg-4">
            <h4 className="mb-4">Información de contacto</h4>

            <ul className="list-unstyled">
              <li className="mb-3">
                📍 Carrera 45 #52-30, Medellín, Colombia
              </li>

              <li className="mb-3">
                📞 +57 300 123 4567
              </li>

              <li className="mb-3">
                📧 contacto@volttec.com
              </li>

              <li className="mb-3">
                🕐 Lunes a Viernes: 8:00 a.m. - 6:00 p.m.
              </li>
            </ul>
          </div>

          {/* Columna derecha: formulario */}
          <div className="col-lg-8">
            <div className="bg-white text-dark rounded-3 p-4">

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  {/* Campo: Nombre */}
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Campo: Email */}
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Campo: Teléfono */}
                  <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      className="form-control"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Campo: Tipo de servicio */}
                  <div className="col-md-6">
                    <label htmlFor="servicio" className="form-label">
                      Tipo de servicio
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      className="form-select"
                      value={formData.servicio}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione un servicio</option>
                      <option value="instalaciones">
                        Instalaciones eléctricas
                      </option>
                      <option value="mantenimiento">
                        Mantenimiento eléctrico
                      </option>
                      <option value="iluminacion">
                        Iluminación LED
                      </option>
                      <option value="solar">
                        Energía solar
                      </option>
                      <option value="industrial">
                        Servicios industriales
                      </option>
                      <option value="emergencias">
                        Atención de emergencias
                      </option>
                    </select>
                  </div>

                  {/* Campo: Mensaje */}
                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows="5"
                      className="form-control"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escriba aquí su consulta..."
                      required
                    ></textarea>
                  </div>

                  {/* Botón enviar */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-warning px-4"
                    >
                      Enviar solicitud
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;