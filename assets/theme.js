(function () {
  // Apply theme immediately to html tag
  const KEY = 'theme'; // Changed key to 'theme'
  const savedTheme = localStorage.getItem(KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default to dark mode unless user explicitly saved 'light'
  const isDark = savedTheme !== 'light';

  // Apply class to html element (available immediately in head)
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Setup toggle after DOM load
  function setup() {
    const cb = document.getElementById('theme-toggle-checkbox');
    if (!cb) return;

    // Sync checkbox state
    cb.checked = isDark;

    // Listen for changes
    cb.addEventListener('change', function () {
      if (cb.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(KEY, 'light');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
