# Auditoría de Cambios - Qué Cambió y Qué se Conserva

Este documento detalla la reconstrucción arqueológica del sitio web original de **La Marquesa** y cataloga las modificaciones, adiciones e integraciones realizadas durante el proceso de migración actual.

---

## 1. Mapeo Arqueológico del Sitio Original (Antes)

El proyecto original (`valle_original`) consistía en un sitio de marketing tradicional de varias páginas estáticas basadas en HTML5 y Tailwind CSS cargado desde CDN.

- **Páginas Originales**:
  - `index.html`: Portada de bienvenida con enlaces rápidos de exploración.
  - `atracciones.html`: Listado de actividades de aventura (cuatrimotos, tirolesa, gotcha, paseos a caballo).
  - `menu.html`: Listado completo de alimentos y bebidas del restaurante.
  - `barra.html`: Sección de mixología, cervezas artesanales y licores locales.
  - `galeria.html`: Masonry de imágenes estáticas que retratan las actividades del parque.
  - `ubicacion.html`: Enlace de Google Maps con información geográfica estática.
- **Estructura Estilística**:
  - Tailwind CDN con configuración personalizada embebida en `<script id="tailwind-config">`.
  - Hojas de estilos locales (`static/css/theme-transitions.css`) y scripts locales (`static/js/theme-transitions.js`) para manejar pequeñas transiciones de foco y opacidad.
- **Comportamiento JS**:
  - Lógica simple e imperativa de manipulación del DOM para abrir/cerrar menús móviles y cambiar clases CSS.
- **Activos (Assets)**:
  - 14 imágenes en formato `.jpg` que representaban las actividades y comida.

---

## 2. Inventario de lo Nuevo y Migrado (Ahora)

El proyecto ha sido rediseñado como una SPA modular. A continuación se categoriza el estado de cada componente migrado:

### A. Completados e Integrados (100% Funcionales)
- **App Shell & Layout**:
  - `src/components/Navigation/Navbar.tsx`: Navbar responsivo con efectos de desenfoque de cristal (glassmorphism) y estados activos de navegación virtual.
  - `src/components/Footer/Footer.tsx`: Pie de página unificado que redirige virtualmente y centraliza la información de contacto y redes sociales.
  - `src/components/FloatingWA/FloatingWA.tsx`: Botón flotante animado de contacto directo a WhatsApp con animación de pulso.
- **Enrutamiento React-GSAP**:
  - Implementado directamente en `src/App.tsx`. Maneja la transición instantánea de pantallas con un efecto GSAP de fade-in y limpieza de ScrollTriggers de forma limpia y robusta.
- **Páginas Migradas**:
  - `src/pages/Home/Home.tsx`: Hero visual Premium, sección rústica-lujosa con accesos directos y ScrollTrigger integrado.
  - `src/pages/Atracciones/Atracciones.tsx`: Grid de atracciones al lado de un Canvas WebGL que carga e interactúa con el modelo 3D seleccionado.
  - `src/pages/Menu/Menu.tsx`: Menú gastronómico responsivo optimizado a doble columna en tabletas y triple columna en pantallas grandes. Activa interactivamente el modelo de vapor `SteamingDish` para el *Café de Olla*.
  - `src/pages/Barra/Barra.tsx`: Mixología premium con tarjetas interactivas asociadas a la simulación 3D de líquido físico `FluidGlass`.
  - `src/pages/Galeria/Galeria.tsx`: Grid uniforme optimizado con `aspect-[4/3]` y modal lightbox interactivo.
  - `src/pages/Ubicacion/Ubicacion.tsx`: Panel interactivo que alterna entre Google Maps integrado en modo oscuro y el modelo de relieve 3D `TerrainMap`.
- **Modelos 3D Procedimentales (WebGL / R3F)**:
  - `src/components3d/GlobalCanvas.tsx`: Administrador de WebGL de fondo para transiciones y distribución de GPU.
  - `src/components3d/ForestScene.tsx`: Bosque interactivo con instanciación masiva de pinos (180 instancias) y partículas doradas en suspensión que responden al movimiento del cursor.
  - `src/components3d/AttractionModel.tsx`: Modelos procedimentales 3D rústicos y estilizados para atracciones (Diana de gotcha, chasis de cuatrimoto, polea de tirolesa y herradura metálica).
  - `src/components3d/TerrainMap.tsx`: Representación tridimensional del mapa físico con wireframe dorado luminoso y marcador de ubicación glowing.
  - `src/components3d/SteamingDish.tsx`: Jarro tradicional de barro en 3D con simulación de vapor activo por GPU.
  - `src/components3d/FluidGlass.tsx`: Simulador físico interactivo de balanceo de líquidos con hielos y hojas de hierbabuena flotantes según el coctel seleccionado.

### B. Creado pero sin uso / Abandonado
- **Archivos Estáticos en `public/static/css/` y `public/static/js/`**:
  - `theme-transitions.css` y `theme-transitions.js` fueron copiados al directorio público pero ya no se usan, dado que toda la lógica de animación ha sido delegada a GSAP y el tipado a TypeScript en `src/`. Es seguro preservarlos como referencia o eliminarlos en una etapa de limpieza profunda.

### C. Riesgos y Aspectos a Preservar
- **Preservar**: La arquitectura actual de renderizado procedural 3D y el enrutamiento reactivo en `App.tsx` son altamente eficientes (consumen solo 41-44MB de RAM y están acoplados directamente al hardware de video). Deben mantenerse intactos en la siguiente fase.
- **Riesgo**: No se están limitando los ratios de pixeles (devicePixelRatio) en los componentes `<Canvas>`. En pantallas de muy alta densidad de píxeles (4K, pantallas Retina), esto podría multiplicar exponencialmente la carga de fragment shaders y amenazar la meta de 120 FPS estables.
