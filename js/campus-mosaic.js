/* Campus Mosaic UI: low-key reveal choreography and page progress treatment. */
(() => {
  'use strict';
  const body = document.body;
  if (!body.classList.contains('mosaic-site')) return;

  body.classList.add('mosaic-ready');
  const elements = [...document.querySelectorAll('.mosaic-reveal')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px' });

    elements.forEach((element) => observer.observe(element));
  }

  // Official-results wall: switch between the published UCE and UACE 2024 recognitions.
  const tabs = [...document.querySelectorAll('[data-honours-tab]')];
  const panels = [...document.querySelectorAll('[data-honours-panel]')];
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.honoursTab;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.honoursPanel === target;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    });
  });
})();
