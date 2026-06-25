# Guía de Despliegue en Producción - La Marquesa (Rancho Viejo)

Esta guía detalla las especificaciones, requisitos y procedimientos necesarios para compilar, previsualizar y desplegar la aplicación web SPA de **La Marquesa - Valle de Rancho Viejo** en entornos de Staging y Producción.

---

## 1. Stack Tecnológico del Proyecto

La aplicación está construida utilizando tecnologías modernas de alto rendimiento:
* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 8
* **Estilos:** Tailwind CSS v4 & Vanilla CSS
* **Animaciones y 3D:** GSAP (ScrollTrigger), Three.js, React Three Fiber (R3F) y @react-three/drei
* **Linter de alto rendimiento:** oxlint

---

## 2. Requisitos de Entorno

* **Versión de Node.js:** Node.js v18.0.0 o superior (Se recomienda la versión LTS más reciente, ej. v20.x o v22.x).
* **Gestor de Paquetes Activo:** `npm` (se cuenta con el archivo de bloqueo `package-lock.json` en la raíz).

---

## 3. Comandos de Operación Local y Compilación

### Instalación de dependencias:
```bash
npm install
```

### Ejecutar servidor de desarrollo local:
```bash
npm run dev
```

### Compilar la aplicación para producción:
```bash
npm run build
```
* **Directorio de Salida:** `dist/` (este directorio contiene todos los archivos estáticos HTML, CSS, JS e imágenes compilados y optimizados).

### Previsualizar la compilación de producción de forma local:
```bash
npm run preview
```
* Levanta un servidor web estático local en el puerto `4173` para validar el comportamiento real de producción del build generado en `/dist`.

---

## 4. Tipo de Hosting Recomendado y Configuración de SPA Fallback

Dado que el proyecto es una **Single Page Application (SPA)** estática, se recomienda utilizar un servicio de hosting de archivos estáticos (Static Site Hosting). Ejemplos ideales:
* **Netlify**
* **Vercel**
* **GitHub Pages**
* **Cloudflare Pages**
* **AWS S3 + CloudFront**
* **Firebase Hosting**

### Redirección SPA (SPA Fallback Routing):
Dado que la navegación se maneja de forma virtual del lado del cliente (React virtual routing), cualquier petición HTTP directa a subpáginas que no sea la raíz (`/`) devolverá un error 404 si el servidor no está configurado para redirigir todas las rutas hacia `index.html`.
* **Solución General / Netlify:** Se incluye el archivo `public/_redirects` el cual configura al servidor para realizar esta redirección automáticamente:
  ```text
  /* /index.html 200
  ```
* **Vercel (`vercel.json`):** Si se despliega en Vercel, se recomienda crear un archivo `vercel.json` con la regla de reescritura:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
* **Apache (`.htaccess`):**
  ```apache
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```
* **Nginx (`nginx.conf`):**
  ```nginx
  location / {
      try_files $uri $uri/ /index.html;
  }
  ```

---

## 5. Consideraciones de Rendimiento y Assets en Producción

### Carga de WebGL e Initial Bundle (Por Diseño):
El tamaño del código JavaScript inicial de primera carga se ubica en **1.21 MB**. 
* **Justificación:** Este tamaño es **por diseño**. La aplicación requiere cargar de inmediato las librerías `three` y `@react-three` para desplegar la experiencia tridimensional del bosque en el Hero principal de la página de inicio, siendo este un elemento fundamental de la identidad de la marca.
* **Optimización activa:** Todo el código JavaScript restante correspondiente a las subpáginas secundarias (`Atracciones`, `Menu`, `Barra`, `Galeria`, `Ubicacion`) se importa de forma perezosa (`React.lazy`) bajo demanda, descargando el código correspondiente a cada subsección sólo cuando el usuario hace click en su pestaña.
* **Capping y Pausa de Loops:** La aplicación cuenta con pausas en tiempo de ejecución. Los loops de animación WebGL se pausan de forma inmediata cuando el Canvas está fuera del viewport del navegador (`offscreen`) o cuando el usuario cambia de pestaña de navegación (`document.hidden`), reduciendo el consumo de GPU/CPU a 0%.

### WebP Images & SmartImage:
* El proyecto cuenta con un pipeline de optimización de imágenes basado en `sharp` (`npm run optimize:images`).
* Las imágenes activas del sitio han sido migradas al formato `.webp` optimizado y se sirven usando el componente `SmartImage`, el cual provee fallbacks visuales de carga suave y previene el Layout Shift en pantallas táctiles y móviles.

### Estado de Rive Animations:
* La librería `rive-react` se encuentra instalada en el archivo `package.json`.
* **Nota Importante:** La integración activa de componentes Rive ha sido diferida hasta que el equipo de diseño provea los archivos `.riv` reales de animación. Actualmente no se carga ningún peso de Rive en los flujos principales.
