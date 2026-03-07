// Wedding date: July 11, 2026 at 14:00 CEST
const weddingDate = new Date('2026-07-11T14:00:00+02:00');

// Animated Countdown Timer with smooth number transitions
function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    animateNumber('days', 0);
    animateNumber('hours', 0);
    animateNumber('minutes', 0);
    animateNumber('seconds', 0);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  animateNumber('days', days);
  animateNumber('hours', hours);
  animateNumber('minutes', minutes);
  animateNumber('seconds', seconds);
}

// Animate number change with a subtle scale effect
function animateNumber(id, newValue) {
  const el = document.getElementById(id);
  if (!el) return;
  
  const currentValue = el.textContent;
  if (currentValue !== String(newValue)) {
    el.style.transform = 'scale(1.1)';
    el.style.opacity = '0.7';
    setTimeout(() => {
      el.textContent = newValue;
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
    }, 100);
  }
}

// Run countdown if elements exist
if (document.getElementById('countdown')) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.content-section, .faq-item, .gift-intro, .note-box, .transport-option');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

// Floating Petals Animation (Homepage only)
function initFloatingPetals() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const petalContainer = document.createElement('div');
  petalContainer.className = 'petal-container';
  hero.appendChild(petalContainer);

  // Create petals periodically
  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Random starting position
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    
    // Random petal shape (heart or simple petal)
    if (Math.random() > 0.5) {
      petal.innerHTML = '&#10084;'; // Heart
      petal.style.fontSize = (Math.random() * 8 + 8) + 'px';
    } else {
      petal.innerHTML = '&#10047;'; // Flower
      petal.style.fontSize = (Math.random() * 10 + 10) + 'px';
    }
    
    petalContainer.appendChild(petal);
    
    // Remove petal after animation
    setTimeout(() => {
      petal.remove();
    }, 7000);
  }

  // Create petals at intervals
  setInterval(createPetal, 800);
  
  // Create initial petals
  for (let i = 0; i < 5; i++) {
    setTimeout(createPetal, i * 300);
  }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});
