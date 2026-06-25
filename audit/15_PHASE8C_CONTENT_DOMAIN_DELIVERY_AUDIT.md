# Auditoría de Autenticidad de Contenido, Dominio y Entrega (Fase 8C)

Este documento detalla la auditoría de autenticidad de contenido del portal **La Marquesa - Valle de Rancho Viejo** para asegurar la veracidad de la información pública y definir los puntos clave que requieren validación por parte del cliente antes del lanzamiento definitivo.

---

## 1. Auditoría de Datos de Negocio e Información de Contacto

Hemos revisado exhaustivamente todos los textos y datos de contacto expuestos en la interfaz.

| Dato Expuesto | Valor en Código | Ubicación | Estado / Acción Requerida |
| :--- | :--- | :--- | :--- |
| **Teléfono** | `+52 55 3877 3469` | Navbar, Ubicación, Footer, WhatsApp CTA | **CLIENT_CONFIRM_REQUIRED**: Validar si es el número oficial para la atención de reservas. |
| **Dirección** | `Carretera El Valle del Silencio La Marqueza, Chalma, San Pedro Atlapulco, 52754 Ocoyoacac, Méx.` | Ubicación, Footer | **CLIENT_CONFIRM_REQUIRED**: Verificar la nomenclatura exacta para GPS/Google Maps. |
| **Correo Electrónico** | `hola@lamarquesa.mx` | Footer | **CLIENT_CONFIRM_REQUIRED**: Confirmar si el buzón de contacto está creado o si se prefiere usar otro. |
| **Horario** | `Lunes a Domingo 09:00 AM - 06:00 PM` | Ubicación | **CLIENT_CONFIRM_REQUIRED**: Validar si abren todos los días o si hay horarios especiales para días festivos. |
| **Enlace de WhatsApp** | `https://wa.me/525538773469` | Botones de Acción (CTAs), FloatingWA | **CLIENT_CONFIRM_REQUIRED**: Confirmar que el número en formato internacional para la API sea exactamente `525538773469` sin espacios ni símbolos. |

---

## 2. Auditoría de Textos de Secciones y Tono Editorial

Revisamos la redacción para suavizar afirmaciones genéricas o que suenen artificiales, asegurando un tono premium, local y cálido.

* **Inicio (Home):**
  - *Estado:* Seguro y pulido. Describe adecuadamente la altitud del valle (2,700m) y el concepto de lujo rústico con materiales nobles.
  - *Nota:* No se hacen reclamos de premios o certificaciones ficticias.
* **Atracciones:**
  - *Estado:* La descripción de Gotcha, Cuatrimotos, Tirolesas y Caballos describe las actividades con un enfoque en la naturaleza del bosque de oyameles.
  - *CLIENT_CONFIRM_REQUIRED:* Validar si todas las actividades están operativas al 100% de manera permanente o si hay restricciones de edad/peso para la tirolesa.
* **Gastronomía (Menú):**
  - *Estado:* Cecina de Yecapixtla, Arrachera marinada, Chorizo Toluqueño verde artesanal, Quesadillas de masa azul orgánica, Tlacoyos de haba y sopes tradicionales. 
  - *CLIENT_CONFIRM_REQUIRED:* Confirmar si los platillos listados corresponden exactamente al menú actual del restaurante de Rancho Viejo y si se deben incluir precios o rangos.
* **Bebidas y Mixología (La Barra):**
  - *Estado:* Pitufos, Mojito Tradicional y Cantaritos el Valle descritos con ingredientes naturales.
  - *CLIENT_CONFIRM_REQUIRED:* Confirmar si la barra cuenta con licencia de alcohol activa para servir coctelería con tequila y vodka, o si los cócteles se preparan en versiones sin alcohol (mocktails).
* **Ubicación e Indicaciones:**
  - *Estado:* Las rutas propuestas desde CDMX (vía Santa Fe), Toluca y Metepec son geográficamente correctas siguiendo la carretera México-Toluca y la desviación hacia el Valle del Silencio.

---

## 3. Auditoría de Recursos de Imagen (Fotografías)

Identificamos los recursos de imagen actuales para mapear cuáles corresponden a stock y cuáles deben ser reemplazadas en el futuro con fotografías profesionales reales de la locación.

* **Fondo del Menú (Hero):** Imagen de stock de alimentos tradicionales.
* **Quesadillas y Platillos:** Imágenes del comal de comensales.
* **Fondo de La Barra (Hero):** Imagen de stock de barra rústica de madera.
* **Mojito y Cantarito:** Imágenes de stock de coctelería cítrica.
* **Fondo de Ubicación:** Imagen de stock de bosque con neblina.
* **Galería (12 fotos):** Fotografías de stock representativas de actividades al aire libre (zorbing, caballos, canoas, lagos, fogatas).
  - *Recomendación:* Se debe crear un plan de carga de fotos oficiales (detallado en `docs/OFFICIAL_PHOTO_REPLACEMENT_PLAN.md`) una vez que el cliente suministre su propio material.

---

## 4. Conclusión de Entrega
El portal web no contiene declaraciones legales arriesgadas, precios falsos ni promesas de negocio engañosas. Toda la información comercial se presenta como descriptiva y de invitación a la experiencia rústica de alta gama. El sitio está en estado **Apto y Seguro** para su presentación formal al cliente, sujeto a las confirmaciones listadas arriba.
