export default function CTASection() {
  return (
    <div id="contacto" className="bg-slate-900">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tus competidores están robando tus clientes.
            <br />
            Vamos a detenerlos hoy mismo.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Agenda tu sesión de consultoría gratis con el equipo de Libertd PRO Digital. En 30 minutos te daremos el plan exacto para dominar tu nicho.
          </p>

          <form action="#" className="mt-10 mx-auto max-w-md w-full space-y-4 text-left">
            <div>
              <label htmlFor="name" className="sr-only">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full min-w-0 rounded-md border-0 bg-white/10 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6 placeholder:text-slate-400"
                placeholder="Tu Nombre"
              />
            </div>
             <div>
              <label htmlFor="email" className="sr-only">Tu Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full min-w-0 rounded-md border-0 bg-white/10 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand sm:text-sm sm:leading-6 placeholder:text-slate-400"
                placeholder="tu@empresa.com"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand px-4 py-4 text-lg font-semibold text-white shadow-sm hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition"
            >
              AGENDAR CONSULTORIA (100% GRATIS)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
