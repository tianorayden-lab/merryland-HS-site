/* Shared progressive enhancements for the Merryland static site. */
(() => {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  document.documentElement.classList.add('js');

  const loader = qs('.loader');
  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 260);
  }, { once: true });

  const header = qs('.site-header');
  const backToTop = qs('.back-to-top');
  const updateScrollUI = () => {
    const scrolled = window.scrollY > 18;
    header?.classList.toggle('is-scrolled', scrolled);
    backToTop?.classList.toggle('is-visible', window.scrollY > 650);
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Local-only toast used by subscription and external-link placeholders.
  let toastTimer;
  window.showToast = (message) => {
    let toast = qs('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.append(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4400);
  };

  qsa('a[href="#external-link"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.showToast('This action is unavailable in the offline preview.');
    });
  });

  qsa('.newsletter').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = qs('input[type="email"]', form);
      if (!email?.checkValidity()) {
        email?.reportValidity();
        return;
      }
      form.reset();
      window.showToast('Thank you — you are on the Merryland updates list.');
    });
  });

  // Close dropdowns on outside click and escape.
  const closeDropdowns = () => qsa('.nav-item.is-open').forEach((item) => item.classList.remove('is-open'));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-item')) closeDropdowns();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdowns();
      document.body.classList.remove('menu-open');
      qs('.nav-panel')?.classList.remove('is-open');
      qs('.menu-overlay')?.classList.remove('is-visible');
      qs('.menu-button')?.classList.remove('is-open');
    }
  });

  // Mark the current navigation item without relying on a server runtime.
  const currentPage = document.body.dataset.page;
  qsa('[data-nav]').forEach((link) => {
    if (link.dataset.nav === currentPage) link.classList.add('is-active');
  });

  // Keep copyright current, even when opened directly from file://.
  qsa('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
})();
