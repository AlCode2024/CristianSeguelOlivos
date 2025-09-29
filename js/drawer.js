(function(){
  const openBtn = document.getElementById('btn-open-drawer');
  const closeBtn = document.getElementById('btn-close-drawer');
  const drawerRoot = document.getElementById('drawer-root');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if(!openBtn || !drawer || !drawerRoot || !backdrop) return;

  let previouslyFocused = null;

  function openDrawer(){
    previouslyFocused = document.activeElement;
    drawerRoot.classList.remove('hidden');
    requestAnimationFrame(() => {
      drawer.classList.remove('drawer-hidden');
      drawer.classList.add('drawer-visible');
      drawerRoot.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      const firstLink = drawer.querySelector('a, button');
      if(firstLink) firstLink.focus();
    });
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeDrawer(){
    drawer.classList.remove('drawer-visible');
    drawer.classList.add('drawer-hidden');
    drawerRoot.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      drawerRoot.classList.add('hidden');
      if(previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    }, 260);
  }

  function handleKeyDown(e){
    if(e.key === 'Escape') { closeDrawer(); return; }
    if(e.key === 'Tab'){
      const focusable = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if(!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  drawer.classList.add('drawer-hidden');
})();
