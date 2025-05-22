// This script animates the skill progress bars
document.addEventListener("DOMContentLoaded", () => {
  // Create cosmic skill visualization
  function createCosmicSkills() {
    const skillsData = [
      { name: "Python", value: 95 },
      { name: "MATLAB", value: 90 },
      { name: "C/C#", value: 75 },
      { name: "JavaScript", value: 65 },
      { name: "scikit-learn", value: 90 },
      { name: "PyTorch", value: 85 },
      { name: "TensorFlow", value: 80 }
    ];

    // Get the skills container
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    // Clear current content
    skillsContainer.innerHTML = '';

    // Create a single skills grid without categories
    const skillsGrid = document.createElement('div');
    skillsGrid.className = 'cosmic-skills';
    
    // Add all skills to grid
    skillsData.forEach(skill => {
      const skillEl = createSkillElement(skill);
      skillsGrid.appendChild(skillEl);
    });
    
    skillsContainer.appendChild(skillsGrid);
    
    // Initialize animations after everything is created
    initializeAnimations();
  }

  // Create a single skill element with SVG and animations
  function createSkillElement(skill) {
    const skillEl = document.createElement('div');
    skillEl.className = 'skill-cosmic';
    skillEl.setAttribute('data-skill', skill.name);
    
    // Add skill title
    const titleEl = document.createElement('span');
    titleEl.className = 'skill-title';
    titleEl.textContent = skill.name;
    skillEl.appendChild(titleEl);
    
    // Create circle wrapper
    const circleWrapper = document.createElement('div');
    circleWrapper.className = 'skill-circle-wrapper';
    
    // Add base circle
    const circle = document.createElement('div');
    circle.className = 'skill-circle';
    circleWrapper.appendChild(circle);
    
    // Add background circle
    const circleBg = document.createElement('div');
    circleBg.className = 'skill-circle-bg';
    circleWrapper.appendChild(circleBg);
    
    // Add skill value
    const valueEl = document.createElement('span');
    valueEl.className = 'skill-value';
    valueEl.textContent = `${skill.value}%`;
    circleBg.appendChild(valueEl);
    
    // Create SVG ring
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "skill-ring");
    svg.setAttribute("viewBox", "0 0 160 160");
    
    // Background ring
    const bgRing = document.createElementNS(svgNS, "circle");
    bgRing.setAttribute("class", "ring-circle ring-bg");
    bgRing.setAttribute("cx", "80");
    bgRing.setAttribute("cy", "80");
    bgRing.setAttribute("r", "77");
    
    // Progress ring
    const progressRing = document.createElementNS(svgNS, "circle");
    progressRing.setAttribute("class", "ring-circle ring-progress");
    progressRing.setAttribute("cx", "80");
    progressRing.setAttribute("cy", "80");
    progressRing.setAttribute("r", "77");
    progressRing.setAttribute("data-value", skill.value);
    
    svg.appendChild(bgRing);
    svg.appendChild(progressRing);
    circleWrapper.appendChild(svg);
    
    // Add orbiting element
    const orbit = document.createElement('div');
    orbit.className = 'skill-orbit';
    const orbitDot = document.createElement('div');
    orbitDot.className = 'orbit-dot';
    orbit.appendChild(orbitDot);
    circleWrapper.appendChild(orbit);
    
    // Add a second orbit for more complexity
    const orbit2 = document.createElement('div');
    orbit2.className = 'skill-orbit';
    orbit2.style.width = '140px';
    orbit2.style.height = '140px';
    orbit2.style.animationDuration = '10s';
    orbit2.style.transform = 'rotate(45deg)';
    const orbitDot2 = document.createElement('div');
    orbitDot2.className = 'orbit-dot';
    orbitDot2.style.backgroundColor = 'rgba(216, 180, 254, 0.8)';
    orbit2.appendChild(orbitDot2);
    circleWrapper.appendChild(orbit2);
    
    // Add dots
    const dots = document.createElement('div');
    dots.className = 'skill-dots';
    
    // Add more random dots for enhanced effect
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'skill-dot';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 2}s`;
      
      // Add size variation
      const size = 2 + Math.random() * 3;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      
      // Add opacity variation
      dot.style.opacity = `${0.3 + Math.random() * 0.6}`;
      
      dots.appendChild(dot);
    }
    
    circleWrapper.appendChild(dots);
    
    // Add particles
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty('--x', `${(Math.random() * 50 - 25)}px`);
      particle.style.setProperty('--y', `${(Math.random() * 50 - 25)}px`);
      particle.style.animationDelay = `${Math.random() * 3}s`;
      
      // Add size variation
      const size = 3 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      circleWrapper.appendChild(particle);
    }
    
    // Add light trails
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'light-trail';
      trail.style.width = '0px';
      trail.style.left = `${Math.random() * 80 + 10}%`;
      trail.style.top = `${Math.random() * 80 + 10}%`;
      
      // Add rotation and size variation
      const rotation = Math.random() * 360;
      const width = 20 + Math.random() * 30;
      trail.style.setProperty('--rotate', `${rotation}deg`);
      trail.style.setProperty('--width', `${width}px`);
      trail.style.transform = `rotate(${rotation}deg)`;
      trail.style.animationDelay = `${Math.random() * 3}s`;
      
      // Vary height for more dynamic effect
      trail.style.height = `${1 + Math.random() * 2}px`;
      
      circleWrapper.appendChild(trail);
    }
    
    skillEl.appendChild(circleWrapper);
    return skillEl;
  }

  // Initialize and trigger animations
  function initializeAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressRings = entry.target.querySelectorAll('.ring-progress');
            progressRings.forEach(ring => {
              const value = ring.getAttribute('data-value');
              const circumference = 2 * Math.PI * 77; // 2πr where r=77
              const offset = circumference - (value / 100 * circumference);
              
              // Set initial state
              ring.style.strokeDasharray = `${circumference}`;
              ring.style.strokeDashoffset = `${circumference}`;
              
              // Trigger animation with staggered delay
              setTimeout(() => {
                ring.style.strokeDashoffset = offset;
              }, 100);
            });
            
            // Also animate the skill element 
            entry.target.classList.add('animated-in');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe all skill-cosmic elements
    document.querySelectorAll('.skill-cosmic').forEach((skill, index) => {
      // Add staggered animation delay
      skill.style.animationDelay = `${index * 0.15}s`;
      observer.observe(skill);
    });

    // Make skills interactive
    document.querySelectorAll('.skill-cosmic').forEach(skill => {
      // Mouse move effect for parallax
      skill.addEventListener('mousemove', (e) => {
        const rect = skill.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Apply transform to create 3D effect
        skill.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Move particles based on cursor
        const particles = skill.querySelectorAll('.skill-particle');
        particles.forEach(particle => {
          const moveX = (x - centerX) / 20;
          const moveY = (y - centerY) / 20;
          particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
      
      // Reset on mouse leave
      skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(0)';
        
        // Reset particles
        const particles = skill.querySelectorAll('.skill-particle');
        particles.forEach(particle => {
          particle.style.transform = 'translate(0, 0)';
        });
      });
      
      // Click effect
      skill.addEventListener('click', () => {
        const skillName = skill.querySelector('.skill-title').textContent;
        const skillValue = skill.querySelector('.skill-value').textContent;
        const message = `${skillName}: ${skillValue}`;
        
        // Flash effect on click
        skill.classList.add('pulse-effect');
        setTimeout(() => {
          skill.classList.remove('pulse-effect');
        }, 700);
        
        // Create a toast notification
        createToast(message);
      });
    });
  }

  // Create toast notification
  function createToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'var(--primary-color)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    toast.style.fontFamily = 'var(--font-heading)';
    toast.style.fontWeight = '500';
    toast.style.backdropFilter = 'blur(5px)';
    toast.style.border = '1px solid rgba(255,255,255,0.1)';
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide and remove toast
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Initialize
  createCosmicSkills();
  
  // Re-initialize on window resize for better responsiveness
  window.addEventListener('resize', () => {
    // Debounce resize event
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
      createCosmicSkills();
    }, 250);
  });
});
