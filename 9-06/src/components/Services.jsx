// ============================================================
//  🛠️ COMPONENTE PARA COMPLETAR — TAREA ESTUDIANTE
//  Services.jsx
//
//  INSTRUCCIONES:
//  1. Define el array "servicios" con al menos 6 servicios.
//     Cada objeto debe tener: icono, titulo, descripcion.
//  2. Completa el JSX usando tarjetas Bootstrap (card).
//  3. Usa .map() para renderizar — NO copies el HTML 6 veces.
//
//  PISTAS:
//  - Usa <div className="row g-4"> para el grid
//  - Cada tarjeta va en <div className="col-md-6 col-lg-4">
//  - Clases Bootstrap útiles: card, card-body, card-title, card-text
// ============================================================

// 🛠️ PASO 1: Define aquí tu array de servicios
const servicios = [
  {
    icono: "⚡",
    titulo: "Instalaciones Eléctricas",
    descripcion: "Realizamos instalaciones eléctricas seguras para hogares, oficinas e industrias."
  },
  {
    icono: "🔧",
    titulo: "Mantenimiento Preventivo",
    descripcion: "Inspección y mantenimiento de sistemas eléctricos para evitar fallas y accidentes."
  },
  {
    icono: "💡",
    titulo: "Iluminación LED",
    descripcion: "Diseño e instalación de sistemas de iluminación LED eficientes y de bajo consumo."
  },
  {
    icono: "🏭",
    titulo: "Servicios Industriales",
    descripcion: "Montaje y adecuación de redes eléctricas para plantas y procesos industriales."
  },
  {
    icono: "🔋",
    titulo: "Energía Solar",
    descripcion: "Instalación de paneles solares para reducir costos energéticos y cuidar el medio ambiente."
  },
  {
    icono: "🚨",
    titulo: "Atención de Emergencias",
    descripcion: "Soporte técnico 24/7 para solucionar fallas eléctricas de manera rápida y segura."
  }
];

function Services() {
  return (
    <section id="servicios" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo">Nuestros Servicios</h2>
          <p className="section-subtitulo text-muted">
            Ofrecemos soluciones eléctricas completas y confiables para hogares, empresas e industrias.
          </p>
        </div>

        {/* 🛠️ PASO 2: Renderiza las tarjetas con servicios.map(...) */}
        <div className="row g-4">
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="display-5 mb-3">{servicio.icono}</div>
                  <h5 className="card-title">{servicio.titulo}</h5>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;