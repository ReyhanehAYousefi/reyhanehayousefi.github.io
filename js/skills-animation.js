// This script animates the skill progress bars
document.addEventListener("DOMContentLoaded", () => {
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to animate skill bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    
    skillBars.forEach((bar) => {
      if (isInViewport(bar)) {
        const targetWidth = bar.getAttribute("data-width") || "0%";
        // Only animate if not already at target width
        if (bar.style.width !== targetWidth) {
          bar.style.width = targetWidth;
        }
      }
    });
  }

  // Initial check with a small delay to ensure DOM is ready
  setTimeout(animateSkillBars, 100);

  // Check on scroll with debounce
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateSkillBars, 100);
  });

  // Also check when window is resized
  window.addEventListener("resize", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateSkillBars, 100);
  });

  // ===== Tooltip & Click Interaction =====
  document.querySelectorAll('.bar-container').forEach((container) => {
    const bar = container.querySelector('.skill-progress');
    const tooltip = container.querySelector('.tooltip');
    // initialize tooltip text
    tooltip.textContent = bar.dataset.progress + '%';
    // on click, show an alert or custom behavior
    container.addEventListener('click', () => {
      const skillName = container.closest('.skill').querySelector('h3, h4').textContent;
      alert(`${skillName}: ${bar.dataset.progress}%`);
    });
  });
});
