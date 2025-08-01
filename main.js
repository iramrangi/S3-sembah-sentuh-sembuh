document.addEventListener('DOMContentLoaded', () => {
  // Fade in hero section on page load
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('visible');
    }, 100);
  }

  // Fade in elements on scroll
  const faders = document.querySelectorAll('.fade-scroll');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.toggleMenu = function() {
    mobileMenu.classList.toggle('open');
  };

  hamburger.addEventListener('click', () => {
    toggleMenu();
  });

  // Testimonial slider
  const testimonialContainer = document.getElementById('testimonial-container');
  const testimonials = testimonialContainer.children;
  let currentIndex = 0;
  const total = testimonials.length;

  function showTestimonials(index) {
    const width = testimonials[0].offsetWidth + 24; // width + margin
    testimonialContainer.style.transform = `translateX(-${width * index}px)`;
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % total;
    showTestimonials(currentIndex);
  }

  // Show initial testimonials
  showTestimonials(currentIndex);

  // Auto rotate every 5 seconds
  setInterval(nextTestimonial, 5000);

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetID = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetID);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // offset for fixed header
          behavior: 'smooth'
        });
      }
      // Close mobile menu if open
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
});
