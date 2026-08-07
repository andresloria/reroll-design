# Reroll Design — bitácora del portafolio

Sitio de **Reroll Design** (negocio de diseño y desarrollo web de Andrés Loría, Cartago, Costa Rica). Marca aparte de la tienda TCG Reroll Hobby Store.

- **LIVE:** https://rerolldesign.com (Vercel, auto-deploy al `git push origin main`)
- **Repo:** github.com/andresloria/reroll-design (cuenta `andresloria`)
- **Contacto cableado:** WhatsApp +506 8780 7813 · correo rerolldesigncr@gmail.com

## Stack
HTML + CSS + JavaScript **vanilla**, sin build, sin frameworks. Solo `index.html`, `servicios.html`, `css/styles.css`, `js/app.js`, `assets/`. Tipografías por Google Fonts: **Bricolage Grotesque** (títulos), **Inter** (texto), **Space Mono** (etiquetas/precios). Cache-busting con `?v=N` en el `<link>` del CSS y el `<script>` (subir en AMBAS páginas al tocar css/js). Actualmente en **CSS v=8 / JS v=5**.

## Identidad visual (dark editorial · verde láser)
Negro neutro, acento **verde láser**, tipografía grande, grano sutil, tema de **dados / "reroll"**. (Paleta anterior dorada `#E8B84B` sobre negro cálido, reemplazada en agosto 2026.)
- **Acento:** `#C5FF45` (hover `#B0E83A`, texto sobre verde `#0D1A00`).
- **Fondos:** base `#181818`, secciones alternas `#1C1C1C`, tarjetas/paneles `#222222`.
- **Textos:** principal `#FFFFFF`, chips `#EBEBEB`, párrafos `#B0B0B0`, tenue `#717171`, muy sutil `#454545`.
- **Bordes:** divisores `#242424`, tarjetas `#2E2E2E`, botones/chips `#3A3A3A`. WhatsApp `#25D366`.
- **Regla del acento:** el verde se reserva para **conversión** — CTAs, precios, planes, ✓ de las listas, hovers y los puntos de los dados. Las etiquetas decorativas (eyebrows, rótulos de proyecto) van en gris.
- **⚠️ Gris de texto = `#909090`, NO `#717171`.** El "texto tenue" de la paleta da 3.6:1 sobre `#181818` y el `#454545` da 1.8:1 (el pie era ilegible): los dos **fallan** el mínimo AA de 4.5:1 para texto chico. Todo texto tenue usa `#909090` (5.2:1). `#717171` quedó solo para elementos grandes (el número `01/02/03`, que a 64 px solo necesita 3:1). Al agregar texto nuevo, no bajar de `#909090`.
- **Foco de teclado:** `.rr :focus-visible` dibuja un anillo verde de 2 px. No quitarlo.
- **Clases del home** con prefijo `rr-`; los componentes oscuros de `servicios.html` se logran con `body class="rr"` + overrides `.rr <componente>` (las clases base quedaron por si alguna vez se necesita una versión clara).
- **Logo animado:** wordmark sin dado (`logo-white-nodie.png` en oscuro) + un dado SVG posicionado como la "o"; al hover salta y gira 360° (`@keyframes rdHop`). Assets: `logo-white.png`, `logo-black.png`, `logo-white-nodie.png`, `logo-black-nodie.png`, favicons, `og-image.jpg`.

## Home (`index.html`)
1. **Nav** dark sticky con logo animado + Trabajo / Planes / Contacto + CTA.
2. **Hero** — titular "Sitios web que **[palabra]**." con botón **↻ Reroll** que rerollea la palabra (venden→convierten→enamoran…) y tira un dado SVG.
3. **Trabajo** — showcase de proyectos: cada uno una fila grande con captura (`assets/work/*.webp`), tipo, resultado en una frase, chips de tecnología y "Ver sitio". Casos: **Translios** (translioscostarica.com), **Reroll Hobby Store** (rerollhobbystore.com), **Fauna · Travesía**.
4. **Cómo trabajo** — 3 pasos en tarjetas con caras de dado (1/2/3 pips). **Los dados numerados viven SOLO acá**, porque acá el orden significa algo (primero contás la idea, después diseño, después publico).
5. **Lo que hago** (`.rr-svc__list`) — índice de 3 filas, no tarjetas: nombre grande a la izquierda, "desde ₡X" en mono verde a la derecha + la unidad (pago único / por mes), línea fina entre filas y flecha que se desliza al hover. Sitios web ₡180.000, Mantenimiento ₡15.000, Redes ₡85.000 → enlazan a `servicios.html`. **Sin dados a propósito:** los tres servicios no son una secuencia y el 1‑2‑3 sugería un ranking falso; además, en tarjetas la sección era un calco visual de "Cómo trabajo".
6. **Contacto** grande ("Tu próximo sitio empieza acá.") + footer.

