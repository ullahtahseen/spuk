// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      const expanded = nav.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }
})();

// Reveal on scroll
(function () {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// Contact form (mailto fallback — replace with backend handler when available)
(function () {
  const form = document.querySelector('form[data-mailto]');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Enquiry from ' + (data.get('name') || 'website'));
    const lines = [];
    data.forEach(function (val, key) { lines.push(key + ': ' + val); });
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:info@securityprojectsltd.co.uk?subject=' + subject + '&body=' + body;
  });
})();

// Current year
(function () {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Hero cross-fade carousel.
// Tries to start as early as possible so it works on mobile too —
// uses DOMContentLoaded as a fallback in case the IIFE runs before
// the hero markup exists in the DOM (some browsers do this for
// deferred scripts vs. body content depending on cache).
(function () {
  function start() {
    var carousel = document.querySelector('[data-hero-carousel]');
    if (!carousel) return;
    var slides = carousel.querySelectorAll('.hero-bg__img');
    if (slides.length < 2) return;

    // Find whichever slide the inline boot script activated.
    var i = 0;
    for (var n = 0; n < slides.length; n++) {
      if (slides[n].classList.contains('is-active')) { i = n; break; }
    }
    // Belt + braces — if nothing is active yet, activate the first.
    if (!slides[i].classList.contains('is-active')) slides[i].classList.add('is-active');

    // We deliberately do NOT honour prefers-reduced-motion here — the
    // hero carousel is the site's primary visual hook and the user has
    // asked for the auto-rotate explicitly.

    var interval = parseInt(carousel.getAttribute('data-interval'), 10) || 3000;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, interval);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
