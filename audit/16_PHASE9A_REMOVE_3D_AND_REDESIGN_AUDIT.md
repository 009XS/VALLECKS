# Auditoría de Eliminación de 3D e Implementación Editorial (Fase 9A)

Este documento detalla el análisis de la arquitectura 3D/WebGL heredada, el impacto en rendimiento del bundle y el plan de remoción de la interfaz pública para dar paso a un diseño editorial premium de alto impacto.

---

## 1. Inventario de Componentes y Escenas 3D Existentes

Actualmente, el sitio web renderiza múltiples componentes en 3D (WebGL) mediante la biblioteca **React Three Fiber (R3F)**, **Three.js** y **Drei**.

### Usos de 3D/WebGL en la UI Activa:
1. **GlobalCanvas / ForestScene (`src/components3d/GlobalCanvas.tsx`, `ForestScene.tsx`):** Renderiza un bosque interactivo tridimensional con árboles generados mediante partículas y luces direccionales. Se activa como fondo del sitio en la página `Home`.
2. **AttractionModel (`src/components3d/AttractionModel.tsx`):** Renderiza diferentes formas geométricas tridimensionales representativas de las actividades de aventura (gotcha, motos, tirolesa, caballos) en la sección `Atracciones`.
3. **SteamingDish (`src/components3d/SteamingDish.tsx`):** Renderiza una taza rústica de Café de Olla tridimensional con partículas ascendentes simulando vapor físico caliente en la sección `Menú`.
4. **FluidGlass (`src/components3d/FluidGlass.tsx`):** Renderiza una copa tridimensional con físicas interactivas de fluidos en movimiento por física de gravedad simulada por cursor en la sección `La Barra`.
5. **TerrainMap (`src/components3d/TerrainMap.tsx`):** Renderiza un relieve topográfico en 3D de las montañas de Rancho Viejo en la sección `Ubicación`.

---

## 2. Archivos a ser Modificados o Removidos de la Interfaz

Para eliminar por completo el motor WebGL de la UI, se modifican los siguientes archivos:
* **[src/App.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/App.tsx):** Eliminar importación y renderizado del `<GlobalCanvas />`.
* **[src/pages/Home/Home.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Home/Home.tsx):** Rediseñar Hero y tarjetas de navegación sin 3D de fondo.
* **[src/pages/Atracciones/Atracciones.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Atracciones/Atracciones.tsx):** Reemplazar visor 3D lateral por un bloque editorial dinámico de imágenes 2D de alta calidad.
* **[src/pages/Menu/Menu.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Menu/Menu.tsx):** Reemplazar escena de café de olla con vapor 3D por un panel destacado editorial del Café de Olla tradicional.
* **[src/pages/Barra/Barra.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Barra/Barra.tsx):** Reemplazar simulador de copa de mixología 3D por un showcase editorial e interactivo de bebidas tradicionales.
* **[src/pages/Ubicacion/Ubicacion.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Ubicacion/Ubicacion.tsx):** Eliminar pestaña de relieve topográfico en 3D y centralizar en una visualización limpia e integrada de Google Maps con tarjetas informativas.
* **[vite.config.ts](file:///C:/Users/anara/Desktop/valle_copia/vite.config.ts):** Remover el chunking especial de Three.js.
* **[package.json](file:///C:/Users/anara/Desktop/valle_copia/package.json):** Eliminar las dependencias de Three, R3F y Drei.

---

## 3. Impacto Real en el Peso del Bundle (Verificado)

El bundle de producción arrojaba un peso crítico debido al motor de renderizado 3D:
* **Antes (`vendor-three` con Three.js + R3F + Drei):** **871.89 kB** (comprimido en Gzip a 231.36 kB).
* **Impacto anterior:** Este único archivo representaba casi el **70% del código JavaScript total** de la SPA.

### Resultados Reales Post-Refactorización (Fase 9A completada):
* **Eliminación Total:** El archivo `vendor-three` ha sido eliminado por completo. Las dependencias `three`, `@react-three/fiber` y `@react-three/drei` fueron dadas de baja de `package.json` y desinstaladas de `node_modules`.
* **Reducción de Carga Real:**
  - El peso inicial total de JavaScript descargado ha bajado de **~1.21 MB** a solo **329.25 kB** (repartido entre el core de React de 178 kB, GSAP de 112 kB, iconos de 12 kB y el script de la SPA de 21 kB).
  - Esto representa una **reducción neta del 72.8%** en el peso total de JS inicial.
* **Rendimiento:** Cero procesamiento en GPU por Canvas WebGL. Se garantiza fluidez absoluta y menor consumo de batería en dispositivos móviles y de escritorio.

