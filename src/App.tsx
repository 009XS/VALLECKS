import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Footer/Footer';
import { FloatingWA } from './components/FloatingWA/FloatingWA';
import { GlobalCanvas } from './components3d/GlobalCanvas';

// Pages
import { Home } from './pages/Home/Home';
import { Atracciones } from './pages/Atracciones/Atracciones';
import { Menu } from './pages/Menu/Menu';
import { Barra } from './pages/Barra/Barra';
import { Galeria } from './pages/Galeria/Galeria';
import { Ubicacion } from './pages/Ubicacion/Ubicacion';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Smooth virtual page transition on page change
  useEffect(() => {
    const element = pageContainerRef.current;
    if (!element) return;

    // Scroll to top instantly
    window.scrollTo(0, 0);

    // Kill any dangling ScrollTriggers from previous page
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Fade in the new page content
    const anim = gsap.fromTo(
      element,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
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
        {renderPageContent()}
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating CTA WhatsApp */}
      <FloatingWA />
    </div>
  );
}

export default App;
