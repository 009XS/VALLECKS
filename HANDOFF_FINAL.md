# Engineering Handoff Document - La Marquesa (Rancho Viejo)

This document details the final handoff specifications, technical procedures, and operational checklists for **La Marquesa - Valle de Rancho Viejo** SPA.

---

## 1. Project Summary & Status
* **Project Name:** La Marquesa / Valle de Rancho Viejo React SPA
* **Current Version:** `1.0.0` (Production Ready)
* **Public Staging URL:** `https://valle-rancho-viejo.netlify.app`
* **GitHub Repository:** `https://github.com/009XS/VALLECKS.git`
* **Deployment Provider:** Netlify
* **Production Readiness:** **YES**. Staging QA and build checks have passed successfully.

---

## 2. Technology Stack
* **Framework:** React 19 (TypeScript)
* **Build tool:** Vite 8
* **Styling:** Tailwind CSS v4 & Vanilla CSS
* **Animations:** GSAP (ScrollTrigger)
* **3D Engines:** Three.js / React Three Fiber / Drei
* **Linter:** oxlint

---

## 3. Deployment & Build Specifications
* **Node Version Requirement:** Node.js v18.0.0 or superior (v20+ recommended).
* **Package Manager:** `npm` (utilizes lockfile `package-lock.json`).
* **Installation Command:** `npm install`
* **Local Development Command:** `npm run dev`
* **Build Command:** `npm run build`
* **Publish Directory:** `dist`
* **Verification Command:** `npm run verify` (runs linter and build sequentially).
* **Local Preview Command:** `npm run preview` (starts static local web server on port `4173`).

---

## 4. Pending Decisions & SEO Configuration

The project is fully complete and ready for deployment. The only pending configuration is the **Final Production Domain** configuration. 

### Current SEO & Configuration File Status:

| File | Status | Dependency on Domain |
| :--- | :--- | :--- |
| `index.html` | **95% Final**. Standard SEO description, viewport, and Open Graph previews are fully set. | Requires injecting `<link rel="canonical">` once the production domain is confirmed. |
| `public/robots.txt` | **90% Final**. Crawl settings are set. | Requires replacing the `Sitemap: https://vallederanchoviejo.mx/...` reference with the final URL. |
| `public/sitemap.xml` | **90% Final**. Structure is set for state-based single-page root. | Requires replacing the `https://vallederanchoviejo.mx/` placeholder with the final URL. |
| `DEPLOYMENT.md` | **100% Final**. Outlines stack, CLI commands, and SPA redirection. | None. |
| `RELEASE_CHECKLIST.md`| **100% Final**. Step-by-step checklist for release verification. | None. |

*See [docs/FINAL_PRODUCTION_DECISION.md](file:///C:/Users/anara/Desktop/valle_copia/docs/FINAL_PRODUCTION_DECISION.md) for full action steps to finalize the domain configuration.*

---

## 5. How to Update Content Later

All content is structured within standard React components under `src/`. Here are the primary locations:
* **Images:** Main image catalog is referenced in [src/config/images.ts](file:///C:/Users/anara/Desktop/valle_copia/src/config/images.ts). All images are optimized under `public/static/img/optimized/`. To add new images:
  1. Place original images in `public/static/img/`.
  2. Run image optimization script: `npm run optimize:images`.
  3. Reference optimized `.webp` path in `src/config/images.ts`.
* **Atracciones:** Content items list is declared inside [src/pages/Atracciones/Atracciones.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Atracciones/Atracciones.tsx).
* **Menú:** Category lists and items are declared in [src/pages/Menu/Menu.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Menu/Menu.tsx).
* **La Barra:** Cocktail ingredients and details are declared in [src/pages/Barra/Barra.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Barra/Barra.tsx).
* **Galería:** Photo album arrays are declared in [src/pages/Galeria/Galeria.tsx](file:///C:/Users/anara/Desktop/valle_copia/src/pages/Galeria/Galeria.tsx).

---

## 6. Release & Verification Workflows

### How to Deploy:
1. Update domain configurations (sitemap, canonical, robots) if domain is changed.
2. Commit changes to Git.
3. Push to `main` branch. GitHub integrations on Netlify or Vercel will automatically trigger a clean build.

### How to Verify after Deploy:
Follow the verification steps in [RELEASE_CHECKLIST.md](file:///C:/Users/anara/Desktop/valle_copia/RELEASE_CHECKLIST.md) (check console for errors, verify responsive navbar drawer, confirm sitemap accessibility, verify Escape key closing lightboxes).

---

## 7. Critical Constraints: What Not to Touch

> [!CAUTION]
> Avoid making structural changes to the following without proper QA and testing:
> 
> * **WebGL Render Pausing:** Hooks (`usePageVisibility`, `useElementVisibility`, `useReducedMotion`) control the render loops of Three.js. Do not bypass or remove these checks, as it will lead to high background GPU/CPU usage.
> * **DPR Caps:** All `Canvas` components limit device pixel ratio (`dpr={[1, 2]}`) to prevent rendering slowdowns on Retina/4K displays.
> * **manualChunks Config:** In [vite.config.ts](file:///C:/Users/anara/Desktop/valle_copia/vite.config.ts), manual chunks partition heavy 3D vendors to keep the main bundle lightweight. Altering this can cause huge main bundle size warnings.
