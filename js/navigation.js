/* Accessible desktop dropdowns and mobile navigation drawer. */
(() => {
  'use strict';
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const panel = qs('.nav-panel');
  const trigger = qs('.menu-button');
  const overlay = qs('.menu-overlay');

  const closeMenu = () => {
    panel?.classList.remove('is-open');
    trigger?.classList.remove('is-open');
    trigger?.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    panel?.classList.add('is-open');
    trigger?.classList.add('is-open');
    trigger?.setAttribute('aria-expanded', 'true');
    overlay?.classList.add('is-visible');
    document.body.classList.add('menu-open');
  };

  trigger?.addEventListener('click', () => {
    panel?.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  overlay?.addEventListener('click', closeMenu);
  qsa('.nav-panel > a, .nav-panel .dropdown a').forEach((link) => link.addEventListener('click', closeMenu));

  qsa('.nav-toggle').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const parent = button.closest('.nav-item');
      const willOpen = !parent.classList.contains('is-open');
      qsa('.nav-item.is-open').forEach((item) => {
        if (item !== parent) item.classList.remove('is-open');
      });
      parent.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });
})();
