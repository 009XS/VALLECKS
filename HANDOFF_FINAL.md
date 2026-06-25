# Documento de Entrega Técnica y Handoff Final

Este documento detalla todas las especificaciones técnicas del proyecto, los procedimientos de compilación y despliegue, y las guías de mantenimiento para **La Marquesa - Valle de Rancho Viejo** SPA.

---

## 1. Resumen del Proyecto y Estatus
* **Nombre del Proyecto:** La Marquesa / Valle de Rancho Viejo React + TypeScript + Vite SPA.
* **URL Pública de Netlify:** https://valle-rancho-viejo.netlify.app
* **Repositorio en GitHub:** https://github.com/009XS/VALLECKS.git
* **Proveedor de Alojamiento:** Netlify
* **Estatus Final de QA:** **APROBADO**. Se ha verificado la integridad visual y técnica (linter limpio, compilación limpia y visualización responsiva).

---

## 2. Stack Tecnológico
* **Framework:** React 19 (TypeScript)
* **Herramienta de Compilación (Bundler):** Vite 8
* **Estilos (CSS):** Tailwind CSS v4 & Vanilla CSS
* **Animaciones:** GSAP (GreenSock Animation Suite)
* **Modelador 3D:** Three.js con wrappers React Three Fiber (R3F) & @react-three/drei
* **Linter de Código:** oxlint

---

## 3. Instrucciones de Ejecución Local y Despliegue

### Requisitos del Sistema:
* Node.js v18.0.0 o superior (v20+ recomendado).
* Administrador de paquetes: `npm`.

### Comandos de npm:
* **Instalación de Dependencias:**
  ```bash
  npm install
  ```
* **Servidor de Desarrollo Local:**
  ```bash
  npm run dev
  ```
* **Compilación de Producción (Genera la carpeta `dist`):**
  ```bash
  npm run build
  ```
* **Linting de Código:**
  ```bash
  npm run lint
  ```
* **Verificación General (Lint + Build):**
  ```bash
  npm run verify
  ```
* **Vista Previa de Producción Local:**
  ```bash
  npm run preview
  ```

### Procedimiento de Despliegue:
El despliegue está configurado mediante integración continua (CI/CD) con GitHub.
1. Realizar los cambios necesarios en el código de forma local.
2. Hacer commit y empujar (`git push`) los cambios a la rama `main` del repositorio remoto.
3. Netlify detectará la nueva actualización de forma automática, ejecutará `npm run build` y actualizará el despliegue público en menos de un minuto.

---

## 4. Guía de Mantenimiento y Actualización de Contenido

### Reemplazo y Optimización de Fotografías:
Para evitar la ralentización del sitio, todas las imágenes estáticas están en formato `.webp` optimizado.
1. Coloque las nuevas imágenes en formato original (PNG o JPG) dentro de la carpeta `public/static/img/`.
2. Ejecute el script de optimización:
   ```bash
   npm run optimize:images
   ```
   *Esto convertirá y redimensionará automáticamente las fotos a la carpeta `public/static/img/optimized/`.*
3. Abra el archivo de configuración de imágenes [src/config/images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts) y actualice la referencia correspondiente para apuntar al archivo optimizado.

### Edición de Textos:
* **Atracciones:** Se modifican directamente en [src/pages/Atracciones/Atracciones.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Atracciones/Atracciones.tsx).
* **Menú Gastronómico:** Los platillos y categorías se editan en [src/pages/Menu/Menu.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Menu/Menu.tsx).
* **La Barra:** La coctelería y las cervezas se actualizan en [src/pages/Barra/Barra.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Barra/Barra.tsx).
* **Galería:** La lista de fotos se declara en [src/pages/Galeria/Galeria.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Galeria/Galeria.tsx).
* **Contacto y Rutas:** Los datos se encuentran en [src/pages/Ubicacion/Ubicacion.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Ubicacion/Ubicacion.tsx).

---

## 5. Optimizaciones Implementadas y Restricciones Críticas

> [!CAUTION]
> **No modifique o eluda los siguientes mecanismos para evitar problemas de rendimiento severos:**
> 
> * **WebGL Render Loop Control:** El renderizado 3D de los modelos se pausa automáticamente cuando la pestaña está en segundo plano o el componente sale de la vista en pantalla (implementado mediante hooks de visibilidad). Esto reduce a 0% el uso innecesario de GPU/CPU.
> * **Capping de DPR:** Todos los Canvas de Three.js limitan la densidad de píxeles (`dpr={[1, 2]}`) para evitar la sobrecarga de rendering en dispositivos con pantallas Retina o 4K.
> * **manualChunks (Vite):** En [vite.config.ts](file:///C:/Users/anara/Desktop/valle_copia/vite.config.ts), las librerías pesadas (React, Three, GSAP) están fragmentadas de forma independiente para acelerar la velocidad de carga inicial de la aplicación.

---

## 6. Confirmaciones Clave Pendientes con el Cliente
1. **Número de WhatsApp:** Validar si `+52 55 3877 3469` es el número correcto de atención.
2. **Ubicación Física:** Corroborar si la dirección exacta registrada en la página de Ubicación corresponde a la locación física en Maps.
3. **Platillos y Cócteles:** Validar si los platillos listados corresponden exactamente al menú real del rancho.
4. **Licencia de Alcohol:** Confirmar si se pueden promover bebidas alcohólicas o si se debe centrar el listado en bebidas sin alcohol (mocktails).
5. **Compra de Dominio Personalizado:** Definir si se adquirirá un dominio como `vallederanchoviejo.com` o similar para actualizar canonicals y metadatos SEO.
