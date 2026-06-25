import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWA: React.FC = () => {
  return (
    <a
      href="https://wa.me/525538773469"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-8 right-8 bg-[#1d8a43] text-white p-4 rounded-full border border-secondary/35 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(212,168,67,0.15)] z-50 pulse-whatsapp flex items-center justify-center hover:bg-[#23a250] transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};
