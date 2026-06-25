import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { TerrainMap } from '../../components3d/TerrainMap';
import { MessageCircle, Clock, Phone, MapPin, Navigation } from 'lucide-react';
import gsap from 'gsap';
import { usePageVisibility } from '../../hooks/usePageVisibility';
import { useElementVisibility } from '../../hooks/useElementVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Ubicacion: React.FC = () => {
  const [activeMapTab, setActiveMapTab] = useState<'3d' | 'google'>('3d');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const isPageVisible = usePageVisibility();
  const isElementVisible = useElementVisibility(canvasContainerRef);
  const prefersReducedMotion = useReducedMotion();
  const isCanvasActive = isPageVisible && isElementVisible;

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
      <header className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Pine forests mist background"
            className="w-full h-full object-cover opacity-30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgodcgIhkRStg9fgB8L_hdYhzusTNHzhk3nj2tRe8BbzPgT2I0dpty4dys6udcWhIXVz_nlcSU02baR-o1QiKyy5hG_3U4te7qP1dJF2T3pCgHtaPMuLQm6OYjQhYvcjHJzQFmYj1_ZXrZLjCl_pO7Eo4F4ar7YOEzn9QzOMZrdpux8Fw11y946csQA26IibtwApOp4YCtSp41C-18emLUGd-Zs6I8cDsCA8gYhFSNVMiqFRyN_hN09fqMl_gKJpZTE8M7rBM5YYQ"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </div>
        <div className="relative z-10 text-center px-gutter max-w-3xl mx-auto flex flex-col items-center ubicacion-header">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
            NUESTRA UBICACIÓN
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-on-surface font-bold mb-4 drop-shadow-md">
            ¿Cómo Llegar?
          </h1>
          <div className="w-16 h-0.5 bg-secondary mb-4"></div>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-xl">
            Encuentra el camino hacia una experiencia inmersiva en el corazón de la montaña.
          </p>
        </div>
      </header>

      {/* Contact & Map Section */}
      <section className="py-20 px-gutter max-w-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Panel: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 info-panel">
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl text-on-surface font-semibold">
                Información de Contacto
              </h2>
              <div className="w-10 h-0.5 bg-secondary"></div>
            </div>

            <div className="space-y-6">
              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-surface-container border border-secondary/15 text-secondary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    HORARIO
                  </h3>
                  <p className="font-body text-sm text-on-surface leading-relaxed">
                    Lunes a Domingo<br />09:00 AM - 06:00 PM
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-surface-container border border-secondary/15 text-secondary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    TELÉFONO
                  </h3>
                  <p className="font-body text-sm text-on-surface leading-relaxed">
                    +52 55 3877 3469
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-surface-container border border-secondary/15 text-secondary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-accent text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
                    DIRECCIÓN
                  </h3>
                  <p className="font-body text-sm text-on-surface leading-relaxed">
                    Carretera El Valle del Silencio La Marqueza<br />
                    Chalma, San Pedro Atlapulco,<br />
                    52754 Ocoyoacac, Méx.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/525538773469"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-[#1EBE5A] text-white px-8 py-4 rounded-lg font-accent text-xs font-bold tracking-widest transition-colors w-full sm:w-auto flex items-center justify-center space-x-2 shadow-lg shadow-whatsapp/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span>CONTACTAR POR WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Panel: Interactive Maps with Tabs */}
          <div className="lg:col-span-7 flex flex-col map-panel">
            {/* Tabs */}
            <div className="flex bg-[#111810] border border-secondary/15 rounded-t-xl overflow-hidden self-start">
              <button
                onClick={() => setActiveMapTab('3d')}
                className={`px-6 py-3 font-accent text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  activeMapTab === '3d'
                    ? 'bg-secondary text-background'
                    : 'text-on-background/70 hover:text-secondary'
                }`}
              >
                Relieve 3D
              </button>
              <button
                onClick={() => setActiveMapTab('google')}
                className={`px-6 py-3 font-accent text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer ${
                  activeMapTab === 'google'
                    ? 'bg-secondary text-background'
                    : 'text-on-background/70 hover:text-secondary'
                }`}
              >
                Google Maps
              </button>
            </div>

            {/* Map Area */}
            <div className="flex-grow min-h-[480px] relative rounded-b-xl rounded-tr-xl overflow-hidden border border-secondary/20 bg-[#0d140e] shadow-2xl">
              {activeMapTab === '3d' ? (
                /* Relief 3D Canvas */
                <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
                  <Canvas
                    camera={{ position: [0, 0, 4.5], fov: 45 }}
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                    dpr={[1, 2]} // Limit device pixel ratio for GPU performance on high-DPI screens
                  >
                    <ambientLight intensity={0.35} />
                    <directionalLight position={[10, 10, 10]} intensity={0.9} color="#ffffff" />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#eec058" />
                    <TerrainMap 
                      isVisible={isCanvasActive} 
                      prefersReducedMotion={prefersReducedMotion} 
                    />
                  </Canvas>
                  <div className="absolute bottom-4 left-4 z-10 font-accent text-[9px] text-secondary/80 font-bold bg-background/80 px-3 py-1 rounded backdrop-blur border border-secondary/15">
                    Arrastra para rotar el relieve
                  </div>
                </div>
              ) : (
                /* Google Maps Dark Iframe */
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000.0!2d-99.3760123!3d19.282657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdf7830204e0fb%3A0xc66ea8c83e33a58a!2sCentro%20Recreativo%20Rancho%20Viejo!5e0!3m2!1ses-419!2smx!4v1718347890123!5m2!1ses-419!2smx"
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Routes Section */}
      <section className="bg-primary-container/40 border-t border-secondary/15 py-20">
        <div className="max-w-max-width mx-auto px-gutter">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
              CÓMO ACCEDER AL VALLE
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-3 font-semibold">
              Rutas Sugeridas
            </h2>
            <div className="w-16 h-0.5 bg-secondary"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CDMX */}
            <div className="bg-[#111810] p-8 border border-secondary/10 hover:border-secondary/40 rounded-lg flex flex-col route-card transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45" />
                <h3 className="font-display text-lg text-on-surface font-semibold">
                  Desde CDMX
                </h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Toma la autopista o carretera libre México-Toluca (15D). El trayecto dura aproximadamente 45 minutos partiendo desde Santa Fe. Sigue los señalamientos claros hacia el Parque Nacional La Marquesa y gira hacia el Valle del Silencio.
              </p>
            </div>

            {/* Toluca */}
            <div className="bg-[#111810] p-8 border border-secondary/10 hover:border-secondary/40 rounded-lg flex flex-col route-card transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45" />
                <h3 className="font-display text-lg text-on-surface font-semibold">
                  Desde Toluca
                </h3>
              </div>
              <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed flex-grow">
                Conduce por la carretera Toluca-México en dirección este. El tiempo estimado de viaje es de 30 minutos. Toma la desviación indicada hacia los valles de La Marquesa y sigue los letreros locales a Rancho Viejo.
              </p>
            </div>

            {/* Metepec */}
            <div className="bg-[#111810] p-8 border border-secondary/10 hover:border-secondary/40 rounded-lg flex flex-col route-card transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <Navigation className="w-5 h-5 text-secondary transform -rotate-45" />
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
