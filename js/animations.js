/* IntersectionObserver reveal and counter animation helpers. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px' });
    revealElements.forEach((element) => observer.observe(element));
  }

  const counters = [...document.querySelectorAll('[data-count]')];
  const formatNumber = (value, suffix) => `${value.toLocaleString()}${suffix || ''}`;
  const animateCounter = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    if (reduceMotion || target === 0) {
      element.textContent = formatNumber(target, suffix);
      return;
    }
    const started = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatNumber(Math.round(target * eased), suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && !reduceMotion) {
    const counterObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .5 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else counters.forEach(animateCounter);
})();
