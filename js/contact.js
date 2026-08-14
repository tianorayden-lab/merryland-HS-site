/* Offline-safe validation and confirmation for contact, admissions, and account forms. */
(() => {
  'use strict';
  const forms = [...document.querySelectorAll('[data-site-form]')];

  forms.forEach((form) => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const kind = form.dataset.siteForm;
      const messages = {
        contact: 'Thank you. Your message has been prepared for the Merryland team in this offline preview.',
        application: 'Thank you. Your application details have been validated in this offline preview.',
        account: 'Thank you. Your details have been saved locally for this preview.'
      };
      const message = messages[kind] || 'Thank you. Your submission has been received in this offline preview.';
      if (status) {
        status.textContent = message;
        status.classList.add('is-visible');
      }
      window.showToast?.(message);
      form.reset();
    });
  });
})();
