

const steps = [
  {
    name: "Auditoría Profunda",
    description: "Analizamos tus datos, tu competencia y tu mercado para encontrar las grietas por donde se escapa el dinero.",
  },
  {
    name: "Estrategia a Medida",
    description: "No usamos plantillas. Creamos un plan de ataque quirúrgico diseñado para tus objetivos específicos.",
  },
  {
    name: "Ejecución Letal",
    description: "Implementamos SEO, Copy y Funnels con una sola obsesión: el Retorno de Inversión (ROI).",
  },
  {
    name: "Optimización Continua",
    description: "Medimos, iteramos y escalamos. El marketing no es una foto, es un vídeo en constante evolución.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-30"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:gap-x-16">
          <div className="lg:max-w-xl">
            <h2 className="text-brand font-bold tracking-wider uppercase text-sm">Nuestro Método</h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Cómo escalamos tu facturación en <span className="text-brand">4 pasos simples.</span>
            </p>
            <p className="mt-6 text-lg text-slate-400">
              Olvídate de procesos complejos. Somos directos, transparentes y nos enfocamos en lo que importa: tus resultados.
            </p>
            
            <div className="mt-10 space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-bold group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-brand transition-colors">{step.name}</h3>
                    <p className="mt-1 text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:flex-1 relative">
            <div className="aspect-[4/5] rounded-2xl bg-slate-800 border border-slate-700 p-8 shadow-2xl relative z-10 overflow-hidden">
               <div className="space-y-6">
                  <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse"></div>
                  <div className="grid grid-cols-3 gap-4">
                     <div className="h-20 bg-brand/20 rounded border border-brand/30"></div>
                     <div className="h-20 bg-slate-700 rounded"></div>
                     <div className="h-20 bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-4 w-1/2 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-32 bg-slate-900/50 rounded border border-slate-700 flex items-center justify-center">
                     <span className="text-brand font-mono text-4xl font-bold animate-pulse">+342% ROI</span>
                  </div>
                  <div className="space-y-3">
                     <div className="h-2 w-full bg-slate-700 rounded"></div>
                     <div className="h-2 w-full bg-slate-700 rounded"></div>
                     <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
                  </div>
               </div>
               
               {/* Decorators */}
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand opacity-20 blur-2xl"></div>
            </div>
            {/* Background geometric shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-slate-800 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-slate-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
