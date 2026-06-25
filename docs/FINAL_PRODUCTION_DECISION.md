# Guía de Decisión de Dominio de Producción - La Marquesa (Rancho Viejo)

Este documento sirve como base de decisión para la entrega final del proyecto. Actualmente, la aplicación cuenta con un entorno Staging público en Netlify (`https://valle-rancho-viejo.netlify.app`) y está lista para producción. Sin embargo, para finalizar la optimización de SEO y el enrutamiento canónico, se debe tomar una decisión sobre el dominio definitivo.

A continuación, se exponen las dos opciones de despliegue junto con sus respectivos checklists de acciones técnicas asociadas:

---

## Opción A: Utilizar la URL de Netlify como Dominio de Producción Final

Si se decide utilizar el subdominio gratuito provisto por Netlify (`https://valle-rancho-viejo.netlify.app`) como la dirección final para el público.

### Pasos Técnicos Requeridos:
1. **Modificación de Metadatos (`index.html`):** Inyectar el enlace canónico apuntando a Netlify:
   ```html
   <link rel="canonical" href="https://valle-rancho-viejo.netlify.app/" />
   ```
2. **Modificación del Sitemap (`public/sitemap.xml`):** Cambiar la etiqueta `<loc>` para usar el subdominio de Netlify:
   ```xml
   <loc>https://valle-rancho-viejo.netlify.app/</loc>
   ```
3. **Modificación del archivo de rastreo (`public/robots.txt`):** Actualizar la directiva del sitemap:
   ```text
   Sitemap: https://valle-rancho-viejo.netlify.app/sitemap.xml
   ```
4. **Modificación de Open Graph (`index.html`):** Opcional, pero recomendado, cambiar la etiqueta `og:url` a la dirección de Netlify.
5. **Marcar sitio como listo:** Confirmar cambios en Git, ejecutar `npm run build` y subir a producción.

---

## Opción B: Utilizar un Dominio Personalizado (Recomendado)

Si se decide adquirir o configurar un dominio personalizado propio para el negocio (ej. `https://vallederanchoviejo.mx` o similar).

### Pasos Técnicos Requeridos (A realizarse tras la compra y asignación del dominio):
1. **Mapeo DNS en Netlify/Hosting:** Configurar los registros CNAME y/o ALIAS de la dirección comprada para que apunten a los servidores del hosting de Netlify (conectar el dominio en la pestaña "Domain Management" de Netlify).
2. **Modificación de Metadatos (`index.html`):** Inyectar el enlace canónico una vez que el dominio esté activo y cuente con certificado SSL habilitado:
   ```html
   <link rel="canonical" href="https://[NUEVO_DOMINIO_CLIENTE]/" />
   ```
3. **Modificación del Sitemap (`public/sitemap.xml`):** Reemplazar el placeholder por el nuevo dominio:
   ```xml
   <loc>https://[NUEVO_DOMINIO_CLIENTE]/</loc>
   ```
4. **Modificación del archivo de rastreo (`public/robots.txt`):** Reemplazar la referencia:
   ```text
   Sitemap: https://[NUEVO_DOMINIO_CLIENTE]/sitemap.xml
   ```
5. **Modificación de Open Graph (`index.html`):** Asegurar que las URLs de imagen de OG y Twitter de previsualización social apunten a la ruta del nuevo dominio.
6. **Validación:** Ejecutar un despliegue de prueba para producción y testear con auditorías Lighthouse externas para garantizar el 100% de consistencia de SEO.
