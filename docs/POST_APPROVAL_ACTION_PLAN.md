# Plan de Acción Post-Aprobación del Cliente

Una vez que el cliente apruebe la demostración del sitio web y entregue la información solicitada en la lista de confirmaciones, se deberán ejecutar los siguientes pasos técnicos en orden de prioridad para realizar el lanzamiento final:

---

## 🚀 Pasos de Lanzamiento Definitivo

### Paso 1: Reemplazo de Fotografías Oficiales
1. Recibir las fotografías oficiales del Rancho (motos, tirolesa, cabañas, comida y bar).
2. Guardar los archivos originales en la carpeta:
   📁 `public/static/img/`
3. Ejecutar en consola el script de optimización WebP:
   ```bash
   npm run optimize:images
   ```
4. Actualizar el catálogo de rutas en código:
   📄 [src/config/images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts)

### Paso 2: Actualización de Textos e Información de Negocio
Según los datos confirmados por el cliente, realizar las modificaciones en los siguientes componentes:
* **Número de WhatsApp:** Modificar el número telefónico internacional en todos los botones e indicador de WhatsApp flotante (ej. reemplazar `525538773469` si cambia).
* **Dirección y Horarios:** Actualizar en `src/pages/Ubicacion/Ubicacion.tsx` y `src/components/Footer/Footer.tsx`.
* **Platillos / Ingredientes:** Si se definen precios o cambios de ingredientes en la carta, modificarlos en `src/pages/Menu/Menu.tsx` y `src/pages/Barra/Barra.tsx`.
* **Enlace a Redes Sociales:** Conectar los perfiles de redes sociales provistos en los enlaces del pie de página.

### Paso 3: Registro y Conexión de Dominio
1. Si el cliente solicita que se adquiera un dominio, asistir en la compra (ej. `www.vallederanchoviejo.com`).
2. Configurar los registros DNS en el panel del registrador apuntando hacia Netlify (servidores Name Servers de Netlify).
3. Añadir el dominio personalizado en la pestaña *Domain Management* del proyecto en Netlify y esperar a que el certificado SSL se habilite.

### Paso 4: Configuración Final de SEO para Dominio Propio
Actualizar las siguientes referencias para evitar canonicals ficticios y asegurar la indexación:
1. **Canonical & OG URL (`index.html`):**
   - Reemplazar el href canónico y `og:url` con el nuevo dominio final (ej. `https://www.vallederanchoviejo.com/`).
2. **Sitemap (`public/sitemap.xml`):**
   - Reemplazar el placeholder actual por la dirección del dominio final.
3. **Robots (`public/robots.txt`):**
   - Reemplazar la directiva `Sitemap:` para apuntar a la ruta del nuevo sitemap en el dominio final.

### Paso 5: Despliegue de Producción y Verificación Final
1. Ejecutar el comando de verificación local para asegurar limpieza absoluta:
   ```bash
   npm run verify
   ```
2. Realizar git commit y push a la rama `main`:
   ```bash
   git add .
   git commit -m "feat: launch production release with official domain and assets"
   git push
   ```
3. Esperar que Netlify compile de forma automática.
4. Ejecutar el checklist final de [RELEASE_CHECKLIST.md](file:///C:/Users/anara/Desktop/valle_copia/RELEASE_CHECKLIST.md) sobre la URL del dominio definitivo.
