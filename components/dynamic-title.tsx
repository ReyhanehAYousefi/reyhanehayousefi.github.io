"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function DynamicTitle() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const highlightVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="welcome-section">
      <div className="relative inline-block">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900"
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Welcome!
        </motion.h1>
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-purple-500"
          variants={highlightVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        />
      </div>
    </div>
  )
}
