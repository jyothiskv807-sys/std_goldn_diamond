/**
 * Standard Gold & Diamonds (SFJ) - Luxury Storefront Main Interactive Script
 * Payyavoor, Kannur, Kerala (670633)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 0. LUXURY BRAND PRELOADER ====================
  const brandPreloader = document.getElementById('brandPreloader');
  const preloaderContent = document.getElementById('preloaderContent');

  if (brandPreloader && preloaderContent) {
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      preloaderContent.classList.remove('scale-95', 'opacity-0');
      preloaderContent.classList.add('scale-100', 'opacity-100');
    });

    const startTime = Date.now();
    const minDuration = 1000;
    const maxTimeout = 2500;

    let dismissed = false;
    function dismissPreloader() {
      if (dismissed) return;
      dismissed = true;
      brandPreloader.classList.add('opacity-0', 'pointer-events-none');
      brandPreloader.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        brandPreloader.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 400);
    }

    if (document.readyState === 'complete') {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(dismissPreloader, remaining);
    } else {
      window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);
        setTimeout(dismissPreloader, remaining);
      });
    }

    setTimeout(dismissPreloader, maxTimeout);
  }

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

  // ==================== 2. HEADER SCROLL SHADOW ====================
  const mainHeader = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (!mainHeader) return;
    if (window.scrollY > 20) {
      mainHeader.classList.add('shadow-md');
    } else {
      mainHeader.classList.remove('shadow-md');
    }
  }, { passive: true });

  // ==================== 3. TESTIMONIAL CAROUSEL (#testimonials) ====================
  const carouselContainer = document.getElementById('testimonialCarousel');
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;

  function goToSlide(slideIndex) {
    if (!carouselContainer) return;
    const slides = carouselContainer.children;
    const totalSlides = slides.length || 2;
    currentSlide = (slideIndex + totalSlides) % totalSlides;
    
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('bg-[#D4AF37]', 'w-7');
        dot.classList.remove('bg-[#3A3320]', 'w-2.5');
      } else {
        dot.classList.remove('bg-[#D4AF37]', 'w-7');
        dot.classList.add('bg-[#3A3320]', 'w-2.5');
      }
    });
  }

  let testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 7000);

  function resetTestimonialTimer() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 7000);
  }

  window.sfjGoToSlide = (idx) => { goToSlide(idx); resetTestimonialTimer(); };
  window.sfjPrevSlide = () => { goToSlide(currentSlide - 1); resetTestimonialTimer(); };
  window.sfjNextSlide = () => { goToSlide(currentSlide + 1); resetTestimonialTimer(); };

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.sfjPrevSlide();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.sfjNextSlide();
    });
  }
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const slide = parseInt(dot.getAttribute('data-slide') || '0', 10);
      window.sfjGoToSlide(slide);
    });
  });

  // Touch Swipe Support for Mobile
  if (carouselContainer) {
    let touchStartX = 0;
    let touchEndX = 0;
    carouselContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    carouselContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          window.sfjNextSlide();
        } else {
          window.sfjPrevSlide();
        }
      }
    }, { passive: true });
  }

  const testimonialSection = document.getElementById('testimonials');
  if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialSection.addEventListener('mouseleave', resetTestimonialTimer);
  }

  // ==================== 4. ONE-CLICK PHONE NUMBER COPY ====================
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

  // ==================== 5. SCROLL REVEAL ANIMATIONS ====================
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
