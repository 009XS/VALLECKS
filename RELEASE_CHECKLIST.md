# Checklist de Lanzamiento de Producción (Release Checklist)

Esta lista reúne los pasos secuenciales de verificación obligatoria para llevar a cabo la liberación de una nueva versión del sitio web de **La Marquesa**.

---

## 1. Validación de Construcción Local

- [ ] **Limpieza de dependencias:** Eliminar directorios temporales si se sospechan conflictos (`rm -rf node_modules package-lock.json` y reinstalar).
- [ ] **Instalación:** `npm install` ejecutado limpiamente.
- [ ] **oxlint (Linter):** Correr `npm run lint` y corroborar que no arroja errores ni advertencias en consola.
- [ ] **Compilación:** Correr `npm run build` y validar que el proceso finaliza en un tiempo aceptable sin advertencias del compilador de TypeScript o Rollup.

---

## 2. Pruebas Funcionales y Visuales (Production Preview)

Ejecutar `npm run preview` localmente y comprobar en el navegador:

- [ ] **Verificación de Páginas:** Navegar secuencialmente por todas las vistas virtuales:
  - [ ] Home
  - [ ] Atracciones
  - [ ] Menú
  - [ ] La Barra
  - [ ] Galería
  - [ ] Ubicación
- [ ] **Errores en Consola:** Inspeccionar las herramientas de desarrollo del navegador para verificar la total ausencia de mensajes de error de JavaScript (rojos) o llamadas HTTP fallidas (404s).
- [ ] **Recursos Rotos:** Confirmar la correcta visualización de todos los iconos SVG (`favicon.svg`, `icons.svg`) e imágenes `.webp` de fondo.
- [ ] **Responsividad Móvil:** Probar la cabecera interactiva y abrir/cerrar el menú desplegable del Navbar en pantallas táctiles y tamaños móviles simulados.
- [ ] **Galería y Lightbox:**
  - [ ] Las imágenes del grid se expanden al hacer click o presionar `Enter`/`Espacio`.
  - [ ] El modal cuenta con la descripción real correspondiente en el atributo `alt`.
  - [ ] El modal se cierra correctamente al pulsar la tecla `Escape`.
- [ ] **Botones de WhatsApp:** El CTA flotante y los enlaces en las secciones abren la URL externa correcta (`https://wa.me/525538773469`) con su correspondiente etiqueta `aria-label`.
- [ ] **Comportamiento WebGL:**
  - [ ] Las escenas tridimensionales se inician y rotan correctamente.
  - [ ] Comprobar que los render loops locales se detienen cuando el canvas sale de la vista visible (scroll vertical).
  - [ ] Comprobar que todos los canvas pausan su ejecución al minimizar la ventana o cambiar de pestaña.

---

## 3. Comprobaciones de Accesibilidad y SEO

- [ ] **Preferencia de Movimiento Reducido:** Activar la simulación de movimiento reducido en el navegador/OS y validar que cesa la rotación automática del mapa de relieve y las simulaciones procedurales de partículas de niebla o vapor.
- [ ] **Lectores de pantalla:** Verificar que los botones tridimensionales de atracciones y cócteles cuentan con roles y etiquetas aria descriptivas.
- [ ] **Imagen OG:** Corroborar que la ruta de la etiqueta `og:image` coincide con el archivo de previsualización WebP en `/static/img/optimized/rancho-viejo.webp`.
- [ ] **Dominio y Sitemap:**
  - [ ] Modificar las URLs de `robots.txt` y `sitemap.xml` para reemplazar el dominio temporal por el enlace oficial provisto por el cliente.
  - [ ] Si se cuenta con el dominio final, agregar la etiqueta `<link rel="canonical" href="...">` en la cabecera del archivo `index.html`.

---

## 4. Cierre de Git y Liberación

- [ ] **Commit de Lanzamiento:** Crear un commit limpio con la firma del build final:
  ```bash
  git add .
  git commit -m "release: prepare final production build for version X.X.X"
  ```
- [ ] **Etiquetado (Tagging):** Realizar el etiquetado de la versión únicamente después de que el despliegue en producción se haya verificado con éxito:
  ```bash
  git tag -a vX.X.X -m "Lanzamiento oficial versión X.X.X"
  git push origin vX.X.X
  ```
