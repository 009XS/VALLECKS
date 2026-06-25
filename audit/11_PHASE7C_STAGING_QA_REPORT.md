# Reporte de Control de Calidad en Entornos de Staging - Fase 7C

Este reporte documenta los resultados de la Fase 7C, la cual se enfocó en realizar las pruebas de control de calidad sobre la previsualización del empaquetado de producción, analizar el comportamiento responsivo en múltiples resoluciones de dispositivos, evaluar las políticas de metadatos SEO y definir el estado de preparación para el despliegue final.

---

## 1. Estado de Conexión del Hosting y Despliegue en Staging

* **Proveedor Detectado:** Ningún proveedor de hosting estático (Netlify, Vercel o similar) se encuentra conectado directamente al repositorio a nivel de archivos de configuración locales.
* **Acción Realizada:** Creamos la guía detallada [docs/STAGING_DEPLOY_MANUAL.md](file:///C:/Users/anara/Desktop/valle_copia/docs/STAGING_DEPLOY_MANUAL.md) para instruir al usuario sobre cómo conectar el repositorio de GitHub `https://github.com/009XS/VALLECKS.git` a Netlify o Vercel de forma rápida y segura.
* **Resumen del Build:** La compilación local finalizó con éxito en un tiempo de 250ms, generando los siguientes activos principales en la carpeta `/dist`:
  * `index.html` (2.27 kB) - Punto de entrada único.
  * `assets/index-*.css` (43.45 kB) - Hojas de estilo procesadas de Tailwind CSS.
  * `assets/index-*.js` (21.36 kB) - Lógica y bootstrap de la aplicación React.
  * `assets/vendor-three-*.js` (871.89 kB) - Librerías core de 3D WebGL (cargadas inicialmente por diseño).
  * `assets/vendor-gsap-*.js` (112.81 kB) - Motor de animaciones.
  * `assets/vendor-react-*.js` (182.80 kB) - Librería React Core.
  * Chunks de carga dinámica (Atracciones, Menú, Barra, Galería, Ubicación, etc.) cargados de forma perezosa.

---

## 2. Pruebas de Funcionamiento y Enrutamiento (SPA Fallback)

Dado que no se cuenta con una URL pública activa administrada por el agente, realizamos las pruebas de QA sobre el servidor local de previsualización de producción (`npm run preview`) en `http://localhost:4173/`:

* **Home (Inicio):** El Hero, el fondo tridimensional del bosque (`ForestScene`) y las partículas cargan instantáneamente.
* **Atracciones:** Transición virtual limpia. El modelo interactivo en 3D responde perfectamente al arrastre y hover del cursor.
* **Menú:** Los tres bloques de menú se renderizan homogéneamente. El Café de Olla 3D carga correctamente sus partículas de vapor.
* **La Barra:** La física de líquidos interactiva del cóctel responde al mouse sin retardo de frames.
* **Galería:**
  * El grid de 12 elementos carga eficientemente imágenes WebP.
  * Hacer clic en un elemento abre el lightbox en pantalla completa.
  * La imagen ampliada hereda su título real en el atributo `alt` (ej. `alt="Lago Místico"`).
  * Presionar la tecla `Escape` cierra el lightbox de inmediato y devuelve el foco al grid.
  * Al hacer clic directo sobre el contenedor de la imagen ampliada, la vista **no se cierra** (se detiene la propagación del evento), cerrándose únicamente al pulsar la X o hacer clic en el fondo oscuro.
* **Ubicación:** El selector conmuta correctamente entre el mapa en 3D y el iframe oscuro de Google Maps.

### Análisis del Enrutamiento SPA:
* **Comportamiento:** La aplicación emplea navegación virtual basada en estado de React (`currentPage`). Esto significa que la URL en la barra del navegador se mantiene constante en el nivel raíz `/`.
* **Impacto al Refrescar:** Si un usuario refresca el navegador en la sección "Menú" o "Barra", el estado de React se reinicia, devolviéndolo a la página de inicio (Home).
* **Decisión Técnica:** Este comportamiento de enrutamiento basado en estado es **totalmente aceptable** para un sitio web de mercadeo de una sola página (Landing Page/SPA) como Rancho Viejo. Mantiene el desarrollo simple, evita duplicaciones de URLs y elimina la necesidad de enrutar de forma compleja. 
* **Recomendación para Fase 7D:** Se determina que **no es necesario** integrar React Router o navegación basada en hashes (`#/`) a menos que el cliente requiera de manera explícita compartir enlaces directos a subsecciones específicas de la página.

---

## 3. Auditoría de Carga de Red y Rendimiento

* **Payload JavaScript de Primera Carga:** ~1.21 MB (cargado de forma inmediata para inicializar `vendor-three` y `GlobalCanvas` en el inicio del Hero).
* **Chunks Perezosos (Lazy Chunks):** Verificamos que al navegar a Atracciones o Galería, el navegador descarga únicamente los chunks pequeños de JavaScript asociados (ej. `Galeria-*.js` de 3.86 KB), demostrando que la carga selectiva funciona.
* **Uso de Memoria y Pausas WebGL:** Las pausas de ciclo en segundo plano reducen a 0% el procesamiento aritmético al cambiar de pestaña del navegador, protegiendo los recursos gráficos del dispositivo del cliente.
* **Imágenes optimizadas:** La totalidad de las imágenes son cargadas en formato `.webp` optimizado desde `/static/img/optimized/`, sin dependencias a recursos JPG o PNG pesados originales.
* **Favicon e Iconos:** El favicon de tipo vector SVG se carga correctamente y se muestra en la pestaña del explorador.

---

## 4. Pruebas de Adaptabilidad Móvil (Responsive QA)

Realizamos pruebas visuales modificando el viewport del navegador a diferentes resoluciones:

1. **Mobile (390px - iPhone 12 Pro):**
   * El título "La Marquesa" y el isotipo de la marca se adaptan sin desbordamientos de texto.
   * El menú clásico horizontal se oculta de forma automática, dando paso al icono de hamburguesa (`Abrir menú`).
   * Al hacer clic en el menú, el cajón de navegación (drawer) móvil se despliega verticalmente cubriendo de forma limpia las secciones, y conmuta el botón de control al estado X (`Cerrar menú`).
   * El botón flotante de WhatsApp permanece fijo y accesible en la esquina inferior derecha con dimensiones cómodas para interacción táctil.
2. **Tablet (768px - iPad):**
   * Los bloques de contenido e imágenes se distribuyen de forma apilada responsiva.
   * Las proporciones de los Canvas locales de 3D ocupan el espacio esperado sin colapsar.
3. **Desktop (1366px):**
   * El grid de galería se distribuye uniformemente en 3 columnas.
   * Se muestra la barra de navegación tradicional.

---

## 5. Auditoría de SEO en Staging

* **Language:** `<html lang="es-MX">` (Correcto para posicionamiento localizado).
* **Metadatos Básicos:** Título descriptivo y meta descripción inyectados adecuadamente.
* **Metadatos Sociales:** Directivas Open Graph y Twitter Cards completas, utilizando como preview la imagen `/static/img/optimized/rancho-viejo.webp`.
* **robots.txt y sitemap.xml:** Ambos archivos resuelven perfectamente en el servidor de producción.
* **Bloqueador SEO Pendiente:** Mantener el enlace canónico (`<link rel="canonical">`) inactivo y las URLs del sitemap/robots con placeholders hasta que el cliente defina y confirme el dominio final de producción.

---

## 6. Dictamen de Preparación para Staging y Producción

* **Estado General:** **Aprobado**. El proyecto se encuentra en un estado sumamente robusto, sin regresiones visuales, sin fallas de linter y libre de errores de JavaScript.
* **Próximo Paso Recomendado:** Ejecutar los pasos descritos en [docs/STAGING_DEPLOY_MANUAL.md](file:///C:/Users/anara/Desktop/valle_copia/docs/STAGING_DEPLOY_MANUAL.md) para subir la compilación final a un entorno de pruebas público (Netlify o Vercel) y entregar las credenciales de dicho entorno al cliente para su revisión visual.
