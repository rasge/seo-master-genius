export default function ClientLogos() {
  const logos = [
    { name: "Forbes", width: 104, height: 48 },
    { name: "TechCrunch", width: 140, height: 48 },
    { name: "Wired", width: 120, height: 48 },
    { name: "Entrepreneur", width: 158, height: 48 },
    { name: "Inc.", width: 80, height: 48 },
  ];

  return (
    <div className="bg-white py-12 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8">
          Confían en nosotros compañías e institutos top (Placeholder)
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-opacity duration-300">
          {logos.map((logo) => (
            <div key={logo.name} className="flex h-12 w-32 bg-slate-200 rounded animate-pulse items-center justify-center">
               <span className="text-xs text-slate-500 font-bold">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
