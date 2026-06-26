import React, { useEffect, useRef } from 'react';
import { MessageCircle, Clock, Phone, MapPin, Navigation } from 'lucide-react';
import gsap from 'gsap';

export const Ubicacion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ubicacion-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-background noise-overlay pt-24 pb-16">
      {/* Editorial Destination Header */}
      <div className="max-w-xl mx-auto text-center mb-12 px-gutter ubicacion-reveal">
        <span className="font-accent text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-3">
          GUÍA DE RUTA Y ACCESO
        </span>
        <h1 className="font-display text-4xl md:text-6xl text-on-background font-bold mb-6 tracking-tight">
          Cómo Llegar
        </h1>
        <div className="w-20 h-[1.5px] bg-secondary mx-auto mb-6"></div>
        <p className="font-body text-sm md:text-base text-on-surface-variant/90 leading-relaxed">
          Sigue nuestras recomendaciones de trayecto para disfrutar de una llegada tranquila y segura a nuestro refugio de montaña.
        </p>
      </div>

      {/* Main Destination Guide Content */}
      <section className="max-w-max-width mx-auto px-gutter mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Panel: Practical Info Blocks */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12 ubicacion-reveal">
            <div className="space-y-4">
              <span className="font-accent text-[9px] font-bold text-secondary tracking-widest uppercase block">
                INFORMACIÓN PRÁCTICA
              </span>
              <h2 className="font-display text-2xl text-on-background font-bold tracking-tight">
                Datos de Contacto
              </h2>
              <div className="w-12 h-[1px] bg-secondary/50"></div>
            </div>

            <div className="space-y-8 flex-grow">
              {/* Hours */}
              <div className="flex items-start space-x-4 border-b border-white/5 pb-6">
                <div className="p-3.5 rounded-xl bg-secondary/5 border border-secondary/20 text-secondary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest mb-1">
                    HORARIOS DE ATENCIÓN
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
                    Lunes a Domingo<br />
                    09:00 AM - 06:00 PM
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 border-b border-white/5 pb-6">
                <div className="p-3.5 rounded-xl bg-secondary/5 border border-secondary/20 text-secondary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest mb-1">
                    TELÉFONO DE CONTACTO
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
                    +52 55 3877 3469
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3.5 rounded-xl bg-secondary/5 border border-secondary/20 text-secondary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest mb-1">
                    DIRECCIÓN DEL RANCHO
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
                    Carretera El Valle del Silencio La Marqueza<br />
                    San Pedro Atlapulco, 52754<br />
                    Ocoyoacac, Estado de México.
                  </p>
                </div>
              </div>
            </div>

            {/* WA Action */}
            <div className="pt-4">
              <a
                href="https://wa.me/525538773469"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium bg-secondary text-background px-8 py-4.5 rounded-xl font-accent text-xs font-bold tracking-widest transition-all duration-300 w-full flex items-center justify-center space-x-2 shadow-xl shadow-secondary/15"
              >
                <MessageCircle className="w-4 h-4" />
                <span>RESOLVER DUDAS DE RUTA</span>
              </a>
            </div>
          </div>

          {/* Right Panel: Integrated Maps & Disclaimer */}
          <div className="lg:col-span-7 flex flex-col justify-between ubicacion-reveal">
            {/* Header Badge */}
            <div className="flex bg-[#080c08] border border-white/5 border-b-0 rounded-t-2xl px-6 py-3.5 self-start">
              <span className="font-accent text-[9px] font-extrabold tracking-widest text-secondary uppercase">
                UBICACIÓN GPS Y NAVEGACIÓN
              </span>
            </div>

            {/* Map Area */}
            <div className="flex-grow min-h-[420px] relative rounded-b-2xl rounded-tr-2xl overflow-hidden border border-secondary/20 bg-black/60 shadow-2xl flex flex-col">
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
              <div className="bg-[#080c08] border-t border-white/5 px-6 py-4 text-[10px] text-on-surface-variant/80 italic leading-relaxed">
                Nota aclaratoria: Por favor confirme las indicaciones exactas del trayecto por teléfono si viaja en días lluviosos o con neblina para garantizar un viaje placentero.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Routes Section */}
      <section className="border-t border-white/5 py-24 bg-[#030503]">
        <div className="max-w-max-width mx-auto px-gutter">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-3">
              CÓMO ACCEDER AL VALLE
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-on-background font-bold tracking-tight">
              Sugerencias de Trayecto
            </h2>
            <div className="w-16 h-[1px] bg-secondary mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CDMX */}
            <div className="bg-[#080c08] p-8 border border-white/5 hover:border-secondary/25 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="flex items-center space-x-3 mb-6 group">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <h3 className="font-display text-base text-on-background font-semibold">
                  De la Ciudad de México
                </h3>
              </div>
              <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Dirígete por la autopista o libre México-Toluca. A la altura del Parque Nacional La Marquesa, toma la desviación en dirección al Valle del Silencio y sigue las indicaciones locales hacia el Centro Recreativo Rancho Viejo.
              </p>
            </div>

            {/* Toluca */}
            <div className="bg-[#080c08] p-8 border border-white/5 hover:border-secondary/25 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="flex items-center space-x-3 mb-6 group">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <h3 className="font-display text-base text-on-background font-semibold">
                  De Toluca
                </h3>
              </div>
              <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Conduce por la carretera Toluca-México. Incorpórate a la desviación hacia los valles de La Marquesa y gira con rumbo al Valle del Silencio, manteniéndote sobre el sendero principal de Rancho Viejo.
              </p>
            </div>

            {/* Metepec */}
            <div className="bg-[#080c08] p-8 border border-white/5 hover:border-secondary/25 rounded-2xl flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="flex items-center space-x-3 mb-6 group">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <h3 className="font-display text-base text-on-background font-semibold">
                  De Metepec
                </h3>
              </div>
              <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Toma la vialidad Solidaridad Las Torres hacia la México-Toluca. Conduce hasta el km 38 para aproximarte a la entrada principal del parque nacional, y toma la desviación al Valle del Silencio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
