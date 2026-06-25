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
          ? 'bg-[#060906]/90 backdrop-blur-md py-4 border-secondary/15 shadow-xl'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-max-width mx-auto flex justify-between items-center px-gutter">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-2xl md:text-3xl text-secondary font-bold tracking-wide hover:scale-[1.02] transition-transform duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm"
        >
          La Marquesa
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`font-accent text-[11px] font-bold tracking-widest transition-all duration-300 cursor-pointer relative pb-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 rounded-sm ${
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
            className="btn-premium flex items-center gap-2 bg-secondary text-on-secondary px-4 py-2 rounded-full font-accent text-[10px] font-bold tracking-widest transition-all duration-300 hover:scale-[1.03]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESERVAS</span>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-secondary p-2 rounded-full hover:bg-secondary/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#060906]/95 backdrop-blur-xl border-b border-secondary/15 transition-all duration-500 ease-out overflow-hidden shadow-2xl ${
          isOpen ? 'max-h-[85vh] opacity-100 py-8' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center space-y-6 px-gutter">
          <div className="w-12 h-[1px] bg-secondary/20 mb-2"></div>
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              style={{
                transitionDelay: isOpen ? `${idx * 40}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(15px)',
                opacity: isOpen ? 1 : 0,
                transitionProperty: 'transform, opacity, color',
                transitionDuration: '400ms'
              }}
              className={`font-accent text-xs font-bold tracking-widest cursor-pointer uppercase ${
                currentPage === link.id ? 'text-secondary scale-105' : 'text-on-background/70 hover:text-secondary'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="w-12 h-[1px] bg-secondary/20 mt-2"></div>
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 40}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(15px)',
              opacity: isOpen ? 1 : 0,
              transitionProperty: 'transform, opacity',
              transitionDuration: '400ms'
            }}
            className="btn-premium flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-full font-accent text-xs font-bold tracking-widest mt-4 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            RESERVAR POR WHATSAPP
          </a>
        </div>
      </div>
    </nav>
  );
};
