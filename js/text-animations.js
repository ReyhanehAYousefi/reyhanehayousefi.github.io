document.addEventListener('DOMContentLoaded', () => {
  // Split text into individual characters for animation
  function splitTextForAnimation() {
    const elementsToAnimate = document.querySelectorAll('.animate-chars');
    
    elementsToAnimate.forEach(element => {
      const text = element.textContent.trim();
      let newHTML = '';
      
      // Split text and wrap each character
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          newHTML += ' ';
        } else {
          newHTML += `<span class="char-animation" style="animation-delay: ${i * 0.05}s;">${text[i]}</span>`;
        }
      }
      
      element.innerHTML = newHTML;
    });
  }
  
  // Create animated hero text
  function createHeroText() {
    const welcomeSection = document.querySelector('.welcome-section');
    if (!welcomeSection) return;
    
    // Create hero text container if it doesn't exist
    let heroText = welcomeSection.querySelector('.hero-text');
    if (!heroText) {
      heroText = document.createElement('div');
      heroText.className = 'hero-text';
      welcomeSection.appendChild(heroText);
    }
    
    // Create text wrapper
    const textWrapper = document.createElement('div');
    textWrapper.className = 'text-wrapper';
    heroText.appendChild(textWrapper);
    
    // Define phrases to rotate
    const phrases = [
      "Machine Learning Specialist",
      "Data Science Enthusiast",
      "AI Researcher",
      "Problem Solver"
    ];
    
    // Create and append phrases
    phrases.forEach((phrase, index) => {
      const phraseElement = document.createElement('span');
      phraseElement.className = 'animated-phrase';
      phraseElement.style.opacity = index === 0 ? '1' : '0';
      phraseElement.style.transform = index === 0 ? 'translateY(0)' : 'translateY(20px)';
      
      // Split phrase into letters for animation
      let lettersHTML = '';
      for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === ' ') {
          lettersHTML += '<span class="letter space">&nbsp;</span>';
        } else {
          lettersHTML += `<span class="letter">${phrase[i]}</span>`;
        }
      }
      
      phraseElement.innerHTML = lettersHTML;
      textWrapper.appendChild(phraseElement);
    });
    
    // Start the animation
    animateHeroText(phrases.length);
  }
  
  // Animate hero text phrases
  function animateHeroText(phraseCount) {
    let currentPhrase = 0;
    const phrases = document.querySelectorAll('.animated-phrase');
    
    // Initial animation for first phrase
    animateLettersIn(phrases[0]);
    
    // Set interval to rotate phrases
    setInterval(() => {
      // Animate current phrase out
      animateLettersOut(phrases[currentPhrase]);
      
      // Update current phrase index
      currentPhrase = (currentPhrase + 1) % phraseCount;
      
      // Delay before animating next phrase in
      setTimeout(() => {
        phrases.forEach(p => {
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
        });
        
        // Animate next phrase in
        animateLettersIn(phrases[currentPhrase]);
      }, 750);
    }, 4000);
  }
  
  // Animate letters in
  function animateLettersIn(phrase) {
    phrase.style.opacity = '1';
    phrase.style.transform = 'translateY(0)';
    
    const letters = phrase.querySelectorAll('.letter');
    letters.forEach((letter, i) => {
      letter.style.opacity = '0';
      letter.style.transform = 'translateY(40px) rotateX(-90deg)';
      letter.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      letter.style.transitionDelay = `${i * 0.05}s`;
      
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0) rotateX(0)';
      }, 10);
    });
  }
  
  // Animate letters out
  function animateLettersOut(phrase) {
    const letters = phrase.querySelectorAll('.letter');
    letters.forEach((letter, i) => {
      letter.style.opacity = '1';
      letter.style.transform = 'translateY(0) rotateX(0)';
      
      setTimeout(() => {
        letter.style.opacity = '0';
        letter.style.transform = 'translateY(-40px) rotateX(90deg)';
      }, i * 25);
    });
  }
  
  // Initialize animations
  splitTextForAnimation();
  createHeroText();
  
  // Add scroll reveal animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateOnScroll.observe(element);
  });
}); 