(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const overlays = $$('.overlay');
  let galleryImages = [];
  let galleryIndex = 0;
  let lastFocus = null;

  function openOverlay(element) {
    if (!element) return;
    lastFocus = document.activeElement;
    element.hidden = false;
    const scrollArea = $('.modal-content', element);
    if (scrollArea) scrollArea.scrollTop = 0;
    document.body.classList.add('modal-open');
    $('.close', element)?.focus();
  }

  function closeOverlay(element) {
    if (!element) return;
    element.hidden = true;
    if (element.id === 'visorVideo') { const video = $('#videoGrande'); video.pause(); video.currentTime = 0; }
    if (!overlays.some(item => !item.hidden)) document.body.classList.remove('modal-open');
    lastFocus?.focus?.();
  }

  const slides = $$('.slide');
  const dotsContainer = $('.slider-dots');
  let slideIndex = 0;
  function showSlide(index) {
    if (!slides.length) return;
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === slideIndex));
    $$('.slider-dot', dotsContainer).forEach((dot, i) => {
      dot.classList.toggle('active', i === slideIndex);
      dot.setAttribute('aria-current', i === slideIndex ? 'true' : 'false');
    });
  }
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button'; dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Mostrar banner ${index + 1}`);
    dot.addEventListener('click', () => moveSlide(index - slideIndex));
    dotsContainer?.appendChild(dot);
  });
  showSlide(0);
  let sliderTimer = slides.length > 1 ? setInterval(() => showSlide(slideIndex + 1), 5000) : null;
  function moveSlide(direction) { showSlide(slideIndex + direction); clearInterval(sliderTimer); sliderTimer = setInterval(() => showSlide(slideIndex + 1), 5000); }
  $('.prev-slide')?.addEventListener('click', () => moveSlide(-1));
  $('.next-slide')?.addEventListener('click', () => moveSlide(1));

  const menuItems = $$('.nav-links a, .nav-links button');
  function clearMenuSelection() {
    menuItems.forEach(item => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });
  }
  menuItems.forEach(item => item.addEventListener('click', () => {
    clearMenuSelection();
    item.classList.add('active');
    item.setAttribute('aria-current', 'page');
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.menu')) clearMenuSelection();
  });

  $$('.producto-card .btn-card:not(#btnVideo)').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.producto-card');
    const open = card.classList.toggle('active');
    button.textContent = open ? 'Ocultar catálogo' : 'Explorar catálogo';
    button.setAttribute('aria-expanded', String(open));
  }));

  $$('.galeria img').forEach(image => image.addEventListener('click', () => {
    galleryImages = $$('.galeria img', image.closest('.galeria'));
    galleryIndex = galleryImages.indexOf(image);
    const large = $('#imgGrande');
    large.src = image.src; large.alt = image.alt;
    openOverlay($('#visor'));
  }));

  const catalogGroups = [
    { key: 'tazas', label: 'Tazas', name: 'Taza personalizada', folder: 'tazas', file: 'taza', total: 9 },
    { key: 'playeras', label: 'Playeras', name: 'Playera personalizada', folder: 'playeras', file: 'playera', total: 2 },
    { key: 'termos', label: 'Termos', name: 'Termo personalizado', folder: 'termos', file: 'termo', total: 1 },
    { key: 'bolsas', label: 'Bolsas y otros', name: 'Bolsa personalizada', folder: 'bolsas', file: 'bolsa', total: 9 },
    { key: 'globos', label: 'Decoración con globos', name: 'Decoración con globos', folder: 'globos', file: 'globo', total: 11 }
  ];
  const catalogGrid = $('#catalogGrid');
  const catalogProducts = catalogGroups.flatMap(group => Array.from({ length: group.total }, (_, index) => ({
    ...group,
    number: index + 1,
    src: `imagenes/${group.folder}/${group.file}-${index + 1}.jpeg`
  })));
  if (catalogGrid) {
    catalogGrid.innerHTML = catalogProducts.map(product => `<article class="catalog-item" data-category="${product.key}"><button class="catalog-image" type="button" aria-label="Ampliar ${product.name} ${product.number}"><img src="${product.src}" alt="${product.name} ${product.number}" loading="lazy"><span class="catalog-zoom" aria-hidden="true">Ver detalle</span></button><div class="catalog-info"><span>${product.label}</span><strong>${product.name} ${product.number}</strong><label class="catalog-quantity">Cantidad<input type="number" min="1" max="999" value="1" inputmode="numeric" aria-label="Cantidad de ${product.name} ${product.number}"></label><button type="button" data-catalog-quote="${product.label}" data-product-name="${product.name} ${product.number}" data-product-image="${product.src}">Agregar a cotización</button></div></article>`).join('');

    $$('.catalog-image', catalogGrid).forEach(button => button.addEventListener('click', () => {
      const visibleImages = $$('.catalog-item:not([hidden]) img', catalogGrid);
      const image = $('img', button);
      galleryImages = visibleImages;
      galleryIndex = visibleImages.indexOf(image);
      $('#imgGrande').src = image.src;
      $('#imgGrande').alt = image.alt;
      openOverlay($('#visor'));
    }));
    $$('[data-catalog-quote]', catalogGrid).forEach(button => button.addEventListener('click', () => {
      const product = button.dataset.catalogQuote;
      const quantity = Math.max(1, Number($('.catalog-quantity input', button.closest('.catalog-item')).value) || 1);
      setQuoteProduct(product, button.dataset.productImage, button.dataset.productName, quantity);
      openOverlay($('#modalCotizacion'));
    }));
  }

  $$('[data-catalog-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.catalogFilter;
    $$('[data-catalog-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    $$('.catalog-item', catalogGrid).forEach(item => { item.hidden = filter !== 'todos' && item.dataset.category !== filter; });
    const group = catalogGroups.find(item => item.key === filter);
    $('#catalogStatus').textContent = filter === 'todos' ? `Mostrando ${catalogProducts.length} productos disponibles.` : `Mostrando ${group.total} opciones de ${group.label.toLowerCase()}.`;
  }));
  function changeImage(direction) {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex + direction + galleryImages.length) % galleryImages.length;
    $('#imgGrande').src = galleryImages[galleryIndex].src;
    $('#imgGrande').alt = galleryImages[galleryIndex].alt;
  }
  $('.viewer-prev')?.addEventListener('click', () => changeImage(-1));
  $('.viewer-next')?.addEventListener('click', () => changeImage(1));

  $$('[data-open-quote]').forEach(button => button.addEventListener('click', () => openOverlay($('#modalCotizacion'))));
  function setQuoteProduct(product, image, displayName = product, quantity = 1) {
    const option = $$('#producto option').find(item => item.value.toLowerCase() === product.toLowerCase() || item.textContent.toLowerCase().includes(product.split(' ')[0].toLowerCase()));
    if (option) $('#producto').value = option.value;
    $('#cantidad').value = quantity;
    $('#productoSeleccionado').value = `${displayName} · Cantidad: ${quantity}`;
    $('#imagenProducto').value = new URL(image, window.location.href).href;
    $('#quoteProductImage').src = image;
    $('#quoteProductImage').alt = displayName;
    $('#quoteProductName').textContent = displayName;
    $('#quoteProductQuantity').textContent = `${quantity} pieza${quantity === 1 ? '' : 's'}`;
    $('#quoteSelection').hidden = false;
    $$('[data-quote-product]').forEach(item => {
      const selected = item.dataset.quoteProduct === option?.value;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
      $('small', item).textContent = selected ? 'Elegido ✓' : 'Seleccionar';
    });
  }
  $$('[data-quote-product]').forEach(button => button.addEventListener('click', () => setQuoteProduct(button.dataset.quoteProduct, button.dataset.quoteImage)));
  $('#producto')?.addEventListener('change', event => {
    const button = $$('[data-quote-product]').find(item => item.dataset.quoteProduct === event.target.value);
    if (button) setQuoteProduct(button.dataset.quoteProduct, button.dataset.quoteImage, button.dataset.quoteProduct, Math.max(1, Number($('#cantidad').value) || 1));
  });
  $('#cantidad')?.addEventListener('input', event => {
    const quantity = Math.max(1, Number(event.target.value) || 1);
    if (!$('#quoteSelection').hidden) {
      $('#quoteProductQuantity').textContent = `${quantity} pieza${quantity === 1 ? '' : 's'}`;
      const name = $('#quoteProductName').textContent;
      $('#productoSeleccionado').value = `${name} · Cantidad: ${quantity}`;
    }
  });
  $('#clearQuoteSelection')?.addEventListener('click', () => {
    $('#quoteSelection').hidden = true;
    $('#productoSeleccionado').value = '';
    $('#imagenProducto').value = '';
    $('#producto').value = '';
    $$('[data-quote-product]').forEach(item => { item.classList.remove('selected'); item.setAttribute('aria-pressed', 'false'); $('small', item).textContent = 'Seleccionar'; });
  });

  const fileInput = $('#archivoDiseno');
  const filePreview = $('#filePreview');
  const previewImage = $('#filePreviewImage');
  let filePreviewUrl = '';
  function clearAttachedFile() {
    fileInput.value = '';
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    filePreviewUrl = '';
    previewImage.removeAttribute('src');
    filePreview.hidden = true;
    $('#filePrompt').textContent = 'Seleccionar archivo';
    $('#fileName').textContent = 'También puedes arrastrarlo aquí';
  }
  fileInput?.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) { clearAttachedFile(); return; }
    if (file.size > 5 * 1024 * 1024) {
      clearAttachedFile();
      $('#formStatus').textContent = 'El archivo supera los 5 MB. Selecciona una imagen más ligera.';
      return;
    }
    $('#formStatus').textContent = '';
    $('#filePrompt').textContent = 'Diseño adjunto';
    $('#fileName').textContent = file.name;
    filePreview.hidden = !file.type.startsWith('image/');
    if (file.type.startsWith('image/')) {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
      filePreviewUrl = URL.createObjectURL(file);
      previewImage.src = filePreviewUrl;
    }
  });
  $('#removeFile')?.addEventListener('click', clearAttachedFile);
  $('#btnPoster')?.addEventListener('click', () => openOverlay($('#visorPoster')));
  $('#btnVideo')?.addEventListener('click', async () => { openOverlay($('#visorVideo')); try { await $('#videoGrande').play(); } catch (_) {} });
  overlays.forEach(overlay => {
    overlay.addEventListener('click', event => { if (event.target === overlay || event.target.closest('[data-close]')) closeOverlay(overlay); });
  });

  const whatsappMessage = '¡Hola! Me gustaría recibir información sobre los productos promocionales y servicios de personalización de NEXIUM Sublimación.';
  $$('[data-whatsapp]').forEach(link => link.href = `https://wa.me/525610066522?text=${encodeURIComponent(whatsappMessage)}`);

  const themeButton = $('#btnDarkMode');
  const savedTheme = localStorage.getItem('nexium-theme');
  if (savedTheme === 'dark') document.body.classList.add('nexium-dark');
  function updateThemeButton() { const dark = document.body.classList.contains('nexium-dark'); themeButton.textContent = dark ? '☀️' : '🌙'; themeButton.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro'); }
  updateThemeButton();
  themeButton.addEventListener('click', () => { document.body.classList.toggle('nexium-dark'); localStorage.setItem('nexium-theme', document.body.classList.contains('nexium-dark') ? 'dark' : 'light'); updateThemeButton(); });

  const progress = $('#pageProgress');
  const backToTop = $('#backToTop');
  const header = $('.header');
  function updateScrollUI() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const amount = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
    progress.style.transform = `scaleX(${amount})`;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 650);
  }
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  updateScrollUI();

  const revealTargets = $$('.trust-item, .producto-card, .catalog-heading, .catalog-filters, .catalog-item, .experience-copy, .experience-collage, .cta-inner, .contacto-box');
  revealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
  });
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -35px' });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('revealed'));
  }

  const form = $('#formCotizacion');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submit = $('#btnCotizar');
    const status = $('#formStatus');
    const description = $('#descripcion');
    const originalDescription = description.value.trim();
    const selectedDetails = $('#productoSeleccionado').value.trim();
    const selectedImage = $('#imagenProducto').value.trim();
    if (selectedDetails) description.value = [`Selección del catálogo: ${selectedDetails}`, `Imagen de referencia: ${selectedImage}`, originalDescription].filter(Boolean).join('\n\n');
    submit.disabled = true; status.textContent = 'Enviando…';
    if (!window.emailjs) { description.value = originalDescription; status.textContent = 'No fue posible conectar con el servicio de correo. Escríbenos por WhatsApp.'; submit.disabled = false; return; }
    try {
      emailjs.init({ publicKey: '6IL4uM1rVoBl9qgrB' });
      await emailjs.sendForm('service_e8slvmi', 'template_ams0res', form);
      status.textContent = 'Solicitud enviada correctamente.';
      form.reset(); clearAttachedFile(); $('#quoteSelection').hidden = true; setTimeout(() => closeOverlay($('#modalCotizacion')), 1200);
    } catch (_) { description.value = originalDescription; status.textContent = 'No se pudo enviar. Intenta de nuevo o contáctanos por WhatsApp.'; }
    finally { submit.disabled = false; }
  });

  document.addEventListener('keydown', event => {
    const open = overlays.find(item => !item.hidden);
    if (event.key === 'Escape' && open) closeOverlay(open);
    if (open?.id === 'visor' && event.key === 'ArrowLeft') changeImage(-1);
    if (open?.id === 'visor' && event.key === 'ArrowRight') changeImage(1);
  });
})();

