document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("background-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Mouse position
  let mouseX = 0
  let mouseY = 0

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Particles
  const particles = []
  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 150)

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: `rgba(111, 58, 154, ${Math.random() * 0.5 + 0.1})`,
    })
  }

  // Animation
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw and update particles
    particles.forEach((particle) => {
      // Calculate distance from mouse
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150

      // Apply force if mouse is close
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        particle.x -= dx * force * 0.03
        particle.y -= dy * force * 0.03
      }

      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()

      // Draw connections
      particles.forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(111, 58, 154, ${0.2 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      })
    })

    requestAnimationFrame(animate)
  }

  animate()
})
