# Reporte de Correcciones Visuales (Fase 9C)

Este informe detalla los problemas estéticos y errores en assets observados en la última compilación visual del sitio web Valle de Rancho Viejo, y establece las acciones correctivas inmediatas para lograr una entrega impecable al cliente.

---

## 1. Problemas Visuales Críticos Detectados

### A. Exceso de Espacios Negros Vacíos (Rendimiento de Ritmo Vertical)
* **Home:** Gaps excesivos de separación vertical. El área después del Hero móvil y entre las secciones del cuerpo principal diluye la narrativa y estira innecesariamente la página.
* **Atracciones:** Gaps gigantescos de separación (`space-y-32`) entre las secciones asimétricas que provocan la sensación de que el sitio está "roto" o incompleto al hacer scroll.
* **Menú:** Demasiada separación antes del pie de página y después de la cuadrícula de platos principales.
* **Móvil (General):** Padding vertical exagerado que provoca scrolls infinitos y pérdida de atención del usuario.

### B. Tarjetas Negras/Vacías en la Galería
* Las imágenes `unnamed.webp` (Canoas) y `unnamed-1.webp` (Zorbing) son muy pequeñas en peso y fallan en renderizar correctamente, mostrándose como cajas negras vacías.
* Se muestran imágenes de dinosaurios de fondo en varias tarjetas de la galería (ej. `Valle de Dinosaurios` e incluso bajo la etiqueta `Mixología de Autor`), lo cual rompe con la identidad de marca premium y de alta gastronomía rústica.

### C. Uso Incorrecto de la Imagen de Dinosaurio en La Barra
* La bebida destacada de la coctelería (`pitufos`) muestra de fondo un dinosaurio (`d2-1.webp`). Esto es incoherente para un bar de destino de lujo rústico y debe ser reemplazado por un asset gastronómico o de ambiente rústico neutral.

### D. Layouts Tipo Plantilla (SaaS / Cards)
* Aunque mejorados, algunos bloques aún se perciben aislados como "tarjetas oscuras flotando en la nada" en lugar de secciones editoriales cohesionadas por marcos delgados u ornamentales.

---

## 2. Plan de Correcciones Inmediatas

### 1. Centralización de Assets (`src/config/images.ts`)
* **Corrección:**
  - Agregar slash inicial (`/`) a todas las rutas de imágenes para garantizar resolución absoluta desde la raíz.
  - Reemplazar la referencia de `pitufos` (`d2-1.webp` que contiene dinosaurios) por `/static/img/optimized/comida.webp`.

### 2. Rework de Galería (`src/pages/Galeria/Galeria.tsx`)
* **Corrección:**
  - Limpiar la cuadrícula para eliminar los 3 items problemáticos o incoherentes (`zorbing`, `canoas`, `valleDinosaurios`, `pitufos`).
  - Reconfigurar la cuadrícula editorial asimétrica con 9 elementos de alta fidelidad 100% operativos:
    1. Lago Místico
    2. Entrada Principal
    3. Rutas en Cuatrimoto
    4. Tirolesa Panorámica
    5. Paseos a Caballo
    6. Senderos del Valle (la-marquesa-c)
    7. Gastronomía Local (comida)
    8. Fogatas Nocturnas (unnamed-2)
    9. Gotcha en el Bosque (gotcha)

### 3. Reducción de Espacios en Inicio (`src/pages/Home/Home.tsx`)
* **Corrección:**
  - Reducir paddings generales de `py-24` a `py-16`.
  - Reducir paddings de `py-32` a `py-20`.
  - Reducir márgenes inferiores de títulos de `mb-20` a `mb-12`.
  - Acercar la sección de experiencias al ribbon de pilares de marca.

### 4. Ajustes en Atracciones (`src/pages/Atracciones/Atracciones.tsx`)
* **Corrección:**
  - Cambiar el espaciado vertical entre atracciones de `space-y-32` a `space-y-16`.
  - Reducir el padding de la sección final de CTA de grupo de `py-24 mt-32` a `py-16 mt-16`.

### 5. Optimización del Menú (`src/pages/Menu/Menu.tsx`)
* **Corrección:**
  - Cambiar la cabecera de `h-[60vh]` a `h-[50vh]`.
  - Reducir el margen del spotlight a `mb-12`.
  - Reducir el margen de la sección del fogón inferior a `my-12`.

### 6. Corrección en La Barra (`src/pages/Barra/Barra.tsx`)
* **Corrección:**
  - Confirmar que use la nueva ruta de `images.pitufos` (que ahora apunta a comida/restaurante).
  - Reducir paddings verticales excesivos.

### 7. Ajustes Globales de Spacing (`src/index.css`)
* **Corrección:**
  - Reducir `--spacing-section-padding` de `120px` a `80px` en escritorio.
  - Reducir `--spacing-section-padding-mobile` de `60px` a `40px` en móvil.
  - Asegurar consistencia en la densidad de los bloques.
