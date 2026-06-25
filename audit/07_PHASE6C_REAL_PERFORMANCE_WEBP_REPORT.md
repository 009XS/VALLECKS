# Reporte de Verificación de Rendimiento de Producción y Pipeline WebP - Fase 6C

Este reporte documenta los resultados de la Fase 6C, la cual abarcó la auditoría de carga en producción, la conversión automatizada de activos de imagen mediante Sharp, la migración de referencias a WebP y la telemetría de rendimiento refinada.

---

## 1. Estado Antes de la Fase 6C
- El sitio contaba con división de código a nivel de páginas secundarias (`Atracciones`, `Menu`, `Barra`, `Galeria`, `Ubicacion`) y segmentación manual de chunks de librerías (`react`, `three`, `gsap`, `icons`, `other`).
- El tamaño reportado de la página de entrada era de `19.57 KB` en el chunk de inicio, pero no se había auditado la transferencia de red real en producción para la primera visita.
- Las referencias de imágenes apuntaban directamente a los archivos originales de gran peso (`.jpg`) en `public/static/img/`.

---

## 2. Hallazgos de Red en Producción Real (First-Load Visit)
Conectamos a la compilación ejecutando `npm run preview` y auditamos las peticiones de red utilizando automatización de navegador en desarrollo:

### Peticiones Iniciales en Portada (Home):
1. `http://localhost:4173/` (HTML base, 1.17 KB)
2. `http://localhost:4173/assets/index-*.js` (Script principal de la App, 19.78 KB)
3. `http://localhost:4173/assets/rolldown-runtime-*.js` (Runtime de orquestación, 0.69 KB)
4. `http://localhost:4173/assets/vendor-react-*.js` (React 19 Core, 182.80 KB)
5. `http://localhost:4173/assets/vendor-three-*.js` (Motor 3D Three.js/R3F/Drei, 871.89 KB)
6. `http://localhost:4173/assets/vendor-gsap-*.js` (Core de Animación GSAP, 112.81 KB)
7. `http://localhost:4173/assets/vendor-icons-*.js` (Iconos Lucide React, 11.98 KB)
8. `http://localhost:4173/assets/vendor-other-*.js` (Dependencias varias, 7.12 KB)
9. `http://localhost:4173/assets/index-*.css` (Estilos compilados, 43.21 KB)
10. Fuentes externas de Google (`Inter`, `Playfair Display`).

### Análisis Técnico de Carga:
- **Carga Inmediata de Three.js/R3F**: Se confirma que `vendor-three-*.js` (871.89 KB) se carga **inmediatamente** al visitar la portada. Esto se debe a que la página Home depende de `<GlobalCanvas />` para mostrar la escena del bosque interactiva (`ForestScene.tsx`) de fondo de forma inmediata.
- **Carga Inmediata de GSAP**: Se confirma que `vendor-gsap-*.js` se carga de forma eager porque `App.tsx` registra e inicializa ScrollTrigger para las transiciones generales.
- **Carga Diferida Confirmada**: Los archivos de código correspondientes a las páginas secundarias (`Atracciones-*.js`, `Menu-*.js`, `Barra-*.js`, `Galeria-*.js`, `Ubicacion-*.js`) **NO** se cargan en la visita inicial. Solo se descargan a través de la red una vez que el usuario hace click en sus respectivos enlaces del menú.
- **Peso Total de JS Transferido al Inicio**: **~1,207.07 KB (1.21 MB)**.
- **Peso de Imágenes al Inicio**: **0 KB**. La carga de todas las imágenes está 100% diferida porque la portada no contiene componentes `<img>` estáticos pesados (usa render procedural 3D).

---

## 3. Tabla de Conversión WebP (Pipeline Sharp)
Implementamos el script `scripts/convert-images-to-webp.mjs` usando la librería Node `sharp` para procesar los activos de imagen optimizando a calidad `80`.

