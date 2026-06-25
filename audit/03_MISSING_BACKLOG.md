# Backlog de Trabajo Faltante (Pendientes)

Este documento clasifica las tareas faltantes por prioridad de cara a consolidar la migración y elevar el acabado visual a los estándares de ultra alto rendimiento y optimización de hardware planteados.

---

## P0 — Bloqueantes
*Ninguno.* El proyecto actual no presenta errores de compilación (`npm run build` exitoso), errores de linter (`oxlint` en 0 errores/warnings), ni conflictos en la inicialización del servidor local. La aplicación corre y es navegable en su totalidad.

---

## P1 — Requeridos (Migración Base)
1. **Consolidar Repositorio Git**: Realizar el commit de la estructura del proyecto Vite React-TS. Actualmente, todos los archivos del nuevo stack se listan como "untracked", mientras que los archivos HTML5 antiguos se muestran como "deleted". Es necesario consolidar esto para estabilizar el control de versiones.
2. **Actualizar Rutas de Favicon y Recursos**: Verificar que los enlaces del head en `index.html` apunten de forma correcta a `public/favicon.svg` o recursos locales, eliminando warnings silenciosos de recursos no encontrados.

---

## P2 — Interfaz y Detalles Premium (Estética Corporativa)
1. **Micro-interacciones con Rive**:
   - Integrar animaciones vectoriales fluidas en botones e iconos críticos (como el botón flotante de WhatsApp, el menú hamburguesa móvil, o el botón de reservas en la página de inicio) utilizando la dependencia `rive-react` ya instalada.
2. **Parallax y Animaciones de Desplazamiento GSAP**:
   - En la página de Inicio, conectar el movimiento de la cámara del `GlobalCanvas` (`ForestScene`) con el scroll vertical de la ventana utilizando `ScrollTrigger`, creando un efecto de profundidad tridimensional inmersivo al navegar hacia abajo.
3. **Sombreadores Personalizados (GLSL Shaders)**:
   - Introducir un shader de post-procesamiento sutil (como viñeteado físico, aberración cromática ligera en los bordes de la pantalla o un efecto de bloom dorado) para enfatizar la estética de "Lujo Rústico".

---

## P3 — Optimización y Rendimiento (Meta 120 FPS en RTX 5050)
1. **Límites de Densidad de Píxeles (devicePixelRatio)**:
   - Configurar la propiedad `dpr` en todos los componentes `<Canvas>` de React Three Fiber para limitarlo a un máximo de 2: `dpr={[1, 2]}`. Esto evita caídas drásticas de framerate en pantallas Retina o laptops 4K al procesar fragmentos innecesarios.
2. **Compresión de Texturas y Activos**:
   - Convertir las imágenes JPG/PNG de gran tamaño en `public/static/img/` a formato moderno `.webp` y optimizar sus dimensiones físicas.
3. **Uso Disciplinado de requestAnimationFrame**:
   - Validar que no existan bucles paralelos o concurrentes fuera de `useFrame` de Fiber que bloqueen el hilo visual.
4. **Code Splitting (División de Código)**:
   - Configurar Vite y Rolldown para dividir el paquete javascript resultante, cargando de forma diferida (lazy loading) las páginas pesadas (con WebGL Canvas locales) para acelerar la carga inicial del sitio.

---

## P4 — Opcionales e Ideas de Futuro
1. **Mapeo de Altura Dinámico**: Integrar un cargador de heightmap por textura en el componente `TerrainMap.tsx` en lugar de la función matemática senoidal actual, permitiendo recrear de forma 100% fiel las curvas de nivel topográficas reales del Valle de Rancho Viejo.
2. **WebAssembly / Rust**: Integrar un módulo compilado en WebAssembly en caso de implementar un simulador físico de clima interactivo (viento dinámico y lluvia de hojas que caen de los árboles del Canvas global) para procesar colisiones en hilos separados sin interferir con la animación principal.
