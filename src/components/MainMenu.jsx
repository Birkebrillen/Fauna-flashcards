import React from 'react'
import { motion } from 'framer-motion'

const MainMenu = ({ onNavigate }) => {
  const items = [
    { id: 'search', emoji: '🔍', label: 'Søg', desc: 'Find arter efter navn', color: 'from-nature-400 to-nature-600' },
    { id: 'flashcards', emoji: '🎴', label: 'Flashcards', desc: 'Test din viden', color: 'from-water-400 to-water-600' },
    { id: 'about', emoji: '⚙️', label: 'Om / Info', desc: 'Om denne app', color: 'from-nature-500 to-water-500' }
  ]
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="text-center mb-12" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-nature-600 to-water-600 bg-clip-text text-transparent mb-2">🌿 Fauna Flashcards 💧</h1>
        <p className="text-nature-700">Danske Bilag IV-arter & Ferskvandsfisk</p>
      </motion.div>
      <div className="grid gap-4 w-full max-w-md">
        {items.map((item, i) => (
          <motion.button key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => onNavigate(item.id)} className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg text-left flex items-center gap-4 hover:shadow-xl transition-shadow">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-md`}>{item.emoji}</div>
            <div><h2 className="text-xl font-semibold text-gray-800">{item.label}</h2><p className="text-gray-500 text-sm">{item.desc}</p></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
export default MainMenu
