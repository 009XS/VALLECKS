import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Footer/Footer';
import { FloatingWA } from './components/FloatingWA/FloatingWA';
import { GlobalCanvas } from './components3d/GlobalCanvas';

// Eagerly loaded critical page
import { Home } from './pages/Home/Home';

// Lazy loaded non-critical subpages for bundle size reduction with telemetry
const Atracciones = lazy(trackLazyLoad('atracciones', () => import('./pages/Atracciones/Atracciones').then(m => ({ default: m.Atracciones }))));
const Menu = lazy(trackLazyLoad('menu', () => import('./pages/Menu/Menu').then(m => ({ default: m.Menu }))));
const Barra = lazy(trackLazyLoad('barra', () => import('./pages/Barra/Barra').then(m => ({ default: m.Barra }))));
const Galeria = lazy(trackLazyLoad('galeria', () => import('./pages/Galeria/Galeria').then(m => ({ default: m.Galeria }))));
const Ubicacion = lazy(trackLazyLoad('ubicacion', () => import('./pages/Ubicacion/Ubicacion').then(m => ({ default: m.Ubicacion }))));

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startRouteTransition, endRouteTransition, trackLazyLoad, logBootTime } from './lib/performance';

gsap.registerPlugin(ScrollTrigger);

// Lightweight premium fallback skeleton for lazy loading
const PageFallback = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-background px-gutter">
    <div className="flex flex-col items-center max-w-xs w-full text-center">
      <div className="w-8 h-8 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin mb-4"></div>
      <span className="font-accent text-[10px] font-bold text-secondary uppercase tracking-widest block">
        Cargando Experiencia...
      </span>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Log the initial React boot time on first mount
  useEffect(() => {
    logBootTime();
  }, []);

  // Smooth virtual page transition on page change with performance telemetry
  useEffect(() => {
    const element = pageContainerRef.current;
    if (!element) return;

    startRouteTransition(currentPage);

    // Scroll to top instantly
    window.scrollTo(0, 0);

    // Kill any dangling ScrollTriggers from previous page
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Fade in the new page content
    const anim = gsap.fromTo(
      element,
      { opacity: 0, y: 15 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.45, 
        ease: 'power2.out',
        onComplete: () => {
          endRouteTransition(currentPage);
        }
      }
    );

    return () => {
      anim.kill();
    };
  }, [currentPage]);

  // Render active page component
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'atracciones':
        return <Atracciones />;
      case 'menu':
        return <Menu />;
      case 'barra':
        return <Barra />;
      case 'galeria':
        return <Galeria />;
      case 'ubicacion':
        return <Ubicacion />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background relative">
      {/* 3D WebGL Background Canvas */}
      <GlobalCanvas currentPage={currentPage} />

      {/* Global Navigation Bar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area with transition wrapper */}
      <main ref={pageContainerRef} className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          {renderPageContent()}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating CTA WhatsApp */}
      <FloatingWA />
    </div>
  );
}

export default App;
