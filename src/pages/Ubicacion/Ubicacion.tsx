import React, { useEffect, useRef } from 'react';
import { MessageCircle, Clock, Phone, MapPin, Navigation } from 'lucide-react';
import gsap from 'gsap';

export const Ubicacion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ubicacion-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.info-panel',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.map-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.route-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      {/* Hero Header */}
      <header className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Pine forests mist background"
            className="w-full h-full object-cover opacity-20 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgodcgIhkRStg9fgB8L_hdYhzusTNHzhk3nj2tRe8BbzPgT2I0dpty4dys6udcWhIXVz_nlcSU02baR-o1QiKyy5hG_3U4te7qP1dJF2T3pCgHtaPMuLQm6OYjQhYvcjHJzQFmYj1_ZXrZLjCl_pO7Eo4F4ar7YOEzn9QzOMZrdpux8Fw11y946csQA26IibtwApOp4YCtSp41C-18emLUGd-Zs6I8cDsCA8gYhFSNVMiqFRyN_hN09fqMl_gKJpZTE8M7rBM5YYQ"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/50 via-[#060906]/85 to-[#060906]"></div>
        </div>
        <div className="relative z-10 text-center px-gutter max-w-3xl mx-auto flex flex-col items-center ubicacion-header">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-3">
            NUESTRA UBICACIÓN
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-on-surface font-bold mb-6 tracking-tight">
            ¿Cómo Llegar?
          </h1>
          <div className="w-20 h-[1.5px] bg-secondary mb-4"></div>
          <p className="font-body text-base md:text-lg text-on-surface-variant/90 max-w-xl leading-relaxed italic">
            Encuentra el camino hacia una experiencia inmersiva en el corazón de la montaña.
          </p>
        </div>
      </header>

      {/* Contact & Map Section */}
      <section className="py-24 px-gutter max-w-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Panel: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-10 info-panel">
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl text-on-surface font-bold tracking-tight">
                Información de Contacto
              </h2>
              <div className="w-12 h-[1px] bg-secondary"></div>
            </div>

            <div className="space-y-8">
              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-secondary/5 border border-secondary/20 text-secondary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest mb-1.5">
                    HORARIO
                  </h3>
                  <p className="font-body text-sm text-on-surface/90 leading-relaxed">
                    Lunes a Domingo<br />09:00 AM - 06:00 PM
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-secondary/5 border border-secondary/20 text-secondary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest mb-1.5">
                    TELÉFONO
                  </h3>
                  <p className="font-body text-sm text-on-surface/90 leading-relaxed">
                    +52 55 3877 3469
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-secondary/5 border border-secondary/20 text-secondary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest mb-1.5">
                    DIRECCIÓN
                  </h3>
                  <p className="font-body text-sm text-on-surface/90 leading-relaxed">
                    Carretera El Valle del Silencio La Marqueza<br />
                    Chalma, San Pedro Atlapulco,<br />
                    52754 Ocoyoacac, Méx.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/525538773469"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium bg-secondary text-on-secondary px-8 py-4 rounded-xl font-accent text-xs font-bold tracking-widest transition-all duration-300 w-full sm:w-auto flex items-center justify-center space-x-2 shadow-xl shadow-secondary/10 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONTACTAR POR WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Panel: Premium Google Maps Container */}
          <div className="lg:col-span-7 flex flex-col map-panel">
            {/* Header Badge */}
            <div className="flex bg-[#0a0e0a]/40 border border-white/5 border-b-0 rounded-t-2xl px-6 py-3.5 self-start backdrop-blur-md">
              <span className="font-accent text-[9px] font-extrabold tracking-widest text-secondary uppercase">
                UBICACIÓN EN GOOGLE MAPS
              </span>
            </div>

            {/* Map Area */}
            <div className="flex-grow min-h-[480px] relative rounded-b-2xl rounded-tr-2xl overflow-hidden border border-secondary/20 bg-black/60 shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex flex-col">
              <div className="relative flex-grow">
                {/* Google Maps Dark Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000.0!2d-99.3760123!3d19.282657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdf7830204e0fb%3A0xc66ea8c83e33a58a!2sCentro%20Recreativo%20Rancho%20Viejo!5e0!3m2!1ses-419!2smx!4v1718347890123!5m2!1ses-419!2smx"
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              </div>
              
              {/* Address Confirmation Note */}
              <div className="bg-[#0c0f0c] border-t border-white/5 px-6 py-4 text-[10px] text-on-surface-variant/80 italic leading-relaxed">
                Nota para el cliente: Por favor confirme si la nomenclatura exacta de la Carretera y el código postal coinciden con los registros locales para optimizar la navegación GPS de los visitantes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Routes Section */}
      <section className="bg-black/20 border-t border-white/5 py-24">
        <div className="max-w-max-width mx-auto px-gutter">
          <div className="text-center mb-20 flex flex-col items-center">
            <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-3">
              CÓMO ACCEDER AL VALLE
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
              Rutas Sugeridas
            </h2>
            <div className="w-16 h-[1.5px] bg-secondary mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CDMX */}
            <div className="bg-[#0a0e0a]/40 backdrop-blur-md p-8 border border-white/5 hover:border-secondary/35 rounded-2xl flex flex-col route-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,168,67,0.05)]">
              <div className="flex items-center space-x-3 mb-6 group">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <h3 className="font-display text-lg text-on-surface font-semibold">
                  Desde CDMX
                </h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Toma la autopista o carretera libre México-Toluca (15D). El trayecto dura aproximadamente 45 minutos partiendo desde Santa Fe. Sigue los señalamientos claros hacia el Parque Nacional La Marquesa y gira hacia el Valle del Silencio.
              </p>
            </div>

            {/* Toluca */}
            <div className="bg-[#0a0e0a]/40 backdrop-blur-md p-8 border border-white/5 hover:border-secondary/35 rounded-2xl flex flex-col route-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,168,67,0.05)]">
              <div className="flex items-center space-x-3 mb-6 group">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <h3 className="font-display text-lg text-on-surface font-semibold">
                  Desde Toluca
                </h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Conduce por la carretera Toluca-México en dirección este. El tiempo estimado de viaje es de 30 minutos. Toma la desviación indicada hacia los valles de La Marquesa y sigue los letreros locales a Rancho Viejo.
              </p>
            </div>

            {/* Metepec */}
            <div className="bg-[#0a0e0a]/40 backdrop-blur-md p-8 border border-white/5 hover:border-secondary/35 rounded-2xl flex flex-col route-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,168,67,0.05)]">
              <div className="flex items-center space-x-3 mb-6 group">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <h3 className="font-display text-lg text-on-surface font-semibold">
                  Desde Metepec
                </h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Incorpórate a la vialidad Solidaridad Las Torres y luego a la carretera Toluca-México. El viaje toma alrededor de 35 minutos. Mantente en el carril derecho al aproximarte al kilómetro 38 para tomar la entrada del parque.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
