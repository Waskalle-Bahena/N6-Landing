// N6 Solutions Modern Landing Page JavaScript
// Smooth scroll animations and interactions

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  // Scroll animations using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }
  });

  // Form submission handling
  const contactForm = document.getElementById('frm-contact');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      
      // Simple validation
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      if (!name || !email || !message) {
        swal({
          title: 'Error',
          text: 'Please fill in all required fields.',
          icon: 'error',
          button: 'OK'
        });
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        swal({
          title: 'Error',
          text: 'Please enter a valid email address.',
          icon: 'error',
          button: 'OK'
        });
        return;
      }
      
      // Submit form via AJAX
      fetch('./Functions/sendTelegram.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          swal({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            button: 'OK'
          });
          contactForm.reset();
        } else {
          swal({
            title: 'Error',
            text: 'There was an error sending your message. Please try again.',
            icon: 'error',
            button: 'OK'
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        swal({
          title: 'Error',
          text: 'There was an error sending your message. Please try again.',
          icon: 'error',
          button: 'OK'
        });
      });
    });
  }

  // Add subtle parallax effect to hero section
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Add hover effect to cards with 3D tilt
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Add typing effect to hero headline (optional enhancement)
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Uncomment below to enable typing effect
    // typeWriterEffect(heroTitle, originalText);
  }
});

// Typing effect function (optional)
function typeWriterEffect(element, htmlContent) {
  element.innerHTML = '';
  let i = 0;
  const text = htmlContent.replace(/<[^>]*>/g, '');
  const gradientSpan = '<span class="gradient-text">Digital Platforms</span>';
  
  function type() {
    if (i < text.length) {
      if (text.substring(i, i + 16) === 'Digital Platforms') {
        element.innerHTML = text.substring(0, i) + gradientSpan;
        i += 16;
      } else {
        element.innerHTML = text.substring(0, i + 1);
        i++;
      }
      setTimeout(type, 50);
    }
  }
  
  type();
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
  // Any scroll-dependent logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);
