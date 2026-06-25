import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'INICIO' },
    { id: 'atracciones', label: 'ATRACCIONES' },
    { id: 'menu', label: 'MENÚ' },
    { id: 'barra', label: 'LA BARRA' },
    { id: 'galeria', label: 'GALERÍA' },
    { id: 'ubicacion', label: 'UBICACIÓN' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-[#060906]/95 backdrop-blur-md py-4 border-secondary/15 shadow-xl noise-overlay'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-max-width mx-auto flex justify-between items-center px-gutter">
        {/* Brand Logo - Premium Double Lockup */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex flex-col text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
        >
          <span className="font-display text-xl md:text-2xl text-secondary font-bold tracking-wide leading-none transition-all duration-300 group-hover:text-[#eec058]">
            Valle de Rancho Viejo
          </span>
          <span className="font-accent text-[9px] text-on-background/60 tracking-[0.25em] uppercase leading-none mt-1.5 transition-colors duration-300 group-hover:text-secondary/80">
            La Marquesa
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`font-accent text-[11px] font-bold tracking-[0.2em] transition-all duration-300 cursor-pointer relative pb-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm ${
                currentPage === link.id
                  ? 'text-secondary after:scale-x-100'
                  : 'text-on-background/80 hover:text-secondary hover:scale-[1.03] after:scale-x-0'
              } after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-secondary after:origin-left after:transition-transform after:duration-300`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side items / CTA */}
        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservar por WhatsApp"
            className="btn-premium flex items-center gap-2 bg-secondary text-background px-5 py-2.5 rounded-xl font-accent text-[10px] font-bold tracking-widest shadow-lg shadow-secondary/10 transition-all duration-300 hover:scale-[1.03]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESERVAS</span>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-secondary p-2 rounded-xl hover:bg-secondary/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#060906]/98 backdrop-blur-xl border-b border-secondary/20 transition-all duration-500 ease-out overflow-hidden shadow-2xl noise-overlay ${
          isOpen ? 'max-h-[90vh] opacity-100 py-10' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center space-y-8 px-gutter">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent mb-2"></div>
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              style={{
                transitionDelay: isOpen ? `${idx * 50}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transitionProperty: 'transform, opacity, color',
                transitionDuration: '500ms'
              }}
              className={`font-accent text-xs font-bold tracking-[0.25em] cursor-pointer uppercase transition-all duration-300 ${
                currentPage === link.id ? 'text-secondary scale-105' : 'text-on-background/75 hover:text-secondary'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent mt-2"></div>
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 50}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0,
              transitionProperty: 'transform, opacity',
              transitionDuration: '500ms'
            }}
            className="btn-premium flex items-center gap-2 bg-secondary text-background px-8 py-4 rounded-xl font-accent text-xs font-bold tracking-widest mt-4 shadow-xl shadow-secondary/15 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            RESERVAR POR WHATSAPP
          </a>
        </div>
      </div>
    </nav>
  );
};
