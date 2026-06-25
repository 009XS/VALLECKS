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
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#1a2e1b]/20 to-background/90 z-0"></div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-gutter flex flex-col items-center mt-20 hero-content">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-on-background font-bold mb-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)] tracking-tight">
            La Marquesa
          </h1>
          <p className="font-display text-lg md:text-2xl text-secondary italic mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-semibold">
            Valle de Rancho Viejo
          </p>
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-secondary text-background font-accent text-xs font-bold tracking-widest px-8 py-4 rounded hover:bg-[#c99f38] transition-colors duration-300 shadow-[0_4px_15px_rgba(238,192,88,0.25)]"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            RESERVA POR WHATSAPP
          </a>
        </div>
      </header>

      {/* Welcome Strip */}
      <section className="bg-[#1a2e1b]/80 border-y border-secondary/15 py-section-padding px-gutter relative z-20 welcome-strip">
        <div className="max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-12 strip-content">
          <div className="w-full md:w-1/2">
            <h2 className="font-display text-3xl md:text-4xl text-secondary mb-6 font-bold">
              Aire de Montaña y Tradición
            </h2>
            <div className="w-16 h-0.5 bg-secondary mb-6"></div>
            <p className="font-body text-base md:text-lg text-on-surface-variant/90 leading-relaxed">
              Ubicado en el corazón del Valle de Rancho Viejo, La Marquesa ofrece un refugio rústico de lujo donde la naturaleza virgen se encuentra con la gastronomía de herencia. Respira el aire puro del bosque, explora senderos escondidos y disfruta de sabores auténticos forjados en leña y tradición.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            {/* Exploration Card */}
            <button
              onClick={() => handleLinkClick('atracciones')}
              className="flex flex-col items-center p-8 border border-secondary/10 rounded-lg bg-[#0a1a0b]/85 gold-glow transition-all duration-300 cursor-pointer"
            >
              <Compass className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-accent text-sm font-bold text-on-background tracking-wider">ATRACCIONES</h3>
              <p className="text-xs mt-2 text-on-surface-variant/80">Aventura Total</p>
            </button>
            {/* Kitchen Card */}
            <button
              onClick={() => handleLinkClick('menu')}
              className="flex flex-col items-center p-8 border border-secondary/10 rounded-lg bg-[#0a1a0b]/85 gold-glow transition-all duration-300 cursor-pointer"
            >
              <UtensilsCrossed className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-accent text-sm font-bold text-on-background tracking-wider">COCINA</h3>
              <p className="text-xs mt-2 text-on-surface-variant/80">Sabor a Leña</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
