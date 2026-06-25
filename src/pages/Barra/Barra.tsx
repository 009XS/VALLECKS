import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { FluidGlass } from '../../components3d/FluidGlass';
import gsap from 'gsap';

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
      imgSrc: 'static/img/d2-1.jpg', // Using gallery mixology image
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
            className="w-full h-full object-cover opacity-30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB41nlxbY2Vny9M0UnqYrDhWLGXQBIU64CUDQVx-JqHSIO01Q5YHVOdrFEYUmFuCLsyliR1BGb0JzXwXAAIltnchO1PGZHOKtj7IoSP4zjN6uX43FReeKl5rTgdKHp-pAOQcp-R1zf3u93t-4uIyQdnL5wu8M8MKG8gQ4b-6aBqltf84AVynNNq0JC_1gd_gDjjABz9P8nfA_tSmzg-vhsh_CwcMhG1GOSZ2ZcXuG_9FesRIkU6QyZSMlOpe7BhXm5JiLJpTq3hqDA"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4 barra-header">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-widest block mb-1">
            MIXOLOGÍA RÚSTICA DE AUTOR
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-secondary font-bold">
            La Barra
          </h1>
          <div className="w-16 h-0.5 bg-secondary mx-auto mb-4"></div>
          <p className="font-body text-base md:text-lg text-inverse-surface max-w-xl mx-auto italic">
            Coctelería de autor y bebidas refrescantes en el corazón del bosque.
          </p>
        </div>
      </header>

      {/* Main Cocktails Visualizer */}
      <section className="py-20 px-gutter bg-[#080808]">
        <div className="max-w-max-width mx-auto">
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-secondary mb-3 font-semibold">
              Coctelería de Autor
            </h2>
            <div className="w-10 h-0.5 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Middle: 3D Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[440px] aspect-square bg-[#0d140e] border border-secondary/20 rounded-2xl flex flex-col items-center justify-between p-6 shadow-2xl relative cursor-grab active:cursor-grabbing">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(238,192,88,0.08)_0%,transparent_70%)] pointer-events-none"></div>

                <div className="font-accent text-[10px] font-bold text-secondary tracking-widest uppercase">
                  SIMULADOR 3D DE FLUIDOS
                </div>

                <div className="w-full h-64">
                  <Canvas
                    camera={{ position: [0, 0.2, 2.5], fov: 45 }}
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                    dpr={[1, 2]} // Limit device pixel ratio for GPU performance on high-DPI screens
                  >
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />
                    <FluidGlass cocktailType={activeCocktail} />
                  </Canvas>
                </div>

                <div className="text-center">
                  <h4 className="font-display text-lg text-on-background font-semibold mb-1">
                    {cocktails.find((c) => c.id === activeCocktail)?.name}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant/80">
                    Mueve el cursor para interactuar con el oleaje físico del coctel.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Selection Cards */}
            <div className="lg:col-span-6 space-y-6">
              {cocktails.map((cocktail) => (
                <div
                  key={cocktail.id}
                  onClick={() => setActiveCocktail(cocktail.id)}
                  className={`p-6 border rounded-lg bg-[#111810] transition-all duration-300 cursor-pointer cocktail-card flex flex-col justify-between ${
                    activeCocktail === cocktail.id
                      ? 'border-secondary shadow-[0_0_20px_rgba(238,192,88,0.15)] bg-surface-container-high'
                      : 'border-secondary/10 hover:border-secondary/50'
                  }`}
                >
                  <div>
                    <h3 className="font-display text-xl text-secondary font-semibold mb-2">
                      {cocktail.name}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed italic mb-4">
                      {cocktail.ingredients}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cocktail.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-surface-container text-secondary text-xs uppercase tracking-wider rounded border border-surface-container-high"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Atmospheric Pour Graphic */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          alt="Bartender pouring drink"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVrFXFsl5hu7IfZBfqimsZKL7hEmo9zfUpYMPT9JsWyrTdCCYbLsxEyvpLWLygnoO7SNTBeMwQz17e-rlJwxDK7E6T9rtlZLN30PftqxuV8RyUFDe6PaoUyeGQrCgPqrOwWU5Af4RtIAa6mWS7CTR-D5KulPk4sAb-ISaIJFHgef_7_JhOwudBARMhOcGuofnKRDUS3GuLYDfWE1w57mVmIQ68SB7bDryt-7vWHBjwK_p-HdHKDD5gARoASrB06EjgpkOFqYoecjE"
        />
        <div className="absolute inset-0 bg-background/60"></div>
      </section>

      {/* Detailed Lists */}
      <section className="py-20 px-gutter bg-background details-section">
        <div className="max-w-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Beers */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-secondary mb-8 border-b border-secondary/20 pb-2">
                Cervezas Artesanales
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="font-body text-base text-inverse-surface">Stout Oscura</span>
                  <span className="font-accent text-xs text-secondary/70">Local</span>
                </li>
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="font-body text-base text-inverse-surface">Pale Ale</span>
                  <span className="font-accent text-xs text-secondary/70">Refrescante</span>
                </li>
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="font-body text-base text-inverse-surface">Lager Especial</span>
                  <span className="font-accent text-xs text-secondary/70">Clásica</span>
                </li>
              </ul>
            </div>

            {/* Non-Alcoholic / Hot Drinks */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-secondary mb-8 border-b border-secondary/20 pb-2">
                Sin Alcohol &amp; Tradicionales
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="font-body text-base text-inverse-surface">Café de Olla</span>
                  <span className="font-accent text-xs text-secondary/70">Leña &amp; Canela</span>
                </li>
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="font-body text-base text-inverse-surface">Chocolate Caliente</span>
                  <span className="font-accent text-xs text-secondary/70">Artesanal</span>
                </li>
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="font-body text-base text-inverse-surface">Naranjada Mineral</span>
                  <span className="font-accent text-xs text-secondary/70">Fresco</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Strip */}
      <div className="bg-[#1a2e1b] py-4 text-center px-gutter">
        <p className="font-accent text-[10px] text-inverse-surface/80 uppercase tracking-widest">
          EVITE EL EXCESO. BEBA CON RESPONSABILIDAD.
        </p>
      </div>
    </div>
  );
};
