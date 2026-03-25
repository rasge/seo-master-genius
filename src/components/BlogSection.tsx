export default function BlogSection() {
  const posts = [
    {
      title: "La Guía Definitiva de SEO on-page para 2026",
      href: "#",
      description: "Descubre exactamente qué funciona hoy en día para posicionar tus landings sin backlinks oscuros.",
      date: "Marzo 2026",
    },
    {
      title: "5 Fórmulas de Copywriting que Multiplican las Ventas",
      href: "#",
      description: "Por qué tus textos no venden y cómo solucionarlo en 10 minutos con estas fórmulas probadas.",
      date: "Febrero 2026",
    },
    {
      title: "Automatiza tu Lead Gen en LinkedIn",
      href: "#",
      description: "El funnel exacto que usamos en Libertad PRO Digital para agendar 30+ llamadas al mes en B2B.",
      date: "Enero 2026",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Aprende Gratis en nuestro Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-slate-600">
            Tácticas y estrategias no-bullshit para crecer hoy.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="flex flex-col items-start justify-between bg-slate-50 border p-6 rounded-2xl hover:shadow-lg transition">
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-slate-500">
                  {post.date}
                </time>
                <span className="relative z-10 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200">
                  Marketing
                </span>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-brand">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
