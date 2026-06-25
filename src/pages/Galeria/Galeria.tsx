import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { images as imageAssets } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';

interface GalleryItem {
  id: number;
  title: string;
  src: string;
  size?: 'normal' | 'wide';
}

export const Galeria: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryImages: GalleryItem[] = [
    { id: 1, title: 'Lago Místico', src: imageAssets.lagoMistico, size: 'normal' },
    { id: 2, title: 'Valle de Dinosaurios', src: imageAssets.valleDinosaurios, size: 'wide' },
    { id: 3, title: 'Zorbing Extremo', src: imageAssets.zorbing, size: 'normal' },
    { id: 4, title: 'Entrada Principal', src: imageAssets.entradaPrincipal, size: 'normal' },
    { id: 5, title: 'Rutas en Cuatrimoto', src: imageAssets.cuatrimotos, size: 'normal' },
    { id: 6, title: 'Tirolesa Panorámica', src: imageAssets.tirolesa, size: 'normal' },
    { id: 7, title: 'Paseos a Caballo', src: imageAssets.paseosCaballo, size: 'wide' },
    { id: 8, title: 'Navegación en Canoa', src: imageAssets.canoas, size: 'normal' },
    { id: 9, title: 'Gastronomía Local', src: imageAssets.comida, size: 'normal' },
    { id: 10, title: 'Mixología de Autor', src: imageAssets.pitufos, size: 'normal' },
    { id: 11, title: 'Gotcha en el Bosque', src: imageAssets.gotcha, size: 'wide' },
    { id: 12, title: 'Fogatas Nocturnas', src: imageAssets.fogatas, size: 'normal' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-background noise-overlay pt-32 pb-24">
      {/* Editorial gallery intro */}
      <div className="max-w-xl mx-auto text-center mb-24 px-gutter gallery-reveal">
        <span className="font-accent text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-3">
          REGISTRO VISUAL
        </span>
        <h1 className="font-display text-4xl md:text-6xl text-on-background font-bold mb-6 tracking-tight">
          El Álbum del Valle
        </h1>
        <div className="w-20 h-[1.5px] bg-secondary mx-auto mb-6"></div>
        <p className="font-body text-sm md:text-base text-on-surface-variant/90 leading-relaxed">
          Un recorrido fotográfico por los rincones del rancho: lagos, senderos, atardeceres y la calidez del fogón de leña.
        </p>
      </div>

      {/* Premium Asymmetric Grid Layout */}
      <div className="max-w-max-width mx-auto px-gutter gallery-reveal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleryImages.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedItem(img)}
              className={`gallery-item overflow-hidden rounded-2xl bg-black/45 border border-white/5 hover:border-secondary/40 transition-all duration-500 shadow-xl relative group cursor-pointer w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 ${
                img.size === 'wide'
                  ? 'md:col-span-2 aspect-[4/3] md:aspect-[8/3]'
                  : 'aspect-[4/3]'
              }`}
              aria-label={`Ver imagen ampliada de ${img.title}`}
            >
              <SmartImage
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              {/* Hover overlay with mature dark-gold gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                <ZoomIn className="w-8 h-8 text-secondary mb-3 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                <span className="font-accent text-[9px] text-secondary font-bold tracking-[0.2em] uppercase mb-1 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  VER AMPLIACIÓN
                </span>
                <span className="font-display text-lg text-on-background font-medium transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  {img.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${selectedItem.title}`}
          className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedItem(null)}
        >
          {/* Radial light glow behind the modal */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.05)_0%,transparent_70%)] pointer-events-none"></div>

          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 text-secondary hover:text-white p-2.5 rounded-full border border-secondary/20 hover:border-secondary hover:bg-white/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary z-[110]"
            aria-label="Cerrar vista ampliada"
          >
            <X className="w-7 h-7" />
          </button>
          
          <div 
            className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-secondary/20 shadow-[0_32px_100px_rgba(0,0,0,0.95),0_0_60px_rgba(212,168,67,0.05)] relative bg-black/85 flex flex-col z-[105]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.src}
              alt={selectedItem.title}
              className="w-full h-full object-contain max-h-[72vh] mx-auto select-none pointer-events-none"
            />
            <div className="bg-[#0b0e0b]/90 backdrop-blur-md border-t border-secondary/15 p-5 text-center w-full">
              <span className="font-accent text-[9px] text-secondary font-bold tracking-[0.25em] uppercase block mb-1">
                VALLE DE RANCHO VIEJO
              </span>
              <p className="text-on-background font-display text-lg font-semibold tracking-wide">{selectedItem.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
