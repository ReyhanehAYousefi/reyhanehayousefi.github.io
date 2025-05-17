// This script animates the skill progress bars
document.addEventListener("DOMContentLoaded", () => {
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Function to animate skill bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
      if (isInViewport(bar)) {
        const targetWidth = bar.getAttribute("data-width")
        bar.style.width = targetWidth
        bar.style.transition = "width 1.5s ease-in-out"
      }
    })
  }

  // Initial check
  animateSkillBars()

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars)
})
