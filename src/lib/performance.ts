/**
 * Performance Telemetry Utilities
 * 
 * Used only in development mode to log load times and route transitions.
 * Compiled out or disabled in production to guarantee zero performance overhead.
 */

const isDev = import.meta.env.MODE === 'development';

export const logLoadTime = () => {
  if (!isDev) return;
  
  window.addEventListener('load', () => {
    // Wait for the load event to settle
    setTimeout(() => {
      if (window.performance) {
        // Use modern PerformanceNavigationTiming if available, fallback to performance.timing
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
        
        console.groupCollapsed('%c[Performance] Carga Inicial', 'color: #eec058; font-weight: bold;');
        console.log(`Tiempo total de carga: ${loadTime}ms`);
        if (window.performance.getEntriesByType) {
          const paintEntries = window.performance.getEntriesByType('paint');
          paintEntries.forEach((entry) => {
            console.log(`${entry.name}: ${Math.round(entry.startTime)}ms`);
          });
        }
        console.groupEnd();
      }
    }, 100);
  });
};

const routeTimes = new Map<string, number>();

export const startRouteTransition = (route: string) => {
  if (!isDev) return;
  routeTimes.set(route, performance.now());
};

export const endRouteTransition = (route: string) => {
  if (!isDev) return;
  const startTime = routeTimes.get(route);
  if (startTime !== undefined) {
    const duration = performance.now() - startTime;
    console.log(
      `%c[Performance] Transición a [${route.toUpperCase()}]: %c${duration.toFixed(2)}ms`,
      'color: #b8ccb4; font-weight: bold;',
      'color: #eec058; font-weight: bold; font-size: 11px;'
    );
    routeTimes.delete(route);
  }
};
