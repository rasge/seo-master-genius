export default function Stats() {
  const stats = [
    { name: "Clientes facturando más", value: "500+" },
    { name: "Visitas orgánicas puras", value: "10M+" },
    { name: "Años de obsesión midiendo datos", value: "12" },
  ];

  return (
    <div className="bg-brand py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-white/90">{stat.name}</dt>
              <dd className="order-first text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
