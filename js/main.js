document.addEventListener("DOMContentLoaded", () => {
  // Page navigation
  const navLinks = document.querySelectorAll(".nav-links a")
  const pages = document.querySelectorAll(".page")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetPage = this.getAttribute("data-page")

      // Update active nav link
      navLinks.forEach((navLink) => navLink.classList.remove("active"))
      this.classList.add("active")

      // Show target page, hide others
      pages.forEach((page) => {
        if (page.id === targetPage) {
          page.classList.add("active")
        } else {
          page.classList.remove("active")
        }
      })

      // If switching to experience page, trigger skill animation
      if (targetPage === "experience") {
        animateSkillBars()
      }
    })
  })

  // Search modal functionality
  const searchIcon = document.querySelector(".search-icon")
  const searchModal = document.getElementById("search-modal")
  const closeModalButton = document.querySelector(".search-modal-close-button")
  const searchInputModal = document.getElementById("searchInputModal")
  const searchResultsModal = document.getElementById("searchResultsModal")

  // Data to search - Pre-process content for searching
  const searchableContent = []
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionId = section.id
    let sectionTitle = sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
    const sectionTitleEl = section.querySelector(".section-title")
    if (sectionTitleEl) {
      sectionTitle = sectionTitleEl.textContent.trim()
    } else if (section.querySelector("h1")) {
      sectionTitle = section.querySelector("h1").textContent.trim()
    }

    // Generic text content from the section
    const fullTextContent = Array.from(section.querySelectorAll("p, span, li, h3, em"))
      .map((el) => el.textContent.trim())
      .join(" ")

    searchableContent.push({
      id: sectionId,
      title: sectionTitle,
      text: fullTextContent || section.textContent.trim(),
    })
  })

  function openModal() {
    searchModal.classList.add("show")
    searchInputModal.focus()
  }

  function closeModal() {
    searchModal.classList.remove("show")
    searchInputModal.value = ""
    searchResultsModal.innerHTML = ""
  }

  if (searchIcon) {
    searchIcon.addEventListener("click", openModal)
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal)
  }

  if (searchModal) {
    searchModal.addEventListener("click", (event) => {
      if (event.target === searchModal) {
        closeModal()
      }
    })
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchModal.classList.contains("show")) {
      closeModal()
    }
  })

  function highlightQuery(text, query) {
    if (!query) return text
    // Escape special characters in query for regex
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const regex = new RegExp(`(${escapedQuery})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }

  function performSearch() {
    const query = searchInputModal.value.toLowerCase().trim()
    searchResultsModal.innerHTML = ""

    if (!query) {
      return // No need to show message if input is empty, just clear results
    }

    let resultsFound = false
    const displayedResults = new Set() // To avoid duplicate results

    searchableContent.forEach((content) => {
      if (content.text.toLowerCase().includes(query) && !displayedResults.has(content.id)) {
        resultsFound = true
        displayedResults.add(content.id)

        const resultDiv = document.createElement("div")
        resultDiv.classList.add("result-item")

        // Create a snippet of text around the first match
        let snippet = content.text
        const matchIndex = snippet.toLowerCase().indexOf(query)
        if (matchIndex !== -1) {
          const start = Math.max(0, matchIndex - 50) // Show some context before
          const end = Math.min(snippet.length, matchIndex + query.length + 80) // Show some context after
          snippet = (start > 0 ? "..." : "") + snippet.substring(start, end) + (end < snippet.length ? "..." : "")
        } else {
          snippet = snippet.substring(0, 150) + (snippet.length > 150 ? "..." : "") // Fallback snippet
        }

        resultDiv.innerHTML = `<h4><a href="#${content.id}" data-page="${content.id}" class="search-result-link">${content.title}</a></h4>
                             <p>${highlightQuery(snippet, query)}</p>`
        searchResultsModal.appendChild(resultDiv)
      }
    })

    if (!resultsFound) {
      searchResultsModal.innerHTML = '<p>No results found for "<strong>' + searchInputModal.value + '</strong>".</p>'
    }

    // Add event listeners to search result links
    const searchResultLinks = document.querySelectorAll(".search-result-link")
    searchResultLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const targetPage = this.getAttribute("data-page")

        // Update active nav link
        navLinks.forEach((navLink) => {
          if (navLink.getAttribute("data-page") === targetPage) {
            navLink.classList.add("active")
          } else {
            navLink.classList.remove("active")
          }
        })

        // Show target page, hide others
        pages.forEach((page) => {
          if (page.id === targetPage) {
            page.classList.add("active")
          } else {
            page.classList.remove("active")
          }
        })

        // Close the modal
        closeModal()
      })
    })
  }

  if (searchInputModal) {
    // Search as you type (debounced)
    let debounceTimer
    searchInputModal.addEventListener("input", () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(performSearch, 300) // Adjust delay as needed (e.g., 300ms)
    })

    // Also allow search on Enter key for immediate result
    searchInputModal.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        clearTimeout(debounceTimer)
        performSearch()
      }
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the data to a server
      // For now, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received.\n\nWe'll get back to you at ${email} soon.`)

      // Reset the form
      contactForm.reset()
    })
  }

  // Scroll reveal animations
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal")

    reveals.forEach((reveal) => {
      const revealTop = reveal.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const revealPoint = 150

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)

  // Initialize reveal on page load
  revealOnScroll()

  // Initialize welcome title animation
  const welcomeTitle = document.querySelector(".welcome-title")
  if (welcomeTitle) {
    welcomeTitle.classList.add("animate")
  }

  // Read more functionality for publications
  const readMoreToggles = document.querySelectorAll('.read-more-toggle');
  
  readMoreToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const publicationContent = this.closest('.publication-content');
      const publicationDetails = publicationContent.querySelector('.publication-details');
      
      if (publicationDetails.classList.contains('active')) {
        publicationDetails.classList.remove('active');
        this.textContent = 'Read more';
      } else {
        publicationDetails.classList.add('active');
        this.textContent = 'Read less';
      }
    });
  });
  
  // Citation modal functionality
  const citationModal = document.getElementById('citation-modal');
  const citationCloseButton = citationModal.querySelector('.citation-modal-close-button');
  const citeLinks = document.querySelectorAll('.cite-link');
  const copyButton = document.getElementById('copy-citation');
  
  // Open citation modal
  citeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      citationModal.classList.add('show');
    });
  });
  
  // Close citation modal
  citationCloseButton.addEventListener('click', function() {
    citationModal.classList.remove('show');
  });
  
  // Close on click outside
  citationModal.addEventListener('click', function(e) {
    if (e.target === citationModal) {
      citationModal.classList.remove('show');
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && citationModal.classList.contains('show')) {
      citationModal.classList.remove('show');
    }
  });
  
  // Copy citation text
  copyButton.addEventListener('click', function() {
    const citationText = document.querySelector('.citation-text').textContent;
    
    navigator.clipboard.writeText(citationText)
      .then(() => {
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        
        setTimeout(() => {
          copyButton.innerHTML = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        copyButton.innerHTML = '<i class="fa-solid fa-times"></i> Failed';
        
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
        }, 2000);
      });
  });
})

// Function to close modal (needed for search results links)
function closeModal() {
  const searchModal = document.getElementById("search-modal")
  searchModal.classList.remove("show")
}

// Dummy function for animateSkillBars
function animateSkillBars() {
  // Add your skill bar animation logic here
  console.log("Skill bar animation triggered!")
}
