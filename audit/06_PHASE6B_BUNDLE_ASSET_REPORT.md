# Reporte de Optimización de Bundles e Instrumentación - Fase 6B

Este reporte detalla los resultados de la implementación de la Fase 6B, la cual se enfocó en reducir la carga útil de JavaScript inicial (bundle sizes), estructurar el pipeline de optimización de imágenes, e integrar instrumentación de rendimiento en desarrollo.

---

## 1. Estado Antes vs. Después (Medición de Bundles)

Antes de la Fase 6B, el compilador Vite empaquetaba toda la aplicación en un único archivo JavaScript monolítico debido a que todas las vistas y dependencias de Three.js/R3F se importaban de forma eager en `App.tsx`.

### Comparativa de Chunks

| Métrica de Compilación | Estado Inicial (Fase 6A) | Estado Optimizado (Fase 6B) | Reducción / Impacto |
| :--- | :---: | :---: | :---: |
| **Tiempo de Build** | `305ms` | `244ms` | Compilación ~20% más rápida |
| **Archivo JS Inicial (Entry)** | `1,250.70 KB` | **`19.61 KB`** | **98.43% de reducción en la carga inicial** |
| **CSS Inicial** | `43.16 KB` | `43.16 KB` | Estable (sin cambios en estilos) |
| **Fragmentación de Código** | 1 chunk monolítico | 13 chunks dinámicos + runtime | Carga paralela y asíncrona bajo demanda |

### Desglose de Chunks Generados en Producción:
- **`dist/assets/index-*.js` (19.61 KB)**: Punto de entrada de la aplicación, cargador base y enrutador virtual.
- **`dist/assets/vendor-three-*.js` (871.89 KB)**: Librerías 3D de WebGL (Three.js/R3F/Drei) separadas y diferidas. Se cargan asíncronamente cuando el navegador requiere canvas.
- **`dist/assets/vendor-react-*.js` (182.80 KB)**: React 19 Core y sus dependencias directas diferidas.
- **`dist/assets/vendor-gsap-*.js` (112.81 KB)**: Suite de animación GSAP.
- **`dist/assets/vendor-icons-*.js` (11.98 KB)**: Biblioteca de iconos Lucide React aislada para evitar duplicaciones y carga cruzada.
- **`dist/assets/vendor-other-*.js` (7.12 KB)**: Dependencias misceláneas de node_modules.
- **`dist/assets/Barra-*.js` (12.44 KB)**: Código de la vista de mixología La Barra.
- **`dist/assets/Ubicacion-*.js` (11.92 KB)**: Código de la vista de ubicación e interactivo de mapa.
- **`dist/assets/Atracciones-*.js` (11.68 KB)**: Código de la vista de aventuras y atracciones.
- **`dist/assets/Menu-*.js` (8.21 KB)**: Código de la vista de gastronomía y menús.
- **`dist/assets/Galeria-*.js` (3.24 KB)**: Código de la vista de galería fotográfica.
- **`dist/assets/images-*.js` (0.59 KB)**: Configuración abstracta de imágenes compartidas.
- **`dist/assets/rolldown-runtime-*.js` (0.69 KB)**: Código mínimo de orquestación de carga de Vite.

---

## 2. Cambios de Código Realizados

### A. Carga Diferida (Lazy Loading) y Suspense
- **Archivo modificado**: [App.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/App.tsx)
  - Modificamos las importaciones de `Atracciones`, `Menu`, `Barra`, `Galeria` y `Ubicacion` para usar `React.lazy()` en conjunto con named exports.
  - El componente principal `Home` se mantuvo de forma eager (estática) para asegurar que el primer renderizado de la portada sea instantáneo.
  - Envolvimos el enrutador virtual en un componente `<Suspense>` que renderiza un fallback minimalista y elegante (`PageFallback`) de color Obsidian/Oro con un spinner ligero CSS (evitando layout shifts o Canvas anidados).

