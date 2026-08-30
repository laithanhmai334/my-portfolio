"use client"

import { useEffect, useState, useRef } from "react"
import { exampleImages } from "@/utils/demo-images"
import { motion, stagger, useAnimate } from "framer-motion"
import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"

export default function Portfolio() {
  const [scope, animate] = useAnimate()
  const [isPlaying, setIsPlaying] = useState(false)

  // 1. Create a reference for the audio element
 const audioRef = useRef<HTMLAudioElement>(null)

  // 2. Handle Image Animation
  useEffect(() => {
    animate(".floating-img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  // 3. Handle Audio Play/Pause when isPlaying changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Browser blocked autoplay:", err)
          setIsPlaying(false) // Revert state if play fails
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  return (
    <div 
      ref={scope} 
      className="relative min-h-screen flex items-center justify-center font-sans antialiased selection:bg-gray-700 selection:text-white overflow-hidden text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1701693989010-25b230d25ac3?q=80&w=1170&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hidden Audio Element - loops infinitely */}
      <audio ref={audioRef} src="/take-a-walk.mp3" loop preload="auto" />

      {/* 1. Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rVrf2QAAzDDEhBQBwQAIDMCWbe2wY0AAAAASUVORK5CYII=')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* 2. Interactive Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Floating sensitivity={-1} className="w-full h-full">
          {exampleImages.map((img, index) => (
            <FloatingElement 
              key={index}
              depth={img.depth} 
              style={{ top: `${img.top}%`, left: `${img.left}%` }}
            >
              <motion.img
                initial={{ opacity: 0 }}
                src={img.url}
                className="floating-img w-20 h-20 md:w-32 md:h-32 hover:scale-105 duration-200 cursor-pointer transition-transform"
              />
            </FloatingElement>
          ))}
        </Floating>
      </div>

      {/* 3. Audio Toggle Button */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-6 left-6 text-2xl text-gray-400 hover:text-white transition-colors duration-300 z-50"
      >
        <i className={isPlaying ? "fa-solid fa-volume-high text-white" : "fa-solid fa-volume-xmark"}></i>
      </button>

      {/* CSS injected for Glassmorphism & Animations */}
      <style>{`
        .glass-card {
            background: rgba(15, 15, 15, 0.5);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6);
        }
        .avatar-pulse {
            animation: pulse-ring 2.5s infinite;
        }
        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2); }
            70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
      `}</style>

      {/* 4. Main Bio Card */}
      <main className="glass-card rounded-2xl w-full max-w-md p-8 mx-4 flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.01] relative z-10">
        
        {/* Profile Image */}
        <div className="relative mb-5">
            <img 
              src="/eadc47c1-c687-4a45-8c8b-73a530bebf61.jpg" 
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full object-cover border border-gray-600 avatar-pulse"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" title="Online"></div>
        </div>

        {/* Name & Badges */}
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            Nha Nguyen - Hachi Truong
            <span className="flex gap-1.5 text-sm text-gray-300">
                <i className="fa-solid fa-code" title="Developer"></i>
                <i className="fa-solid fa-fire text-orange-500" title="Active"></i>
                <i className="fa-solid fa-gem text-purple-400" title="Premium"></i>
            </span>
        </h1>

        <p className="text-sm text-gray-300 mb-6 font-mono tracking-wide">
            Engineer <br /> 
        </p>

        {/* Rich Presence 1 */}
        <div className="bg-black/60 rounded-xl p-4 w-full mb-4 text-left flex items-center gap-4 border border-white/5 shadow-inner">
            <div className="flex-1">
                <p className="text-sm font-bold text-white">Currently building</p>
                <p className="text-xs text-gray-300 mt-0.5">Self-host website</p>
                <p className="text-xs text-gray-500">Javascript & Node.js</p>
            </div>
            <i className="fa-brands fa-node-js text-3xl text-gray-400"></i>
        </div>

         {/* Rich Presence 2 */}
         <div className="bg-black/60 rounded-xl p-4 w-full mb-6 text-left flex items-center gap-4 border border-white/5 shadow-inner">
            <div className="flex-1">
                <p className="text-sm font-bold text-white">Used to build</p>
                <p className="text-xs text-gray-300 mt-0.5">Renting platform</p>
                <p className="text-xs text-gray-500">.NET & Typescript</p>
            </div>
            <i className="fa-brands fa-windows text-2xl text-gray-500"></i>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 mb-8">
            <a href="https://github.com/laithanhmai334" target="_blank" rel="noreferrer" className="text-2xl text-gray-400 hover:text-white transition-all transform hover:-translate-y-1 hover:scale-110">
                <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/truongnhanguyen" target="_blank" rel="noreferrer" className="text-2xl text-gray-400 hover:text-white transition-all transform hover:-translate-y-1 hover:scale-110">
                <i className="fa-brands fa-linkedin"></i>
            </a>
        </div>
      </main>
    </div>
  )
}