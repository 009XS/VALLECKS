import React, { useEffect, useRef } from 'react';
import { Flame, Coffee, Heart } from 'lucide-react';
import gsap from 'gsap';

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
          name: 'Cecina',
          description: 'Tradicional de Yecapixtla, asada al carbón con cebollitas y guacamole.',
          tag: 'Especialidad',
          imgSrc: images.comida,
        },
        {
          name: 'Arrachera',
          description: 'Corte suave marinado a las finas hierbas, servido con nopal asado y frijoles de la olla.',
          tag: 'Recomendado',
        },
        {
          name: 'Chorizo Toluqueño',
          description: 'Chorizo verde artesanal de Toluca con papas doradas al comal.',
          tag: 'Sabor Local',
        },
      ],
    },
    {
      title: 'Del Comal',
      icon: <Heart className="w-5 h-5 text-secondary" />,
      items: [
        {
          name: 'Quesadillas',
          description: 'Preparadas al momento con masa azul orgánica. Elige flor de calabaza, huitlacoche o champiñones.',
          tag: 'Hecho a Mano',
          imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJoOFounHS3-KA64g0reGzzk4tlgfGL9Qa3PJu53kalToMBPNNXtHwOFr5xw9iRueGRddwtiXovMyTg_XvdBiJet5Egm7HpZIKy0imzdUoVY6EbkaN_L4pKLoGpCbwKuApEBLN4yhjfoprg3oNxAp-1j7QHj_nwS7Ds883uScaVvdJ7ylULXeoL1yHVlvzOblxtaMrL3bDncZnftTRQDY9kWc3PbbuJYe4X2ypCP68hdNw3Kzz-EKZfi9YRNle1_BhhV7FsqblA4',
        },
        {
          name: 'Tlacoyos',
          description: 'Rellenos de haba o requesón, coronados con ensalada de nopales tiernos y queso fresco.',
          tag: 'Tradicional',
        },
        {
          name: 'Sopes Sencillos',
          description: 'Grositas de maíz con base de frijoles refritos, lechuga, queso fresco, crema y salsa de la casa.',
          tag: 'Auténtico',
        },
      ],
    },
    {
      title: 'Bebidas Calientes',
      icon: <Coffee className="w-5 h-5 text-secondary" />,
      items: [
        {
          name: 'Café de Olla',
          description: 'Granos de café de altura seleccionados, infusionados con piloncillo, canela y clavo.',
          tag: 'De la Casa',
        },
        {
          name: 'Chocolate Caliente',
          description: 'Tablilla de cacao artesanal batido con molinillo de madera tradicional hasta obtener abundante espuma.',
          tag: 'Artesanal',
        },
        {
          name: 'Atole de Masa',
          description: 'Bebida prehispánica caliente a base de masa de maíz molida, aromatizada con vainilla natural.',
          tag: 'Prehispánico',
        },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.menu-category',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      {/* Hero Section */}
      <header className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="Menú background"
            className="w-full h-full object-cover opacity-35 scale-105"
            src={images.comida}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/50 via-[#060906]/85 to-[#060906]"></div>
        </div>
        <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto flex flex-col items-center menu-header">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-3">
            GASTRONOMÍA DE HERENCIA
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-on-background font-bold mb-6 tracking-tight drop-shadow-2xl">
            Sabores de la Montaña
          </h1>
          <div className="w-20 h-[1.5px] bg-secondary mx-auto"></div>
        </div>
      </header>

      {/* Main Menu Grid */}
      <main className="max-w-max-width mx-auto px-gutter py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {menuCategories.map((category, catIdx) => (
            <section key={catIdx} className="menu-category flex flex-col h-full">
              {/* Category Header */}
              <h2 className="font-display text-2xl text-secondary mb-10 border-b border-white/10 pb-4 flex items-center gap-3 font-semibold tracking-wide">
                {category.icon}
                {category.title}
              </h2>

              <div className="space-y-8 flex-grow">
                {category.items.map((item, itemIdx) => (
                  <article
                    key={itemIdx}
                    className="bg-[#0a0e0a]/40 backdrop-blur-md border border-white/5 hover:border-secondary/35 rounded-2xl overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,168,67,0.05)] flex flex-col"
                  >
                    {/* Visual Section: Image OR R3F 3D jar for Hot Drinks */}
                    {item.imgSrc ? (
                      <div className="aspect-[4/3] w-full overflow-hidden bg-black/40 relative border-b border-white/5">
                        <SmartImage
                          src={item.imgSrc}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                      </div>
                    ) : item.name === 'Café de Olla' ? (
                      /* Editorial Spotlight Panel for Café de Olla */
                      <div className="h-[240px] w-full bg-[#110e08]/90 relative flex flex-col items-center justify-center border-b border-white/5 overflow-hidden p-6 text-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.1)_0%,transparent_75%)] pointer-events-none"></div>
                        {/* Elegant double-thin border frame */}
                        <div className="absolute inset-4 border border-secondary/15 rounded-xl pointer-events-none"></div>
                        <div className="absolute inset-5 border border-secondary/5 rounded-xl pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                          <Coffee className="w-12 h-12 text-secondary mb-3 opacity-90" />
                          <span className="font-accent text-[9px] text-secondary font-bold tracking-[0.25em] uppercase mb-1">
                            ELIXIR DE LA CASA
                          </span>
                          <span className="font-display text-xs text-on-surface-variant/80 italic max-w-[200px]">
                            "Infusionado lentamente al calor del fogón de leña"
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {/* Content Section */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-xl text-on-surface font-semibold group-hover:text-secondary transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="w-full border-t border-dashed border-white/10 my-4"></div>
                        <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed italic">
                          {item.description}
                        </p>
                      </div>
                      {item.tag && (
                        <div className="mt-6 flex">
                          <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[9px] font-extrabold uppercase tracking-wider rounded border border-secondary/20">
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

      {/* Atmospheric Cooking Graphic */}
      <section className="w-full h-80 md:h-[450px] relative overflow-hidden my-24 border-y border-secondary/10">
        <img
          className="w-full h-full object-cover object-center opacity-40 scale-105"
          alt="Masa shaping"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxhYYZIAe1rTjj8xLmIwH_8W5l29SfR7exXa4h6pNDZuGtN8h4OXshefdl9DUFr0reJA_SfX_acOV435QkJsxK0anL4BAv8GxtjXL4ULr_SV3dVvh3VIaufd6VtE6Z5jLMcAlm-Y9uwQ--E8fldQTFDYuDle9iW4qbUU-tUiQMACvrwgrLjJnqZ4_TE3KgotlA4AktTUFWjZWcoQiOdnRioVURTRatb9jTpPYD_NcMHe1s80bCbZXgiECjxIF4qXUwvStAHFmfXjY"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-background/30"></div>
      </section>
    </div>
  );
};
