import React, { useEffect, useRef } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { images } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';

interface AttractionItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  imgSrc: string;
}

export const Atracciones: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const attractions: AttractionItem[] = [
    {
      id: 'gotcha',
      tag: 'ACTIVIDAD GRUPAL',
      title: 'Gotcha en el Bosque',
      description: 'Disfruta de una partida de gotcha en un campo natural diseñado dentro del bosque. Aprovecha los árboles, rocas y trincheras de madera rústica para trazar tu estrategia con amigos o familia en una convivencia activa.',
      imgSrc: images.gotcha,
    },
    {
      id: 'cuatrimotos',
      tag: 'RECORRIDO GUIADO',
      title: 'Cuatrimotos y Senderos',
      description: 'Explora senderos privados rodeados de árboles altos. Conduce a tu propio ritmo siguiendo al guía local en una ruta de montaña diseñada para disfrutar de los paisajes y la vegetación de la región.',
      imgSrc: images.cuatrimotos,
    },
    {
      id: 'tirolesas',
      tag: 'ALTURA Y BOSQUE',
      title: 'Tirolesa de Copa a Copa',
      description: 'Cruza de un extremo a otro en nuestras líneas de acero suspendidas. Admira el valle desde la altura en un deslizamiento diseñado para toda la familia bajo la asistencia de nuestro equipo de apoyo.',
      imgSrc: images.tirolesa,
    },
    {
      id: 'caballo',
      tag: 'PASEO FAMILIAR',
      title: 'Paseos a Caballo por el Valle',
      description: 'Relájate en un recorrido a caballo por los senderos planos y las praderas del valle. Una actividad tradicional, pausada y tranquila, ideal para niños y adultos que desean disfrutar del entorno a paso lento.',
      imgSrc: images.caballo,
    },
  ];

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.reveal-item',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.25, ease: 'power3.out' }
        );
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-background noise-overlay pt-32">
      {/* Top Cinematic Page Header */}
      <div className="max-w-max-width mx-auto px-gutter text-center mb-12 reveal-item">
        <span className="font-accent text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-3">
          RECREACIÓN Y CONVIVENCIA
        </span>
        <h1 className="font-display text-4xl md:text-6xl text-on-background font-bold mb-6 tracking-tight">
          Aventura en el Bosque
        </h1>
        <div className="w-20 h-[1.5px] bg-secondary mx-auto mb-6"></div>
        <p className="font-body text-sm md:text-base text-on-surface-variant/90 max-w-xl mx-auto leading-relaxed">
          Ofrecemos espacios y actividades al aire libre diseñadas para el esparcimiento familiar, retiros de grupos y amantes de la naturaleza de montaña.
        </p>
      </div>

      {/* Large Asymmetric Editorial Showcase */}
      <div className="max-w-max-width mx-auto px-gutter space-y-16">
        {attractions.map((attraction, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={attraction.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 reveal-item ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Box inside Editorial Frame */}
              <div className="w-full lg:w-1/2">
                <div className="editorial-frame rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/30">
                    <SmartImage
                      src={attraction.imgSrc}
                      alt={attraction.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                    />
                  </div>
                </div>
              </div>

              {/* Text / Copy details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="font-accent text-[9px] font-extrabold text-secondary uppercase tracking-widest block">
                  {attraction.tag}
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-on-background font-bold tracking-tight">
                  {attraction.title}
                </h2>
                <div className="w-12 h-[1px] bg-secondary/40"></div>
                <p className="font-body text-sm md:text-base text-on-surface-variant/90 leading-relaxed">
                  {attraction.description}
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/525538773469"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary hover:text-[#eec058] font-accent text-xs font-bold tracking-wider transition-colors cursor-pointer"
                  >
                    <span>COMENTAR DETALLES POR WHATSAPP</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Group / Family CTA */}
      <section className="max-w-4xl mx-auto px-gutter py-16 text-center mt-16 reveal-item">
        <div className="rounded-3xl border border-secondary/25 bg-[#080c08] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.04)_0%,transparent_75%)] pointer-events-none"></div>
          <h3 className="font-display text-2xl md:text-3xl text-on-background font-bold mb-4">
            ¿Planeas un evento grupal o paseo familiar?
          </h3>
          <p className="font-body text-sm text-on-surface-variant/90 mb-8 max-w-xl mx-auto leading-relaxed">
            Coordinamos reservaciones para grupos escolares, integraciones familiares o reuniones de amigos. Contáctanos para conocer disponibilidad de espacios y planear un día completo en el rancho.
          </p>
          <a
            className="btn-premium inline-flex items-center justify-center px-8 py-4.5 bg-secondary text-background font-accent text-[11px] font-bold rounded-xl hover:scale-[1.02] transition-all tracking-widest shadow-xl shadow-secondary/10"
            href="https://wa.me/525538773469"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            INICIAR RESERVACIÓN
          </a>
        </div>
      </section>
    </div>
  );
};
