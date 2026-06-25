/**
 * Performance Telemetry Utilities
 * 
 * Used only in development mode to log load times and route transitions.
 * Compiled out or disabled in production to guarantee zero performance overhead.
 */

const isDev = import.meta.env.MODE === 'development';

let bootStartTime = performance.now();

/**
 * Logs the time from script execution start to initial React component mount.
 */
export const logBootTime = () => {
  if (!isDev) return;
  const bootDuration = performance.now() - bootStartTime;
  console.log(
    `%c[Performance] App Boot (React Mount): %c${bootDuration.toFixed(2)}ms`,
    'color: #8e928a; font-weight: bold;',
    'color: #eec058; font-weight: bold;'
  );
};

/**
 * Hook to window load event to log page lifecycle metrics (FCP, LCP, loadEventEnd).
 */
export const logLoadTime = () => {
  if (!isDev) return;
  
  window.addEventListener('load', () => {
    // Wait for the load event to settle
    setTimeout(() => {
      if (window.performance) {
        let loadTime = 0;
        const perfEntries = window.performance.getEntriesByType('navigation');
        if (perfEntries.length > 0) {
          const navTiming = perfEntries[0] as PerformanceNavigationTiming;
          loadTime = Math.round(navTiming.loadEventEnd - navTiming.startTime);
        } else if (window.performance.timing) {
          const navStart = window.performance.timing.navigationStart;
          const loadEnd = window.performance.timing.loadEventEnd;
          loadTime = loadEnd - navStart;
        }
        
        console.groupCollapsed('%c[Performance] Carga Inicial del Navegador', 'color: #eec058; font-weight: bold;');
        console.log(`Tiempo total de carga de red: ${loadTime}ms`);
        if (window.performance.getEntriesByType) {
          const paintEntries = window.performance.getEntriesByType('paint');
          paintEntries.forEach((entry) => {
            console.log(`${entry.name}: ${Math.round(entry.startTime)}ms`);
          });
        }
        console.log(
          '%c[Performance] Note: Images mapped in src/config/images.ts are optimized to WebP. Run "npm run optimize:images" to convert new JPG/PNG assets.',
          'color: #8e928a; font-style: italic;'
        );
        console.groupEnd();
      }
    }, 100);
  });
};

const routeTimes = new Map<string, number>();

/**
 * Tracks the start of a route transition animation.
 */
export const startRouteTransition = (route: string) => {
  if (!isDev) return;
  console.log(`%c[Performance] Iniciando transición a: [${route.toUpperCase()}]`, 'color: #8e928a; font-style: italic;');
  routeTimes.set(route, performance.now());
};

/**
 * Tracks the completion of a route transition animation.
 */
export const endRouteTransition = (route: string) => {
  if (!isDev) return;
  const startTime = routeTimes.get(route);
  if (startTime !== undefined) {
    const duration = performance.now() - startTime;
    console.log(
      `%c[Performance] Transición completada a [${route.toUpperCase()}]: %c${duration.toFixed(2)}ms`,
      'color: #b8ccb4; font-weight: bold;',
      'color: #eec058; font-weight: bold; font-size: 11px;'
    );
    routeTimes.delete(route);
  }
};

/**
 * Wraps dynamic dynamic imports to track dynamic chunk load duration.
 */
export const trackLazyLoad = <T>(pageName: string, importFn: () => Promise<T>): (() => Promise<T>) => {
  if (!isDev) return importFn;
  
  return () => {
    const start = performance.now();
    return importFn().then((module) => {
      const duration = performance.now() - start;
      console.log(
        `%c[Performance] Chunk de página [${pageName.toUpperCase()}] descargado y procesado en: %c${duration.toFixed(2)}ms`,
        'color: #b8ccb4; font-weight: bold;',
        'color: #3de273; font-weight: bold;'
      );
      return module;
    });
  };
};