### B. Segmentación de Chunks en Bundler
- **Archivo modificado**: [vite.config.ts](file:///C:/Users/anara/Desktop/valle_copia/vite.config.ts)
  - Añadimos la función `manualChunks` en la configuración de Rollup dentro de Vite. Esto separa las librerías pesadas (`three`, `gsap`, `react`, `lucide`) en archivos independientes para maximizar el almacenamiento en caché del navegador del cliente y evitar la recarga de dependencias invariables.
  - Se corrigió específicamente la coincidencia de nombre de `lucide-react` para que no caiga en el chunk de React, extrayéndola al archivo limpio `vendor-icons`.

### C. Abstracción del Pipeline de Imágenes
- **Archivo nuevo**: [images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts)
  - Abstrae y centraliza las rutas locales de todas las imágenes estáticas (`static/img/...`) del proyecto, facilitando su futura actualización hacia el directorio `/optimized/*.webp` de forma global.
- **Archivos modificados**: [Atracciones.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Atracciones/Atracciones.tsx), [Barra.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Barra/Barra.tsx), [Menu.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Menu/Menu.tsx) y [Galeria.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Galeria/Galeria.tsx) para importar y consumir las constantes de `images.ts`.
- **Estrategia y Guía**: Creamos la guía [IMAGE_OPTIMIZATION_GUIDE.md](file:///C:/Users/anara/Desktop/valle_copia/scripts/IMAGE_OPTIMIZATION_GUIDE.md) para instruir al equipo técnico sobre la conversión WebP óptima, y creamos la carpeta vacía con el archivo [.gitkeep](file:///C:/Users/anara/Desktop/valle_copia/public/static/img/optimized/.gitkeep) para persistir la ruta de salida.

### D. Instrumentación de Rendimiento (Telemetry)
- **Archivo nuevo**: [performance.ts](file:///C:/Users/anara/Desktop/valle_copia/src/lib/performance.ts)
  - Ofrece funciones para registrar los tiempos de carga inicial utilizando las APIs de rendimiento del navegador, y medir el tiempo preciso que toma cada transición de página de GSAP.
- **Integración**: Configurado en [main.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/main.tsx) (carga inicial) y en [App.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/App.tsx) (transiciones). Estas telemetrías se inhabilitan automáticamente en producción (`import.meta.env.MODE !== 'development'`) garantizando cero impacto en el UX del cliente.

---

## 3. Resultados de la Validación Técnica

- **Linter**: `oxlint` finalizó en limpio sin ningún tipo de error o advertencia en el nuevo código de instrumentación.
- **Compilador TypeScript & Vite**: Build completado de forma 100% limpia sin errores de tipos o referencias.
- **Comportamiento del Sitio**: La navegación virtual y las animaciones de entrada de GSAP funcionan de forma ininterrumpida y fluida.

---

## 4. Riesgos Remanentes y Mitigaciones

1. **Retraso Visual en la Carga de Modelos 3D Procedurales**: Aunque los modelos 3D (`AttractionModel`, `FluidGlass`, `SteamingDish`, `TerrainMap`) son procedurales y ligeros, la inicialización del contexto WebGL en páginas secundarias puede causar un micro-bloqueo del hilo de renderizado en dispositivos móviles de gama baja.
   * *Mitigación*: Se configuró un Device Pixel Ratio limitado (`dpr={[1, 2]}`) en todos los Canvas de páginas secundarias para mitigar la sobrecarga de la GPU.
2. **Imágenes No Optimizadas de Alto Peso**: Dado que no se cuenta con herramientas de conversión por consola local (`cwebp`/`magick`), las imágenes actuales JPG/PNG de gran tamaño en `public/static/img` siguen cargándose directamente.
   * *Mitigación*: Se debe ejecutar la conversión manual a WebP descrita en la guía `IMAGE_OPTIMIZATION_GUIDE.md` y actualizar la configuración de recursos en `images.ts`.

---

## 5. Fase Sugerida: Fase 6C (Interactividad Avanzada y Assets Rive)

Para la siguiente etapa de desarrollo (Fase 6C), se recomienda implementar:
1. **Integración Completa de Rive**: Una vez provistos los archivos `.riv` por parte del equipo de diseño, integrar los iconos dinámicos y transiciones interactivas en el menú de navegación móvil.
2. **Optimización Física de Assets**: Cargar las imágenes WebP convertidas de forma definitiva y realizar una auditoría de Web Vitals (LCP, FID, CLS) en dispositivos reales móviles y de escritorio.
3. **Control del Loop de WebGL**: Desactivar las peticiones de `requestAnimationFrame` de Three.js cuando la pestaña del navegador no esté activa o el Canvas no sea visible (ScrollTrigger integration), conservando batería y CPU.
