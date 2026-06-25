# Reporte de Auditoría QA, Presupuesto de Rendimiento y Accesibilidad - Fase 6E

Este reporte documenta los resultados de la Fase 6E: control de calidad de producción (QA), auditoría estilo Lighthouse, validación de accesibilidad/SEO básico, definición de presupuestos de rendimiento en tiempo de ejecución y diseño de una política adaptativa según capacidades de dispositivo.

---

## 1. Estado de Compilación y Linter (Safety Checkpoint)

Ejecutamos las pruebas automatizadas de consistencia de código y compilación:
* **oxlint (Linter)**: Completado exitosamente con **0 errores y 0 advertencias** sobre 29 archivos evaluados.
* **Compilador TypeScript (tsc) & Vite Build**: Compilación exitosa sin errores de tipo. El empaquetado de producción generó el árbol de assets de manera óptima en 266ms.
* **Estado de Git**: El repositorio se encuentra con cambios locales listos para ser confirmados, correspondientes exclusivamente a las mejoras de accesibilidad de esta fase.

---

## 2. Resultados de Control de Calidad en Producción (QA)

Realizamos pruebas de navegación de extremo a extremo utilizando automatización de navegadores (Playwright preview) en `http://localhost:4173/` evaluando las siguientes páginas:

* **Home (Inicio)**: Carga inmediata. El canvas WebGL global de partículas y niebla se inicia fluidamente sobre el fondo del Hero.
* **Atracciones**: Las tarjetas interactivas reaccionan instantáneamente al hover y click. El visor 3D responde perfectamente al arrastre del cursor sin retraso visible.
* **Menú**: Los artículos se presentan de forma homogénea. El visor 3D del Café de Olla asocia correctamente el vapor procedural al movimiento.
* **La Barra**: La física interactiva de oleaje del vaso y cubos de hielo funciona suavemente al deslizar el mouse.
* **Galería**: El grid premium de 12 elementos carga en WebP optimizado de forma responsiva. El lightbox se abre al hacer click/enter en los elementos, carga la imagen a resolución adecuada y detiene la propagación del click al presionar sobre la imagen en sí.
* **Ubicación**: El tab selector conmuta entre el relieve 3D interactivo y el mapa dinámico oscurecido de Google Maps de forma inmediata.

### Confirmaciones de Estabilidad:
* **0 errores en consola**: Sin fallas de script, errores de carga de red o incompatibilidades de paquetes.
* **0 imágenes rotas**: Todos los enlaces a activos estáticos y optimizados en `public/static/img/optimized/` se cargaron al 100%.
* **Sin parpadeos ni Layout Shift**: Los fallbacks de `Suspense` (Páginas perezosas) ocupan el espacio adecuado para evitar saltos visuales durante la hidratación/conducción.
* **Resguardo de Contexto WebGL**: No se detectaron advertencias de "Context Lost" inesperadas ni congelamiento de pantallas.

---

## 3. Comportamiento de Carga Perezosa (Lazy Loading) y WebGL

* **Dynamic Chunking**: El archivo principal `index.js` inicial se mantiene ligero (~21 KB) y las dependencias grandes se separan en chunks independientes de Vite (`vendor-react`, `vendor-gsap`, `vendor-three`).
* **Carga Bajo Demanda**: Las subpáginas no críticas (`Atracciones`, `Menu`, `Barra`, `Galeria`, `Ubicacion`) se importan de forma perezosa mediante `React.lazy` únicamente cuando el usuario navega a sus secciones correspondientes.
* **Comportamiento WebGL Activo**: Las pausas de ciclo en tiempo de ejecución funcionan perfectamente. Los ciclos de renderizado locales se detienen cuando el canvas está fuera de pantalla (`offscreen`) y todas las animaciones 3D se pausan por completo cuando el usuario cambia de pestaña del navegador (`document.hidden`), reduciendo el consumo de GPU a 0%.

---

## 4. Auditoría de Accesibilidad y SEO

### Mejoras de Accesibilidad Implementadas:
1. **Atributo `type="button"`**: Agregado explícitamente a todos los botones interactivos de navegación (`Navbar.tsx` y `Footer.tsx`), tarjetas y elementos de selección (`Home.tsx`, `Atracciones.tsx`, `Barra.tsx` y `Galeria.tsx`) para evitar comportamientos por defecto incorrectos.
2. **Acceso por Teclado en Galería**: Se transformaron los contenedores `div` de la galería en elementos `<button>` nativos. Esto habilita que los usuarios de lectores de pantalla y teclados naveguen por el grid mediante la tecla `Tab` y activen el lightbox con `Enter` o `Espacio`.
3. **Cierre por Teclado (Escape)**: Se implementó un detector de eventos en el lightbox de la galería. Si el modal está abierto, presionar la tecla `Escape` cierra la visualización y regresa el foco al grid.
4. **Metadatos y Alt Text Descriptivo**: El lightbox ahora almacena todo el objeto de imagen en estado. Esto nos permite usar el título real de la fotografía (ej. "Lago Místico") en el atributo `alt` del modal ampliado en lugar del texto genérico `"Ampliada"`.
5. **Etiquetas `aria-label`**: Optimizadas en los enlaces del menú móvil y el acceso rápido a WhatsApp (`aria-label="Cerrar menú"`, `"Abrir menú"`, `"Contactar por WhatsApp"` y `"Ver imagen ampliada de [Título]"`).
6. **Contraste e Indicadores de Foco**: Se respetan los estilos visuales dorados y verdes sobre fondos negros profundos, garantizando una excelente visibilidad y enfoque accesible de elementos interactivos.

