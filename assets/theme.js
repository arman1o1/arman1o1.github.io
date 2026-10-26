(function () {
  const KEY = 'theme';
  // NOTE: the initial .dark class is applied by the inline snippet in <head>
  // (runs before CSS paints, so no flash). This file is loaded with `defer`.

  function setup() {
    const root = document.documentElement;
    const cb = document.getElementById('theme-toggle-checkbox');
    if (!cb) return;

    cb.checked = root.classList.contains('dark');

    cb.addEventListener('change', function () {
      // Suppress transitions during the swap. A class is required here:
      // style.transition on <html> alone would not stop descendants
      // (body, cards, header) from animating their own transitions.
      root.classList.add('theme-switching');
      root.classList.toggle('dark', cb.checked);
      try {
        localStorage.setItem(KEY, cb.checked ? 'dark' : 'light');
      } catch (e) { /* private browsing / storage disabled */ }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.remove('theme-switching'));
      });
    });

    // Auto-hiding header
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.site-header');

    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
      }, { passive: true });
    }

    // Scroll reveal for .reveal elements
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger the reveal
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    }

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
