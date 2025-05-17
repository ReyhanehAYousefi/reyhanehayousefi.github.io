document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-progress");
  // Ensure bars start at 0
  skillBars.forEach((bar) => {
    bar.style.width = "0%";
    bar.style.transition = "width 1s ease-in-out";
  });

  // Observer to animate when in view
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.dataset.progress || bar.getAttribute("aria-valuenow") || 0;
          bar.style.width = pct + "%";
          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => observer.observe(bar));

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
