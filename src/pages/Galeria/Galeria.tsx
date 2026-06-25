import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import gsap from 'gsap';

interface GalleryItem {
  id: number;
  title: string;
  src: string;
}

export const Galeria: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const images: GalleryItem[] = [
    { id: 1, title: 'Lago Místico', src: 'static/img/Ahuyenta-inseguridad-a-turistas-de-La-Marquesa3.jpg' },
    { id: 2, title: 'Valle de Dinosaurios', src: 'static/img/d1-1-1024x683.jpg' },
    { id: 3, title: 'Zorbing Extremo', src: 'static/img/unnamed (1).jpg' },
    { id: 4, title: 'Entrada Principal', src: 'static/img/Rancho Viejo.jpg' },
    { id: 5, title: 'Rutas en Cuatrimoto', src: 'static/img/maxresdefault.jpg' },
    { id: 6, title: 'Tirolesa Panorámica', src: 'static/img/Canopy-Las-Golondrinas-1-e1635561376796.jpg' },
    { id: 7, title: 'Paseos a Caballo', src: 'static/img/la-marquesa-c.jpg' },
    { id: 8, title: 'Navegación en Canoa', src: 'static/img/unnamed.jpg' },
    { id: 9, title: 'Gastronomía Local', src: 'static/img/comida.jpg' },
    { id: 10, title: 'Mixología de Autor', src: 'static/img/d2-1.jpg' },
    { id: 11, title: 'Gotcha en el Bosque', src: 'static/img/gotcha-01-768x576.jpg' },
    { id: 12, title: 'Fogatas Nocturnas', src: 'static/img/unnamed (2).jpg' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-max-width mx-auto px-gutter py-24 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16 gallery-header">
        <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
          ÁLBUM VISUAL
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-on-background font-bold mb-4">
          Galería
        </h1>
        <div className="w-16 h-0.5 bg-secondary mx-auto"></div>
      </div>

      {/* Premium Uniform Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img.src)}
            className="gallery-item overflow-hidden rounded-lg bg-[#111810] border border-transparent hover:border-secondary transition-all duration-500 shadow-lg relative group cursor-pointer aspect-[4/3]"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
              <ZoomIn className="w-8 h-8 text-secondary mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
              <span className="font-display text-lg text-on-background font-medium">
                {img.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-secondary hover:text-white p-2 rounded-full hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl relative">
            <img
              src={selectedImage}
              alt="Ampliada"
              className="w-full h-full object-contain max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};
