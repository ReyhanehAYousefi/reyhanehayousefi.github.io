"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Search, Moon, Sun } from "lucide-react"
import InteractiveBackground from "@/components/interactive-background"
import DynamicTitle from "@/components/dynamic-title"
import { motion } from "framer-motion"

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [activePage, setActivePage] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const skillsRef = useRef<HTMLDivElement>(null)

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Comprehensive search function that searches through all content
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = []

    // Search in Home page
    if (
      "welcome specialist vr fleetcare machine learning railway vehicles master's degree electrical electronics engineering toosi university technology mirana data analysis ovarian cancer recurrence prediction".includes(
        query,
      )
    ) {
      results.push({
        id: "home",
        title: "Home",
        snippet:
          "...apply my machine learning expertise to optimize the maintenance and repair of railway vehicles. I have a master's degree in Electrical and Electronics Engineering...",
      })
    }

    // Search in Projects
    if (
      "ai healthcare eeg signal processing data visualization dashboard machine learning models early detection diseases patient data algorithms processing analyzing eeg signals detect patterns interactive dashboard visualizing complex datasets railway industry".includes(
        query,
      )
    ) {
      results.push({
        id: "projects",
        title: "Projects",
        snippet: "Projects including AI in Healthcare, EEG Signal Processing, and Data Visualization Dashboard.",
      })
    }

    // Search in Publications
    if (
      "diagnostic mirna panel detect recurrence ovarian cancer ai approaches coronary artery segmentation x-ray angiograms artifact rejection eeg signals tutorial".includes(
        query,
      )
    ) {
      results.push({
        id: "publications",
        title: "Publications",
        snippet:
          "Publications including research on ovarian cancer, coronary artery segmentation, and EEG signal processing.",
      })
    }

    // Search in Experience
    if (
      "data science specialist vr fleetcare software developer rayannik teaching experience machine learning healthcare python programming neural networks advanced neuro-controllers intelligent systems advance control".includes(
        query,
      )
    ) {
      results.push({
        id: "experience",
        title: "Experience",
        snippet:
          "Professional experience including Data Science Specialist at VR FleetCare and teaching experience in Machine Learning.",
      })
    }

    // Search in Skills
    if ("python matlab c c# javascript scikit-learn pytorch tensorflow".includes(query)) {
      results.push({
        id: "experience",
        title: "Skills",
        snippet: "Skills including Python, MATLAB, C/C#, JavaScript, scikit-learn, PyTorch, and TensorFlow.",
      })
    }

    // Specific search for EEG
    if (query.includes("eeg")) {
      results.push({
        id: "projects",
        title: "EEG Signal Processing",
        snippet: "Created algorithms for processing and analyzing EEG signals to detect patterns.",
      })
      results.push({
        id: "publications",
        title: "Artifact Rejection from EEG Signals – A Tutorial",
        snippet:
          "A comprehensive tutorial on methods and techniques for identifying and removing artifacts from EEG signal data to improve analysis accuracy.",
      })
    }

    setSearchResults(results)
  }, [searchQuery])

  // Function to animate skill bars
  useEffect(() => {
    if (activePage === "experience") {
      const animateSkills = () => {
        const skillBars = document.querySelectorAll(".skill-progress")
        skillBars.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width") || "0%"
          setTimeout(() => {
            ;(bar as HTMLElement).style.width = targetWidth
          }, 300)
        })
      }

      // Animate skills when experience page is active
      animateSkills()
    }
  }, [activePage])

  const handleLinkHover = () => setCursorVariant("link")
  const handleLinkLeave = () => setCursorVariant("default")

  const renderPage = () => {
    switch (activePage) {
      case "projects":
        return <ProjectsPage />
      case "publications":
        return <PublicationsPage />
      case "posts":
        return <PostsPage />
      case "experience":
        return <ExperiencePage skillsRef={skillsRef} />
      case "contact":
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <main className="relative">
      {/* Interactive Background */}
      <InteractiveBackground />

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        <Sun className="icon sun-icon" size={18} />
        <Moon className="icon moon-icon" size={18} />
      </button>

      {/* Custom cursor */}
      <div
        className="custom-cursor fixed rounded-full pointer-events-none z-50"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: cursorVariant === "link" ? "64px" : "32px",
          height: cursorVariant === "link" ? "64px" : "32px",
          transform: `translate(-50%, -50%)`,
          backgroundColor: cursorVariant === "link" ? "rgba(111, 58, 154, 0.4)" : "rgba(111, 58, 154, 0.2)",
          mixBlendMode: "difference",
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
        }}
      />

      <nav className="fixed w-full bg-purple-100/80 backdrop-blur-sm py-4 px-6 flex justify-end items-center z-40">
        <ul className="nav-links flex gap-8">
          {["home", "projects", "publications", "posts", "experience", "contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage(item)
                }}
                className={`text-purple-800 font-bold transition-all duration-300 hover:text-purple-950 relative overflow-hidden group ${
                  activePage === item ? "text-purple-950" : ""
                }`}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-purple-800 transition-all duration-300 ${
                    activePage === item ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>
        <div
          className="search-icon ml-6 cursor-pointer relative"
          onClick={() => setIsSearchOpen(true)}
          onMouseEnter={handleLinkHover}
          onMouseLeave={handleLinkLeave}
        >
          <div className="loader">
            <div className="loaderMiniContainer">
              <div className="barContainer">
                <span className="bar"></span>
                <span className="bar bar2"></span>
              </div>
              <Search className="svgIcon" />
            </div>
          </div>
        </div>
      </nav>

      {renderPage()}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-start pt-[10vh] z-50 animate-fadeIn">
          <div className="search-modal-content p-8 rounded-lg w-[90%] max-w-[700px] shadow-lg animate-slideDown">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">Search</h2>
              <button
                className="text-3xl bg-opacity-20 rounded-full w-9 h-9 flex items-center justify-center hover:bg-opacity-30 transition-colors"
                onClick={() => setIsSearchOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="search-input-container pl-4 mb-5">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-4 px-2 text-lg border-none focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="search-results max-h-[50vh] overflow-y-auto">
              {searchResults.length > 0
                ? searchResults.map((result, index) => (
                    <div key={index} className="result-item py-3 px-1 border-b last:border-b-0">
                      <h4 className="font-medium">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setActivePage(result.id)
                            setIsSearchOpen(false)
                          }}
                        >
                          {result.title}
                        </a>
                      </h4>
                      <p
                        className="mt-1"
                        dangerouslySetInnerHTML={{
                          __html: result.snippet.replace(
                            new RegExp(`(${searchQuery})`, "gi"),
                            (match) => `<mark>${match}</mark>`,
                          ),
                        }}
                      />
                    </div>
                  ))
                : searchQuery && (
                    <p>
                      No results found for "<strong>{searchQuery}</strong>".
                    </p>
                  )}
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-4 relative z-10">
        &copy; 2025 Reyhaneh Aghayousefi
      </footer>
    </main>
  )
}

