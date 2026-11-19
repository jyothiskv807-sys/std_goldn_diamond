/**
 * Standard Gold & Diamonds (SFJ) - Luxury Storefront Main Interactive Script
 * Payyavoor, Kannur, Kerala (670633)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. MOBILE DRAWER MENU ====================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenuDrawer || !mobileMenuBackdrop) return;
    mobileMenuDrawer.classList.remove('translate-x-full');
    mobileMenuBackdrop.classList.remove('hidden');
    setTimeout(() => {
      mobileMenuBackdrop.classList.add('opacity-100');
      mobileMenuBackdrop.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer || !mobileMenuBackdrop) return;
    mobileMenuDrawer.classList.add('translate-x-full');
    mobileMenuBackdrop.classList.remove('opacity-100');
    mobileMenuBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileMenuBackdrop.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // ==================== 2. DUAL-TIER HEADER SCROLL BEHAVIOR ====================
  const mainHeader = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (!mainHeader) return;
    if (window.scrollY > 40) {
      mainHeader.classList.add('shadow-2xl', 'backdrop-blur-md');
    } else {
      mainHeader.classList.remove('shadow-2xl');
    }
  });

  // ==================== 3. LIVE SEARCH BAR & INSTANT DROPDOWN (DESKTOP & MOBILE) ====================
  const catalogueData = [
    { name: "Kerala Heritage Kasumala", category: "916 Gold", image: "assets/images/gold-jewellery.jpg", target: "#new-arrivals" },
    { name: "Solitaire Cushion Diamond Ring", category: "Certified Diamonds", image: "assets/images/solitaire-ring.jpg", target: "#new-arrivals" },
    { name: "Malabar Antique Temple Choker", category: "916 Gold", image: "assets/images/temple-choker.jpg", target: "#new-arrivals" },
    { name: "Mullamottu Jasmine Mala", category: "Bridal Jewellery", image: "assets/images/mullamottu-mala.jpg", target: "#new-arrivals" },
    { name: "Handcrafted 22K Gold Bangles", category: "916 Gold", image: "assets/images/bangles.jpg", target: "#categories" },
    { name: "Royal Malabar Bridal Trousseau", category: "Bridal Suite", image: "assets/images/prefooter-bride.jpg", target: "#curated" },
    { name: "Antique Gold Jhumkas & Earrings", category: "916 Gold", image: "assets/images/gold-jhumkas.jpg", target: "#categories" },
    { name: "Brilliant Solitaire Diamond Pendant", category: "Certified Diamonds", image: "assets/images/diamond-pendant.jpg", target: "#curated" },
    { name: "Custom Made-to-Order Heirlooms", category: "Bespoke Styling", image: "assets/images/showroom-portrait.jpg", target: "#story-banner" }
  ];

  function setupSearch(inputEl, dropdownEl, listEl) {
    if (!inputEl || !dropdownEl || !listEl) return;

    inputEl.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdownEl.classList.add('hidden', 'opacity-0');
        dropdownEl.classList.remove('opacity-100');
        return;
      }

      const matches = catalogueData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );

      listEl.innerHTML = '';

      if (matches.length === 0) {
        listEl.innerHTML = `
          <div class="p-4 text-center text-xs text-[#EDE8DC]/60 font-light">
            No matching jewellery found. <br>
            <a href="https://wa.me/919447251916?text=Hi%2C%20I%20am%20looking%20for%20${encodeURIComponent(query)}%20at%20Standard%20Gold%20Payyavoor" target="_blank" class="text-royalGold hover:underline font-medium block mt-1">
              Ask on WhatsApp about "${query}" →
            </a>
          </div>
        `;
      } else {
        matches.forEach(item => {
          const itemEl = document.createElement('a');
          itemEl.href = item.target;
          itemEl.className = 'flex items-center gap-3 p-3 rounded-lg hover:bg-[#1f1b16] transition-colors border-b border-[#3A3320]/40 last:border-b-0 group';
          itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-md object-cover border border-royalGold/30 group-hover:scale-105 transition-transform flex-shrink-0">
            <div class="flex-1 min-w-0">
              <h5 class="text-xs font-serif font-bold text-softWhite group-hover:text-lightGold truncate transition-colors">${item.name}</h5>
              <span class="text-[10px] text-royalGold/90 font-medium block">${item.category}</span>
            </div>
            <span class="text-[10px] font-medium text-lightGold/80 group-hover:translate-x-1 transition-transform flex-shrink-0">View →</span>
          `;
          itemEl.addEventListener('click', () => {
            dropdownEl.classList.add('hidden', 'opacity-0');
            inputEl.value = '';
          });
          listEl.appendChild(itemEl);
        });
      }

      dropdownEl.classList.remove('hidden');
      setTimeout(() => {
        dropdownEl.classList.remove('opacity-0');
        dropdownEl.classList.add('opacity-100');
      }, 10);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.classList.add('hidden', 'opacity-0');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownEl.classList.add('hidden', 'opacity-0');
      }
    });
  }

  setupSearch(
    document.getElementById('headerSearchInput'),
    document.getElementById('searchDropdown'),
    document.getElementById('searchResultsList')
  );
  setupSearch(
    document.getElementById('mobileSearchInput'),
    document.getElementById('mobileSearchDropdown'),
    document.getElementById('mobileSearchResultsList')
  );

  // ==================== 4. CURATED CATEGORY FILTER TABS (#curated) ====================
  const tabButtons = document.querySelectorAll('.curated-tab-btn');
  const tabPanels = document.querySelectorAll('.curated-tab-panel');

  function activateTab(targetTabId) {
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === targetTabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === `tab-panel-${targetTabId}`) {
        panel.classList.remove('hidden');
        setTimeout(() => {
          panel.classList.remove('opacity-0');
          panel.classList.add('opacity-100');
        }, 10);
      } else {
        panel.classList.add('hidden', 'opacity-0');
        panel.classList.remove('opacity-100');
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      activateTab(target);
    });
  });

  // Secondary nav and category tile link triggers
  const categoryTriggers = document.querySelectorAll('[data-switch-tab]');
  categoryTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetTab = trigger.getAttribute('data-switch-tab');
      if (targetTab) {
        activateTab(targetTab);
      }
    });
  });

  // ==================== 5. TESTIMONIAL CAROUSEL (#testimonials) ====================
  const carouselContainer = document.getElementById('testimonialCarousel');
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  const totalSlides = 3;

  function goToSlide(slideIndex) {
    if (!carouselContainer) return;
    currentSlide = (slideIndex + totalSlides) % totalSlides;
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('bg-royalGold', 'w-7');
        dot.classList.remove('bg-[#3A3320]', 'w-2.5');
      } else {
        dot.classList.remove('bg-royalGold', 'w-7');
        dot.classList.add('bg-[#3A3320]', 'w-2.5');
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slide = parseInt(dot.getAttribute('data-slide') || '0', 10);
      goToSlide(slide);
    });
  });

  // Auto advance testimonial every 6 seconds
  let testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
  const testimonialSection = document.getElementById('testimonials');
  if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialSection.addEventListener('mouseleave', () => {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    });
  }

  // ==================== 6. ONE-CLICK PHONE NUMBER COPY ====================
  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('09447251916').then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-[#D4AF37] font-semibold text-xs">Copied +91 94472 51916!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      });
    });
  });

  // ==================== 8. SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
