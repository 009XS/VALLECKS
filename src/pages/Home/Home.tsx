import React, { useEffect, useRef } from 'react';
import { Compass, UtensilsCrossed, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP intro animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.25, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.strip-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.welcome-strip',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="w-full">
      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dark subtle radial gradient for title readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#070c08]/20 to-background z-0"></div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-gutter flex flex-col items-center mt-20 hero-content">
          <span className="font-accent text-[10px] md:text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-4 opacity-90">
            REFUGIO DE MONTAÑA Y HERENCIA
          </span>
          <h1 className="fluid-h1 font-display text-on-background font-extrabold mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] tracking-tight">
            La Marquesa
          </h1>
          <p className="font-display text-lg md:text-2xl text-secondary italic mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-medium">
            Valle de Rancho Viejo
          </p>
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center justify-center bg-secondary text-background font-accent text-xs font-bold tracking-widest px-10 py-5 rounded-md hover:bg-[#c99f38] transition-colors duration-300"
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
      <section className="bg-surface/90 border-y border-secondary/10 py-section-padding px-gutter relative z-20 welcome-strip">
        <div className="max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-16 strip-content">
          <div className="w-full md:w-1/2">
            <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest block mb-2">
              LUJO RÚSTICO Y TRADICIÓN
            </span>
            <h2 className="fluid-h2 font-display text-secondary mb-6 font-bold">
              Aire de Montaña y Gastronomía
            </h2>
            <div className="w-16 h-0.5 bg-secondary mb-8"></div>
            <p className="font-body text-base md:text-lg text-on-surface-variant/90 leading-relaxed mb-8">
              Ubicado en el corazón del Valle de Rancho Viejo, La Marquesa ofrece un refugio rústico de lujo donde la naturaleza virgen se encuentra con la gastronomía de herencia. Respira el aire puro del bosque, explora senderos ocultos y disfruta de sabores auténticos forjados en leña y tradición familiar.
            </p>

            {/* Experience Highlights / Stats Row */}
            <div className="grid grid-cols-2 gap-6 border-t border-secondary/15 pt-8">
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
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Exploration Card */}
            <button
              key="atracciones-card"
              type="button"
              onClick={() => handleLinkClick('atracciones')}
              className="glass-card flex flex-col items-center p-10 rounded-xl text-center group cursor-pointer relative"
            >
              <div className="p-3 rounded-full bg-secondary/5 border border-secondary/15 mb-6 group-hover:bg-secondary/15 group-hover:scale-110 transition-all duration-300">
                <Compass className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-accent text-sm font-bold text-on-background tracking-widest uppercase">ATRACCIONES</h3>
              <p className="text-xs mt-2 text-on-surface-variant/80 italic">Aventura de Montaña</p>
            </button>
            {/* Kitchen Card */}
            <button
              key="menu-card"
              type="button"
              onClick={() => handleLinkClick('menu')}
              className="glass-card flex flex-col items-center p-10 rounded-xl text-center group cursor-pointer relative"
            >
              <div className="p-3 rounded-full bg-secondary/5 border border-secondary/15 mb-6 group-hover:bg-secondary/15 group-hover:scale-110 transition-all duration-300">
                <UtensilsCrossed className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-accent text-sm font-bold text-on-background tracking-widest uppercase">COCINA</h3>
              <p className="text-xs mt-2 text-on-surface-variant/80 italic">Sabor a la Leña</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
