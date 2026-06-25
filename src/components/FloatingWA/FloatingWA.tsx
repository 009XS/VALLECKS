import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWA: React.FC = () => {
  return (
    <a
      href="https://wa.me/525538773469"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg z-50 pulse-whatsapp flex items-center justify-center hover:bg-[#20b858] transition-colors"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
};
