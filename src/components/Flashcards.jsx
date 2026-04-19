import React from 'react'
import { motion } from 'framer-motion'

const Flashcards = ({ onNavigate, onBack }) => {
  const modes = [
    { id: 'swipe-quiz', emoji: '👆', title: 'Swipe Quiz', desc: 'Swipe rigtigt eller forkert', color: 'from-nature-400 to-nature-600' },
    { id: 'multiple-choice', emoji: '📝', title: 'Multiple Choice', desc: 'Vælg det rigtige svar', color: 'from-water-400 to-water-600' }
  ]
  return (
    <motion.div className="min-h-screen p-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md">← Tilbage</button>
        <h1 className="text-2xl font-bold text-nature-700">Flashcards</h1>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        <p className="text-center text-nature-600 mb-6">Vælg quiz-type:</p>
        {modes.map((m, i) => (
          <motion.button key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }} onClick={() => onNavigate(m.id)} className="w-full bg-white/90 rounded-2xl p-6 shadow-lg text-left flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-3xl shadow-lg`}>{m.emoji}</div>
            <div><h2 className="text-xl font-bold text-gray-800">{m.title}</h2><p className="text-gray-500">{m.desc}</p></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
export default Flashcards
