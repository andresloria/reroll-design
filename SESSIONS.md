# Reroll Design — bitácora del portafolio

Sitio de **Reroll Design** (negocio de diseño y desarrollo web de Andrés Loría, Cartago, Costa Rica). Marca aparte de la tienda TCG Reroll Hobby Store.

- **LIVE:** https://rerolldesign.com (Vercel, auto-deploy al `git push origin main`)
- **Repo:** github.com/andresloria/reroll-design (cuenta `andresloria`)
- **Contacto cableado:** WhatsApp +506 8780 7813 · correo rerolldesigncr@gmail.com

## Stack
HTML + CSS + JavaScript **vanilla**, sin build, sin frameworks. Solo `index.html`, `servicios.html`, `css/styles.css`, `js/app.js`, `assets/`. Tipografías por Google Fonts: **Bricolage Grotesque** (títulos), **Inter** (texto), **Space Mono** (etiquetas/precios). Cache-busting con `?v=N` en el `<link>` del CSS y el `<script>` (subir en AMBAS páginas al tocar css/js). Actualmente en **CSS v=13 / JS v=11**.

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
2. **Hero** — titular **"[Sitios web] que venden."**: la palabra verde tiene **línea propia** y un **hueco de ancho fijo** (el de la variante más larga, calculado en JS tras cargar las tipografías). Por eso al rotar **no se mueve absolutamente nada**: solo cambian las letras verdes — verificado midiendo posiciones, idénticas al píxel en los cuatro estados. Todas van en plural para que el "que venden." de abajo nunca cambie. Rota sola cada 4,2 s (se pausa con el mouse encima, salta el turno si la pestaña está oculta, no corre con reduced-motion y el clic en el dado la detiene). **Si se agregan palabras, revisar que la más larga siga cabiendo**; si no cabe, el JS suelta el ancho fijo para no provocar scroll horizontal.
3. **Trabajo** — showcase de proyectos: cada uno una fila grande con captura (`assets/work/*.webp`), tipo, resultado en una frase, chips de tecnología y "Ver sitio". Casos: **Translios** (translioscostarica.com), **Reroll Hobby Store** (rerollhobbystore.com), **Fauna · Travesía**.
4. **Cómo trabajo** — 3 pasos en tarjetas con caras de dado (1/2/3 pips). **Los dados numerados viven SOLO acá**, porque acá el orden significa algo (primero contás la idea, después diseño, después publico).
5. **Web, redes y branding** (`.rr-svc__list`, id `servicios`) — **selector de disciplina**: 3 filas grandes, cada una un enlace completo con nombre, descripción, "desde ₡X" en mono verde y un botón **Ver planes →** que se enciende al pasar por encima (en celular ocupa todo el ancho, porque en táctil no hay hover). Van a `servicios.html#creacion`, `#redes` y `#branding` — **en la misma pestaña** (decisión de Andrés, 2026-08-07). Páginas web ₡180.000 (con el mantenimiento desde ₡15.000/mes como línea secundaria), Redes ₡85.000/mes, Branding ₡150.000. **Sin dados a propósito:** los servicios no son una secuencia y el 1‑2‑3 sugería un ranking falso.
6. **Contacto** grande ("Tu próximo sitio empieza acá.") + **pie con contenido** (marca + los 4 servicios + WhatsApp/correo/ciudad + barra inferior). El pie es el MISMO componente `.rr-foot` en las dos páginas (antes servicios usaba `.footer`, ya eliminado).

Hubo un **marquee** de adjetivos entre el hero y Trabajo: se eliminó (no aportaba información y competía con el hero justo donde el visitante debe bajar a ver los proyectos).

JS (`js/app.js`): año dinámico, reveal on scroll (IntersectionObserver), reroll del hero + tirada del dado, dados de los pasos (`.rr-step__die[data-pips]`), el menú móvil y el toggle animado de la sección de planes con dados (solo en servicios).

## Planes (`servicios.html`) — 4 servicios
**01 · Creación de sitios** (pago único): Básico desde ₡180.000, Profesional desde ₡500.000 (más elegido), Tienda desde ₡900.000. Incluido en todos, tabla comparativa, complementos, cómo trabajo, formas de pago (50/50).
**02 · Mantenimiento mensual:** Esencial ₡15.000, Profesional ₡25.000, Tienda ₡40.000 (anual = 2 meses gratis). Tabla comparativa + precios + qué no incluye.
**03 · Redes y marketing** (mensual, Instagram + Facebook): Presencia desde ₡85.000, Activo desde ₡150.000 (más elegido), Impulso desde ₡280.000. Precios definidos con estudio de mercado CR 2025-26 (agencias arrancan en ₡250k; se evitó el tramo "barato/no serio"). La pauta de anuncios la paga el cliente aparte.
**04 · Branding e identidad** (pago único, desde ₡150.000): logotipo con variantes, paleta y tipografías, manual de marca, tarjeta y firma, archivos editables, 2 rondas. Sin paquetes: es una sola oferta con `split` (qué incluye / por qué conviene primero) y CTA a WhatsApp. Precio definido por Andrés el 2026-08-07 (el mockup que lo propuso traía ₡120.000 inventados; se subió a ₡150.000 para no quedar por debajo de la landing de ₡180.000).

Arriba: banda premium de planes con **dados** y toggle animado **Creación ⇄ Mantenimiento** (precios que se animan contando). Estrategia de precios: se muestran "desde ₡X" (transparencia, decidido con Andrés).

