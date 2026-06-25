# Plan de la Siguiente Fase de Desarrollo

Este documento traza la ruta segura de implementación para la siguiente fase de desarrollo, asegurando la no intrusión en el código actual, la preservación del rendimiento y la consecución de las metas premium.

---

## 1. Fase Recomendada: Fase 6 — Detalles Interactivos y Límites de GPU

El objetivo principal de esta fase es refinar la experiencia de usuario incorporando animaciones de micro-interacciones vectoriales (Rive), extender las animaciones de scroll inmersivas y establecer los límites de calidad en GPU para asegurar que el sitio corra a 120 FPS bajo cualquier resolución.

---

## 2. Orden de Ejecución Exacto

### Paso 1: Consolidación del Repositorio Git
- Ejecutar comandos de Git para agregar los nuevos archivos de la migración y registrar el commit base:
  ```bash
  git add .
  git commit -m "chore: complete migration base to React + TS + R3F and simplify transitions"
  ```

### Paso 2: Optimización del Rendimiento en GPU (Capping DPR)
- Modificar los archivos del Canvas de Three.js para limitar la resolución de renderizado en pantallas de densidad ultra-alta:
  - Archivo: `src/components3d/GlobalCanvas.tsx`
  - Archivo: `src/pages/Menu/Menu.tsx` (Canvas de Café de Olla)
  - Archivo: `src/pages/Barra/Barra.tsx` (Canvas de FluidGlass)
  - Agregar la propiedad `dpr={[1, 2]}` a cada componente `<Canvas>`.

### Paso 3: Integración de Micro-interacciones Vectoriales (Rive)
- Diseñar e integrar componentes ligeros basados en Rive utilizando `rive-react` en botones tácticos:
  - Cambiar el icono del menú móvil en `src/components/Navigation/Navbar.tsx` para usar una animación fluida de hamburguesa a cruz.
  - Implementar animaciones de hover vectoriales en el botón flotante de WhatsApp.

### Paso 4: Optimización de Activos de Imagen
- Convertir imágenes estáticas de `public/static/img/` a `.webp` (por ejemplo, `caballo.jpg` de 600KB a un `.webp` optimizado de 60KB).
- Actualizar las referencias de imágenes en `src/pages/` correspondientes.

---

## 3. Archivos a Tocar Primero
- `src/components3d/GlobalCanvas.tsx` (Establecer DPR y optimizaciones de WebGL).
- `src/components/Navigation/Navbar.tsx` (Integración de micro-interacción de Rive para el menú móvil).
- Referencias de imágenes en las vistas `Home.tsx`, `Menu.tsx`, `Barra.tsx` y `Galeria.tsx` para enlazarlas a activos optimizados `.webp`.

---

## 4. Archivos a NO Modificar (Bajo Riesgo)
- `src/components3d/FluidGlass.tsx` (La simulación física y matemática del coctel es correcta y no requiere modificaciones).
- `src/components3d/TerrainMap.tsx` (El mapa de elevación procedural es estable y no presenta riesgos).
- `src/components3d/SteamingDish.tsx` (El sistema de partículas de vapor corre nativo por GPU y está optimizado).

---

## 5. Riesgos Técnicos Clave Antes de Codificar
- **Carga de Rive**: Las animaciones Rive importan un archivo binario `.riv`. Deben ser servidos eficientemente desde la carpeta `/public` y contar con un estado de fallback (esquema estático o skeleton loader) para evitar saltos en la maquetación.
- **Overhead de Contextos WebGL**: Al navegar entre secciones, el Canvas global persiste, pero se abren Canvas WebGL locales (en Menú y Barra). Debemos vigilar que el navegador no supere el límite de contextos activos de la GPU. El DPR limitado ayuda a contener el consumo de VRAM de forma drástica.

---

## 6. Prompt Recomendado para la Siguiente Ejecución de Antigravity

Puedes proporcionarme el siguiente prompt en la próxima sesión para continuar de forma directa y automatizada con la fase de pulido y optimización:

```text
Antigravity, inicia la Fase 6 de Desarrollo:
1. Consolida el repositorio agregando los archivos untracked al control de versiones y creando un commit.
2. Limita el DPR de todos los Canvas 3D a [1, 2] en GlobalCanvas.tsx, Menu.tsx y Barra.tsx para optimizar el consumo de GPU.
3. Convierte las imágenes pesadas de public/static/img/ a formato WebP y actualiza sus referencias en el código.
4. Diseña e integra animaciones vectoriales dinámicas en los botones clave utilizando Rive (rive-react).
```
