import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      body: "En 5 meses pasamos de 800 a 3.200 visitas orgánicas mensuales. El equipo de Libertad PRO Digital encontró 14 keywords de alto valor que nuestra competencia ignoraba.",
      author: {
        name: "María Fernández",
        handle: "CEO · SaaS Growth",
        industry: "Industria: Software B2B",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      body: "Reescribieron nuestra página de producto y la conversión pasó del 1.8% al 6.4% en 3 semanas. Eso son $18.000 USD extra al mes sin aumentar el tráfico.",
      author: {
        name: "Carlos Rodríguez",
        handle: "Founder · TiendaRapida.com",
        industry: "Industria: E-commerce",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      body: "Redujimos el CPL de nuestras campañas un 43% combinando su copy con nuestra segmentación. Ahora generamos 120 leads calificados por semana.",
      author: {
        name: "Elena Gómez",
        handle: "Directora de Performance · AgenciaAds",
        industry: "Industria: Marketing",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
  ];

  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-brand">
            Testimonios Reales
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            No nos creas a nosotros. Créeles a ellos.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <figure key={idx} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <blockquote className="text-gray-900 h-24">
                  <p>{`"${testimonial.body}"`}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <Image
                    className="h-10 w-10 border border-slate-200 rounded-full bg-slate-50 object-cover"
                    src={testimonial.author.imageUrl}
                    alt={testimonial.author.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.author.name}</div>
                    <div className="text-slate-600 text-xs">{testimonial.author.handle}</div>
                    {/* @ts-ignore - industry exists in data but not yet in interfaces if any */}
                    <div className="text-brand font-medium text-[10px] uppercase tracking-wider mt-0.5">{testimonial.author.industry}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
