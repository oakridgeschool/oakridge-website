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

  // Gallery lightbox (only present on gallery.html)
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  if (galleryItems.length && lightbox) {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    let current = 0;

    function showSlide(index) {
      current = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[current];
      const img = item.querySelector('img');
      const caption = item.querySelector('p').textContent;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption;
      lightboxCounter.textContent = (current + 1) + ' / ' + galleryItems.length;
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        showSlide(index);
        lightbox.classList.add('open');
      });
    });

    document.getElementById('lightboxClose').addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
    document.getElementById('lightboxPrev').addEventListener('click', () => showSlide(current - 1));
    document.getElementById('lightboxNext').addEventListener('click', () => showSlide(current + 1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') lightbox.classList.remove('open');
      if (e.key === 'ArrowLeft') showSlide(current - 1);
      if (e.key === 'ArrowRight') showSlide(current + 1);
    });
  }
});
