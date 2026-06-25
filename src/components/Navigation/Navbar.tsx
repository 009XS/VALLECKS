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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-md py-3 border-secondary/20 shadow-lg'
          : 'bg-background/40 backdrop-blur-sm py-5 border-transparent'
      }`}
    >
      <div className="max-w-max-width mx-auto flex justify-between items-center px-gutter">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-display text-2xl md:text-3xl text-secondary font-bold tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          La Marquesa
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-accent text-xs font-semibold tracking-widest transition-all duration-300 cursor-pointer ${
                currentPage === link.id
                  ? 'text-secondary border-b-2 border-secondary pb-1'
                  : 'text-on-background/80 hover:text-secondary hover:scale-105'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="chat"
            className="text-secondary hover:scale-110 transition-transform duration-300 flex items-center justify-center p-2 rounded-full hover:bg-secondary/10"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-secondary p-1 rounded hover:bg-secondary/10 cursor-pointer"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-secondary/20 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center space-y-5 px-gutter">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-accent text-sm font-semibold tracking-wider transition-colors cursor-pointer ${
                currentPage === link.id ? 'text-secondary' : 'text-on-background/70 hover:text-secondary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
