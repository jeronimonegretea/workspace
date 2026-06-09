// 🛠️ PASO 1: Define tu array de razones
const razones = [
  {
    icono: "⚡",
    titulo: "Personal Certificado",
    descripcion: "Contamos con técnicos e ingenieros capacitados para garantizar instalaciones seguras y eficientes."
  },
  {
    icono: "🔧",
    titulo: "Servicio de Calidad",
    descripcion: "Realizamos mantenimiento preventivo y correctivo con altos estándares de calidad."
  },
  {
    icono: "🚨",
    titulo: "Atención de Emergencias",
    descripcion: "Brindamos soporte rápido para solucionar fallas eléctricas en hogares y empresas."
  },
  {
    icono: "🌱",
    titulo: "Energía Sostenible",
    descripcion: "Impulsamos soluciones de energía solar y tecnologías que cuidan el medio ambiente."
  }
];

function WhyUs() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">

          {/* Columna izquierda: imagen */}
          <div className="col-lg-5">
            <img
              src="https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec"
              alt="VoltTec Empresa Eléctrica"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Columna derecha: texto y razones */}
          <div className="col-lg-7">
            <h2 className="section-titulo mb-3">¿Por qué elegirnos?</h2>

            <p className="text-muted">
              En VoltTec somos una empresa especializada en soluciones
              eléctricas para hogares, comercios e industrias. Nuestro
              compromiso es ofrecer servicios seguros, eficientes y adaptados
              a las necesidades de cada cliente.
            </p>

            <p className="text-muted mb-4">
              Gracias a nuestra experiencia y al uso de tecnología moderna,
              garantizamos instalaciones confiables, mantenimiento profesional
              y proyectos de energía sostenible que contribuyen al desarrollo
              de nuestros clientes y al cuidado del medio ambiente.
            </p>

            {/* PASO 2: Renderiza las razones con .map() */}
            <ul className="list-unstyled">
              {razones.map((razon, index) => (
                <li key={index} className="mb-3">
                  <h5>
                    {razon.icono} {razon.titulo}
                  </h5>
                  <p className="text-muted mb-0">
                    {razon.descripcion}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyUs;