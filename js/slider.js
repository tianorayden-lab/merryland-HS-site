/* Minimal accessible testimonial slider; no third-party dependency. */
(() => {
  'use strict';
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = [...slider.querySelectorAll('.testimonial-slide')];
    const previous = slider.querySelector('[data-slide="previous"]');
    const next = slider.querySelector('[data-slide="next"]');
    if (slides.length < 2) return;

    let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (index < 0) index = 0;
    let timer;

    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
    };
    const restart = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => show(index + 1), 7000);
    };

    previous?.addEventListener('click', () => { show(index - 1); restart(); });
    next?.addEventListener('click', () => { show(index + 1); restart(); });
    slider.addEventListener('mouseenter', () => window.clearInterval(timer));
    slider.addEventListener('mouseleave', restart);
    restart();
  });
})();
