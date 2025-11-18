
(function(){
  const cb = document.getElementById('theme-toggle-checkbox');
  const body = document.body;
  const KEY = 'theme-preference';

  function setMode(m){
    if(m === 'dark'){
      body.classList.add('dark');
      if(cb) cb.checked = true;
    } else {
      body.classList.remove('dark');
      if(cb) cb.checked = false;
    }
  }

  // initialize after DOM loaded if checkbox not yet present
  function init(){
    const saved = localStorage.getItem(KEY);
    if(saved){
      setMode(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }

    if(cb){
      cb.addEventListener('change', function(){
        const next = cb.checked ? 'dark' : 'light';
        setMode(next);
        localStorage.setItem(KEY, next);
      });
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else init();
})();
