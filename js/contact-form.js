document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Use FormSubmit (no-code solution)
    setupFormSubmit();

    // Prepare EmailJS alternative (can be enabled if preferred)
    prepareEmailJS();
    
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
      // We don't prevent default here, let the form submit to FormSubmit
      
      // Create submit button reference
      const submitButton = contactForm.querySelector('.submit-button');
      
      // Create a temporary "sending" message
      submitButton.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Add animation to form
      contactForm.classList.add('submitting');
      
      // Add particle effects to form
      createSubmitParticles();
      
      // Create a timeout to reset button if submission takes too long
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
        contactForm.classList.remove('submitting');
      }, 5000);
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
  
  // Function to show response message (used by redirect page)
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
        contactForm.reset();
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
  
  // Configure form to use FormSubmit
  function setupFormSubmit() {
    if (contactForm) {
      const userEmail = 'reyhaneh.aghayousefi@aalto.fi'; 
      contactForm.action = `https://formsubmit.co/${userEmail}`;
      contactForm.method = 'POST';
      
      // Add required hidden fields for FormSubmit
      addHiddenField('_next', window.location.href + '?submitted=true'); // Redirect with success parameter
      addHiddenField('_subject', 'New message from your website');
      addHiddenField('_captcha', 'false');
      
      // Add honeypot field for spam protection
      const honeypotField = document.createElement('input');
      honeypotField.type = 'text';
      honeypotField.name = '_honey';
      honeypotField.style.display = 'none';
      contactForm.appendChild(honeypotField);
    }
  }
  
  // Prepare EmailJS as an alternative
  function prepareEmailJS() {
    // This function prepares for EmailJS integration
    // Uncomment and provide your EmailJS details to use this instead of FormSubmit

    /* 
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
      // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
      emailjs.init('YOUR_USER_ID');
      
      // Replace the form submission with EmailJS
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
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
          name: name,
          email: email,
          subject: subject,
          message: message
        };
        
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual values
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
          .then(function(response) {
            // Success
            submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
            submitButton.disabled = false;
            contactForm.classList.remove('submitting');
            showFormResponse('Message sent successfully! I will get back to you soon.', true);
          }, function(error) {
            // Error
            submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
            submitButton.disabled = false;
            contactForm.classList.remove('submitting');
            showFormResponse('Failed to send message. Please try again later.', false);
            console.error('EmailJS error:', error);
          });
      }, { capture: true });
    }
    */
  }
  
  // Helper function to add hidden fields
  function addHiddenField(name, value) {
    const field = document.createElement('input');
    field.type = 'hidden';
    field.name = name;
    field.value = value;
    contactForm.appendChild(field);
  }
  
  // Check if the page was loaded after form submission
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('submitted')) {
    // Show success message
    showFormResponse('Message sent successfully! I will get back to you soon.', true);
    
    // Clean up the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}); 