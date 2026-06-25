import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { images as imageAssets } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';

interface GalleryItem {
  id: number;
  title: string;
  src: string;
}

export const Galeria: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryImages: GalleryItem[] = [
    { id: 1, title: 'Lago Místico', src: imageAssets.lagoMistico },
    { id: 2, title: 'Valle de Dinosaurios', src: imageAssets.valleDinosaurios },
    { id: 3, title: 'Zorbing Extremo', src: imageAssets.zorbing },
    { id: 4, title: 'Entrada Principal', src: imageAssets.entradaPrincipal },
    { id: 5, title: 'Rutas en Cuatrimoto', src: imageAssets.cuatrimotos },
    { id: 6, title: 'Tirolesa Panorámica', src: imageAssets.tirolesa },
    { id: 7, title: 'Paseos a Caballo', src: imageAssets.paseosCaballo },
    { id: 8, title: 'Navegación en Canoa', src: imageAssets.canoas },
    { id: 9, title: 'Gastronomía Local', src: imageAssets.comida },
    { id: 10, title: 'Mixología de Autor', src: imageAssets.pitufos },
    { id: 11, title: 'Gotcha en el Bosque', src: imageAssets.gotcha },
    { id: 12, title: 'Fogatas Nocturnas', src: imageAssets.fogatas },
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
        {galleryImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img.src)}
            className="gallery-item overflow-hidden rounded-lg bg-[#111810] border border-transparent hover:border-secondary transition-all duration-500 shadow-lg relative group cursor-pointer aspect-[4/3]"
          >
            <SmartImage
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
