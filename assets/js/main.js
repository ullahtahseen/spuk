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
