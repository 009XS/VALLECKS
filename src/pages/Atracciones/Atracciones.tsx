import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AttractionModel } from '../../components3d/AttractionModel';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';

import { images } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';
import { usePageVisibility } from '../../hooks/usePageVisibility';
import { useElementVisibility } from '../../hooks/useElementVisibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AttractionItem {
  id: 'gotcha' | 'cuatrimotos' | 'tirolesas' | 'caballo';
  tag: string;
  title: string;
  description: string;
  imgSrc: string;
}

export const Atracciones: React.FC = () => {
  const [activeAttraction, setActiveAttraction] = useState<AttractionItem['id']>('gotcha');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const isPageVisible = usePageVisibility();
  const isElementVisible = useElementVisibility(canvasContainerRef);
  const prefersReducedMotion = useReducedMotion();
  const isCanvasActive = isPageVisible && isElementVisible;

  const attractions: AttractionItem[] = [
    {
      id: 'gotcha',
      tag: 'ESTRATEGIA Y ACCIÓN',
      title: 'Gotcha: Paintball en el Bosque',
      description: 'Adéntrate en escenarios naturales diseñados para la máxima adrenalina. Nuestro campo de gotcha aprovecha la topografía real de la montaña, ofreciendo barricadas de madera rústica y refugios naturales para una experiencia táctica inmersiva.',
      imgSrc: images.gotcha,
    },
    {
      id: 'cuatrimotos',
      tag: 'EXPLORACIÓN A MOTOR',
      title: 'Cuatrimotos: Senderos de Oyameles',
      description: 'Domina los caminos escarpados a bordo de nuestros vehículos todo terreno. Recorre kilómetros de senderos privados flanqueados por majestuosos oyameles, descubriendo rincones ocultos y miradores espectaculares de la región.',
      imgSrc: images.cuatrimotos,
    },
    {
      id: 'tirolesas',
      tag: 'VUELO EN LAS ALTURAS',
      title: 'Tirolesas: Vistas Panorámicas',
      description: 'Siente la libertad de volar sobre la copa de los árboles. Nuestras líneas de acero atraviesan los valles ofreciendo una perspectiva inigualable del paisaje boscoso, combinando seguridad de primera clase con vistas sobrecogedoras.',
      imgSrc: images.tirolesa,
    },
    {
      id: 'caballo',
      tag: 'TRANQUILIDAD Y NATURALEZA',
      title: 'Paseo a Caballo',
      description: 'Disfruta de paseos guiados a caballo por los senderos más hermosos y tranquilos del valle. Una gran experiencia para conectar con la naturaleza, apta para principiantes y jinetes experimentados.',
      imgSrc: images.caballo,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.attraction-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.attraction-card',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.attraction-viewer-container',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-max-width mx-auto px-gutter py-32 min-h-screen">
      {/* Header */}
      <div className="text-center mb-20 attraction-header">
        <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-3">
          EXPLORACIÓN Y AVENTURA
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-on-background font-bold mb-6 tracking-tight">
          Aventura en la Montaña
        </h1>
        <div className="w-20 h-[1.5px] bg-secondary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Cards */}
        <div className="lg:col-span-7 space-y-6">
          {attractions.map((attraction) => (
            <button
              key={attraction.id}
              type="button"
              className={`p-6 border rounded-xl transition-all duration-500 cursor-pointer attraction-card flex flex-col md:flex-row gap-6 items-center w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 ${
                activeAttraction === attraction.id
                  ? 'border-secondary bg-black/60 shadow-[0_12px_40px_rgba(212,168,67,0.08),0_0_30px_rgba(0,0,0,0.6)] scale-[1.01]'
                  : 'border-white/5 hover:border-secondary/35 bg-[#0a0e0a]/40 backdrop-blur-md hover:scale-[1.005]'
              }`}
              onClick={() => setActiveAttraction(attraction.id)}
              onMouseEnter={() => setActiveAttraction(attraction.id)}
            >
              <div className="w-full md:w-2/5 aspect-[4/3] rounded-lg overflow-hidden bg-black/40 border border-white/5 shrink-0 relative">
                <SmartImage
                  src={attraction.imgSrc}
                  alt={attraction.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
              <div className="flex-grow">
                <span className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest block mb-2">
                  {attraction.tag}
                </span>
                <h3 className="font-display text-xl text-on-background font-semibold mb-3">
                  {attraction.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
                  {attraction.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Sticky 3D Model Viewer */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 attraction-viewer-container">
          <div className="border border-secondary/20 rounded-2xl bg-black/60 backdrop-blur-lg p-8 flex flex-col items-center shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative overflow-hidden h-[500px]">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)] pointer-events-none"></div>

            <h3 className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest mb-4 z-10">
              EXPLORADOR 3D INTERACTIVO
            </h3>
            
            {/* Main Interactive 3D Canvas */}
            <div ref={canvasContainerRef} className="w-full h-64 relative z-10 cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 0, 4.2], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]} // Limit device pixel ratio for GPU performance on high-DPI screens
              >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 10, 3]} intensity={1.0} color="#ffdf9f" />
                <pointLight position={[-5, -5, -2]} intensity={0.5} color="#3de273" />
                <AttractionModel 
                  type={activeAttraction} 
                  isVisible={isCanvasActive} 
                  prefersReducedMotion={prefersReducedMotion} 
                />
              </Canvas>
            </div>

            {/* Description Info */}
            <div className="text-center mt-4 z-10 flex-grow flex flex-col justify-end w-full">
              <h4 className="font-display text-lg text-on-background font-semibold mb-1">
                {attractions.find((a) => a.id === activeAttraction)?.title.split(':')[0]}
              </h4>
              <p className="font-body text-[11px] text-on-surface-variant/70 max-w-sm mb-6 mx-auto">
                Arrastra para rotar e interactuar con el modelo 3D representativo.
              </p>
              <a
                href="https://wa.me/525538773469"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center justify-center bg-secondary text-on-secondary font-accent text-xs font-bold px-6 py-4 rounded-xl transition-all duration-300 w-full tracking-widest hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                RESERVAR EXPERIENCIA
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Retiro Strip */}
      <section className="glass-card border border-secondary/20 rounded-2xl p-10 md:p-16 text-center mt-24 max-w-4xl mx-auto relative overflow-hidden bg-black/45 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.04)_0%,transparent_70%)] pointer-events-none"></div>
        <h3 className="font-display text-2xl md:text-3xl text-on-background font-bold mb-4 z-10 relative">
          ¿Vienes en grupo o retiro corporativo?
        </h3>
        <p className="font-body text-base text-on-surface-variant/90 mb-8 max-w-2xl mx-auto z-10 relative leading-relaxed">
          Organizamos experiencias personalizadas para retiros corporativos, integraciones de equipos, celebraciones familiares y grupos grandes. Disfruta de un día de aventura exclusivo con atención dedicada.
        </p>
        <a
          className="btn-premium inline-flex items-center justify-center px-8 py-4 bg-secondary text-on-secondary font-accent text-xs font-bold rounded-xl hover:scale-[1.02] transition-all tracking-widest shadow-xl shadow-secondary/10 z-10 relative"
          href="https://wa.me/525538773469"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          CONTACTAR POR WHATSAPP
        </a>
      </section>
    </div>
  );
};
