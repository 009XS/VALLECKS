# Guía de Finalización de SEO y Decisión de Dominio

Este documento detalla las configuraciones necesarias para realizar el lanzamiento del sitio web oficial de **La Marquesa - Valle de Rancho Viejo** a producción, abordando el enrutamiento de dominio y la optimización de SEO final.

---

## 1. Opciones de Dominio de Producción

Se proponen dos caminos técnicos para la puesta en marcha oficial del sitio:

### Opción A: Utilizar el subdominio de Netlify de forma definitiva
Si decide utilizar la dirección actual de pruebas (`https://valle-rancho-viejo.netlify.app`) como su sitio oficial para el público.

* **Ventajas:** Es completamente gratis, no requiere renovaciones anuales y el certificado de seguridad SSL se mantiene activo de por vida automáticamente.
* **Acciones técnicas a realizar:**
  1. **Enlace Canónico (`index.html`):** Inyectar el tag canónico definitivo en la cabecera `<head>`:
     ```html
     <link rel="canonical" href="https://valle-rancho-viejo.netlify.app/" />
     ```
  2. **Metadatos Open Graph (`index.html`):** Actualizar la URL de previsualización:
     ```html
     <meta property="og:url" content="https://valle-rancho-viejo.netlify.app/" />
     ```
  3. **Configuración de Sitemap (`public/sitemap.xml`):** Configurar la dirección del sitemap:
     ```xml
     <loc>https://valle-rancho-viejo.netlify.app/</loc>
     ```
  4. **Archivo Robots (`public/robots.txt`):** Indicar la ruta del sitemap:
     ```text
     Sitemap: https://valle-rancho-viejo.netlify.app/sitemap.xml
     ```

### Opción B: Conectar un Dominio Personalizado (Recomendado)
Consiste en comprar un dominio propio (por ejemplo, en GoDaddy, Neubox o Akky) y conectarlo al hosting de Netlify.

* **Ventajas:** Brinda una imagen corporativa formal, mejora el posicionamiento SEO en Google y es mucho más fácil de recordar para los clientes.
* **Propuestas de Dominios Sugeridos (Sujeto a disponibilidad):**
  - `vallederanchoviejo.com` (Excelente y directo)
  - `ranchoviejolamarquesa.com` (Fácil de asociar)
  - `valle-rancho-viejo.com` (Claro y legible)
  - `vallederanchoviejo.mx` (Localizado para México)
* **Acciones técnicas a realizar tras adquirir el dominio:**
  1. **Configuración de DNS:** En el proveedor donde compró el dominio, apunte los servidores DNS (Name Servers) hacia Netlify, o configure un registro `CNAME` apuntando a `valle-rancho-viejo.netlify.app`. En el panel de Netlify, agregue el dominio en *Domain Management*.
  2. **Enlace Canónico (`index.html`):** Reemplazar con la dirección de su nuevo dominio:
     ```html
     <link rel="canonical" href="https://[NUEVO_DOMINIO]/" />
     ```
  3. **Metadatos Open Graph (`index.html`):**
     ```html
     <meta property="og:url" content="https://[NUEVO_DOMINIO]/" />
     ```
  4. **Configuración de Sitemap (`public/sitemap.xml`):**
     ```xml
     <loc>https://[NUEVO_DOMINIO]/</loc>
     ```
  5. **Archivo Robots (`public/robots.txt`):**
     ```text
     Sitemap: https://[NUEVO_DOMINIO]/sitemap.xml
     ```

---

## 2. Checklist de Verificación de Lanzamiento SEO

Una vez definida la opción y realizados los cambios de enlaces arriba descritos:
- [ ] Ejecutar compilación de producción: `npm run build`
- [ ] Subir la carpeta de salida `dist` a Netlify.
- [ ] Verificar que el archivo `sitemap.xml` abra correctamente desde el navegador en la ruta `[DOMINIO]/sitemap.xml`.
- [ ] Confirmar que el archivo `robots.txt` devuelva el código correcto en `[DOMINIO]/robots.txt`.
- [ ] Ejecutar auditoría Lighthouse sobre el dominio final y verificar una puntuación de SEO superior a 95%.