Hubo un **marquee** de adjetivos entre el hero y Trabajo: se eliminó (no aportaba información y competía con el hero justo donde el visitante debe bajar a ver los proyectos).

JS (`js/app.js`): año dinámico, reveal on scroll (IntersectionObserver), reroll del hero + tirada del dado, dados de los pasos (`.rr-step__die[data-pips]`), el menú móvil y el toggle animado de la sección de planes con dados (solo en servicios).

## Planes (`servicios.html`) — 3 servicios
**01 · Creación de sitios** (pago único): Básico desde ₡180.000, Profesional desde ₡500.000 (más elegido), Tienda desde ₡900.000. Incluido en todos, tabla comparativa, complementos, cómo trabajo, formas de pago (50/50).
**02 · Mantenimiento mensual:** Esencial ₡15.000, Profesional ₡25.000, Tienda ₡40.000 (anual = 2 meses gratis). Tabla comparativa + precios + qué no incluye.
**03 · Redes y marketing** (mensual, Instagram + Facebook): Presencia desde ₡85.000, Activo desde ₡150.000 (más elegido), Impulso desde ₡280.000. Precios definidos con estudio de mercado CR 2025-26 (agencias arrancan en ₡250k; se evitó el tramo "barato/no serio"). La pauta de anuncios la paga el cliente aparte.
Arriba: banda premium de planes con **dados** y toggle animado **Creación ⇄ Mantenimiento** (precios que se animan contando). Estrategia de precios: se muestran "desde ₡X" (transparencia, decidido con Andrés).

## Móvil (arreglado en agosto 2026)
Dos problemas reales, encontrados con emulación móvil (no había desbordamiento horizontal — las capturas headless engañan, siempre medir `scrollWidth` vs `clientWidth`):
1. **No había menú.** Los enlaces del nav estaban en `display:none` bajo 600 px sin nada que los reemplazara → desde el celular **no se podía llegar a Planes**. Ahora hay **hamburguesa de 3 líneas** (`.rr-burger` + `.rr-menu` + `.rr-scrim`, JS al final de `app.js`) en AMBAS páginas, con cierre por Escape, por tocar afuera y al elegir un enlace. Bajo 760 px el nav queda: marca a la izquierda, botón de WhatsApp solo-ícono + hamburguesa a la derecha.
2. **La comparativa era ilegible.** La tabla mide 560 px contra 325 px de pantalla: se veía solo la columna "Básico" y el encabezado quedaba fuera. Ahora bajo 700 px **cada fila se vuelve una tarjeta** con los tres planes etiquetados; los `<td>` llevan `data-p="Básico|Profesional|Tienda"` y el CSS los imprime con `content:attr(data-p)`. **Si se agregan filas o tablas nuevas, hay que ponerles `data-p`** o en celular saldrán sin etiqueta.
Además: botones a ancho completo, toggle Creación⇄Mantenimiento al 100 % y chips más compactos.

## Deploy / Vercel
Push a `main` → Vercel despliega (~1 min). Dominio `rerolldesign.com` comprado y gestionado en Vercel (apex principal, nameservers ns1/ns2.vercel-dns.com). **Ojo:** a veces el edge de Vercel queda cacheado y tarda o no refleja un push (`X-Vercel-Cache: HIT`, `Age` alto); se resuelve solo o con **Redeploy manual** en el panel (Deployments → ⋯ → Redeploy, sin build cache). NO poner `functions/maxDuration` en `vercel.json` (rompe el build).

## Documento PDF (fuera del repo)
Generador en el scratchpad de la sesión: `build_reroll_pdf.py` construye un HTML branded (portada + 01 creación + 02 mantenimiento + 03 redes + 04 términos y condiciones) y se convierte a PDF con Chrome `--headless --print-to-pdf`. Salida en `Downloads/Reroll_Design_Servicios_Redes_y_Condiciones.pdf` (8 páginas). Los T&C se redactaron a medida (base sólida; conviene revisión legal para contratos grandes).

## Pendiente
- Sección **"Sobre mí"** con foto de Andrés (la pieza de calidez humana que falta).
