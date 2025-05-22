document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Switch to EmailJS instead of FormSubmit
    setupEmailJS();
    
    // Add animation to form elements on focus
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      // Add focus effects
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
    
    // Show a message when form is submitted
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form submission - we'll handle it with EmailJS
      
      // Create submit button reference
      const submitButton = contactForm.querySelector('.submit-button');
      
      // Create a temporary "sending" message
      submitButton.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Add animation to form
      contactForm.classList.add('submitting');
      
      // Add particle effects to form
      createSubmitParticles();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Prepare template parameters
      const templateParams = {
        from_name: name,
        reply_to: email,
        subject: subject,
        message: message
      };
      
      // Send email using EmailJS
      emailjs.send('service_s5ja5pa', 'template_7eq2f1a', templateParams)
        .then(function(response) {
          // Success
          submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
          submitButton.disabled = false;
          contactForm.classList.remove('submitting');
          showFormResponse('Message sent successfully! I will get back to you soon.', true);
          contactForm.reset();
        }, function(error) {
          // Error
          submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
          submitButton.disabled = false;
          contactForm.classList.remove('submitting');
          showFormResponse('Failed to send message. Please try emailing me directly at reyhaneh.aghayousefi@outlook.com', false);
          console.error('EmailJS error:', error);
        });
    });
  }
  
  // Create particle effects when form is submitted
  function createSubmitParticles() {
    const formRect = contactForm.getBoundingClientRect();
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'form-particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.inset = '0';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    contactForm.style.position = 'relative';
    contactForm.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'form-particle';
      particle.style.position = 'absolute';
      particle.style.width = `${4 + Math.random() * 6}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = 'var(--primary-light)';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.8';
      particle.style.boxShadow = '0 0 10px var(--primary-light)';
      
      // Random starting position at the bottom
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = '100%';
      
      // Random animation
      const duration = 1 + Math.random() * 2;
      const delay = Math.random() * 0.5;
      
      particle.style.animation = `formParticleFloat ${duration}s ease-out ${delay}s forwards`;
      
      particlesContainer.appendChild(particle);
    }
    
    // Remove particles after animations complete
    setTimeout(() => {
      if (particlesContainer.parentNode === contactForm) {
        contactForm.removeChild(particlesContainer);
      }
    }, 3500);
  }
  
  // Function to show response message
  function showFormResponse(message, isSuccess) {
    // Check if response element exists, if not create it
    let responseEl = document.querySelector('.form-response');
    if (!responseEl) {
      responseEl = document.createElement('div');
      responseEl.className = 'form-response';
      contactForm.appendChild(responseEl);
    }
    
    // Set message and style
    responseEl.textContent = message;
    
    // Add success or error class for additional styling
    if (isSuccess) {
      responseEl.classList.add('success');
      responseEl.classList.remove('error');
      
      // Add success icon
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-check-circle';
      icon.style.marginRight = '8px';
      responseEl.prepend(icon);
      
      // Reset form with animation
      setTimeout(() => {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
          input.classList.add('reset-animation');
          setTimeout(() => {
            input.classList.remove('reset-animation');
          }, 500);
        });
      }, 1000);
    } else {
      responseEl.classList.add('error');
      responseEl.classList.remove('success');
      
      // Add error icon
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-exclamation-circle';
      icon.style.marginRight = '8px';
      responseEl.prepend(icon);
    }
    
    // Scroll to response message
    responseEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Animate the response message
    responseEl.style.opacity = '0';
    responseEl.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      responseEl.style.opacity = '1';
      responseEl.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove message after some time if it's a success message
    if (isSuccess) {
      setTimeout(() => {
        responseEl.style.opacity = '0';
        responseEl.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (responseEl.parentNode === contactForm) {
            contactForm.removeChild(responseEl);
          }
        }, 500);
      }, 5000);
    }
  }
  
  // Configure EmailJS
  function setupEmailJS() {
    // Load EmailJS script if it's not already loaded
    if (!window.emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = initEmailJS;
    } else {
      initEmailJS();
    }
    
    function initEmailJS() {
      // Initialize EmailJS with your user ID
      emailjs.init('CLRnqnXPw_2Z9K5Ma'); // Replace with your actual EmailJS user ID
    }
  }
}); 