function HomePage() {
  return (
    <section id="home" className="min-h-screen pt-28 pb-10 px-8 relative z-10">
      <div className="profile-container flex flex-wrap gap-8">
        <div className="profile-left min-w-[220px] max-w-[320px] flex flex-col items-start gap-3 flex-shrink-0">
          <div className="relative overflow-hidden rounded-full border-6 border-purple-200 shadow-lg">
            <Image
              src="/images/profile.jpeg"
              alt="Reyhaneh Aghayousefi"
              width={200}
              height={200}
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <h1 className="text-xl font-semibold mt-4 whitespace-nowrap">Reyhaneh Aghayousefi</h1>
          <div className="profile-links flex gap-3 mt-1 flex-wrap items-center justify-start">
            {/* Interactive Social Media Buttons - Smaller Size */}
            <button className="Btn">
              <div className="BG" style={{ background: "#EA4335" }}></div>
              <a href="mailto:reyhaneh.aghayousefi@aalto.fi" title="Email" className="svgContainer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="white"
                  />
                </svg>
              </a>
            </button>

            <button className="Btn">
              <div className="BG" style={{ background: "#0077b5" }}></div>
              <a
                href="https://www.linkedin.com/in/reyhaneh-aghayousefi/"
                target="_blank"
                title="LinkedIn"
                className="svgContainer"
                rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.025-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.37h.04c.4-.77 1.37-1.57 2.83-1.57 3.02 0 3.58 1.99 3.58 4.58v5.62z"
                    fill="white"
                  />
                </svg>
              </a>
            </button>

            <button className="Btn">
              <div className="BG" style={{ background: "#333" }}></div>
              <a
                href="https://github.com/ReyhanehAYousefi"
                target="_blank"
                title="GitHub"
                className="svgContainer"
                rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 .5C5.65.5.5 5.75.5 12.24c0 5.18 3.29 9.58 7.85 11.15.57.1.78-.24.78-.54 0-.27-.01-1.13-.02-2.05-3.19.71-3.87-1.4-3.87-1.4-.52-1.35-1.28-1.71-1.28-1.71-1.05-.75.08-.74.08-.74 1.16.08 1.77 1.19 1.77 1.19 1.03 1.83 2.71 1.3 3.37.99.1-.76.41-1.3.75-1.6-2.55-.29-5.23-1.31-5.23-5.83 0-1.29.44-2.35 1.16-3.17-.12-.29-.5-1.47.11-3.07 0 0 .96-.31 3.13 1.2a10.7 10.7 0 012.85-.38c.97.01 1.95.13 2.85.38 2.17-1.51 3.13-1.2 3.13-1.2.62 1.6.24 2.78.12 3.07.73.82 1.16 1.88 1.16 3.17 0 4.53-2.68 5.53-5.23 5.82.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.21.65.8.54C20.71 21.82 24 17.42 24 12.24 24 5.75 18.35.5 12 .5z"
                    fill="white"
                  />
                </svg>
              </a>
            </button>

            <button className="Btn">
              <div className="BG" style={{ background: "#4285F4" }}></div>
              <a
                href="https://scholar.google.com/citations?user=aAXtA6AAAAAJ&hl=en"
                target="_blank"
                title="Google Scholar"
                className="svgContainer"
                rel="noreferrer"
              >
                <div className="flex items-center justify-center w-full h-full bg-[#4285F4] rounded-[4px]">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
              </a>
            </button>

            <button className="Btn">
              <div className="BG" style={{ background: "#00CCBB" }}></div>
              <a
                href="https://www.researchgate.net/profile/Reyhaneh-Aghayousefi"
                target="_blank"
                title="ResearchGate"
                className="svgContainer"
                rel="noreferrer"
              >
                <div className="flex items-center justify-center w-full h-full bg-[#00CCBB] rounded-[4px]">
                  <span className="text-white text-xs font-bold">RG</span>
                </div>
              </a>
            </button>
          </div>
        </div>

        <div className="profile-right flex-1 flex-basis-[400px] max-w-[900px] flex flex-col gap-3 bg-opacity-70 backdrop-blur-sm p-6 rounded-lg shadow-sm">
          <div className="profile-summary text-base text-gray-800 mb-3 leading-relaxed">
            <DynamicTitle />
            <motion.p
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              As a Specialist at VR FleetCare, I apply my machine learning expertise to optimize the maintenance and
              repair of railway vehicles. I have a master's degree in Electrical and Electronics Engineering from K. N.
              Toosi University of Technology, where I conducted research on miRNA data analysis for ovarian cancer
              recurrence prediction.
            </motion.p>
          </div>

          <div className="interests-education flex justify-between gap-4 flex-wrap pt-4">
            <div className="interests flex-1 flex-basis-[300px]">
              <h2 className="text-lg font-semibold mb-2">Interests</h2>
              <ul className="list-disc pl-5 text-sm">
                <motion.li
                  className="hover:text-purple-800 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Data Science
                </motion.li>
                <motion.li
                  className="hover:text-purple-800 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Natural Language Models
                </motion.li>
                <motion.li
                  className="hover:text-purple-800 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Computer Vision
                </motion.li>
              </ul>
            </div>

            <div className="education flex-1 flex-basis-[300px]">
              <h2 className="text-lg font-semibold mb-2">Education</h2>

              <motion.div
                className="edu-item flex items-start mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="edu-icon text-2xl mr-3 mt-0.5 text-gray-900">🎓</span>
                <div className="edu-details text-sm text-gray-800 leading-relaxed">
                  <strong className="font-semibold">Life Wide Learning in Computer Science, Present</strong>
                  <br />
                  <span>FITech Network University, Helsinki, Finland</span>
                  <br />
                </div>
              </motion.div>

              <motion.div
                className="edu-item flex items-start mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="edu-icon text-2xl mr-3 mt-0.5 text-gray-900">🎓</span>
                <div className="edu-details text-sm text-gray-800 leading-relaxed">
                  <strong className="font-semibold">M.Sc. in Electrical Engineering – Control, 2022</strong>
                  <br />
                  <span>K.N.Toosi University of Technology, Tehran, Iran</span>
                  <br />
                </div>
              </motion.div>

              <motion.div
                className="edu-item flex items-start mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <span className="edu-icon text-2xl mr-3 mt-0.5 text-gray-900">🎓</span>
                <div className="edu-details text-sm text-gray-800 leading-relaxed">
                  <strong className="font-semibold">B.Sc. in Electrical Engineering – Control, 2019</strong>
                  <br />
                  <span>University of Tehran, Tehran, Iran</span>
                  <br />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsPage() {
  return (
    <section id="projects" className="min-h-screen pt-28 pb-10 px-8 relative z-10">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-3xl mb-6 relative">
          Projects
          <span className="absolute bottom-[-8px] left-0 w-[50px] h-1 bg-blue-600"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-200 flex items-center justify-center text-purple-800 text-xl font-bold">
                AI Project
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium text-blue-600 mb-2">AI in Healthcare</h3>
              <p className="text-gray-600 mb-4">
                Developed machine learning models for early detection of diseases using patient data.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">Python</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">TensorFlow</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">Healthcare</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-200 flex items-center justify-center text-purple-800 text-xl font-bold">
                Signal Processing
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium text-blue-600 mb-2">EEG Signal Processing</h3>
              <p className="text-gray-600 mb-4">
                Created algorithms for processing and analyzing EEG signals to detect patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">MATLAB</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">Signal Processing</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">Neuroscience</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-200 flex items-center justify-center text-purple-800 text-xl font-bold">
                Data Visualization
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium text-blue-600 mb-2">Data Visualization Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Built an interactive dashboard for visualizing complex datasets in the railway industry.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">JavaScript</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">D3.js</span>
                <span className="px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded-full">Data Viz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PublicationsPage() {
  return (
    <section id="publications" className="min-h-screen pt-28 pb-10 px-8 relative z-10">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-3xl mb-6 relative">
          Publications
          <span className="absolute bottom-[-8px] left-0 w-[50px] h-1 bg-blue-600"></span>
        </h2>

        <div className="mt-12 space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="bg-purple-800 text-white p-4 md:p-6 flex items-center justify-center md:w-32">
              <span className="text-xl font-bold">2023</span>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-medium text-blue-600 mb-2">
                A diagnostic miRNA panel to detect recurrence of ovarian cancer through AI approaches
              </h3>
              <p className="text-gray-500 italic mb-4">Journal of Cancer Research and Clinical Oncology</p>
              <p className="text-gray-700 mb-4">
                This study presents a novel approach to predict ovarian cancer recurrence using miRNA expression data
                and advanced machine learning techniques.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="px-4 py-2 bg-purple-50 text-purple-800 rounded-full text-sm hover:bg-purple-100 transition-colors"
                >
                  View Paper
                </a>
                <a
                  href="#"
                  className="px-4 py-2 bg-purple-50 text-purple-800 rounded-full text-sm hover:bg-purple-100 transition-colors"
                >
                  Cite
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="bg-purple-800 text-white p-4 md:p-6 flex items-center justify-center md:w-32">
              <span className="text-xl font-bold">In Prep</span>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-medium text-blue-600 mb-2">
                Coronary Artery Segmentation Using X-Ray Angiograms
              </h3>
              <p className="text-gray-500 italic mb-4">In Preparation</p>
              <p className="text-gray-700 mb-4">
                This research focuses on developing advanced image processing techniques for accurate segmentation of
                coronary arteries from X-ray angiogram images.
              </p>
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                In Preparation
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="bg-purple-800 text-white p-4 md:p-6 flex items-center justify-center md:w-32">
              <span className="text-xl font-bold">2022</span>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-medium text-blue-600 mb-2">
                Artifact Rejection from EEG Signals – A Tutorial
              </h3>
              <p className="text-gray-500 italic mb-4">Technical Report</p>
              <p className="text-gray-700 mb-4">
                A comprehensive tutorial on methods and techniques for identifying and removing artifacts from EEG
                signal data to improve analysis accuracy.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="px-4 py-2 bg-purple-50 text-purple-800 rounded-full text-sm hover:bg-purple-100 transition-colors"
                >
                  View Tutorial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PostsPage() {
  return (
    <section id="posts" className="min-h-screen pt-28 pb-10 px-8 relative z-10">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-3xl mb-6 relative">
          Posts
          <span className="absolute bottom-[-8px] left-0 w-[50px] h-1 bg-blue-600"></span>
        </h2>

        <div className="mt-12 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500 text-lg">No posts available yet. Check back soon!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperiencePage({ skillsRef }) {
  return (
    <section id="experience" className="min-h-screen pt-28 pb-10 px-8 relative z-10">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-3xl mb-6 relative">
          Experience
          <span className="absolute bottom-[-8px] left-0 w-[50px] h-1 bg-blue-600"></span>
        </h2>

        <div className="relative border-l-2 border-purple-200 pl-8 mt-12">
          <div className="mb-12 relative">
            <div className="absolute w-4 h-4 bg-purple-800 rounded-full -left-[25px] top-1 border-4 border-white"></div>
            <div className="text-sm font-bold text-purple-800 mb-1">Jun 2023 - Oct 2024</div>
            <h3 className="text-xl font-medium text-blue-600 mb-1">Data Science Specialist</h3>
            <div className="font-bold mb-2">VR FleetCare</div>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">Deployed measuring devices for data collection in the railway sector.</li>
              <li className="mb-1">Analyzed large datasets to detect anomalies and patterns in real-world signals.</li>
              <li className="mb-1">Developed predictive maintenance models to optimize railway operations.</li>
            </ul>
          </div>

          <div className="mb-12 relative">
            <div className="absolute w-4 h-4 bg-purple-800 rounded-full -left-[25px] top-1 border-4 border-white"></div>
            <div className="text-sm font-bold text-purple-800 mb-1">Jun 2017 - Sep 2017</div>
            <h3 className="text-xl font-medium text-blue-600 mb-1">Software Developer</h3>
            <div className="font-bold mb-2">Rayannik</div>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">Developed a GUI in C# for fire detection in forests using sensor data.</li>
              <li className="mb-1">Worked with Arduino, Atmega8, and Altium Designer for embedded solutions.</li>
            </ul>
          </div>

          <div className="mb-12 relative">
            <div className="absolute w-4 h-4 bg-purple-800 rounded-full -left-[25px] top-1 border-4 border-white"></div>
            <div className="text-sm font-bold text-purple-800 mb-1">2020 - 2023</div>
            <h3 className="text-xl font-medium text-blue-600 mb-1">Teaching Experience</h3>
            <h4 className="font-bold mt-2 mb-1">Instructor:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">Machine Learning for Healthcare (Fall 2023)</li>
              <li className="mb-1">Introduction to Python Programming (Winter 2022)</li>
            </ul>
            <h4 className="font-bold mt-2 mb-1">Teaching Assistant:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">Neural Networks Advanced Neuro-Controllers (Spring 2021)</li>
              <li className="mb-1">Intelligent Systems (Fall 2020)</li>
              <li className="mb-1">Advance Control (Spring 2018)</li>
            </ul>
          </div>
        </div>

        {/* Skills section moved under Experience */}
        <div className="mt-16" ref={skillsRef}>
          <h2 className="text-3xl mb-6 relative">
            Skills
            <span className="absolute bottom-[-8px] left-0 w-[50px] h-1 bg-blue-600"></span>
          </h2>

          <div className="mt-12 space-y-10">
            <div>
              <h3 className="text-xl font-medium text-purple-800 mb-4">Programming Languages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Python</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="95%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">MATLAB</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="90%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">C/C#</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="75%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">JavaScript</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="65%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-purple-800 mb-4">Machine Learning & AI</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">scikit-learn</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="90%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">PyTorch</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="85%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">TensorFlow</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-purple-800 to-purple-300 h-2.5 rounded-full skill-progress transition-all duration-1500"
                      data-width="80%"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      `Thank you, ${formData.name}! Your message has been received.\n\nWe'll get back to you at ${formData.email} soon.`,
    )
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section id="contact" className="min-h-screen pt-28 pb-10 px-8 relative z-10">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-3xl mb-6 relative">
          Contact
          <span className="absolute bottom-[-8px] left-0 w-[50px] h-1 bg-blue-600"></span>
        </h2>

        <div className="mt-12">
          {/* Removed "Get in Touch" section as requested */}
          <div className="w-full max-w-[700px] mx-auto">
            <h3 className="text-xl font-medium text-purple-800 mb-4">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-purple-800 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-900 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
