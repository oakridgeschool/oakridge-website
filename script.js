// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Contact form (only present on contact.html)
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      status.className = 'form-status';
      status.textContent = '';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
          status.className = 'form-status success';
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please try again or email us directly.";
          status.className = 'form-status error';
        }
      } catch (err) {
        status.textContent = "Something went wrong. Please try again or email us directly.";
        status.className = 'form-status error';
      }
    });
  }
});
