# Guía de Optimización de Activos de Imagen

Esta guía describe el flujo de conversión manual de los archivos gráficos en `public/static/img/` hacia formatos modernos optimizados WebP, reduciendo los tiempos de transferencia inicial y previniendo el sobrecalentamiento de la GPU.

---

## 1. Directrices Técnicas de Conversión
- **Formato Objetivo**: WebP (`.webp`).
- **Nivel de Calidad**: `75 - 82` (relación ideal peso/calidad visual).
- **Dimensiones Máximas**: 
  - Imágenes del banner Hero / Pantalla Completa: ancho máximo de `1600px`.
  - Tarjetas / Elementos del Grid / Lightbox: ancho máximo de `1024px` o `1280px`.
  - Miniaturas / Elementos decorativos: ancho máximo de `640px`.
- **Reglas**:
  - No re-escalar hacia arriba (no hacer upscaling).
  - Preservar los archivos originales JPG/PNG en la carpeta `public/static/img/` como respaldo y control de cambios.
  - Colocar los archivos optimizados dentro del directorio: `public/static/img/optimized/`.

---

## 2. Mapa de Conversión Detallado

| Archivo Original | Dimensiones Recomendadas | Nombre de Salida WebP | Propósito / Ubicación |
| :--- | :---: | :--- | :--- |
| `caballo.jpg` | `1280 x 853` | `caballo.webp` | Tarjeta en Atracciones y Masonry en Galería |
| `unnamed (2).jpg` | `1024 x 683` | `fogata_nocturna.webp` | Galería (Fogatas Nocturnas) |
| `d2-1.jpg` | `1024 x 1024` | `mixologia_autor.webp` | La Barra (Tarjeta Pitufos) y Galería |
| `maxresdefault.jpg` | `1280 x 720` | `cuatrimotos.webp` | Tarjeta en Atracciones y Galería |
| `Rancho Viejo.jpg` | `1280 x 853` | `entrada_principal.webp` | Galería (Entrada Principal) |
| `la-marquesa-c.jpg` | `1024 x 683` | `paseos_caballo.webp` | Galería (Paseos a Caballo) |
| `Ahuyenta-inseguridad-a-turistas-de-La-Marquesa3.jpg` | `1024 x 768` | `lago_mistico.webp` | Galería (Lago Místico) |
| `d1-1-1024x683.jpg` | `1024 x 683` | `valle_dinosaurios.webp` | Galería (Valle de Dinosaurios) |
| `gotcha-01-768x576.jpg` | `768 x 576` | `gotcha.webp` | Tarjeta en Atracciones y Galería |
| `comida.jpg` | `1024 x 683` | `comida.webp` | Categoría Menú (Cecina) y Galería |
| `Canopy-Las-Golondrinas-1-e1635561376796.jpg` | `1024 x 683` | `tirolesa.webp` | Tarjeta en Atracciones y Galería |
| `unnamed (1).jpg` | `640 x 480` | `zorbing.webp` | Galería (Zorbing Extremo) |
| `unnamed.jpg` | `640 x 480` | `canoa.webp` | Galería (Navegación en Canoa) |

---

## 3. Referencias del Código a Actualizar

Una vez convertidas las imágenes y colocadas en `public/static/img/optimized/`, las rutas en el archivo unificado de abstracción de recursos [src/config/images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts) deben actualizarse apuntando al directorio `/static/img/optimized/*.webp`.

Ejemplo de actualización del archivo de configuración:
```typescript
export const images = {
  caballo: 'static/img/optimized/caballo.webp',
  gotcha: 'static/img/optimized/gotcha.webp',
  // ... resto de los recursos
};
```
