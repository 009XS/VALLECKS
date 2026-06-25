# Estado Actual del Proyecto - Auditoría

Este documento presenta el estado de la migración de **La Marquesa - Valle de Rancho Viejo** desde la arquitectura original en HTML/CSS/JS plano hacia una aplicación premium de una sola página (SPA) construida en React + TypeScript + Vite.

---

## 1. Resumen del Proyecto y Arquitectura

El proyecto ha sido exitosamente estructurado como una Single Page Application (SPA) con enrutamiento virtual fluido manejado a nivel de estado en el componente principal de React.

- **Punto de Entrada**: `index.html` redirige al script de inicio en `src/main.tsx` el cual monta el árbol de componentes de React definido en `src/App.tsx`.
- **Enrutamiento**: Se realiza un seguimiento de la página activa mediante el estado `currentPage` (`'home' | 'atracciones' | 'menu' | 'barra' | 'galeria' | 'ubicacion'`).
- **Transición de Pantallas**: Se implementó una animación global de transición en `App.tsx` utilizando GSAP. Al cambiar de página, se realiza un scroll al inicio de la ventana, se eliminan los triggers de scroll heredados (ScrollTrigger) y se difumina/desplaza el nuevo contenido hacia arriba.
- **Fondo WebGL Global**: Se diseñó una escena Canvas WebGL permanente (`GlobalCanvas.tsx`) que detecta la página activa para renderizar un bosque tridimensional procedimental complejo (`ForestScene.tsx` con pinos y neblina shader) en el Inicio, o un fondo minimalista y de bajo consumo de partículas doradas en suspensión (`DustScene`) en las subpáginas para liberar ciclos de GPU.

---

## 2. Stack Tecnológico Detectado

| Tecnología / Biblioteca | Versión | Estado / Rol en el Proyecto |
| :--- | :---: | :--- |
| **React** | `19.2.7` | Framework principal de componentes e interfaz reactiva |
| **TypeScript** | `6.0.2` | Tipado estático estricto para asegurar la robustez del código |
| **Vite** | `8.1.0` | Herramienta de compilación rápida y servidor de desarrollo instantáneo |
| **Tailwind CSS** | `4.3.1` | Motor de estilos de última generación (Tailwind v4) configurado mediante `@theme` |
| **Three.js** | `0.184.0` | Motor gráfico 3D base |
| **React Three Fiber** | `9.6.1` | Envoltorio reactivo (R3F) para WebGL / WebGL2 |
| **@react-three/drei** | `10.7.7` | Utilerías y ayudantes optimizados para Three.js |
| **GSAP (GreenSock)** | `3.15.0` | Motor de líneas de tiempo de alto rendimiento para transiciones y animaciones |
| **Rive React** | `4.24.0` | Biblioteca de integración para animaciones vectoriales dinámicas |
| **Lucide React** | `1.21.0` | Biblioteca de iconos vectoriales |
| **Oxlint** | `1.69.0` | Linter ultra-rápido basado en Rust (0 advertencias y 0 errores reportados) |

---

## 3. Estado de Ejecución y Diagnóstico

### Entorno de Ejecución (Runtimes)
- **Node.js**: `v24.17.0` activo y configurado.
- **Bun**: No se encuentra instalado en la ruta de ejecución del sistema. El gestor de paquetes principal utilizado es **npm** (`package-lock.json` activo).
- **Servidor de Desarrollo**: Ejecutándose de forma estable en `http://localhost:5173/`.

### Resultados de Construcción (Build & Lint)
- **Compilación de Producción**: El comando `npm run build` compila el proyecto sin ningún tipo de error en TypeScript o bundler en un tiempo de **305ms**, generando:
  - HTML compilado en `dist/index.html` (0.67 kB).
  - CSS optimizado en `dist/assets/index-*.css` (42.79 kB).
  - JS optimizado en `dist/assets/index-*.js` (1.2 MB).
- **Linter**: `npm run lint` finaliza con **0 advertencias y 0 errores** encontrados en 19 archivos evaluados.
- **Instalación**: El comando `npm install --dry-run` finaliza indicando que todas las dependencias declaradas se encuentran totalmente al día en el directorio local.

---

## 4. Estado de los Archivos y Repositorio Git

El repositorio de Git está inicializado, pero actualmente se encuentra en un estado mixto donde los archivos originales del sitio HTML plano se marcan como eliminados en el árbol de seguimiento de Git, y los nuevos archivos del proyecto Vite/React + TypeScript se listan como archivos sin seguimiento (untracked):

- **Rama Actual**: `main` (alineada con `origin/main`).
- **Historial de Commits**:
  - `f5c2e81` - Actualización del proyecto 2
  - `0a079f7` - Actualización del sitio web
  - `2a75945` - primero
- **Archivos Modificados/Eliminados en Git**:
  - Eliminados (pendientes de commit en git): `index.html` original, `atracciones.html`, `menu.html`, `barra.html`, `galeria.html`, `ubicacion.html`, `static/css/...`, `static/js/...`, y las imágenes originales.
- **Archivos sin Seguimiento (Untracked)**:
  - Toda la estructura del proyecto Vite React-TS (`src/`, `public/`, `package.json`, `tsconfig.json`, `vite.config.ts`, etc.).
