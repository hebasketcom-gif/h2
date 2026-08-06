/**
 * Dr. Esha Kumari - Luxury Medical Portfolio
 * Vanilla JavaScript (100% Client-side, Compatible with GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCustomCursor();
  initHeaderAndNav();
  initHeroParticles();
  initTypingAnimation();
  initScrollAnimations();
  initCounterAnimations();
  initCardTiltEffect();
  initGalleryLightbox();
  initFloatingProfileBar();
});

/* ==========================================
   1. Theme Switcher (Dark / Light)
   ========================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  // Check saved theme or systemic preference
  const savedTheme = localStorage.getItem('dr_esha_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dr_esha_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  if (theme === 'dark') {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  } else {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/* ==========================================
   2. Custom Cursor
   ========================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const circle = document.querySelector('.custom-cursor-circle');
  if (!dot || !circle) return;

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateCircle() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    requestAnimationFrame(animateCircle);
  }
  animateCircle();

  // Add hover class on interactive elements
  const interactives = document.querySelectorAll('a, button, .glass-card, .gallery-item, input');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering-interactive'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-interactive'));
  });
}

/* ==========================================
   3. Header, Navigation & Scroll Progress
   ========================================== */
function initHeaderAndNav() {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Window Scroll handling
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const isOpen = navMenu.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }
}

/* ==========================================
   4. Hero Particles Canvas (Medical / DNA Dots)
   ========================================== */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = Math.min(Math.floor(width / 20), 65);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(2, 132, 199, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(13, 148, 136, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================
   5. Typing Animation
   ========================================== */
function initTypingAnimation() {
  const element = document.getElementById('typing-text');
  if (!element) return;

  const titles = [
    "Dentist",
    "MSc Clinical Embryology",
    "Aspiring Embryologist",
    "Assisted Reproductive Specialist",
    "IVF & PGT Research Enthusiast"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      element.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      element.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================
   6. Scroll Reveal Animations
   ========================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in, .reveal-blur'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   7. Counter Animation for Achievements
   ========================================== */
function initCounterAnimations() {
  const counterElements = document.querySelectorAll('.counter-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = count + suffix;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const section = document.getElementById('achievements');
  if (section) observer.observe(section);
}

/* ==========================================
   8. 3D Card Tilt Effect
   ========================================== */
function initCardTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================
   9. Gallery Lightbox Modal
   ========================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!modal || !modalImg || !closeBtn) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption')?.textContent || '';
      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = caption;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================
   10. Sticky Floating Profile Indicator Bar
   ========================================== */
function initFloatingProfileBar() {
  const profileBar = document.getElementById('floating-profile-bar');
  if (!profileBar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      profileBar.classList.add('visible');
    } else {
      profileBar.classList.remove('visible');
    }
  });
}
