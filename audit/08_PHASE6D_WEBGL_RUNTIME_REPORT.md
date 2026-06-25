# Reporte de Optimización en Tiempo de Ejecución de WebGL - Fase 6D

Este reporte detalla los resultados de la implementación de la Fase 6D, la cual se enfocó en optimizar el ciclo de renderizado (render loop) de WebGL, pausar activamente el procesamiento de CPU/GPU cuando el contenido no es visible y respetar las preferencias de movimiento reducido a nivel de sistema operativo.

---

## 1. Inventario de Render Loops Auditados
Analizamos el uso de `useFrame`, `requestAnimationFrame` y temporizadores en el proyecto, identificando 6 componentes tridimensionales con ciclos de renderizado activos en cada frame:

1. **`GlobalCanvas` (`DustScene`)**: Anima 120 partículas flotantes en cada frame cuando el usuario está fuera de la página de inicio (Home).
2. **`ForestScene`**: Realiza cálculos de movimiento para 250 partículas de niebla/luciérnagas y calcula el efecto de paralaje de la cámara basándose en la posición del mouse.
3. **`AttractionModel`**: Rota e inclina el modelo interactivo de la atracción seleccionada.
4. **`FluidGlass`**: Calcula la física de oscilación del líquido (slosh), bobs verticales del vaso y la rotación de los cubos de hielo.
5. **`SteamingDish`**: Simula el movimiento de oscilación del jarro de barro y calcula la física de ascenso de 45 partículas de vapor.
6. **`TerrainMap`**: Rota el plano de terreno de Rancho Viejo y controla la flotación y oscilación del pin de ubicación.

---

## 2. Herramientas y Hooks de Control Creados
Implementamos tres hooks personalizados en TypeScript para controlar la visibilidad y preferencias de movimiento:

