export default function ClientLogos() {
  const logos = [
    { name: "Forbes", width: 104, height: 48 },
    { name: "TechCrunch", width: 140, height: 48 },
    { name: "Wired", width: 120, height: 48 },
    { name: "Entrepreneur", width: 158, height: 48 },
    { name: "Inc.", width: 80, height: 48 },
  ];

  return (
    <div className="bg-white py-16 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-12">
          Como se ha visto en:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 opacity-80">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
               <span style={{ 
                 fontWeight: 700, 
                 color: '#9CA3AF', 
                 fontSize: '22px', 
                 letterSpacing: '0.15em',
                 fontFamily: 'serif' 
               }} className="select-none hover:text-slate-600 transition-colors cursor-default">
                 {logo.name.toUpperCase()}
               </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
