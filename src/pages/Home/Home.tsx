import React, { useEffect, useRef } from 'react';
import { MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { images } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.hero-reveal',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.4, stagger: 0.2, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.scroll-reveal',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.scroll-reveal-trigger',
              start: 'top 80%',
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="w-full bg-background noise-overlay">
      {/* A. Cinematic Layered Hero */}
      <header className="relative min-h-screen w-full flex items-center justify-start overflow-hidden px-gutter pt-24 md:pt-0">
        {/* Layered Backdrop Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={images.entradaPrincipal}
            alt="Valle de Rancho Viejo"
            className="w-full h-full object-cover scale-102 opacity-65"
          />
          {/* Deep Cinematic Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060906]/85 via-[#060906]/55 to-transparent hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/35 via-[#060906]/75 to-[#060906]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(212,168,67,0.06)_0%,transparent_70%)]"></div>
        </div>

        {/* Hero Content - Asymmetric Split */}
        <div className="relative z-10 max-w-3xl w-full md:pl-16 flex flex-col items-start text-left hero-content">
          <div className="hero-reveal inline-flex items-center gap-3 mb-6 bg-secondary/10 border border-secondary/25 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="font-accent text-[9px] md:text-xs font-bold text-secondary uppercase tracking-[0.25em]">
              Refugio de Montaña
            </span>
          </div>

          <h1 className="hero-reveal fluid-h1 font-display text-on-background font-extrabold mb-6 tracking-tight leading-none">
            La Marquesa <br />
            <span className="font-display text-secondary italic font-light">Rancho Viejo</span>
          </h1>

          <p className="hero-reveal font-body text-base md:text-xl text-on-surface-variant/90 mb-10 max-w-xl leading-relaxed">
            Un paraje rodeado de bosques y tranquilidad. Descubre un refugio donde la naturaleza y la comida cocinada a la leña se unen en una experiencia tradicional.
          </p>

          <div className="hero-reveal flex flex-wrap gap-4 w-full sm:w-auto">
            <a
              href="https://wa.me/525538773469"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center justify-center bg-secondary text-background font-accent text-[11px] font-bold tracking-widest px-8 py-4.5 rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-secondary/15 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              RESERVAR EXPERIENCIA
            </a>
            <button
              onClick={() => handleLinkClick('atracciones')}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/5 text-on-background border border-white/10 font-accent text-[11px] font-bold tracking-widest px-8 py-4.5 rounded-xl transition-all w-full sm:w-auto cursor-pointer"
            >
              EXPLORAR AVENTURA
            </button>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 flex flex-col items-center md:items-start gap-2 opacity-50 z-10 pointer-events-none">
          <span className="font-accent text-[8px] font-bold tracking-[0.3em] text-secondary uppercase">Desplazar</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4a843] to-transparent"></div>
        </div>
      </header>

      {/* B. Brand Pillars Ribbon */}
      <section className="bg-[#040604] border-y border-white/5 py-12 px-gutter relative z-20">
        <div className="max-w-max-width mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="font-display text-lg text-secondary italic font-semibold mb-1">Naturaleza</span>
            <span className="font-accent text-[9px] text-on-surface-variant/60 uppercase tracking-widest">Bosques de Oyamel</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-lg text-secondary italic font-semibold mb-1">Cocina</span>
            <span className="font-accent text-[9px] text-on-surface-variant/60 uppercase tracking-widest">Sazón a la Leña</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-lg text-secondary italic font-semibold mb-1">Aventura</span>
            <span className="font-accent text-[9px] text-on-surface-variant/60 uppercase tracking-widest">Rutas de Montaña</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-lg text-secondary italic font-semibold mb-1">Convivencia</span>
            <span className="font-accent text-[9px] text-on-surface-variant/60 uppercase tracking-widest">Espacios Familiares</span>
          </div>
        </div>
      </section>

      {/* C. Editorial Story Section */}
      <section className="py-24 md:py-32 px-gutter relative z-20 scroll-reveal-trigger">
        <div className="max-w-max-width mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image side with frame */}
          <div className="w-full lg:w-1/2 scroll-reveal">
            <div className="editorial-frame rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/30">
                <SmartImage
                  src={images.lagoMistico}
                  alt="Paisaje del lago"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-103"
                />
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="w-full lg:w-1/2 space-y-6 scroll-reveal">
            <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest block">
              HERENCIA Y TRADICIÓN
            </span>
            <h2 className="fluid-h2 font-display text-on-background font-bold tracking-tight leading-tight">
              Un rincón natural en el Valle de Rancho Viejo
            </h2>
            <div className="w-16 h-[1.5px] bg-secondary"></div>
            <p className="font-body text-base text-on-surface-variant/90 leading-relaxed pt-2">
              Ubicado en las zonas montañosas de La Marquesa, nuestro espacio ofrece una escapada del ritmo de la ciudad. Aquí, el aire puro de la montaña y los senderos forestales sirven como escenario para compartir con la familia y disfrutar de la tranquilidad que solo el bosque puede brindar.
            </p>
            <p className="font-body text-base text-on-surface-variant/90 leading-relaxed">
              Nos enfocamos en mantener un ambiente campestre y hospitalario, conservando la esencia de la cocina tradicional y los paseos a caballo que han caracterizado a la región por generaciones.
            </p>
            <div className="pt-4">
              <button
                onClick={() => handleLinkClick('ubicacion')}
                className="inline-flex items-center gap-2 text-secondary hover:text-[#eec058] font-accent text-xs font-bold tracking-wider transition-colors cursor-pointer"
              >
                <span>CÓMO LLEGAR AL RANCHO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* D. Signature Experiences (Magazine Layout) */}
      <section className="py-24 bg-[#030503] border-y border-white/5 px-gutter relative z-20">
        <div className="max-w-max-width mx-auto">
          <div className="text-center mb-20">
            <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest block mb-3">
              ACTIVIDADES DE MONTAÑA
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-on-background font-bold tracking-tight">
              Experiencias al Aire Libre
            </h2>
            <div className="w-12 h-[1px] bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Large Featured Experience */}
            <div className="lg:col-span-8 flex flex-col justify-between p-8 rounded-2xl solid-editorial-card relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <SmartImage
                  src={images.cuatrimotos}
                  alt="Ruta de cuatrimotos"
                  className="w-full h-full object-cover opacity-40 transition-all duration-700 group-hover:scale-103 group-hover:opacity-50 select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"></div>
              </div>
              <div className="relative z-10 mb-16">
                <span className="px-2.5 py-0.5 bg-secondary/15 text-secondary text-[8px] font-extrabold uppercase tracking-widest rounded border border-secondary/35 backdrop-blur-md">
                  RECORRIDOS
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl text-on-background font-bold mb-3 tracking-wide">
                  Senderos de Oyameles en Cuatrimoto
                </h3>
                <p className="font-body text-sm text-on-surface-variant/85 max-w-xl leading-relaxed mb-6">
                  Explora los caminos forestales privados del valle. Recorridos guiados ideales para conectar con el paisaje natural de la montaña y respirar el aroma a pino.
                </p>
                <button
                  onClick={() => handleLinkClick('atracciones')}
                  className="inline-flex items-center gap-2 text-secondary hover:text-[#eec058] font-accent text-xs font-bold tracking-wider transition-colors cursor-pointer"
                >
                  <span>VER DETALLES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Two Supporting Experiences */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Supporting 1 */}
              <div className="flex-grow p-6 rounded-2xl solid-editorial-card relative overflow-hidden group flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                  <SmartImage
                    src={images.tirolesa}
                    alt="Tirolesa panorámica"
                    className="w-full h-full object-cover opacity-30 transition-all duration-700 group-hover:scale-103 group-hover:opacity-40 select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                </div>
                <div className="relative z-10">
                  <span className="font-accent text-[8px] font-bold text-secondary uppercase tracking-widest block mb-2">VUELO SOBRE EL VALLE</span>
                  <h4 className="font-display text-lg text-on-background font-bold mb-3">Tirolesa Panorámica</h4>
                  <button
                    onClick={() => handleLinkClick('atracciones')}
                    className="text-secondary hover:text-[#eec058] font-accent text-[10px] font-bold tracking-wider transition-colors cursor-pointer"
                  >
                    MÁS INFO
                  </button>
                </div>
              </div>

              {/* Supporting 2 */}
              <div className="flex-grow p-6 rounded-2xl solid-editorial-card relative overflow-hidden group flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                  <SmartImage
                    src={images.caballo}
                    alt="Paseo a caballo"
                    className="w-full h-full object-cover opacity-30 transition-all duration-700 group-hover:scale-103 group-hover:opacity-40 select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                </div>
                <div className="relative z-10">
                  <span className="font-accent text-[8px] font-bold text-secondary uppercase tracking-widest block mb-2">PASEOS GUIADOS</span>
                  <h4 className="font-display text-lg text-on-background font-bold mb-3">Paseos a Caballo</h4>
                  <button
                    onClick={() => handleLinkClick('atracciones')}
                    className="text-secondary hover:text-[#eec058] font-accent text-[10px] font-bold tracking-wider transition-colors cursor-pointer"
                  >
                    MÁS INFO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. Warm Food & Bar Preview */}
      <section className="py-24 px-gutter relative z-20">
        <div className="max-w-max-width mx-auto rounded-3xl overflow-hidden border border-secondary/25 relative shadow-2xl">
          <div className="absolute inset-0 z-0">
            <SmartImage
              src={images.comida}
              alt="Cocina de leña"
              className="w-full h-full object-cover opacity-55 scale-102 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/70"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.04)_0%,transparent_75%)]"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center px-6 py-16 md:py-20 flex flex-col items-center">
            <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">
              GASTRONOMÍA TRADICIONAL
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-on-background font-bold tracking-tight mb-6">
              El Sabor de la Leña y del Bosque
            </h2>
            <p className="font-body text-sm md:text-base text-on-surface-variant/90 leading-relaxed mb-8 max-w-lg">
              Disfruta de platillos rústicos cocinados lentamente con leña seleccionada y cocteles preparados al momento en un ambiente cálido y familiar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleLinkClick('menu')}
                className="btn-premium px-8 py-4 bg-secondary text-background font-accent text-[11px] font-bold tracking-widest rounded-xl hover:scale-[1.02] transition-transform duration-300 w-full sm:w-auto cursor-pointer"
              >
                EXPLORAR COCINA
              </button>
              <button
                onClick={() => handleLinkClick('barra')}
                className="px-8 py-4 bg-transparent hover:bg-white/5 text-on-background border border-white/10 font-accent text-[11px] font-bold tracking-widest rounded-xl transition-all w-full sm:w-auto cursor-pointer"
              >
                VER COCTELERÍA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* F. Final Visit CTA Section */}
      <section className="py-24 bg-[#040604] border-t border-white/5 px-gutter relative z-20 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center space-y-8">
          <MapPin className="w-10 h-10 text-secondary animate-pulse" />
          <h2 className="font-display text-3xl md:text-4xl text-on-background font-bold tracking-tight leading-tight">
            Planea tu Visita este Fin de Semana
          </h2>
          <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
            Estamos ubicados en la Carretera El Valle del Silencio, Ocoyoacac, Estado de México. Un refugio de montaña ideal para compartir en familia y disfrutar al aire libre.
          </p>
          <div className="w-12 h-[1px] bg-secondary/35"></div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="https://wa.me/525538773469"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center justify-center bg-secondary text-background font-accent text-[11px] font-bold tracking-widest px-8 py-4.5 rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-secondary/10 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              CONTACTAR RESERVAS
            </a>
            <button
              onClick={() => handleLinkClick('ubicacion')}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/5 text-on-background border border-white/15 font-accent text-[11px] font-bold tracking-widest px-8 py-4.5 rounded-xl transition-all w-full sm:w-auto cursor-pointer"
            >
              VER GUÍA DE RUTA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
