import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import { images } from '../../config/images';

interface CocktailItem {
  id: 'pitufos' | 'mojito' | 'cantaritos';
  name: string;
  ingredients: string;
  tags: string[];
  imgSrc: string;
}

export const Barra: React.FC = () => {
  const [activeCocktail, setActiveCocktail] = useState<CocktailItem['id']>('pitufos');
  const containerRef = useRef<HTMLDivElement>(null);

  const cocktails: CocktailItem[] = [
    {
      id: 'pitufos',
      name: 'Pitufos',
      ingredients: 'Vodka, blue curaçao, refresco de limón, escarchado de cereza.',
      tags: ['Dulce', 'Fresco'],
      imgSrc: images.pitufos, // Using gallery mixology image
    },
    {
      id: 'mojito',
      name: 'Mojito Tradicional',
      ingredients: 'Ron blanco, jugo de limón fresco, hojas de hierbabuena maceradas, azúcar y agua mineral.',
      tags: ['Clásico', 'Fresco', 'Cítrico'],
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq6igYrV9zStfqjkBBcdP9aRfR4vDnMoFQcIXDc-eInCKf_QHEqHoOrh4Ahwe2jl5A_49h4lfH-yFYlcj_cxjv9yb-w3CFg7Kxu9U4HfQo45A3lc81fiZRxNt953YI0tkfBKzLQspRppAFSenfhUMkGwgEYQe5LuymTAkG88LB5AS1BC9njwG6BtV9jAgkmUWhOg-jkLhst41pjTXjPbPZDtVtqS3_4yatsd0gD3kBnKKNS6a8W5H76tPsU_MTTZa_CtKVHpNsbMQ',
    },
    {
      id: 'cantaritos',
      name: 'Cantaritos el Valle',
      ingredients: 'Tequila reposado, jugo de naranja fresca, toronja y limón exprimidor, refresco de toronja y sal de grano.',
      tags: ['Tradicional', 'Cítrico', 'Fuerte'],
      imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuXt6rkcapMCXiFnvRBMELuuR2L_vIqzmlw1o9clsoJCpxFQ1neYCni8FACdb_8hyAKdpeDj8tGP4lkUSIDxgltNro_c-RpdLfAuQYrVypcJkwZTu7Q1SWssPN7Fnjkj-Kfrb6xsLyF5JWP-7Pt5vWOoXf0YAfdL4O3a23LjWxcau5MjJ5pc8RWGwye8YzHt9JjIjZQ9FNIt5HO959pEB6--ffDjtRqyI_g1QdCQIFGw45mANWcEsT7K9y0LWZUwrUs_XZvN3zIB6M',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.barra-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.cocktail-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.details-section',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[60vh] flex flex-col items-center justify-center text-center px-gutter overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Cinematic dark bar"
            className="w-full h-full object-cover opacity-20 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB41nlxbY2Vny9M0UnqYrDhWLGXQBIU64CUDQVx-JqHSIO01Q5YHVOdrFEYUmFuCLsyliR1BGb0JzXwXAAIltnchO1PGZHOKtj7IoSP4zjN6uX43FReeKl5rTgdKHp-pAOQcp-R1zf3u93t-4uIyQdnL5wu8M8MKG8gQ4b-6aBqltf84AVynNNq0JC_1gd_gDjjABz9P8nfA_tSmzg-vhsh_CwcMhG1GOSZ2ZcXuG_9FesRIkU6QyZSMlOpe7BhXm5JiLJpTq3hqDA"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/50 via-[#060906]/85 to-[#060906]"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4 barra-header">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
            MIXOLOGÍA RÚSTICA DE AUTOR
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-on-background font-bold tracking-tight">
            La Barra
          </h1>
          <div className="w-20 h-[1.5px] bg-secondary mx-auto mb-4"></div>
          <p className="font-body text-base md:text-lg text-on-surface-variant/90 max-w-xl mx-auto italic leading-relaxed">
            Coctelería de autor y bebidas refrescantes en el corazón del bosque.
          </p>
        </div>
      </header>

      {/* Main Cocktails Visualizer */}
      <section className="py-24 px-gutter bg-[#060906]">
        <div className="max-w-max-width mx-auto">
          {/* Section title */}
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-4xl text-on-background font-bold mb-4 tracking-tight">
              Coctelería de Autor
            </h2>
            <div className="w-12 h-[1px] bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Middle: Premium 2D Drink Showcase */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[460px] aspect-[4/5] bg-black/60 backdrop-blur-lg border border-secondary/20 rounded-2xl flex flex-col justify-between p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.04)_0%,transparent_70%)] pointer-events-none"></div>

                <div className="relative z-10 w-full">
                  <div className="text-center mb-4">
                    <span className="font-accent text-[9px] font-extrabold text-secondary tracking-[0.25em] uppercase">
                      PRESENTACIÓN EDITORIAL
                    </span>
                  </div>

                  {/* Drink Image Display */}
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 relative shadow-inner">
                    <img
                      src={cocktails.find((c) => c.id === activeCocktail)?.imgSrc || ''}
                      alt={cocktails.find((c) => c.id === activeCocktail)?.name || ''}
                      className="w-full h-full object-cover select-none pointer-events-none transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                <div className="text-center z-10 mt-6 w-full">
                  <h4 className="font-display text-2xl text-secondary font-bold mb-2 tracking-wide">
                    {cocktails.find((c) => c.id === activeCocktail)?.name}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant/90 max-w-sm mx-auto leading-relaxed mb-6">
                    {cocktails.find((c) => c.id === activeCocktail)?.ingredients}
                  </p>
                  
                  {/* Client Confirmation Note */}
                  <div className="border border-secondary/10 bg-secondary/5 rounded-xl p-4 text-[10px] text-on-surface-variant/80 italic leading-relaxed">
                    Nota: La disponibilidad de alcohol en barra y menús extendidos está sujeta a confirmación final de permisos y normatividad del establecimiento.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Selection Cards */}
            <div className="lg:col-span-6 space-y-6">
              {cocktails.map((cocktail) => (
                <button
                  key={cocktail.id}
                  type="button"
                  onClick={() => setActiveCocktail(cocktail.id)}
                  className={`p-6 border rounded-xl transition-all duration-500 cursor-pointer cocktail-card flex flex-col justify-between w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 ${
                    activeCocktail === cocktail.id
                      ? 'border-secondary bg-black/60 shadow-[0_12px_40px_rgba(212,168,67,0.08),0_0_30px_rgba(0,0,0,0.6)] scale-[1.01]'
                      : 'border-white/5 hover:border-secondary/35 bg-[#0a0e0a]/40 backdrop-blur-md hover:scale-[1.005]'
                  }`}
                >
                  <div>
                    <h3 className="font-display text-xl text-secondary font-semibold mb-3 group-hover:text-secondary-hover">
                      {cocktail.name}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed italic mb-5">
                      {cocktail.ingredients}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cocktail.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-secondary/10 text-secondary text-[9px] font-extrabold uppercase tracking-wider rounded border border-secondary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric Pour Graphic */}
      <section className="relative h-80 md:h-[450px] w-full overflow-hidden my-24 border-y border-secondary/10">
        <img
          alt="Bartender pouring drink"
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVrFXFsl5hu7IfZBfqimsZKL7hEmo9zfUpYMPT9JsWyrTdCCYbLsxEyvpLWLygnoO7SNTBeMwQz17e-rlJwxDK7E6T9rtlZLN30PftqxuV8RyUFDe6PaoUyeGQrCgPqrOwWU5Af4RtIAa6mWS7CTR-D5KulPk4sAb-ISaIJFHgef_7_JhOwudBARMhOcGuofnKRDUS3GuLYDfWE1w57mVmIQ68SB7bDryt-7vWHBjwK_p-HdHKDD5gARoASrB06EjgpkOFqYoecjE"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-background/45"></div>
      </section>

      {/* Detailed Lists */}
      <section className="py-24 px-gutter bg-[#060906] details-section">
        <div className="max-w-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Beers */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-secondary mb-8 border-b border-white/10 pb-4 tracking-wide font-semibold">
                Cervezas Artesanales
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-base text-on-surface">Stout Oscura</span>
                  <span className="font-accent text-[9px] font-extrabold text-secondary/70 uppercase tracking-widest border border-secondary/20 bg-secondary/5 px-2 py-0.5 rounded">Local</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-base text-on-surface">Pale Ale</span>
                  <span className="font-accent text-[9px] font-extrabold text-secondary/70 uppercase tracking-widest border border-secondary/20 bg-secondary/5 px-2 py-0.5 rounded">Refrescante</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-base text-on-surface">Lager Especial</span>
                  <span className="font-accent text-[9px] font-extrabold text-secondary/70 uppercase tracking-widest border border-secondary/20 bg-secondary/5 px-2 py-0.5 rounded">Clásica</span>
                </li>
              </ul>
            </div>

            {/* Non-Alcoholic / Hot Drinks */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-secondary mb-8 border-b border-white/10 pb-4 tracking-wide font-semibold">
                Sin Alcohol &amp; Tradicionales
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-base text-on-surface">Café de Olla</span>
                  <span className="font-accent text-[9px] font-extrabold text-secondary/70 uppercase tracking-widest border border-secondary/20 bg-secondary/5 px-2 py-0.5 rounded">Leña &amp; Canela</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-base text-on-surface">Chocolate Caliente</span>
                  <span className="font-accent text-[9px] font-extrabold text-secondary/70 uppercase tracking-widest border border-secondary/20 bg-secondary/5 px-2 py-0.5 rounded">Artesanal</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-base text-on-surface">Naranjada Mineral</span>
                  <span className="font-accent text-[9px] font-extrabold text-secondary/70 uppercase tracking-widest border border-secondary/20 bg-secondary/5 px-2 py-0.5 rounded">Fresco</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Strip */}
      <div className="bg-black/85 py-5 border-t border-white/5 text-center px-gutter">
        <p className="font-accent text-[9px] text-on-surface-variant/60 uppercase tracking-widest">
          EVITE EL EXCESO. BEBA CON RESPONSABILIDAD.
        </p>
      </div>
    </div>
  );
};
