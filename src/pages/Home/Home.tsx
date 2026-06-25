import React, { useEffect, useRef } from 'react';
import { Compass, UtensilsCrossed, MessageCircle, GlassWater, MapPin } from 'lucide-react';
import { images } from '../../config/images';


interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Import GSAP context for safe animations
    import('gsap').then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.hero-content > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.25, ease: 'power3.out' }
        );
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navCards = [
    { id: 'atracciones', label: 'ATRACCIONES', desc: 'Aventura de Montaña', icon: <Compass className="w-6 h-6 text-secondary" /> },
    { id: 'menu', label: 'COCINA', desc: 'Sabor a la Leña', icon: <UtensilsCrossed className="w-6 h-6 text-secondary" /> },
    { id: 'barra', label: 'LA BARRA', desc: 'Mixología de Autor', icon: <GlassWater className="w-6 h-6 text-secondary" /> },
    { id: 'ubicacion', label: 'UBICACIÓN', desc: 'Guía de Acceso', icon: <MapPin className="w-6 h-6 text-secondary" /> },
  ];

  return (
    <div ref={containerRef} className="w-full">
      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={images.entradaPrincipal}
            alt="Rancho Viejo entrada bosque"
            className="w-full h-full object-cover scale-105 opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/60 via-[#060906]/85 to-[#060906]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.04)_0%,transparent_75%)]"></div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-gutter flex flex-col items-center mt-20 hero-content max-w-4xl mx-auto">
          <span className="font-accent text-[10px] md:text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-4 opacity-90">
            REFUGIO DE MONTAÑA Y HERENCIA
          </span>
          <h1 className="fluid-h1 font-display text-on-background font-extrabold mb-6 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            La Marquesa
          </h1>
          <p className="font-display text-lg md:text-2xl text-secondary italic mb-12 font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            Valle de Rancho Viejo
          </p>
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center justify-center bg-secondary text-background font-accent text-[11px] font-bold tracking-widest px-10 py-5 rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-secondary/15"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            RESERVAR EXPERIENCIA
          </a>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-10 pointer-events-none">
          <span className="font-accent text-[9px] font-bold tracking-[0.25em] text-secondary uppercase">Explorar Valle</span>
          <div className="scroll-cue-line"></div>
        </div>
      </header>

      {/* Welcome Strip */}
      <section className="bg-surface/90 border-y border-white/5 py-section-padding px-gutter relative z-20 welcome-strip">
        <div className="max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-16 strip-content">
          <div className="w-full md:w-1/2">
            <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest block mb-2">
              LUJO RÚSTICO Y TRADICIÓN
            </span>
            <h2 className="fluid-h2 font-display text-secondary mb-6 font-bold tracking-wide">
              Aire de Montaña y Gastronomía
            </h2>
            <div className="w-16 h-[1.5px] bg-secondary mb-8"></div>
            <p className="font-body text-base md:text-lg text-on-surface-variant/90 leading-relaxed mb-8">
              Ubicado en el corazón del Valle de Rancho Viejo, La Marquesa ofrece un refugio rústico de lujo donde la naturaleza virgen se encuentra con la gastronomía de herencia. Respira el aire puro del bosque, explora senderos ocultos y disfruta de sabores auténticos forjados en leña y tradición familiar.
            </p>

            {/* Experience Highlights / Stats Row */}
            <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
              <div className="flex flex-col">
                <span className="font-display text-2xl text-secondary font-bold">2,700m</span>
                <span className="font-accent text-[9px] text-on-surface-variant/70 uppercase tracking-widest mt-1">Altitud del Valle</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-secondary font-bold">100% Rústico</span>
                <span className="font-accent text-[9px] text-on-surface-variant/70 uppercase tracking-widest mt-1">Materiales Nobles</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Cards */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {navCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleLinkClick(card.id)}
                className="glass-card flex flex-col items-center p-8 rounded-2xl text-center group cursor-pointer relative border border-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50"
              >
                <div className="p-4 rounded-full bg-secondary/5 border border-secondary/15 mb-5 group-hover:bg-secondary/15 group-hover:scale-105 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="font-accent text-xs font-bold text-on-background tracking-widest uppercase mb-1">{card.label}</h3>
                <p className="text-[11px] text-on-surface-variant/70 italic">{card.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
