/* WorkLedger — Thank-you & giveaway landing
 * Lightweight vanilla JS: i18n (EN/ES), form validation + submission, motion.
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // CONFIG — replace before going live
  // ---------------------------------------------------------------------------
  var CONFIG = {
    // TODO: set your real giveaway API endpoint (POST, JSON). Empty = demo mode (no network call).
    endpoint: '',
    // Demo mode only: 'success' or 'error' to preview each state.
    demoResult: 'success'
  };

  // ---------------------------------------------------------------------------
  // COPY
  // ---------------------------------------------------------------------------
  var T = {
    en: {
      metaTitle: 'Thanks for using WorkLedger — Exclusive giveaway',
      metaDesc: 'A thank-you from the WorkLedger team. Enter the exclusive giveaway for WorkLedger users — native Jira time tracking by Movonte.',
      skip: 'Skip to the giveaway form', navLabel: 'Main', homeLabel: 'WorkLedger by Movonte — back to top', langLabel: 'Switch language', navCta: 'Enter giveaway', footLabel: 'Legal and support',
      h1a: 'Thanks for', h1b: 'using WorkLedger.',
      heroSub: "We built WorkLedger to make time tracking in Jira simpler, more native and more transparent. Whether you've installed it, tested it, or simply gave it a shot — thank you.",
      exclusiveTag: 'Exclusive', giveLine: "So we're running a giveaway, just for WorkLedger users.",
      cta: 'Enter the giveaway', ctaNote: 'Takes less than a minute',
      panelTitle: 'My worklogs', panelWeek: 'This week', logged: 'Logged to Jira',
      days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      entries: [['WL-208', 'Sprint planning', '1h 30m'], ['WL-214', 'API review', '2h 15m'], ['WL-221', 'Release QA', '45m']],
      tracking: 'Tracking', ticketEyebrow: 'Exclusive giveaway', ticketTitle: 'Reserved for you', ticketSub: 'For WorkLedger users only', ticketStatus: 'Awaiting your entry',
      ctxA: 'Native Jira time tracking.', ctxB: 'Every hour you log is stored as a canonical Jira worklog — no extra systems to manage, nothing to migrate later.',
      attrs: [['Built on Forge', 'Runs entirely on Atlassian infrastructure.'], ['Native worklogs', 'Your hours live in Jira, where they belong.'], ['No external backend', 'Your data never leaves Atlassian.'], ['Zero lock-in', 'Uninstall anytime — your worklogs stay put.']],
      bigWord: 'Thank you',
      gTitleA: "You're in.", gTitleB: 'Almost.',
      gBody: "Tell us a little about yourself and you'll be entered into the exclusive WorkLedger giveaway.",
      formHead: 'Your entry',
      fName: 'Full name', fCompany: 'Company', fEmail: 'Work email', fEnt: 'Entitlement number', fExp: 'Tell us about your experience with WorkLedger', optional: ' · optional',
      hEnt: 'Find it in Jira › Apps › Manage apps', hEmail: "We'll only use it to contact winners", hExp: 'What works, what could be better — we read every reply',
      errName: 'Please enter your full name.', errCompany: 'Which company are you with?', errEmail: 'We need your work email to enter you.', errEmailBad: "That email doesn't look quite right.", errEnt: 'That number looks incomplete.', errConsent: 'Please accept the terms to enter.',
      consentA: 'I agree to the', terms: 'giveaway terms', consentB: 'and the', privacy: 'privacy policy',
      submit: 'Count me in', loading: 'Entering you…',
      errorMsg: 'Something went wrong on our side. Your details are still here — please try again.',
      privacyLine: 'Handled responsibly by Movonte. No spam, ever.',
      sTitle: "You're officially in.", sBody: "Thanks for being part of WorkLedger. We'll be in touch if you're selected.", sConfirm: 'Entry confirmed for',
      dTitle: "Wait — you haven't installed WorkLedger yet?",
      dBody: 'No worries. WorkLedger brings simple, native time tracking straight into Jira — without external backends, unnecessary complexity or vendor lock-in.',
      dCta: 'Download WorkLedger', dNote: 'Free to try on the Atlassian Marketplace',
      qrTitle: 'Scan to get WorkLedger', qrBody: "Open your phone's camera and point it here to get WorkLedger on the Atlassian Marketplace.", qrAlt: 'QR code linking to WorkLedger on the Atlassian Marketplace',
      privacyLink: 'Privacy', termsLink: 'Terms', supportLink: 'Support',
      copy: '© 2026 Movonte. All rights reserved. Atlassian and Jira are trademarks of Atlassian.', byMovonte: 'WorkLedger is a Movonte product'
    },
    es: {
      metaTitle: 'Gracias por confiar en WorkLedger — Sorteo exclusivo',
      metaDesc: 'Un agradecimiento del equipo de WorkLedger. Participa en el sorteo exclusivo para usuarios de WorkLedger, el registro de horas nativo para Jira de Movonte.',
      skip: 'Ir al formulario del sorteo', navLabel: 'Principal', homeLabel: 'WorkLedger by Movonte — volver arriba', langLabel: 'Cambiar idioma', navCta: 'Participar', footLabel: 'Información legal y soporte',
      h1a: 'Gracias por confiar', h1b: 'en WorkLedger.',
      heroSub: 'Creamos WorkLedger para que registrar horas en Jira fuera más simple, más nativo y más transparente. Si lo instalaste, lo probaste o simplemente le diste una oportunidad: gracias.',
      exclusiveTag: 'Exclusivo', giveLine: 'Por eso organizamos un sorteo solo para quienes usan WorkLedger.',
      cta: 'Participar en el sorteo', ctaNote: 'Te lleva menos de un minuto',
      panelTitle: 'Mis worklogs', panelWeek: 'Esta semana', logged: 'Registrado en Jira',
      days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      entries: [['WL-208', 'Planificación del sprint', '1h 30m'], ['WL-214', 'Revisión de la API', '2h 15m'], ['WL-221', 'QA de la release', '45m']],
      tracking: 'En curso', ticketEyebrow: 'Sorteo exclusivo', ticketTitle: 'Reservado para ti', ticketSub: 'Solo para usuarios de WorkLedger', ticketStatus: 'Esperando tu participación',
      ctxA: 'Registro de horas nativo en Jira.', ctxB: 'Cada hora que registras se guarda como un worklog estándar de Jira: sin sistemas extra que gestionar ni nada que migrar después.',
      attrs: [['Construido sobre Forge', 'Funciona íntegramente en la infraestructura de Atlassian.'], ['Worklogs nativos', 'Tus horas viven en Jira, donde deben estar.'], ['Sin backend externo', 'Tus datos nunca salen de Atlassian.'], ['Cero dependencia', 'Desinstálalo cuando quieras: tus worklogs se quedan.']],
      bigWord: 'Gracias',
      gTitleA: 'Ya casi', gTitleB: 'estás dentro.',
      gBody: 'Cuéntanos un poco sobre ti y entrarás en el sorteo exclusivo de WorkLedger.',
      formHead: 'Tu participación',
      fName: 'Nombre completo', fCompany: 'Empresa', fEmail: 'Email de trabajo', fEnt: 'Número de entitlement', fExp: 'Cuéntanos tu experiencia con WorkLedger', optional: ' · opcional',
      hEnt: 'Lo encuentras en Jira › Apps › Gestionar apps', hEmail: 'Solo lo usaremos para contactar a quien gane', hExp: 'Qué te funciona, qué mejorarías: leemos cada respuesta',
      errName: 'Escribe tu nombre completo.', errCompany: '¿En qué empresa trabajas?', errEmail: 'Necesitamos tu email de trabajo para inscribirte.', errEmailBad: 'Ese email no parece correcto.', errEnt: 'Parece que al número le faltan dígitos.', errConsent: 'Acepta las bases para participar.',
      consentA: 'Acepto las', terms: 'bases del sorteo', consentB: 'y la', privacy: 'política de privacidad',
      submit: 'Quiero participar', loading: 'Registrando tu participación…',
      errorMsg: 'Algo falló de nuestro lado. Tus datos siguen aquí: inténtalo de nuevo.',
      privacyLine: 'Movonte trata tus datos con responsabilidad. Nada de spam.',
      sTitle: 'Ya estás dentro.', sBody: 'Gracias por formar parte de WorkLedger. Si resultas ganador, te escribiremos.', sConfirm: 'Participación confirmada para',
      dTitle: 'Un momento: ¿todavía no tienes WorkLedger?',
      dBody: 'Sin problema. WorkLedger lleva un registro de horas simple y nativo directamente a Jira, sin backends externos, sin complicaciones y sin atarte a ningún proveedor.',
      dCta: 'Descargar WorkLedger', dNote: 'Pruébalo gratis en Atlassian Marketplace',
      qrTitle: 'Escanea y consigue WorkLedger', qrBody: 'Abre la cámara de tu móvil y apunta aquí para ir a WorkLedger en Atlassian Marketplace.', qrAlt: 'Código QR que enlaza a WorkLedger en Atlassian Marketplace',
      privacyLink: 'Privacidad', termsLink: 'Términos', supportLink: 'Soporte',
      copy: '© 2026 Movonte. Todos los derechos reservados. Atlassian y Jira son marcas de Atlassian.', byMovonte: 'WorkLedger es un producto de Movonte'
    }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = initLang();
  var submitted = false;
  var touched = {};

  function initLang() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'es') return q;
      var s = localStorage.getItem('wl-lang');
      if (s === 'en' || s === 'es') return s;
    } catch (e) {}
    return 'en';
  }

  // ---------------------------------------------------------------------------
  // I18N
  // ---------------------------------------------------------------------------
  var HEIGHTS = ['52%', '78%', '64%', '92%', '70%', '14%', '8%'];

  function renderLists(t) {
    $('#bars').innerHTML = t.days.map(function (d, i) {
      var mod = i === 3 ? ' bar__fill--peak' : i > 4 ? ' bar__fill--off' : '';
      return '<div class="bar"><div class="bar__fill' + mod + '" style="height:' + HEIGHTS[i] + ';animation-delay:' + (0.7 + i * 0.07).toFixed(2) + 's"></div><span class="bar__label">' + d + '</span></div>';
    }).join('');
    $('#entries').innerHTML = t.entries.map(function (e) {
      return '<div class="entry"><span class="entry__key">' + e[0] + '</span><span class="entry__name">' + e[1] + '</span><span class="entry__dur">' + e[2] + '</span></div>';
    }).join('');
    $('#attrs').innerHTML = t.attrs.map(function (a, i) {
      return '<div class="attr"><div class="attr__n">0' + (i + 1) + '</div><div class="attr__title">' + a[0] + '</div><div class="attr__body">' + a[1] + '</div></div>';
    }).join('');
  }

  function applyLang(l) {
    var t = T[l];
    document.documentElement.lang = l;
    document.title = t.metaTitle;
    var setMeta = function (sel, v) { var m = $(sel); if (m) m.setAttribute('content', v); };
    setMeta('meta[name="description"]', t.metaDesc);
    setMeta('meta[property="og:title"]', t.metaTitle);
    setMeta('meta[property="og:description"]', t.metaDesc);

    $$('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (t[k] != null) el.textContent = t[k]; });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split(':'); if (t[p[1]] != null) el.setAttribute(p[0].trim(), t[p[1].trim()]);
      });
    });
    $$('.lang__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    renderLists(t);
    refreshForm();
    var email = $('#wl-email').value.trim();
    $('#success-meta').textContent = t.sConfirm + ' ' + email;
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l;
    try {
      localStorage.setItem('wl-lang', l);
      var u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u);
    } catch (e) {}
    if (reduced) { applyLang(l); return; }
    var main = $('#top');
    main.classList.add('is-fading');
    setTimeout(function () {
      applyLang(l);
      requestAnimationFrame(function () { main.classList.remove('is-fading'); });
    }, 200);
  }

  // ---------------------------------------------------------------------------
  // FORM
  // ---------------------------------------------------------------------------
  var form, btn;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function values() {
    return {
      name: $('#wl-name').value, company: $('#wl-company').value, email: $('#wl-email').value,
      ent: $('#wl-ent').value, exp: $('#wl-exp').value, consent: $('#wl-consent').checked
    };
  }

  function validate(v) {
    var e = {};
    if (v.name.trim().length < 2) e.name = 'errName';
    if (!v.company.trim()) e.company = 'errCompany';
    if (!v.email.trim()) e.email = 'errEmail';
    else if (!EMAIL_RE.test(v.email.trim())) e.email = 'errEmailBad';
    if (v.ent.trim() && !/^[A-Za-z0-9-]{5,}$/.test(v.ent.trim())) e.ent = 'errEnt';
    if (!v.consent) e.consent = 'errConsent';
    return e;
  }

  function refreshForm() {
    if (!form) return;
    var t = T[lang], v = values(), errs = validate(v);
    $$('.field', form).forEach(function (f) {
      var k = f.getAttribute('data-field');
      var input = $('input,textarea', f), msg = $('.field__msg', f);
      var focused = document.activeElement === input;
      var show = errs[k] && (submitted || (touched[k] && v[k] !== ''));
      f.classList.toggle('is-invalid', !!show);
      if (input.tagName === 'INPUT') input.setAttribute('aria-invalid', String(!!show));
      var hint = f.getAttribute('data-hint');
      var hintOnFocus = f.hasAttribute('data-hint-focus');
      msg.textContent = show ? t[errs[k]] : (hint && (!hintOnFocus || focused) ? t[hint] : '');
    });
    var consentErr = submitted && errs.consent;
    $('#consent-msg').textContent = consentErr ? t.errConsent : '';
    $('#wl-consent').setAttribute('aria-invalid', String(!!consentErr));

    var done = [!errs.name, !errs.company, !errs.email, v.consent];
    $$('.progress__segs span').forEach(function (s, i) { s.classList.toggle('is-on', done[i]); });
    $('#progress-text').textContent = done.filter(Boolean).length + ' / 4';
  }

  function setLoading(on) {
    btn.disabled = on;
    btn.setAttribute('aria-busy', String(on));
    btn.classList.toggle('is-loading', on);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    if (btn.disabled) return;
    submitted = true;
    var v = values(), errs = validate(v);
    refreshForm();
    var first = ['name', 'company', 'email', 'ent'].filter(function (k) { return errs[k]; })[0];
    if (first) { $('#wl-' + first).focus(); return; }
    if (errs.consent) { $('#wl-consent').focus(); return; }

    $('#form-error').hidden = true;
    setLoading(true);
    var payload = {
      fullName: v.name.trim(), company: v.company.trim(), email: v.email.trim(),
      entitlementNumber: v.ent.trim() || null, experience: v.exp.trim() || null,
      consent: true, language: lang, source: 'workledger-thank-you-email'
    };

    var request = CONFIG.endpoint
      ? fetch(CONFIG.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
          .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); })
      : new Promise(function (resolve, reject) {
          console.info('[WorkLedger giveaway] Demo mode — no endpoint configured. Payload:', payload);
          setTimeout(function () { CONFIG.demoResult === 'error' ? reject(new Error('Demo error')) : resolve(); }, 1400);
        });

    request.then(function () {
      setLoading(false);
      $('#success-meta').textContent = T[lang].sConfirm + ' ' + payload.email;
      form.hidden = true;
      var s = $('#success'); s.hidden = false;
      document.body.classList.add('is-success');
      setTimeout(function () { s.focus({ preventScroll: true }); }, 60);
    }).catch(function () {
      setLoading(false);
      $('#form-error').hidden = false;
    });
  }

  function initForm() {
    form = $('#giveaway-form');
    btn = $('#submit-btn');
    form.addEventListener('submit', onSubmit);
    form.addEventListener('input', function () { $('#form-error').hidden = true; refreshForm(); });
    form.addEventListener('change', refreshForm);
    $$('.field', form).forEach(function (f) {
      var k = f.getAttribute('data-field'), input = $('input,textarea', f);
      input.addEventListener('focus', refreshForm);
      input.addEventListener('blur', function () { touched[k] = true; refreshForm(); });
    });
  }

  // ---------------------------------------------------------------------------
  // MOTION
  // ---------------------------------------------------------------------------
  function initHeader() {
    var onScroll = function () { document.body.classList.toggle('is-scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initTimer() {
    var el = $('#timer'), secs = 1 * 3600 + 42 * 60 + 18;
    var p = function (n) { return String(n).padStart(2, '0'); };
    setInterval(function () {
      secs++;
      el.textContent = p(Math.floor(secs / 3600)) + ':' + p(Math.floor(secs / 60) % 60) + ':' + p(secs % 60);
    }, 1000);
  }

  function initPointer() {
    if (reduced || !window.matchMedia('(pointer:fine)').matches) return;
    var visual = $('#visual'), cta = $('#hero-cta'), raf = 0;
    window.addEventListener('mousemove', function (e) {
      var mx = e.clientX / innerWidth - 0.5, my = e.clientY / innerHeight - 0.5, cx = e.clientX, cy = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        $$('[data-depth]', visual).forEach(function (el) {
          var d = parseFloat(el.getAttribute('data-depth'));
          el.style.translate = (-mx * d * 16).toFixed(1) + 'px ' + (-my * d * 16).toFixed(1) + 'px';
        });
        var r = cta.getBoundingClientRect(), dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
        var near = Math.abs(dx) < r.width / 2 + 60 && Math.abs(dy) < r.height / 2 + 50;
        cta.style.translate = near ? (dx * 0.18).toFixed(1) + 'px ' + (dy * 0.3).toFixed(1) + 'px' : '0px 0px';
      });
    }, { passive: true });
  }

  function initReveal() {
    if (reduced || !('IntersectionObserver' in window)) return;
    var els = $$('[data-reveal]').filter(function (el) { return el.getBoundingClientRect().top > innerHeight * 0.9; });
    if (!els.length) return;
    els.forEach(function (el) {
      var sibs = $$(':scope > [data-reveal]', el.parentElement);
      el.style.transitionDelay = Math.max(0, sibs.indexOf(el)) * 90 + 'ms';
    });
    document.documentElement.classList.add('js-reveal');
    $$('[data-reveal]').forEach(function (el) { if (els.indexOf(el) < 0) el.classList.add('is-visible'); });
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------------------------------------------------------------------------
  // BOOT
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initForm();
    applyLang(lang);
    $$('.lang__btn').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
    initHeader();
    initTimer();
    initPointer();
    initReveal();
  });
})();
