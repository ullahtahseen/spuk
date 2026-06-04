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

// Hero cross-fade carousel
// Markup: <div class="hero-bg" data-hero-carousel data-interval="3000">
//   <img class="hero-bg__img" ...>
//   <img class="hero-bg__img" ...>
//   ...
// </div>
// The inline boot script in index.html picks a random starting slide
// BEFORE this file loads (so there is no flash of slide 1). This file
// then picks up the current active slide and rotates from there.
(function () {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.hero-bg__img');
  if (slides.length < 2) return;

  // Find whichever slide the boot script (or fallback) activated.
  let i = 0;
  for (let n = 0; n < slides.length; n++) {
    if (slides[n].classList.contains('is-active')) { i = n; break; }
  }
  // No slide active yet? Activate the first one.
  if (!slides[i].classList.contains('is-active')) slides[i].classList.add('is-active');

  // Respect prefers-reduced-motion — show the active slide and stop.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const interval = parseInt(carousel.getAttribute('data-interval'), 10) || 3000;
  setInterval(function () {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
  }, interval);
})();
