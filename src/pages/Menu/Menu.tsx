import React, { useEffect, useRef } from 'react';
import { Flame, Coffee, Heart } from 'lucide-react';
import { images } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';

interface MenuItem {
  name: string;
  description: string;
  tag?: string;
  imgSrc?: string;
}

interface MenuCategory {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

export const Menu: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const menuCategories: MenuCategory[] = [
    {
      title: 'Carnes a la Leña',
      icon: <Flame className="w-5 h-5 text-secondary" />,
      items: [
        {
          name: 'Cecina Tradicional',
          description: 'Servida al carbón con cebollitas asadas, guacamole y tortillas hechas en el comal.',
          tag: 'Especialidad',
          imgSrc: images.comida,
        },
        {
          name: 'Arrachera de Montaña',
          description: 'Corte marinado con hierbas de olor, acompañado de nopales tiernos y frijoles de la olla.',
          tag: 'Recomendado',
        },
        {
          name: 'Chorizo Verde de Toluca',
          description: 'Chorizo artesanal preparado según la receta local, asado al carbón con guarnición de papas.',
          tag: 'Sabor Local',
        },
      ],
    },
    {
      title: 'Del Comal',
      icon: <Heart className="w-5 h-5 text-secondary" />,
      items: [
        {
          name: 'Quesadillas en Masa Azul',
          description: 'Preparadas al momento con masa de maíz azul. Rellenas a elegir: champiñones, huitlacoche o queso local.',
          tag: 'Hecho a Mano',
          imgSrc: images.comida, // Replaced external Google URL with local image asset
        },
        {
          name: 'Tlacoyos de Requesón',
          description: 'Rellenos de requesón o haba, coronados con ensalada fresca de nopales y queso espolvoreado.',
          tag: 'Tradicional',
        },
        {
          name: 'Sopes Tradicionales',
          description: 'Pellizcados al momento con base de frijoles refritos, lechuga, queso fresco y salsa casera.',
          tag: 'Clásico',
        },
      ],
    },
    {
      title: 'Bebidas Calientes',
      icon: <Coffee className="w-5 h-5 text-secondary" />,
      items: [
        {
          name: 'Café de Olla',
          description: 'Preparado lentamente en olla de barro tradicional con piloncillo, canela y un toque de clavo.',
          tag: 'Receta Familiar',
        },
        {
          name: 'Chocolate de Mesa',
          description: 'Tablilla de chocolate artesanal batido a mano con molinillo tradicional hasta obtener espuma.',
          tag: 'Artesanal',
        },
        {
          name: 'Atole de Maíz',
          description: 'Bebida caliente a base de maíz molido y endulzado, aromatizada con vainilla de rama.',
          tag: 'Tradicional',
        },
      ],
    },
  ];

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.menu-reveal',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
        );
      }, containerRef);
      return () => ctx.revert();
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-background noise-overlay">
      {/* Restaurant-Style Editorial Header */}
      <header className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
          <img
            alt="Menú de comida"
            className="w-full h-full object-cover opacity-55 scale-102"
            src={images.comida}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/40 via-[#060906]/75 to-[#060906]"></div>
        </div>
        <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto flex flex-col items-center menu-reveal">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-3">
            SABORES RÚSTICOS Y COCINA DE FUEGO
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-on-background font-bold mb-6 tracking-tight">
            Nuestra Cocina
          </h1>
          <div className="w-20 h-[1.5px] bg-secondary mx-auto mb-4"></div>
          <p className="font-body text-sm md:text-base text-on-surface-variant/90 max-w-lg leading-relaxed">
            Platillos tradicionales preparados con ingredientes de la región, cocinados al carbón y al comal al estilo del rancho.
          </p>
        </div>
      </header>

      {/* Featured Traditional Item (Café de Olla) Spotlight */}
      <section className="max-w-4xl mx-auto px-gutter mb-12 menu-reveal">
        <div className="rounded-3xl border border-secondary/25 bg-[#080c08] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.05)_0%,transparent_75%)] pointer-events-none"></div>
          
          {/* Café de Olla Editorial Showcase */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full aspect-square max-w-[280px] bg-[#110e08]/90 rounded-2xl relative flex flex-col items-center justify-center p-6 border border-secondary/20 shadow-inner">
              <div className="absolute inset-4 border border-secondary/15 rounded-xl pointer-events-none"></div>
              <div className="absolute inset-5 border border-secondary/5 rounded-xl pointer-events-none"></div>
              <Coffee className="w-16 h-16 text-secondary mb-4 opacity-90" />
              <span className="font-accent text-[9px] text-secondary font-bold tracking-[0.25em] uppercase mb-1">
                ELIXIR TRADICIONAL
              </span>
              <span className="font-display text-xs text-on-surface-variant/75 italic text-center max-w-[180px]">
                "Preparado al calor de la leña"
              </span>
            </div>
          </div>

          {/* Description Text */}
          <div className="w-full md:w-1/2 space-y-4">
            <span className="font-accent text-[8px] font-bold text-secondary uppercase tracking-widest block">
              ESPECIALIDAD CALIENTE
            </span>
            <h3 className="font-display text-2xl text-on-background font-bold tracking-tight">
              Café de Olla Tradicional
            </h3>
            <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
              Infusionado en ollas de barro rústicas con piloncillo de caña, canela entera y especias seleccionadas. Es el acompañamiento perfecto para las mañanas frías en la montaña.
            </p>
            <div className="pt-2">
              <span className="px-3 py-1 bg-secondary/15 text-secondary text-[9px] font-extrabold uppercase tracking-widest rounded border border-secondary/25">
                DE LA CASA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Grid with Categories */}
      <main className="max-w-max-width mx-auto px-gutter py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {menuCategories.map((category, catIdx) => (
            <section key={catIdx} className="menu-reveal flex flex-col h-full">
              {/* Category Header with Warm Gold styling */}
              <h2 className="font-display text-xl text-secondary mb-8 border-b border-secondary/20 pb-4 flex items-center gap-3 font-semibold tracking-wide">
                {category.icon}
                {category.title}
              </h2>

              <div className="space-y-6 flex-grow">
                {category.items.map((item, itemIdx) => (
                  <article
                    key={itemIdx}
                    className="bg-[#080c08] border border-white/5 hover:border-secondary/25 rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-[0_16px_32px_rgba(0,0,0,0.6)] flex flex-col"
                  >
                    {/* Visual Section if Image exists */}
                    {item.imgSrc && (
                      <div className="aspect-[16/10] w-full overflow-hidden bg-black/40 relative border-b border-white/5">
                        <SmartImage
                          src={item.imgSrc}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-base text-on-surface font-semibold group-hover:text-secondary transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="w-full border-t border-dashed border-white/10 my-3"></div>
                        <p className="font-body text-xs text-on-surface-variant/90 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      {item.tag && (
                        <div className="mt-4 flex">
                          <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[8px] font-bold uppercase tracking-wider rounded border border-secondary/20">
                            {item.tag}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Atmospheric Cooking Graphic - Replaced Google URL with Local WebP images.fogatas */}
      <section className="w-full h-64 md:h-[300px] relative overflow-hidden my-12 border-y border-white/5">
        <SmartImage
          className="w-full h-full object-cover object-center opacity-55 scale-102"
          alt="Cocina y fogón campestre"
          src={images.fogatas}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-background/25"></div>
      </section>
    </div>
  );
};
