// shared site behavior
(function () {
  // mobile menu toggle
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-menu-toggle]');
    if (!t) return;
    var nav = document.querySelector('.mobile-nav');
    if (nav) nav.classList.toggle('open');
  });

  // pricing tabs
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var btns = root.querySelectorAll('[data-tab]');
    var panels = document.querySelectorAll('[data-tab-panel]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-tab');
        btns.forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute('data-tab-panel') !== k;
        });
      });
    });
  });

  // outbound click tracking (analytics-ready event names)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-track]');
    if (!a) return;
    var name = a.getAttribute('data-track');
    try {
      if (window.dataLayer) window.dataLayer.push({ event: name, url: a.href });
      if (window.gtag) window.gtag('event', name, { url: a.href });
      console.log('[track]', name, a.href);
    } catch (err) {}
  });
})();