### Estado de SEO y Metadatos:
Se verificó el archivo `index.html` confirmando la correcta inserción de metadatos básicos y optimizaciones Open Graph/Twitter Cards:
* **Viewport y Language**: `<html lang="es">` y etiqueta viewport responsiva de escala 1.0 estándar.
* **Descripciones y Tematización**: Etiquetas `<meta name="description">` detallada sobre Rancho Viejo y `<meta name="theme-color" content="#0d140e">` para integrar la cabecera móvil al diseño rústico de la marca.
* **Redes Sociales (OG y Twitter)**: Metadatos listos con el preview de imagen local `/static/img/optimized/rancho-viejo.webp` (establecido en la Fase 6C).
* **Nota sobre Enlace Canónico (Canonical)**: La etiqueta `<link rel="canonical" href="...">` no ha sido inyectada aún. Se mantendrá pendiente y documentada hasta que el dominio final del despliegue en producción sea confirmado oficialmente por el cliente.

---

## 5. Presupuesto de Rendimiento en Tiempo de Ejecución (Performance Budget)

Creamos el archivo central de directrices de presupuesto en [src/config/performanceBudget.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/performanceBudget.ts):

```typescript
export const PERFORMANCE_BUDGET = {
  MAX_INITIAL_JS_KB: 1300,        // Límite estricto de JS inicial en producción
  TARGET_INITIAL_JS_KB: 900,      // Meta ideal de carga de JS inicial
  MAX_IMAGE_TOTAL_KB: 2000,       // Límite de peso total de imágenes cargadas simultáneamente
  TARGET_ROUTE_TRANSITION_MS: 300, // Tiempo de transición entre rutas virtuales
  TARGET_FPS: 120,                // Tasa de refresco objetivo en hardware de 120Hz
  MIN_ACCEPTABLE_FPS: 60,         // Límite mínimo aceptable de frames
  MAX_DPR: 2,                     // Límite de Device Pixel Ratio para evitar sobrecarga en pantallas Retina/4K
};
```

### Análisis del Peso Inicial:
Actualmente, el JS de primera carga es de aproximadamente **1.21 MB**. Aunque esta cifra excede los 900 KB ideales de la meta, **este comportamiento es por diseño**. El proyecto requiere la carga inmediata de `vendor-three` y `GlobalCanvas` en el inicio del sitio para desplegar la experiencia inmersiva del bosque en 3D del Hero, el cual es el núcleo de la identidad de la marca. No obstante, se establece un límite estricto de **1.30 MB** (1300 KB) para asegurar que futuras expansiones funcionales no degraden este rendimiento inicial sin autorización.

---

## 6. Política Adaptativa de Capacidades de Dispositivo

Creamos el módulo adaptativo en [src/lib/deviceCapability.ts](file:///C:/Users/anara/Desktop/valle_copia/src/lib/deviceCapability.ts). Este archivo clasifica el dispositivo del usuario en una de tres categorías de rendimiento (`"high" | "medium" | "low"`) analizando:
1. Cantidad de núcleos del procesador (`navigator.hardwareConcurrency`).
2. Estimación de memoria RAM (`navigator.deviceMemory`).
3. Detección de dispositivos táctiles (`pointer: coarse`).
4. Preferencia de movimiento reducido (`prefers-reduced-motion: reduce`).

### Uso de la Política Adaptativa:
* Actualmente se invoca la función `logDeviceCapability()` en `main.tsx` sólo en modo de desarrollo (`import.meta.env.MODE === 'development'`) para documentar en consola el perfil del cliente.
* La política **no deshabilita de forma agresiva ningún elemento visual por defecto** en producción. Esto previene stutters inesperados y asegura que la experiencia premium sea uniforme en la medida de lo posible.

---

## 7. Estudio Comparativo: Gestión de Ciclos vs Desmontaje de Canvas

Evaluamos las dos estrategias para optimizar el rendimiento de múltiples Canvas de Three.js en el mismo documento:

| Dimensión | Opción A: Pausar Render Loop (Actual) | Opción B: Desmontaje de Canvas Agresivo |
| :--- | :--- | :--- |
| **Ahorro de CPU / GPU** | **Excelente**. Al desactivar `useFrame`, las llamadas de cálculo y renderizado bajan a 0. | **Excelente**. Al remover del DOM, el consumo de cálculo cae a 0. |
| **Ahorro de VRAM** | **Moderado**. El navegador retiene geometrías y texturas WebGL en memoria. | **Completo**. Libera de forma absoluta la memoria de texturas y contexto. |
| **Riesgo UX (Remount Stutter)** | **Ninguno**. Al volver a pantalla, el renderizado se reanuda de inmediato sin congelamiento. | **Alto**. Remontar el Canvas e inicializar WebGL causa stutters (congelación de ~150-300ms). |
| **Pérdida de Estado** | **Ninguna**. El visor conserva la rotación, el modelo seleccionado y la física exacta. | **Alta**. Requiere serializar y restaurar posiciones físicas de fluidos y rotaciones de cámara. |
| **Idoneidad de Hardware** | Ideal para computadoras modernas (ej. RTX 5050) y teléfonos móviles de gama media/alta. | Recomendable exclusivamente para dispositivos de gama muy baja con poca memoria RAM. |

### Recomendación Técnica de QA:
Mantenemos la **Opción A (Pausar Render Loop)** como la estrategia predeterminada y activa en el sitio. Reanudar el ciclo pausado es instantáneo y transparente para el usuario, protegiendo la sensación de fluidez y lujo del portal.
Sin embargo, para dar flexibilidad al sistema en escenarios de hardware extremadamente limitado, integramos en [src/config/performance.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/performance.ts) la bandera `ENABLE_LOW_END_CANVAS_UNMOUNT = false`. Esta bandera queda disponible y documentada para ser activada selectivamente en el futuro de ser necesario.
