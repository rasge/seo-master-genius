import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Glass Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 glass border-b border-slate-200/50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex shrink-0 items-center">
              <span className="text-2xl font-black tracking-tighter text-slate-900 group cursor-pointer">
                Libertd<span className="text-brand group-hover:text-brand-light transition-colors">PRO</span>
                <span className="ml-1 inline-block w-1.5 h-1.5 bg-brand rounded-full"></span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-sm font-bold text-slate-600 hover:text-brand transition">Servicios</a>
              <a href="#proceso" className="text-sm font-bold text-slate-600 hover:text-brand transition">Método</a>
              <a href="#casos" className="text-sm font-bold text-slate-600 hover:text-brand transition">Casos</a>
              <a href="#contacto" className="inline-flex items-center justify-center rounded-sm bg-brand px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-brand-light transition">
                Consultoría Gratis
              </a>
            </div>
            
            <div className="md:hidden">
              <button className="p-2 text-slate-600" id="mobile-menu-toggle">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secciones de la Landing */}
      <Hero />
      <ClientLogos />
      <section id="servicios">
        <Services />
      </section>
      <Stats />
      <Process />
      <Testimonials />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  );
}
