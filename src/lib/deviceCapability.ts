interface DeviceCapability {
  memory?: number;
  cores?: number;
  hasTouch: boolean;
  prefersReducedMotion: boolean;
  tier: 'high' | 'medium' | 'low';
}

/**
 * Detects device hardware specifications and accessibility preferences.
 * Classifies the device into a performance tier: "high" | "medium" | "low".
 */
export const getDeviceCapability = (): DeviceCapability => {
  if (typeof window === 'undefined') {
    return { hasTouch: false, prefersReducedMotion: false, tier: 'medium' };
  }

  const hasTouch = window.matchMedia('(pointer: coarse)').matches || 
                   'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;

  let tier: 'high' | 'medium' | 'low' = 'medium';

  if (prefersReducedMotion) {
    tier = 'low';
  } else if (memory !== undefined && memory <= 2) {
    tier = 'low';
  } else if (cores !== undefined && cores <= 2) {
    tier = 'low';
  } else if (memory !== undefined && cores !== undefined) {
    if (memory >= 8 && cores >= 6) {
      tier = 'high';
    } else if (memory >= 4 && cores >= 4) {
      tier = 'medium';
    } else {
      tier = 'low';
    }
  } else {
    tier = hasTouch ? 'medium' : 'high';
  }

  return {
    memory,
    cores,
    hasTouch,
    prefersReducedMotion,
    tier
  };
};

/**
 * Dev-only capability logger.
 */
export const logDeviceCapability = () => {
  if (import.meta.env.MODE !== 'development') return;
  
  const cap = getDeviceCapability();
  console.groupCollapsed('%c[Device Capability] Perfil de Rendimiento del Dispositivo', 'color: #eec058; font-weight: bold;');
  console.log(`Tier de Rendimiento: %c${cap.tier.toUpperCase()}`, 'color: #eec058; font-weight: bold;');
  console.log(`Memoria de Dispositivo: ${cap.memory ? `${cap.memory} GB` : 'No Soportado/Desconocido'}`);
  console.log(`Núcleos de CPU: ${cap.cores ? cap.cores : 'No Soportado/Desconocido'}`);
  console.log(`Dispositivo Táctil (Touch): ${cap.hasTouch ? 'Sí' : 'No'}`);
  console.log(`Movimiento Reducido Preferido: ${cap.prefersReducedMotion ? 'Sí' : 'No'}`);
  console.groupEnd();
};
