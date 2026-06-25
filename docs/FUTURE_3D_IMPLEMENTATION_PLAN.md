# Plan de Implementación Futura de Experiencias 3D

Este documento detalla las razones de la remoción temporal de los componentes 3D (WebGL) en producción y establece la hoja de ruta y los criterios de calidad necesarios para reintroducir gráficos interactivos tridimensionales en una etapa posterior de desarrollo.

---

## 1. Justificación de la Remoción del 3D en Producción

Aunque el uso de gráficos 3D interactivos en tiempo real puede resultar innovador, el estado actual de los modelos y del motor R3F presentaba limitaciones críticas para un sitio web comercial de gama alta:
* **Falta de Acabado Artístico:** Los modelos 3D basados en formas y partículas geométricas crudas no transmitían la calidad de "lujo artesanal" que requiere la marca, sintiéndose más como prototipos de demostración técnica que como elementos de diseño terminados.
* **Sobrecarga de Rendimiento:** La descarga de más de 800 kB de código de Three.js y React Three Fiber penalizaba la velocidad de carga inicial en celulares de gama media y conexiones móviles.
* **Inconsistencia Visual:** Integrar paneles oscuros e interactivos con fondos 3D requería un esfuerzo excesivo de iluminación y materiales para que se vieran integrados a la par de la fotografía profesional de Rancho Viejo.

---

## 2. Ideas y Prototipos Diferidos para el Futuro

Se conservan las siguientes ideas tridimensionales en la fase de prototipado para cuando se cumpla con la barra de calidad requerida:
1. **Mapa del Terreno del Rancho:** Un relieve tridimensional real de la zona montañosa, con marcadores interactivos que destaquen las pistas de cuatrimotos y las cabañas de comida.
2. **Copa con Oleaje Físico:** Una copa de barro o cristal realista que reaccione físicamente a la orientación del acelerómetro del celular o giroscopio del visitante.
3. **Vapor del Café de Olla:** Taza texturizada de barro tradicional con simulación física realista de partículas de vapor mediante shaders optimizados (*fragment shaders*).

---

## 3. Requisitos de Calidad Requeridos antes de Reintroducir el 3D

Para asegurar que una futura implementación 3D mantenga la credibilidad y el nivel premium, el desarrollo deberá satisfacer las siguientes condiciones técnicas y visuales:

* **Dirección de Arte e Iluminación Profesional:**
  - Evitar luces genéricas y sombras crudas en tiempo real.
  - Utilizar mapas de luces pre-horneadas (*baked ambient occlusion*) en herramientas como Blender antes de exportar el modelo.
* **Modelos Optimizados (GLB):**
  - Los archivos `.glb` no deberán superar los `100 KB` cada uno.
  - Uso de topologías de malla de baja densidad de polígonos (*low-poly*) y texturas comprimidas en formato *Basis Universal (KTX2)*.
* **Arquitectura de Carga Diferida (Lazy-Loading Total):**
  - Las dependencias de Three.js y R3F no deben importarse ni cargarse en la página principal (`Home`).
  - Solo se cargarán asincrónicamente cuando el usuario navegue específicamente a una pestaña interactiva secundaria.
* **Presupuesto de Rendimiento (Performance Budget):**
  - El tiempo de interacción inicial (*Time to Interactive*) no debe subir de `3 segundos` en conexiones 3G móviles lentas.
  - Implementación obligatoria de imágenes 2D estáticas premium de respaldo (*fallback*) para dispositivos móviles antiguos o con ahorro de batería activo.
