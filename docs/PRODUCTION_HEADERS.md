# Guía de Caché y Cabeceras de Seguridad en Producción

Este documento detalla las cabeceras HTTP de optimización (caché) y seguridad recomendadas para el despliegue estático del sitio web de **La Marquesa**.

---

## 1. Estrategia de Caché en el Servidor (Caching Policy)

Para garantizar descargas de alto rendimiento y evitar recargas redundantes, se sugieren las siguientes políticas de caché en el servidor CDN/Hosting:

### A. Documentos de Entrada (HTML)
* **Archivos:** `index.html`
* **Directiva:** `Cache-Control: no-cache, no-store, must-revalidate`
* **Explicación:** Obliga al navegador a validar siempre con el servidor si existe una nueva versión antes de servir el archivo local. Esto evita que los usuarios queden atrapados en versiones obsoletas de la aplicación.

### B. Activos Hacheados por Compilación (JS y CSS)
* **Archivos:** `/assets/index-*.js`, `/assets/index-*.css`, y chunks asociados.
* **Directiva:** `Cache-Control: public, max-age=31536000, immutable`
* **Explicación:** Dado que Vite genera huellas (hashes) únicas en los nombres de estos activos durante el build, si el archivo cambia, su nombre cambia. Es seguro instruir al cliente a cachear estos archivos de forma persistente y permanente.

### C. Imágenes de Carga (WebP)
* **Archivos:** `/static/img/optimized/*.webp`
* **Directiva:** `Cache-Control: public, max-age=31536000, must-revalidate`
* **Explicación:** Permite una caché de largo plazo para las imágenes optimizadas de la galería y la interfaz, con revalidación de seguridad.

### D. Vectores y Favicons (SVG)
* **Archivos:** `/favicon.svg`, `/icons.svg`
* **Directiva:** `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
* **Explicación:** Asigna una caché moderada de 7 días, permitiendo descargas en segundo plano si los iconos se actualizan.

---

## 2. Cabeceras de Seguridad Recomendadas

Para mitigar riesgos comunes en aplicaciones web del lado del cliente, se recomienda inyectar las siguientes cabeceras HTTP en el panel de control del hosting:

### A. X-Content-Type-Options
* **Directiva:** `X-Content-Type-Options: nosniff`
* **Explicación:** Previene que los navegadores intenten interpretar el tipo MIME de un archivo a través de sniffing, bloqueando hojas de estilo o scripts con tipos MIME incorrectos.

### B. Referrer-Policy
* **Directiva:** `Referrer-Policy: strict-origin-when-cross-origin`
* **Explicación:** Envía únicamente el origen en peticiones externas de enlaces salientes, previniendo fugas de información interna.

### C. Permissions-Policy
* **Directiva:** `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
* **Explicación:** Desactiva de forma proactiva el acceso a APIs de hardware que el portal de Rancho Viejo no requiere, reduciendo la superficie de vulnerabilidad ante scripts de terceros.

---

## 3. Nota Crítica: Content Security Policy (CSP)

Implementar una cabecera de tipo **Content-Security-Policy (CSP)** requiere pruebas minuciosas y rigurosas.
* **Advertencia:** Three.js y React Three Fiber emplean la creación de hilos (Web Workers) y compilaciones dinámicas de shaders en tiempo de ejecución. 
* **Riesgo:** Una política de CSP muy restrictiva (ej. sin `unsafe-inline` o `unsafe-eval`) puede bloquear el renderizado del lienzo de WebGL de Three.js o las inyecciones dinámicas de estilos de Tailwind CSS.
* **Recomendación:** Se desaconseja activar directivas CSP rígidas en producción sin realizar pruebas previas exhaustivas en un entorno de Staging. Para testing inicial se sugiere usar la cabecera `Content-Security-Policy-Report-Only` para analizar advertencias sin romper el renderizado.
