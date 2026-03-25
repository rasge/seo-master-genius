import { Search, PenTool, BarChart3 } from "lucide-react";

const services = [
  {
    title: "SEO Técnico y de Contenidos",
    description:
      "Aparece primero en Google. Optimizamos tu arquitectura y creamos contenido que tu audiencia realmente busca y lee.",
    icon: Search,
  },
  {
    title: "Copywriting de Conversión",
    description:
      "Palabras que venden. Desde páginas de ventas hasta emails que facturan mientras duermes.",
    icon: PenTool,
  },
  {
    title: "Analítica y Crecimiento",
    description:
      "Deja de adivinar qué funciona. Instalamos métricas accionables para escalar agresivamente.",
    icon: BarChart3,
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Tus servicios no se venden solos... ¿O sí?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Nuestro equipo se encarga de posicionarte como autoridad y traccionar audiencias cualificadas en piloto automático.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                <service.icon className="w-32 h-32 text-brand" />
              </div>
              
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-lg flex items-center justify-center mb-6 relative z-10">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                {service.title}
              </h3>
              <p className="text-slate-600 relative z-10">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
