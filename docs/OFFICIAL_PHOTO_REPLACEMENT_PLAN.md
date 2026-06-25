# Plan de Reemplazo de Fotografías Oficiales

Este documento sirve como guía para planificar e implementar el reemplazo de las imágenes de stock y marcadores de posición (placeholders) actuales por fotografías reales tomadas en el parque **La Marquesa - Valle de Rancho Viejo**.

---

## 1. Inventario de Imágenes Actuales y Recomendación de Reemplazo

| Identificador en Código | Uso en Interfaz | Imagen Actual (Stock / Temporal) | Estado de Reemplazo Recomendado |
| :--- | :--- | :--- | :--- |
| `images.gotcha` | Atracciones (Gotcha) | Escenario de gotcha genérico en bosque. | **REEMPLAZO RECOMENDADO:** Fotografía real de los obstáculos, barricadas y campo de gotcha en Rancho Viejo. |
| `images.cuatrimotos` | Atracciones (Motos) | Cuatrimoto roja en brecha escarpada. | **REEMPLAZO RECOMENDADO:** Foto de los vehículos del rancho reales con clientes o guías locales. |
| `images.tirolesa` | Atracciones (Tirolesa) | Persona deslizándose en tirolesa alta. | **REEMPLAZO RECOMENDADO:** Fotografía real de las líneas de tirolesa del parque y las vistas del valle. |
| `images.caballo` | Atracciones (Caballos) | Caballo ensillado en pastizal boscoso. | **REEMPLAZO RECOMENDADO:** Fotos de los caballos reales del rancho listos para paseos familiares. |
| `images.comida` | Menú (Platillo Cecina) | Cecina asada al carbón tradicional. | **REEMPLAZO RECOMENDADO:** Fotos profesionales de los platillos preparados en el comal de Rancho Viejo (cecina, arrachera, tlacoyos). |
| `images.pitufos` | Barra (Cóctel Azul) | Vaso de bebida azul con escarchado. | **REEMPLAZO RECOMENDADO:** Fotos reales de los cantaritos, mojitos y mixología preparada en la barra. |
| `images.entradaPrincipal`| Galería | Cabaña de acceso y portón del parque. | **REEMPLAZO RECOMENDADO:** Fotografía oficial del letrero de entrada y cabaña de recepción. |
| `images.fogatas` | Galería (Fogatas) | Fogata encendida con troncos de noche. | **REEMPLAZO RECOMENDADO:** Fotos de las áreas de fogata del rancho reales bajo las estrellas. |
| `images.lagoMistico` | Galería (Lago) | Pequeño lago con árboles y neblina. | **REEMPLAZO RECOMENDADO:** Fotografía del estanque o lago local de Rancho Viejo. |

---

## 2. Especificaciones Técnicas de las Nuevas Fotografías

Para garantizar que el rendimiento del sitio web continúe siendo del 100% y cargue de forma instantánea en celulares, las nuevas imágenes deben cumplir con las siguientes especificaciones técnicas:

* **Formato de Entrega del Fotógrafo:** JPG o PNG de alta resolución.
* **Resolución Recomendada:**
  - **Imágenes de Hero/Fondo:** `1920px` de ancho por `1080px` de alto.
  - **Imágenes de Tarjetas/Atracciones (Proporción 4:3):** `1024px` de ancho por `768px` de alto.
  - **Imágenes de Galería:** `1200px` de ancho por `900px` de alto.
* **Peso Máximo Sugerido (Pre-optimización):** Menos de `1.5 MB` por archivo para evitar fallos de memoria en el script de optimización.

---

## 3. Procedimiento para Integrar Nuevas Fotos al Sitio

Siga estos pasos sencillos para procesar y cargar las nuevas fotos oficiales en el portal web:

### Paso 1: Renombrar y Guardar
Coloque las nuevas fotos recibidas en formato original (`.jpg` o `.png`) dentro de la carpeta del proyecto en la ruta:
📁 `public/static/img/`

Utilice nombres simples y descriptivos en minúsculas sin espacios (por ejemplo: `gotcha_real.jpg`, `cecina_real.png`).

### Paso 2: Ejecutar la Optimización Automatizada
Abra una terminal en la carpeta raíz del proyecto y ejecute el siguiente comando:
```bash
npm run optimize:images
```
*Este comando automático (escrito en NodeJS mediante la librería `sharp`) tomará las fotos nuevas de la carpeta, las redimensionará a resoluciones óptimas y las guardará en formato comprimido de última generación `.webp` dentro de:*
📁 `public/static/img/optimized/`

### Paso 3: Actualizar la Configuración en Código
Abra el archivo de mapeo de imágenes:
📄 [src/config/images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts)

Modifique la variable correspondiente para apuntar al nuevo archivo optimizado. Por ejemplo:
```typescript
export const images = {
  // Cambie el valor anterior por la ruta de la nueva foto webp optimizada
  gotcha: '/static/img/optimized/gotcha_real.webp',
  ...
};
```

### Paso 4: Validar y Desplegar
Ejecute la verificación local para comprobar que el sitio compila correctamente con la nueva imagen:
```bash
npm run verify
```
Si todo es correcto, realice el commit y push a la rama `main` de GitHub. Netlify actualizará la imagen en el portal público automáticamente.
