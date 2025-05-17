document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Enlarge cursor on hoverable elements
  const hoverableElements = document.querySelectorAll('a, button, .search-icon, .project-card, .timeline-content, .skill-item, .publication-card, .form-control');
  
  hoverableElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.style.width = '64px';
      cursor.style.height = '64px';
      cursor.style.marginLeft = '-32px';
      cursor.style.marginTop = '-32px';
      cursor.style.backgroundColor = 'rgba(111, 58, 154, 0.4)';
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.style.width = '32px';
      cursor.style.height = '32px';
      cursor.style.marginLeft = '-16px';
      cursor.style.marginTop = '-16px';
      cursor.style.backgroundColor = 'rgba(111, 58, 154, 0.2)';
    });
  });
  
  // Search modal functionality
  const searchIcon = document.querySelector('.search-icon');
  const searchModal = document.getElementById('search-modal');
  const closeModalButton = document.querySelector('.search-modal-close-button');
  const searchInputModal = document.getElementById('searchInputModal');
  const searchResultsModal = document.getElementById('searchResultsModal');
  
  // Data to search - Pre-process content for searching
  const searchableContent = [];
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionId = section.id;
    let sectionTitle = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    const sectionTitleEl = section.querySelector('.section-title');
    if (sectionTitleEl) {
      sectionTitle = sectionTitleEl.textContent.trim();
    } else if (section.querySelector('h1')) {
      sectionTitle = section.querySelector('h1').textContent.trim();
    }
    
    // Generic text content from the section
    let fullTextContent = Array.from(section.querySelectorAll('p, span, li, h3, em'))
      .map(el => el.textContent.trim())
      .join(' ');
    
    searchableContent.push({
      id: sectionId,
      title: sectionTitle,
      text: fullTextContent || section.textContent.trim()
    });
  });
  
  function openModal() {
    searchModal.classList.add('show');
    searchInputModal.focus();
  }
  
  function closeModal() {
    searchModal.classList.remove('show');
    searchInputModal.value = '';
    searchResultsModal.innerHTML = '';
  }
  
  if (searchIcon) {
    searchIcon.addEventListener('click', openModal);
  }
  
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
  
  if (searchModal) {
    searchModal.addEventListener('click', function(event) {
      if (event.target === searchModal) {
        closeModal();
      }
    });
  }
  
  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && searchModal.classList.contains('show')) {
      closeModal();
    }
  });
  
  function highlightQuery(text, query) {
    if (!query) return text;
    // Escape special characters in query for regex
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  function performSearch() {
    const query = searchInputModal.value.toLowerCase().trim();
    searchResultsModal.innerHTML = '';
    
    if (!query) {
      return; // No need to show message if input is empty, just clear results
    }
    
    let resultsFound = false;
    const displayedResults = new Set(); // To avoid duplicate results
    
    searchableContent.forEach(content => {
      if (content.text.toLowerCase().includes(query) && !displayedResults.has(content.id)) {
        resultsFound = true;
        displayedResults.add(content.id);
        
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-item');
        
        // Create a snippet of text around the first match
        let snippet = content.text;
        const matchIndex = snippet.toLowerCase().indexOf(query);
        if (matchIndex !== -1) {
          const start = Math.max(0, matchIndex - 50); // Show some context before
          const end = Math.min(snippet.length, matchIndex + query.length + 80); // Show some context after
          snippet = (start > 0 ? "..." : "") + snippet.substring(start, end) + (end < snippet.length ? "..." : "");
        } else {
          snippet = snippet.substring(0, 150) + (snippet.length > 150 ? "..." : ""); // Fallback snippet
        }
        
        resultDiv.innerHTML = `<h4><a href="#${content.id}" onclick="closeModal()">${content.title}</a></h4>
                             <p>${highlightQuery(snippet, query)}</p>`;
        searchResultsModal.appendChild(resultDiv);
      }
    });
    
    if (!resultsFound) {
      searchResultsModal.innerHTML = '<p>No results found for "<strong>' + searchInputModal.value + '</strong>".</p>';
    }
  }
  
  if (searchInputModal) {
    // Search as you type (debounced)
    let debounceTimer;
    searchInputModal.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(performSearch, 300); // Adjust delay as needed (e.g., 300ms)
    });
    
    // Also allow search on Enter key for immediate result
    searchInputModal.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        clearTimeout(debounceTimer);
        performSearch();
      }
    });
  }
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the data to a server
      // For now, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received.\n\nWe'll get back to you at ${email} soon.`);
      
      // Reset the form
      contactForm.reset();
    });
  }
  
  // Scroll reveal animations
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  
  // Initialize reveal on page load
  revealOnScroll();
});

// Function to close modal (needed for search results links)
function closeModal() {
  const searchModal = document.getElementById('search-modal');
  searchModal.classList.remove('show');
}
