/**
 * Standard Gold & Diamonds (SFJ) - Main Interactive Script
 * Payyavoor, Kannur, Kerala
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenuDrawer.classList.remove('translate-x-full');
    mobileMenuBackdrop.classList.remove('hidden');
    setTimeout(() => {
      mobileMenuBackdrop.classList.add('opacity-100');
      mobileMenuBackdrop.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
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

  // 2. Navbar Scroll Behavior
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-[#0A0A0A]/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-[#D4AF37]/20');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-[#0A0A0A]/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-[#D4AF37]/20');
      header.classList.add('bg-transparent');
    }
  });

  // 3. Active Nav Highlighting
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[#F1D77A]', 'border-b-2', 'border-[#D4AF37]');
            link.classList.remove('text-[#EDE8DC]/80');
          } else {
            link.classList.remove('text-[#F1D77A]', 'border-b-2', 'border-[#D4AF37]');
            link.classList.add('text-[#EDE8DC]/80');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. Reveal Animations on Scroll
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
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Horizontal Spotlight Scroll
  const spotlightContainer = document.getElementById('spotlightScrollContainer');
  const scrollLeftBtn = document.getElementById('scrollSpotlightLeft');
  const scrollRightBtn = document.getElementById('scrollSpotlightRight');

  if (spotlightContainer && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      spotlightContainer.scrollBy({ left: -320, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
      spotlightContainer.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // 7. Malayalam Language Accent Toggle
  const langToggleBtn = document.getElementById('langToggleBtn');
  const mlElements = document.querySelectorAll('.lang-ml');
  let isMalayalamActive = false;

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      isMalayalamActive = !isMalayalamActive;
      mlElements.forEach(el => {
        if (isMalayalamActive) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
      langToggleBtn.textContent = isMalayalamActive ? 'EN' : 'മലയാളം';
      langToggleBtn.setAttribute('title', isMalayalamActive ? 'Switch to English' : 'മലയാളത്തിലേക്ക് മാറ്റുക');
    });
  }

  // 9. Copy Phone Number Feature
  const copyPhoneBtns = document.querySelectorAll('.copy-phone-btn');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('09447251916').then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-[#D4AF37] font-medium text-xs">Copied +91 94472 51916!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      });
    });
  });
});
