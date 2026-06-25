# Reporte de Estabilización - Fase 6A

Este reporte documenta las acciones de estabilización, control de límites en GPU, auditoría de hilos de animación, análisis de división de código (code-splitting) y la preparación para la optimización de recursos gráficos en la aplicación **La Marquesa - Valle de Rancho Viejo**.

---

## 1. Estado de Git y Acciones Realizadas

### Estado de Git Antes de la Fase 6A
El repositorio presentaba un estado mixto muy riesgoso debido al scaffolding reciente:
- Los archivos HTML5 originales (`atracciones.html`, `menu.html`, `barra.html`, `galeria.html`, `ubicacion.html`, `test.html`, etc.) estaban marcados como **eliminados** (`deleted`).
- Toda la estructura de React/TypeScript (`src/`, `public/`, `tsconfig.json`, `vite.config.ts`, `package.json`, etc.) estaba marcada como **sin seguimiento** (`untracked`).

### Acciones Git Ejecutadas
Realizamos un snapshot de seguridad y consolidamos la migración en un commit de estabilización limpio:
1. Agregamos todos los archivos nuevos y eliminaciones al índice: `git add .`
2. Registramos el commit en la rama `main`:
   ```bash
   git commit -m "chore: stabilize React Vite migration baseline"
   ```
El commit se completó de forma exitosa (61 archivos modificados, 5425 líneas insertadas, 2335 líneas eliminadas).

---

## 2. Definición del Gestor de Paquetes y Runtime

- **Entorno Activo**: Node.js `v24.17.0` y npm `10.8.2`.
- **Bun**: No se encuentra instalado ni configurado en las variables de entorno del sistema.
- **Decisión de Estabilización**: Se determinó **mantener npm** como el gestor de paquetes exclusivo del proyecto (respetando `package-lock.json`), evitando cualquier migración invasiva a Bun en esta fase técnica.

---

## 3. Límites DPR y Parámetros en Canvas 3D

Para prevenir caídas severas de framerate en pantallas Retina o portátiles 4K (lo cual multiplicaba innecesariamente la carga de fragmentación en GPU), modificamos todos los componentes `<Canvas>` de React Three Fiber para limitar el ratio de pixeles y asegurar un modo de alto rendimiento:

- **Propiedades agregadas**:
  - `dpr={[1, 2]}`: Fuerza al renderizador a limitarse a un multiplicador de pixel máximo de 2.
  - `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}`: Solicita explícitamente al sistema operativo y al navegador priorizar la tarjeta dedicada (**NVIDIA GeForce RTX 5050**) sobre gráficos integrados.

