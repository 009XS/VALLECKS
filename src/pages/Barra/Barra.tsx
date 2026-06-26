import React, { useState, useEffect, useRef } from 'react';
import { Wine, AlertTriangle, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';
import { images } from '../../config/images';
import { SmartImage } from '../../components/ui/SmartImage';

interface DrinkItem {
  id: string;
  name: string;
  ingredients: string;
  notes?: string;
  imgSrc: string;
}

export const Barra: React.FC = () => {
  const [activeDrink, setActiveDrink] = useState<string>('pitufos');
  const containerRef = useRef<HTMLDivElement>(null);

  const drinksList: DrinkItem[] = [
    {
      id: 'pitufos',
      name: 'Bebidas Preparadas',
      ingredients: 'Coctelería de la casa servida en escarchados tradicionales y combinaciones refrescantes.',
      notes: 'Consultar sabores del día.',
      imgSrc: images.pitufos, // Replaced external Google URL with local image asset
    },
    {
      id: 'tradicionales',
      name: 'Bebidas Calientes y Frías',
      ingredients: 'Café de olla preparado al fogón, chocolate artesanal, atoles y naranjadas con agua mineral.',
      notes: 'Aptas para toda la familia.',
      imgSrc: images.comida,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.barra-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-background noise-overlay">
      {/* Cinematic Editorial Header */}
      <header className="relative h-[50vh] flex flex-col items-center justify-center text-center px-gutter overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            alt="Bar campestre de madera"
            className="w-full h-full object-cover opacity-55 scale-102"
            src={images.entradaPrincipal}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060906]/40 via-[#060906]/75 to-[#060906]"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4 barra-reveal">
          <span className="font-accent text-xs font-bold text-secondary uppercase tracking-[0.3em] block mb-2">
            BEBIDAS DE MONTAÑA
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-on-background font-bold tracking-tight">
            La Barra Rústica
          </h1>
          <div className="w-20 h-[1.5px] bg-secondary mx-auto mb-4"></div>
          <p className="font-body text-sm md:text-base text-on-surface-variant/90 max-w-lg mx-auto leading-relaxed">
            Coctelería preparada al momento y bebidas tradicionales calientes para acompañar tu día en el bosque.
          </p>
        </div>
      </header>

      {/* Responsible Copy Notice */}
      <section className="max-w-4xl mx-auto px-gutter mb-8 barra-reveal">
        <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <ShieldAlert className="w-6 h-6 text-secondary shrink-0" />
          <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed text-center sm:text-left">
            <strong>Aviso de disponibilidad:</strong> La oferta de bebidas preparadas y coctelería con graduación alcohólica está sujeta a confirmación de permisos del establecimiento y normatividad municipal vigente.
          </p>
        </div>
      </section>

      {/* Clean 2D Editorial Presentation */}
      <section className="py-12 px-gutter max-w-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Selected Drink Panel (2D Spotlight) */}
          <div className="lg:col-span-6 flex flex-col items-center barra-reveal">
            <div className="w-full max-w-[460px] aspect-[4/5] bg-[#080c08] border border-secondary/20 rounded-3xl flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.04)_0%,transparent_75%)] pointer-events-none"></div>

              <div className="relative z-10 w-full">
                <div className="text-center mb-4">
                  <span className="font-accent text-[9px] font-extrabold text-secondary tracking-[0.25em] uppercase">
                    SELECCIÓN DE BARRA
                  </span>
                </div>

                {/* Drink Image Display using local WebP assets */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 relative shadow-inner">
                  <SmartImage
                    src={drinksList.find((d) => d.id === activeDrink)?.imgSrc || ''}
                    alt={drinksList.find((d) => d.id === activeDrink)?.name || ''}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>
                </div>
              </div>

              <div className="text-center z-10 mt-6 w-full">
                <h4 className="font-display text-xl text-secondary font-bold mb-2 tracking-wide">
                  {drinksList.find((d) => d.id === activeDrink)?.name}
                </h4>
                <p className="font-body text-xs text-on-surface-variant/90 max-w-sm mx-auto leading-relaxed mb-6">
                  {drinksList.find((d) => d.id === activeDrink)?.ingredients}
                </p>
                {drinksList.find((d) => d.id === activeDrink)?.notes && (
                  <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary text-[8px] font-bold uppercase tracking-widest rounded border border-secondary/20">
                    {drinksList.find((d) => d.id === activeDrink)?.notes}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Drink Categories list */}
          <div className="lg:col-span-6 space-y-6 barra-reveal">
            {drinksList.map((drink) => (
              <button
                key={drink.id}
                type="button"
                onClick={() => setActiveDrink(drink.id)}
                className={`p-6 border rounded-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary/50 ${
                  activeDrink === drink.id
                    ? 'border-secondary bg-[#0a0e0a]/80 shadow-[0_12px_40px_rgba(212,168,67,0.08)] scale-[1.01]'
                    : 'border-white/5 hover:border-secondary/35 bg-[#0a0e0a]/40 backdrop-blur-md hover:scale-[1.005]'
                }`}
              >
                <div>
                  <h3 className="font-display text-lg text-on-surface font-semibold mb-2 group-hover:text-secondary">
                    {drink.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant/90 leading-relaxed italic">
                    {drink.ingredients}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Beer & Drink Listings */}
      <section className="py-16 px-gutter border-t border-white/5 barra-reveal">
        <div className="max-w-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Beers */}
            <div className="space-y-6">
              <h2 className="font-display text-xl md:text-2xl text-secondary mb-6 border-b border-secondary/20 pb-4 tracking-wide font-semibold flex items-center gap-2">
                <Wine className="w-5 h-5" />
                Cervezas
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-sm text-on-surface">Cervezas Nacionales</span>
                  <span className="font-accent text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Consultar Marcas</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-sm text-on-surface">Cerveza Stout</span>
                  <span className="font-accent text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Artesanal</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-sm text-on-surface">Cerveza Pale Ale</span>
                  <span className="font-accent text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Artesanal</span>
                </li>
              </ul>
            </div>

            {/* Non-Alcoholic / Hot Drinks */}
            <div className="space-y-6">
              <h2 className="font-display text-xl md:text-2xl text-secondary mb-6 border-b border-secondary/20 pb-4 tracking-wide font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Opciones Sin Alcohol
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-sm text-on-surface">Naranjadas y Limonadas</span>
                  <span className="font-accent text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Fresco</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-sm text-on-surface">Café y Chocolates Calientes</span>
                  <span className="font-accent text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Tradicional</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="font-body text-sm text-on-surface">Refrescos Tradicionales</span>
                  <span className="font-accent text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Embotellado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Strip */}
      <div className="bg-[#040604] py-6 border-t border-white/5 text-center px-gutter">
        <p className="font-accent text-[8px] text-on-surface-variant/50 uppercase tracking-widest">
          EVITE EL EXCESO. BEBA CON RESPONSABILIDAD. PARA MAYORES DE EDAD SI SE DISPONE ALCOHOL.
        </p>
      </div>
    </div>
  );
};
