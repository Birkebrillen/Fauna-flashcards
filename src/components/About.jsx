import React from 'react'
import { motion } from 'framer-motion'

const About = ({ onBack }) => (
  <motion.div className="min-h-screen p-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md">← Tilbage</button>
      <h1 className="text-2xl font-bold text-nature-700">Om Fauna Flashcards</h1>
    </div>
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/90 rounded-3xl p-6 shadow-xl text-center">
        <p className="text-6xl mb-4">🌿🦎🐸</p>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-nature-600 to-water-600 bg-clip-text text-transparent">Fauna Flashcards</h2>
        <p className="text-gray-500 mt-2">Version 1.0.0</p>
        <p className="text-gray-600 mt-4">En interaktiv læringsapp til danske Bilag IV-arter og ferskvandsfisk.</p>
      </div>
      <div className="bg-white/80 rounded-2xl p-5 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-3">🛠️ Teknologi</h3>
        <div className="flex flex-wrap gap-2">{['React', 'Vite', 'Tailwind CSS', 'Framer Motion'].map(t => <span key={t} className="px-3 py-1 bg-nature-100 text-nature-700 rounded-full text-sm">{t}</span>)}</div>
      </div>
      <p className="text-center text-nature-500 text-sm">Lavet med 💚 for dansk natur</p>
    </div>
  </motion.div>
)
export default About