## Fondo del sitio (agosto 2026)
Tres capas, todas detrás del contenido y sin bloquear clics:
1. **Retícula** — `body.rr::before`, **fija** a la ventana (72 px, blanco al 4 %) con máscara radial. Al ser fija, el contenido se desliza sobre un plano quieto.
2. **Burbujas de luz** — `body.rr::after`, **absolutas sobre el body**: 13 manchas verdes repartidas a lo largo de TODO el documento, alternando de lado. Bajando aparecen distintas en cada sección (si fueran fijas, sería siempre la misma luz).
3. **Partículas** — canvas `#rrSpark` **fijo a la ventana** (`.rr-spark`), ~170 puntos que suben muy despacio; 28 % en verde de marca. Antes este efecto vivía DENTRO de la banda de planes (`.dice__spark`) y por eso se cortaba en su borde; ese canvas quedó desactivado.

**Regla: nada de bandas ni líneas de ancho completo.** Cualquier sección con fondo propio o borde superior/inferior **parte el fondo**: la burbuja que pasa por detrás cambia de brillo de golpe y se ve una costura horizontal. Por eso `.rr-proc`, `.section--soft`, `.dice`, `.page-hero` y las `.table-wrap` van **sin fondo y sin bordes** de ancho completo. Las tarjetas sí llevan fondo (son formas cerradas). Para comprobarlo: recorrer el DOM buscando elementos de más de 1000 px de ancho con `background-color` o borde.

⚠️ **El fondo iluminado obliga a subir los grises del texto.** Medido sobre el punto más brillante de las burbujas, `#B0B0B0` caía a 4.19:1 y `#909090` a 2.85:1. Hoy los grises son **`#BCBCBC` (párrafos)** y **`#B0B0B0` (tenue)**, que dan 5.44:1 y 4.77:1. Si se sube la intensidad de las burbujas, hay que volver a medir.

## Móvil (arreglado en agosto 2026)
Dos problemas reales, encontrados con emulación móvil (no había desbordamiento horizontal — las capturas headless engañan, siempre medir `scrollWidth` vs `clientWidth`):
1. **No había menú.** Los enlaces del nav estaban en `display:none` bajo 600 px sin nada que los reemplazara → desde el celular **no se podía llegar a Planes**. Ahora hay **hamburguesa de 3 líneas** (`.rr-burger` + `.rr-menu` + `.rr-scrim`, JS al final de `app.js`) en AMBAS páginas, con cierre por Escape, por tocar afuera y al elegir un enlace. Bajo 760 px el nav queda: marca a la izquierda, botón de WhatsApp solo-ícono + hamburguesa a la derecha.
2. **La comparativa era ilegible.** La tabla mide 560 px contra 325 px de pantalla: se veía solo la columna "Básico" y el encabezado quedaba fuera. Ahora bajo 700 px **cada fila se vuelve una tarjeta** con los tres planes etiquetados; los `<td>` llevan `data-p="Básico|Profesional|Tienda"` y el CSS los imprime con `content:attr(data-p)`. **Si se agregan filas o tablas nuevas, hay que ponerles `data-p`** o en celular saldrán sin etiqueta.
Además: botones a ancho completo, toggle Creación⇄Mantenimiento al 100 % y chips más compactos.

## Calidad de uso en celular (auditada, agosto 2026)
El 90% de las visitas son de teléfono, **donde no existe el hover**. Lo que se corrigió y hay que mantener:
- **Estado `:active` obligatorio.** Antes solo `.btn` y el pill de Reroll lo tenían: tocar un CTA no producía ninguna reacción. Ahora los botones y filas hacen `transform:scale(.97)` al tocarse. **Todo elemento tocable nuevo necesita su `:active`.**
- **Área de toque ≥ 44 px.** Medido: la hamburguesa era 40×40 y los enlaces de texto ("Ver sitio ↗", "Quiero el mío →") 21–24 px de alto. Se agranda con un `::after` invisible (`height:44px`) para no cambiar el aspecto. Los enlaces del pie llevan `padding:12px 0` en celular.
- **`touch-action:manipulation`** en `a`, `button` y `[role=tab]` → elimina el retardo de 300 ms del doble tap.
- **Texto ≥ 16 px** en el cuerpo (`.rr-sub` arranca en 16, las descripciones chicas en 15).
- **`prefers-reduced-motion`** ahora es una regla general (`*`) que anula animaciones y transiciones, no solo el reveal y el logo.
- Verificar con estilos computados, no a ojo: medir `getBoundingClientRect()` de cada `a`/`button` a 375 px.

## Deploy / Vercel
Push a `main` → Vercel despliega (~1 min). Dominio `rerolldesign.com` comprado y gestionado en Vercel (apex principal, nameservers ns1/ns2.vercel-dns.com). **Ojo:** a veces el edge de Vercel queda cacheado y tarda o no refleja un push (`X-Vercel-Cache: HIT`, `Age` alto); se resuelve solo o con **Redeploy manual** en el panel (Deployments → ⋯ → Redeploy, sin build cache). NO poner `functions/maxDuration` en `vercel.json` (rompe el build).

## Documento PDF (fuera del repo)
Generador en el scratchpad de la sesión: `build_reroll_pdf.py` construye un HTML branded (portada + 01 creación + 02 mantenimiento + 03 redes + 04 términos y condiciones) y se convierte a PDF con Chrome `--headless --print-to-pdf`. Salida en `Downloads/Reroll_Design_Servicios_Redes_y_Condiciones.pdf` (8 páginas). Los T&C se redactaron a medida (base sólida; conviene revisión legal para contratos grandes).

## Pendiente
- Sección **"Sobre mí"** con foto de Andrés (la pieza de calidez humana que falta).
- **Prueba social:** una frase real de un cliente (Translios) — hoy no hay ningún testimonio.
- **PDF desactualizado:** `build_reroll_pdf.py` todavía no incluye Branding (04). Regenerarlo cuando se use comercialmente.
