import React from 'react';
import { MapPin, Mail, Camera, Share2 } from 'lucide-react';


interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-secondary/30 w-full relative z-20">
      <div className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-stack-lg px-gutter py-section-padding">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={() => handleNavClick('home')}
            className="font-display text-2xl text-secondary font-bold mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            La Marquesa
          </button>
          <p className="font-body text-sm text-on-surface-variant max-w-sm">
            Valle de Rancho Viejo. Un refugio de herencia, calidez y exclusividad en las alturas. Descubre la majestuosidad de la naturaleza en un entorno de lujo rústico inigualable.
          </p>
        </div>

        {/* Navigation Links Column */}
        <div className="flex flex-col items-center space-y-3">
          <h4 className="font-accent text-xs font-bold text-secondary tracking-widest mb-2">NAVEGACIÓN</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-center md:text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavClick('atracciones')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all cursor-pointer"
            >
              Atracciones
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all cursor-pointer"
            >
              Menú
            </button>
            <button
              onClick={() => handleNavClick('barra')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all cursor-pointer"
            >
              La Barra
            </button>
            <button
              onClick={() => handleNavClick('galeria')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all cursor-pointer"
            >
              Galería
            </button>
            <button
              onClick={() => handleNavClick('ubicacion')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all cursor-pointer"
            >
              Ubicación
            </button>
          </div>
        </div>

        {/* Contact and Social Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-accent text-xs font-bold text-secondary tracking-widest mb-4">CONTACTO & REDES</h4>
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center md:justify-start text-on-background/70">
              <MapPin className="w-4 h-4 mr-2 text-secondary shrink-0" />
              <span className="font-body text-sm">Valle de Rancho Viejo, Ocoyoacac, Méx.</span>
            </div>
            <div className="flex items-center justify-center md:justify-start text-on-background/70">
              <Mail className="w-4 h-4 mr-2 text-secondary shrink-0" />
              <span className="font-body text-sm">hola@lamarquesa.mx</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 border border-secondary/35 rounded-lg flex items-center justify-center text-on-background/70 hover:text-secondary hover:border-secondary hover:scale-105 transition-all duration-300"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Compartir"
              className="w-10 h-10 border border-secondary/35 rounded-lg flex items-center justify-center text-on-background/70 hover:text-secondary hover:border-secondary hover:scale-105 transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary/10 py-6 text-center">
        <p className="font-accent text-xs text-on-surface-variant/50">
          © {new Date().getFullYear()} La Marquesa. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
