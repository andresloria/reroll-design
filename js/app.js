// Reroll Design — interacciones mínimas

// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal al hacer scroll
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// ============ Vitrina de planes con dados (solo servicios.html) ============
(function () {
  var grid = document.getElementById('diceGrid');
  var toggle = document.getElementById('diceToggle');
  if (!grid || !toggle) return;

  var PLANS = [
    { name: 'Básico', pips: 1, crea: 180000, mant: 15000,
      feat: ['Una landing a medida', 'WhatsApp + formulario', 'SEO básico'] },
    { name: 'Profesional', pips: 2, crea: 500000, mant: 25000, pop: true,
      feat: ['Hasta 5 páginas', 'Galería + Analytics', 'SEO avanzado'] },
    { name: 'Tienda', pips: 3, crea: 900000, mant: 40000,
      feat: ['Catálogo + carrito', 'Pedidos por WhatsApp', 'Panel de admin'] }
  ];
  var mode = 'crea';
  var WA = 'https://wa.me/50687807813?text=';
  var crc = function (n) { return '₡' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };

  // cara de dado en SVG (estilo del logo)
  function die(pips) {
    var pos = { 1: [[62, 62]], 2: [[40, 40], [84, 84]], 3: [[38, 38], [62, 62], [86, 86]] }[pips];
    var c = pos.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="#E8B84B"/>'; }).join('');
    return '<svg viewBox="0 0 125 125" width="34" height="34" aria-hidden="true"><rect x="8" y="8" width="109" height="109" rx="26" fill="none" stroke="#f4f1ea" stroke-width="7"/>' + c + '</svg>';
  }

  function cardHTML(p) {
    var msg = encodeURIComponent('¡Hola Reroll Design! Quiero cotizar el plan ' + p.name + '.');
    return '' +
      '<div class="dcard' + (p.pop ? ' dcard--pop' : '') + '">' +
        (p.pop ? '<span class="dcard__flag">★ MÁS ELEGIDO</span>' : '') +
        '<div class="dcard__die">' + die(p.pips) + '</div>' +
        '<div class="dcard__name">' + p.name + '</div>' +
        '<div class="dcard__pricerow"><span class="dcard__price">' + crc(p[mode]) + '</span>' +
          '<span class="dcard__per">' + (mode === 'crea' ? 'único' : '/mes') + '</span></div>' +
        '<ul class="dcard__feat">' +
          p.feat.map(function (f) { return '<li><i>✓</i>' + f + '</li>'; }).join('') +
        '</ul>' +
        '<a class="dcard__cta" href="' + WA + msg + '" target="_blank" rel="noopener">Cotizar</a>' +
      '</div>';
  }

  function render() { grid.innerHTML = PLANS.map(cardHTML).join(''); }
  render();

  // conteo animado de precios al cambiar de modo
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animatePrices(from) {
    grid.querySelectorAll('.dcard__per').forEach(function (el) {
      el.textContent = mode === 'crea' ? 'único' : '/mes';
    });
    var els = grid.querySelectorAll('.dcard__price');
    // sin animación si la página está oculta o el usuario prefiere menos movimiento
    if (document.hidden || reduce) {
      els.forEach(function (el, i) { el.textContent = crc(PLANS[i][mode]); });
      return;
    }
    els.forEach(function (el, i) {
      var start = PLANS[i][from], end = PLANS[i][mode], t0 = null, dur = 550;
      function step(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = crc(start + (end - start) * e);
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  toggle.querySelectorAll('.dice__tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var prev = mode; mode = btn.dataset.mode;
      if (mode === prev) return;
      toggle.classList.toggle('is-mant', mode === 'mant');
      toggle.querySelectorAll('.dice__tab').forEach(function (b) {
        var on = b.dataset.mode === mode;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      animatePrices(prev);
    });
  });

  // sparkles en canvas (respeta reduced-motion)
  var cv = document.querySelector('.dice__spark');
  if (cv && !reduce) {
    var section = document.getElementById('planes');
    var ctx = cv.getContext('2d'), W, H, parts = [];
    function resize() {
      W = cv.width = section.offsetWidth; H = cv.height = section.offsetHeight;
      parts = [];
      var n = Math.min(140, Math.round(W * H / 9000));
      for (var i = 0; i < n; i++) parts.push({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + 0.3,
        o: Math.random(), vy: Math.random() * 0.25 + 0.05, vo: (Math.random() * 0.02 + 0.005)
      });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy; p.o += p.vo;
        if (p.o > 1 || p.o < 0) p.vo *= -1;
        if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
        var fade = 1 - (p.y / H) * 0.7;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = 'rgba(255,250,240,' + (p.o * 0.55 * fade) + ')'; ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize(); draw();
    window.addEventListener('resize', resize);
  }
})();