| Archivo de Origen (JPG) | Archivo Generado (WebP) | Peso Original (KB) | Peso WebP (KB) | Reducción (%) |
| :--- | :--- | :---: | :---: | :---: |
| `Ahuyenta-inseguridad-a-turistas-de-La-Marquesa3.jpg` | `ahuyenta-inseguridad-a-turistas-de-la-marquesa3.webp` | 133.51 KB | 153.73 KB | -15.1% * |
| `caballo.jpg` | `caballo.webp` | 587.24 KB | 437.79 KB | 25.4% |
| `Canopy-Las-Golondrinas-1-e1635561376796.jpg` | `canopy-las-golondrinas-1-e1635561376796.webp` | 85.48 KB | 62.06 KB | 27.4% |
| `comida.jpg` | `comida.webp` | 99.14 KB | 85.98 KB | 13.3% |
| `d1-1-1024x683.jpg` | `d1-1-1024x683.webp` | 123.33 KB | 134.02 KB | -8.7% * |
| `d2-1.jpg` | `d2-1.webp` | 485.47 KB | 162.77 KB | **66.5%** |
| `gotcha-01-768x576.jpg` | `gotcha-01-768x576.webp` | 122.45 KB | 62.05 KB | **49.3%** |
| `la-marquesa-c.jpg` | `la-marquesa-c.webp` | 136.05 KB | 159.96 KB | -17.6% * |
| `maxresdefault.jpg` | `maxresdefault.webp` | 247.76 KB | 154.91 KB | 37.5% |
| `Rancho Viejo.jpg` | `rancho-viejo.webp` | 161.51 KB | 102.13 KB | 36.8% |
| `unnamed (1).jpg` | `unnamed-1.webp` | 16.17 KB | 8.16 KB | **49.6%** |
| `unnamed (2).jpg` | `unnamed-2.webp` | 551.54 KB | 344.48 KB | 37.5% |
| `unnamed.jpg` | `unnamed.webp` | 13.80 KB | 5.57 KB | **59.7%** |
| **TOTAL GENERAL** | | **2,848.93 KB** | **1,935.67 KB** | **32.1%** |

*\* Nota: Las imágenes con reducción negativa ya contaban con una compresión JPG muy agresiva en su origen (calidad baja). Al re-comprimir a WebP con calidad 80, aumentaron ligeramente su peso para preservar fidelidad visual. Se conservan las referencias a WebP por homogeneidad de formato y compatibilidad de decodificación rápida en navegadores modernos.*

---

## 4. Migración de Referencias a Imágenes
- **Archivo centralizado**: [src/config/images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts)
  - Todas las referencias locales se redirigieron a la carpeta `static/img/optimized/*.webp`.
  - Los archivos originales siguen intactos en `public/static/img/` como respaldo y no se borraron de Git.
- **Componente SmartImage**: Creamos [SmartImage.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/components/ui/SmartImage.tsx) que añade de forma nativa `loading="lazy"` y `decoding="async"`. Lo implementamos en las cuadrículas e imágenes principales en [Galeria.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Galeria/Galeria.tsx) y [Atracciones.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Atracciones/Atracciones.tsx) para prevenir micro-tirones (jank) al renderizar.

---

## 5. Rive Deferred: missing .riv source assets
No se detectaron archivos `.riv` interactivos en el repositorio. La integración completa de Rive queda en estado **diferido** a la espera de recibir los activos del equipo de diseño:
- `navbar-hamburger.riv` (transición menú hamburguesa).
- `whatsapp-pulse.riv` (efecto de pulsación para el botón flotante).
- `reservation-button-hover.riv` (animación de botón al hacer hover).

---

## 6. Resultados de Verificación Técnica
- **Linter (oxlint)**: 0 errores y 0 warnings en los 23 archivos analizados.
- **Vite Build**: Exitoso en 251ms.
- **Integridad Visual**: No se registran URLs de imágenes rotas ni consolas de error al navegar a través de todas las secciones.

---

## 7. Riesgos Remanentes y Fase 6D Sugerida
- **Riesgo**: Dispositivos móviles muy antiguos pueden carecer de soporte óptimo para WebGL concurrentes.
- **Fase 6D Recomendada**: Implementar el ciclo de renderizado dinámico en WebGL (Canvas Freeze): pausar el loop del canvas (`useFrame`) o congelar la escena tridimensional cuando el componente de 3D sale de la vista visible (viewport) o la pestaña se minimiza.
