# Guía de Despliegue Manual en Entornos de Staging

Este documento detalla el paso a paso estructurado para conectar el repositorio de GitHub a un proveedor de hosting estático (Netlify o Vercel) y realizar el despliegue inicial en un entorno de Staging.

---

## 1. Conexión e Inicialización de Hosting

### Opción A: Despliegue en Netlify (Recomendado)
Netlify es idóneo para este proyecto dado que ya se incluye el archivo de redirección `public/_redirects`.
1. Inicie sesión en [Netlify](https://www.netlify.com/).
2. Haga clic en **"Add new site"** y seleccione **"Import an existing project"**.
3. Seleccione **GitHub** como proveedor de Git y autorice el acceso.
4. Busque e importe el repositorio: `009XS/VALLECKS`.
5. Configure los parámetros de compilación (Build Settings):
   * **Branch to deploy:** `main`
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
6. En la sección **"Environment variables"**, añada (opcional):
   * `NODE_VERSION` = `20`
7. Haga clic en **"Deploy site"**.
8. Una vez finalizado el despliegue, copie la URL pública generada por Netlify (ej. `https://vallecks-staging.netlify.app/`).

### Opción B: Despliegue en Vercel
Vercel compila y distribuye de forma excelente aplicaciones SPA de Vite.
1. Inicie sesión en [Vercel](https://vercel.com/).
2. Haga clic en **"Add New"** > **"Project"**.
3. Importe el repositorio: `009XS/VALLECKS`.
4. Configure el proyecto (Project Settings):
   * **Framework Preset:** `Vite`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Haga clic en **"Deploy"**.
6. Vercel creará automáticamente la redirección para SPAs basándose en el preset de Vite. De lo contrario, se puede crear opcionalmente un archivo `vercel.json` en la raíz del proyecto con la siguiente regla:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
7. Copie la URL del dominio de staging provista por Vercel.

---

## 2. Lista de Control de Verificación de URL de Staging (Checklist)

Una vez que el despliegue remoto sea exitoso y se cuente con la URL pública de Staging, siga este checklist exhaustivo de control de calidad:

- [ ] **Acceso Raíz:** Carga correcta de la página de inicio (Hero, partículas y fuentes).
- [ ] **Navegación Móvil:** El menú de hamburguesa en dispositivos móviles abre y cierra de forma fluida.
- [ ] **Navegación Virtual (SPA):** Cambiar de pestaña (Atracciones, Menú, Barra, Galería, Ubicación) carga las secciones al instante sin recargar la página por completo.
- [ ] **Comportamiento WebGL Activo:** Los visores 3D de atracciones, cócteles, y relieve terrestre cargan y responden al arrastre del cursor sin advertencias de pérdida de contexto.
- [ ] **Rutas y Refrescos (SPA Fallback):** Probar el refresco de pantalla en la barra de navegación del explorador. Debe mantener al usuario en el portal sin lanzar errores 404 (gracias a `_redirects` en Netlify o rewrite en Vercel).
- [ ] **Luz de Carga de Assets:** Confirmar en la pestaña Network de DevTools que las imágenes se cargan en formato optimizado `.webp` y que el favicon de vector SVG se muestra en la pestaña del navegador.
- [ ] **Lightbox de Galería:** 
  - [ ] Hacer clic en una imagen abre la visualización en tamaño completo.
  - [ ] El título se lee de forma clara y el atributo `alt` describe la foto con su título real.
  - [ ] Pulsar la tecla `Escape` cierra la visualización y regresa el foco al grid.
- [ ] **Enlace a WhatsApp:** El botón flotante pulsa correctamente y redirige a la conversación con el número asignado.
- [ ] **Pausas por Visibilidad:** Validar que al cambiar de pestaña del navegador, el consumo de CPU y GPU disminuye a 0% debido a la política de suspensión del render loop.
