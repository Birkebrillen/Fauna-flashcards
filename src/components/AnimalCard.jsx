import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimalCard = ({ animal }) => {
  const [open, setOpen] = useState(null)
  const sections = [
    { key: 'habitat', label: '🏠 Habitat' },
    { key: 'kendetegn', label: '🔍 Kendetegn' },
    { key: 'ynglested', label: '🥚 Ynglested' },
    { key: 'rastested', label: '😴 Rastested' },
    { key: 'foede', label: '🍽️ Føde' },
    { key: 'forvekslingsmuligheder', label: '⚠️ Forvekslinger' },
    { key: 'udbredelse', label: '🗺️ Udbredelse' }
  ]
  const emoji = { padder: '🐸', krybdyr: '🦎', pattedyr: '🦦', fisk: '🐟' }

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-nature-50 to-water-50">
        <span className={`inline-block px-3 py-1 rounded-full text-white text-xs mb-2 ${animal.type === 'bilag-iv' ? 'bg-nature-500' : 'bg-water-500'}`}>{animal.type === 'bilag-iv' ? 'Bilag IV-art' : 'Ferskvandsfisk'}</span>
        <div className="flex justify-between items-start">
          <div><h2 className="text-2xl font-bold text-gray-800">{animal.danskNavn}</h2><p className="text-nature-600 italic">{animal.latinskNavn}</p></div>
          <span className="text-4xl">{emoji[animal.kategori]}</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {sections.map(s => (
          <div key={s.key} className="border border-nature-100 rounded-xl overflow-hidden">
            <button onClick={() => setOpen(open === s.key ? null : s.key)} className={`w-full p-4 text-left flex justify-between items-center ${open === s.key ? 'bg-nature-50' : 'hover:bg-gray-50'}`}>
              <span className="font-medium text-gray-700">{s.label}</span><span>{open === s.key ? '▲' : '▼'}</span>
            </button>
            <AnimatePresence>{open === s.key && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><p className="p-4 pt-0 text-gray-600 text-sm">{animal[s.key]}</p></motion.div>}</AnimatePresence>
          </div>
        ))}
        <div className="mt-4 p-4 bg-gradient-to-r from-nature-100 to-water-100 rounded-xl">
          <p className="font-medium text-nature-700 text-sm">🛡️ Fredningsstatus</p>
          <p className="text-nature-600 text-sm">{animal.fredningsstatus}</p>
        </div>
      </div>
    </div>
  )
}
export default AnimalCard