### Archivos Optimizados:
1. [GlobalCanvas.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/components3d/GlobalCanvas.tsx#L72-L78): Configurado con `dpr={[1, 2]}` y `powerPreference`.
2. [Atracciones.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Atracciones/Atracciones.tsx#L133-L137): Configurado con `dpr={[1, 2]}` y `powerPreference` en el Canvas local del modelo interactivo.
3. [Barra.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Barra/Barra.tsx#L113-L117): Configurado con `dpr={[1, 2]}` y `powerPreference` en el simulador físico de fluidos.
4. [Menu.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Menu/Menu.tsx#L163-L167): Configurado con `dpr={[1, 2]}` y `powerPreference` en el Canvas de Café de Olla.
5. [Ubicacion.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Ubicacion/Ubicacion.tsx#L170-L174): Configurado con `dpr={[1, 2]}` y `powerPreference` en el visor de mapa de relieve 3D.

---

## 4. Auditoría de Hilos y Bucles de Animación

Realizamos una búsqueda exhaustiva de funciones temporales o bucles paralelos que pudieran competir con el hilo de renderizado principal (causando pérdida de FPS o tartamudeo visual):

- **setInterval / requestAnimationFrame / gsap.ticker**: `0` ocurrencias fuera de las bibliotecas núcleo.
- **setTimeout**: `1` ocurrencia localizada en [ForestScene.tsx:L44](file:///C:/Users/anara/Desktop/valle_copia/src/components3d/ForestScene.tsx#L44), usada exclusivamente para dar un margen de 50ms antes de poblar las matrices de instancias 3D (operación muy ligera y no recurrente).
- **useFrame (R3F loop)**: Utilizado correctamente en 6 componentes WebGL para actualizar posiciones, rotaciones y simulaciones matemáticas en sincronía con el refresco de pantalla del navegador.

**Diagnóstico**: No existen bucles redundantes ni fugas de procesamiento en el hilo visual.

---

## 5. Tabla de Optimización y Conversión de Imágenes

Como no existen herramientas de consola locales (`magick`, `cwebp` o `ffmpeg`) instaladas en la máquina host, no se procedió a realizar la conversión automatizada para evitar errores del sistema o instalar paquetes adicionales sin autorización. 

A continuación se detalla la tabla de activos y la estrategia de optimización para la conversión manual de JPG/PNG a `.webp` (calidad 75-82):

| Archivo Original | Tamaño Actual | Usado en Archivo(s) | Nombre WebP Recomendado | ¿Seguro de Convertir? | Notas / Recomendación |
| :--- | :---: | :--- | :--- | :---: | :--- |
| `caballo.jpg` | `601.3 KB` | `Atracciones.tsx`, `Galeria.tsx` | `caballo.webp` | **Sí** | Reducir dimensiones físicas a un ancho de 1280px para bajar el peso de textura en GPU. |
| `unnamed (2).jpg` | `564.8 KB` | `Galeria.tsx` | `fogata_nocturna.webp` | **Sí** | Cambiar a nombre semántico. Excelente candidato para WebP. |
| `d2-1.jpg` | `497.1 KB` | `Barra.tsx`, `Galeria.tsx` | `mixologia_autor.webp` | **Sí** | Alta resolución, se puede comprimir a WebP sin pérdida apreciable de detalle. |
| `maxresdefault.jpg` | `253.7 KB` | `Atracciones.tsx`, `Galeria.tsx` | `cuatrimotos.webp` | **Sí** | Reducir resolución y cambiar a nombre semántico. |
| `Rancho Viejo.jpg` | `165.4 KB` | `Galeria.tsx` | `entrada_principal.webp` | **Sí** | Cambiar a minúsculas y snake_case. |
| `la-marquesa-c.jpg` | `139.3 KB` | `Galeria.tsx` | `paseos_caballo.webp` | **Sí** | Optimizar dimensiones y peso de textura. |
| `Ahuyenta-inseguridad-a-turistas-de-La-Marquesa3.jpg` | `136.7 KB` | `Galeria.tsx` | `lago_mistico.webp` | **Sí** | Cambiar a nombre semántico corto. |
| `d1-1-1024x683.jpg` | `126.3 KB` | `Galeria.tsx` | `valle_dinosaurios.webp` | **Sí** | Cambiar a nombre semántico. |
| `gotcha-01-768x576.jpg` | `125.4 KB` | `Atracciones.tsx`, `Galeria.tsx` | `gotcha.webp` | **Sí** | Mantener dimensiones de 768px. |
| `comida.jpg` | `101.5 KB` | `Menu.tsx`, `Galeria.tsx` | `comida.webp` | **Sí** | Optimizar compresión. |
| `Canopy-Las-Golondrinas-1-e1635561376796.jpg` | `87.5 KB` | `Atracciones.tsx`, `Galeria.tsx` | `tirolesa.webp` | **Sí** | Cambiar a nombre semántico. |
| `Canopy-Las-Golondrinas-1-e1635561376796 (1).jpg` | `87.5 KB` | *Ninguno (Duplicado)* | N/A | **No** | Archivo duplicado, no referenciado. Se puede eliminar de forma segura en la etapa de limpieza. |
| `unnamed (1).jpg` | `16.6 KB` | `Galeria.tsx` | `zorbing.webp` | **Sí** | Archivo ligero, renombrar semánticamente. |
| `unnamed.jpg` | `14.1 KB` | `Galeria.tsx` | `canoa.webp` | **Sí** | Archivo ligero, renombrar semánticamente. |

---

## 6. Análisis de Code Splitting (División de Código)

Actualmente, todas las vistas se importan de forma eager (estática) en la cabecera de `src/App.tsx`. Esto genera un único bundle JS de **1.25 MB** que los usuarios deben descargar en su totalidad al abrir el sitio, independientemente de la página a la que entren.

### Plan de Lazy Loading Propuesto (Bajo Riesgo)
Se recomienda sustituir los imports estáticos por imports dinámicos en `App.tsx`:
```typescript
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home/Home').then(m => ({ default: m.Home })));
const Atracciones = lazy(() => import('./pages/Atracciones/Atracciones').then(m => ({ default: m.Atracciones })));
const Menu = lazy(() => import('./pages/Menu/Menu').then(m => ({ default: m.Menu })));
const Barra = lazy(() => import('./pages/Barra/Barra').then(m => ({ default: m.Barra })));
const Galeria = lazy(() => import('./pages/Galeria/Galeria').then(m => ({ default: m.Galeria })));
const Ubicacion = lazy(() => import('./pages/Ubicacion/Ubicacion').then(m => ({ default: m.Ubicacion })));
```
**Beneficio estimado**: Reducir el JS inicial en más de un 60% (~400 KB iniciales), ya que los modelos 3D y componentes pesados de páginas específicas se descargarán bajo demanda conforme el usuario navegue.

---

## 7. Rive Readiness (Preparación para Animación Vectorial)

- **Activos `.riv` en el Proyecto**: `0` archivos encontrados.
- **Estrategia Rive**: No implementamos simulaciones o fallbacks ficticios ya que no hay recursos gráficos vectoriales `.riv` en el directorio.
- **Recomendación de Implementación**:
  - Solicitar al equipo creativo de diseño los archivos exportados `.riv` optimizados para la Web.
  - Integrar Rive en el botón del menú responsivo móvil (en `Navbar.tsx`) con un fallback de estado estático Lucide (`Menu` / `X`) si el recurso vectorial falla al descargar.

---

## 8. Resultados de la Validación Final

- **npm run lint**: `oxlint` completado con **0 advertencias y 0 errores**.
- **npm run build**: `tsc -b && vite build` completado con **éxito en 277ms**.
- **Cambios en Git**: Estabilización de Canvas registrada en archivos pendientes de commit:
  - `src/components3d/GlobalCanvas.tsx`
  - `src/pages/Atracciones/Atracciones.tsx`
  - `src/pages/Barra/Barra.tsx`
  - `src/pages/Menu/Menu.tsx`
  - `src/pages/Ubicacion/Ubicacion.tsx`
- **Riesgos Restantes**: Bajo. La aplicación cuenta con un tipado estricto, compilación rápida y límites de GPU activos.
