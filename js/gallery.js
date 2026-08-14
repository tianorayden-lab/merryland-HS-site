/* Gallery filtering and lightbox. */
(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-filter]')];
  const items = [...document.querySelectorAll('.gallery-item')];
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeLightbox = () => {
    lightbox?.classList.remove('is-open');
    lightboxImage?.removeAttribute('src');
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      filters.forEach((button) => button.classList.toggle('is-active', button === filter));
      items.forEach((item) => {
        item.hidden = category !== 'all' && item.dataset.category !== category;
      });
    });
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      const image = item.querySelector('img');
      lightboxImage.src = item.dataset.full || image.currentSrc || image.src;
      lightboxImage.alt = image.alt || '';
      lightbox.classList.add('is-open');
    });
  });
  lightbox?.querySelector('button')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
})();
