import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AttractionModel } from '../../components3d/AttractionModel';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';

import { images } from '../../config/images';

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
    <div ref={containerRef} className="max-w-max-width mx-auto px-gutter py-24 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16 attraction-header">
        <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
          EXPLORACIÓN Y AVENTURA
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-on-background font-bold mb-4">
          Aventura en la Montaña
        </h1>
        <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Cards */}
        <div className="lg:col-span-7 space-y-8">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className={`p-6 border rounded-lg bg-surface-container/70 transition-all duration-300 cursor-pointer attraction-card flex flex-col md:flex-row gap-6 items-center ${
                activeAttraction === attraction.id
                  ? 'border-secondary shadow-[0_0_20px_rgba(238,192,88,0.15)] bg-surface-container-high'
                  : 'border-secondary/10 hover:border-secondary/50'
              }`}
              onClick={() => setActiveAttraction(attraction.id)}
              onMouseEnter={() => setActiveAttraction(attraction.id)}
            >
              <div className="w-full md:w-2/5 aspect-[4/3] rounded overflow-hidden bg-surface-container-lowest shrink-0">
                <img
                  src={attraction.imgSrc}
                  alt={attraction.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="flex-grow">
                <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1">
                  {attraction.tag}
                </span>
                <h3 className="font-display text-xl text-on-background font-semibold mb-2">
                  {attraction.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {attraction.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky 3D Model Viewer */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 attraction-viewer-container">
          <div className="border border-secondary/20 rounded-xl bg-[#0d140e]/95 p-6 flex flex-col items-center shadow-2xl relative overflow-hidden h-[480px]">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(238,192,88,0.06)_0%,transparent_70%)] pointer-events-none"></div>

            <h3 className="font-accent text-xs font-bold text-secondary uppercase tracking-widest mb-2 z-10">
              EXPLORADOR 3D INTERACTIVO
            </h3>
            
            {/* Main Interactive 3D Canvas */}
            <div className="w-full h-64 relative z-10 cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 0, 4.2], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]} // Limit device pixel ratio for GPU performance on high-DPI screens
              >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 10, 3]} intensity={1.0} color="#ffdf9f" />
                <pointLight position={[-5, -5, -2]} intensity={0.5} color="#3de273" />
                <AttractionModel type={activeAttraction} />
              </Canvas>
            </div>

            {/* Description Info */}
            <div className="text-center mt-4 z-10 flex-grow flex flex-col justify-end">
              <h4 className="font-display text-lg text-on-background font-semibold mb-1">
                {attractions.find((a) => a.id === activeAttraction)?.title.split(':')[0]}
              </h4>
              <p className="font-body text-xs text-on-surface-variant/90 max-w-sm mb-4">
                Arrastra para rotar e interactuar con el modelo 3D representativo.
              </p>
              <a
                href="https://wa.me/525538773469"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-whatsapp hover:bg-[#20bd5a] text-white font-accent text-xs font-bold px-6 py-3 rounded-lg transition-colors w-full tracking-wider"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                RESERVAR EXPERIENCIA
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Retiro Strip */}
      <section className="bg-surface-container-highest/80 border border-secondary/10 rounded-xl p-8 md:p-12 text-center mt-20 max-w-4xl mx-auto">
        <h3 className="font-display text-2xl md:text-3xl text-on-background font-bold mb-4">
          ¿Vienes en grupo o retiro corporativo?
        </h3>
        <p className="font-body text-base text-on-surface-variant/90 mb-8 max-w-2xl mx-auto">
          Organizamos experiencias personalizadas para retiros corporativos, integraciones de equipos, celebraciones familiares y grupos grandes. Disfruta de un día de aventura exclusivo con atención dedicada.
        </p>
        <a
          className="inline-flex items-center justify-center px-8 py-4 bg-whatsapp text-white font-accent text-xs font-bold rounded-lg hover:bg-[#20bd5a] transition-all tracking-widest shadow-lg shadow-whatsapp/25"
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
