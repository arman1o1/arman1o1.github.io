(function () {
  // Apply theme immediately to html tag
  const KEY = 'theme'; // Changed key to 'theme'
  const savedTheme = localStorage.getItem(KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Logic: If saved is 'dark', OR if no saved and system is dark, OR if no saved and no system pref (default)
  // Actually, user wants "ensure by default the dark mode toggle should be on"
  // So if localStorage is null, we force dark.

  let isDark = true; // Default to true

  if (savedTheme === 'light') {
    isDark = false;
  } else if (savedTheme === 'dark') {
    isDark = true;
  } else {
    // No saved preference, use dark by default (ignoring system pref if we want to FORCE default dark)
    isDark = true;
  }

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