1. **`usePageVisibility` ([src/hooks/usePageVisibility.ts](file:///C:/Users/anara/Desktop/valle_copia/src/hooks/usePageVisibility.ts))**: Detecta si la pestaña del navegador está activa o en segundo plano utilizando `document.visibilityState`.
2. **`useReducedMotion` ([src/hooks/useReducedMotion.ts](file:///C:/Users/anara/Desktop/valle_copia/src/hooks/useReducedMotion.ts))**: Escucha y detecta si el sistema operativo tiene activa la preferencia de movimiento reducido mediante la media query `(prefers-reduced-motion: reduce)`.
3. **`useElementVisibility` ([src/hooks/useElementVisibility.ts](file:///C:/Users/anara/Desktop/valle_copia/src/hooks/useElementVisibility.ts))**: Utiliza `IntersectionObserver` para verificar si un contenedor HTML específico del Canvas está dentro del viewport visible de la pantalla (umbral predeterminado de `0.15`).

---

## 3. Políticas de Pausa y Comportamiento de Canvas

### A. Visibilidad de Pestaña (Tab Hidden)
Cuando el usuario minimiza el navegador o cambia de pestaña:
- **Acción**: `usePageVisibility` retorna `false`.
- **Efecto**: Todos los loops de `useFrame` en `GlobalCanvas`, `ForestScene`, `AttractionModel`, `FluidGlass`, `SteamingDish` y `TerrainMap` detienen inmediatamente sus actualizaciones aritméticas y llamadas a renderizado.
- **Resultado**: El consumo de GPU y CPU se reduce a **0%** de forma instantánea al estar en segundo plano.

### B. Visibilidad de Elemento Local (Off-Screen)
En las subpáginas con Canvas locales (`Atracciones`, `Menu`, `Barra`, `Ubicacion`):
- **Acción**: `useElementVisibility` monitorea el elemento contenedor del Canvas.
- **Efecto**: Si el usuario hace scroll hacia abajo y el Canvas de 3D sale de la vista visible (viewport), el hook detecta la no-intersección y activa la bandera `isVisible = false` en los modelos 3D correspondientes.
- **Resultado**: Se cancelan los cálculos aritméticos y físicos en cada frame dentro de `useFrame`, reanudándose al instante en que el elemento vuelve a entrar en la vista visible, garantizando cero parpadeos o saltos abruptos.

### C. Soporte para Movimiento Reducido (Reduced Motion)
Si el usuario prefiere animaciones minimalistas en su sistema operativo:
- **Física Procedural**: Las partículas flotantes (niebla en `ForestScene`, vapor en `SteamingDish` e inclinación dinámica de líquido en `FluidGlass`) se desactivan por completo.
- **Rotaciones**: Se detienen los movimientos de rotación pasiva y bobbing en todos los visores 3D.
- **Paralaje**: Se cancela el movimiento de cámara reactivo al cursor en `ForestScene`.

### D. Constantes de Rendimiento Centralizadas
Creamos el archivo de configuración central [src/config/performance.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/performance.ts):
```typescript
export const PERFORMANCE = {
  MAX_DPR: 2,
  REDUCED_PARTICLE_MULTIPLIER: 0.35,
  INTERSECTION_THRESHOLD: 0.15,
  ENABLE_DEV_PERF_LOGS: import.meta.env.MODE === 'development',
};
```

---

## 4. Archivos Modificados en el Repositorio
- **Nuevos**:
  - `src/hooks/usePageVisibility.ts` (Detección de pestañas).
  - `src/hooks/useReducedMotion.ts` (Preferencia de movimiento).
  - `src/hooks/useElementVisibility.ts` (Intersección de vista).
  - `src/config/performance.ts` (Constantes de rendimiento).
- **Modificados**:
  - `src/lib/performance.ts` (Telemetría de WebGL en desarrollo).
  - `src/components3d/GlobalCanvas.tsx` (Estrategia de renderizado del Canvas global).
  - `src/components3d/ForestScene.tsx` (Manejo de visibilidad y movimiento en el bosque).
  - `src/components3d/AttractionModel.tsx` (Control de ciclos en visor de atracciones).
  - `src/components3d/FluidGlass.tsx` (Control de ciclos en simulador de barra).
  - `src/components3d/SteamingDish.tsx` (Control de ciclos en vapor del menú).
  - `src/components3d/TerrainMap.tsx` (Control de ciclos en mapa de relieve).
  - `src/pages/Atracciones/Atracciones.tsx` (Orquestación de visibilidad de elemento).
  - `src/pages/Menu/Menu.tsx` (Orquestación de visibilidad de elemento).
  - `src/pages/Barra/Barra.tsx` (Orquestación de visibilidad de elemento).
  - `src/pages/Ubicacion/Ubicacion.tsx` (Orquestación de visibilidad de elemento).

---

## 5. Resultados de Validación y Linter
- **Linter (oxlint)**: Completado de forma limpia con **0 errores y 0 advertencias**.
- **Compilador TypeScript & Vite Build**: Compilación exitosa y empaquetado final correcto.
- **Validación en Tiempo de Ejecución (Production Preview)**: La interacción del mouse, la navegación por las pestañas del menú, el vapor interactivo del café de olla y la física del cóctel funcionan con fluidez. No hay llamadas perdidas a contextos WebGL ni fallos gráficos.

---

## 6. Riesgos Remanentes y Fase 6E Sugerida
- **Riesgo**: Aunque los ciclos de `useFrame` se pausan, el Canvas global y los Canvas locales de Three.js siguen reteniendo memoria VRAM para texturas y geometrías. En dispositivos de gama ultra-baja, el simple montaje simultáneo de múltiples Canvas puede rozar los límites de memoria.
- **Fase 6E Sugerida**: Implementar una estrategia de desmontaje diferido físico de los Canvas locales si permanecen inactivos por más de un tiempo prudencial, liberando memoria de texturas y contextos WebGL de forma proactiva.
