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
    <footer className="bg-black/85 border-t border-white/5 w-full relative z-20">
      <div className="max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-gutter py-24">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="font-display text-2xl text-secondary font-bold mb-4 hover:scale-[1.02] transition-transform duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
          >
            La Marquesa
          </button>
          <p className="font-body text-sm text-on-surface-variant/80 max-w-sm leading-relaxed">
            Valle de Rancho Viejo. Un refugio de herencia, calidez y exclusividad en las alturas. Descubre la majestuosidad de la naturaleza en un entorno de lujo rústico inigualable.
          </p>
        </div>

        {/* Navigation Links Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="font-accent text-[10px] font-bold text-secondary tracking-widest uppercase mb-2">NAVEGACIÓN</h4>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-center md:text-left">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('atracciones')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
            >
              Atracciones
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('menu')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
            >
              Menú
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('barra')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
            >
              La Barra
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('galeria')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
            >
              Galería
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ubicacion')}
              className="font-body text-sm text-on-background/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
            >
              Ubicación
            </button>
          </div>
        </div>

        {/* Contact and Social Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-accent text-[10px] font-bold text-secondary tracking-widest uppercase mb-4">CONTACTO & REDES</h4>
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
              className="w-10 h-10 bg-[#0a0e0a]/40 border border-white/5 rounded-xl flex items-center justify-center text-on-background/70 hover:text-secondary hover:border-secondary/40 hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
            >
              <Camera className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Compartir"
              className="w-10 h-10 bg-[#0a0e0a]/40 border border-white/5 rounded-xl flex items-center justify-center text-on-background/70 hover:text-secondary hover:border-secondary/40 hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center">
        <p className="font-accent text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
          © {new Date().getFullYear()} La Marquesa. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
