(function () {
  const KEY = 'theme';
  const savedTheme = localStorage.getItem(KEY);

  // Default to dark mode unless user explicitly saved 'light'
  const isDark = savedTheme !== 'light';

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function setup() {
    const cb = document.getElementById('theme-toggle-checkbox');
    if (!cb) return;

    cb.checked = isDark;

    cb.addEventListener('change', function () {
      document.documentElement.style.transition = 'none';
      if (cb.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(KEY, 'light');
      }
      // Re-enable transitions after a frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.style.transition = '';
        });
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
