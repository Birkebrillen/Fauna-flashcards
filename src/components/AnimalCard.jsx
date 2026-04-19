import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimalCard = ({ animal }) => {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const emoji = { padder: '🐸', krybdyr: '🦎', pattedyr: '🦦', fisk: '🐟' }

  // Render nested object content (for kendetegn, fysiologi, forvekslingsmuligheder)
  const renderNestedContent = (data) => {
    if (typeof data === 'string') {
      return <p className="text-gray-600 text-sm leading-relaxed">{data}</p>
    }
    
    if (typeof data === 'object' && data !== null) {
      return (
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="border-l-2 border-nature-200 pl-3">
              <p className="font-medium text-nature-700 text-sm capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </p>
              {typeof value === 'string' ? (
                <p className="text-gray-600 text-sm leading-relaxed">{value}</p>
              ) : typeof value === 'object' ? (
                <div className="ml-2 space-y-2">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      <span className="font-medium text-gray-700 text-xs uppercase">{subKey}: </span>
                      <span className="text-gray-600 text-sm">{subValue}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const sections = [
    { key: 'habitat', label: '🏠 Habitat', color: 'nature' },
    { key: 'kendetegn', label: '🔍 Kendetegn', color: 'water', isNested: true },
    { key: 'fysiologi', label: '🧬 Fysiologi', color: 'purple', isNested: true },
    { key: 'ynglested', label: '🥚 Ynglested', color: 'nature' },
    { key: 'rastested', label: '😴 Rastested', color: 'water' },
    { key: 'foede', label: '🍽️ Føde', color: 'nature' },
    { key: 'forvekslingsmuligheder', label: '⚠️ Forvekslinger', color: 'amber', isNested: true },
    { key: 'udbredelse', label: '🗺️ Udbredelse', color: 'water' },
  ]

  const getColorClasses = (color) => {
    const colors = {
      nature: 'bg-nature-100 text-nature-600',
      water: 'bg-water-100 text-water-600',
      amber: 'bg-amber-100 text-amber-600',
      purple: 'bg-purple-100 text-purple-600'
    }
    return colors[color] || colors.nature
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-nature-50 to-water-50">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-white text-xs ${animal.type === 'bilag-iv' ? 'bg-nature-500' : animal.type === 'beskyttet' ? 'bg-amber-500' : 'bg-water-500'}`}>
            {animal.type === 'bilag-iv' ? '🛡️ Bilag IV' : animal.type === 'beskyttet' ? '🔒 Beskyttet' : '🐟 Ferskvandsfisk'}
          </span>
          <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
            {animal.kategori}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{animal.danskNavn}</h2>
            <p className="text-nature-600 italic">{animal.latinskNavn}</p>
          </div>
          <span className="text-4xl">{emoji[animal.kategori]}</span>
        </div>
      </div>

      {/* Sections */}
      <div className="p-4 space-y-2">
        {sections.map(section => {
          const content = animal[section.key]
          if (!content) return null

          return (
            <div key={section.key} className="border border-nature-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.key)}
                className={`w-full p-4 text-left flex justify-between items-center transition-colors ${openSections[section.key] ? 'bg-nature-50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(section.color)}`}>
                    <span className="text-sm">{section.label.split(' ')[0]}</span>
                  </div>
                  <span className="font-medium text-gray-700">{section.label.split(' ').slice(1).join(' ')}</span>
                </div>
                <span className="text-gray-400">{openSections[section.key] ? '▲' : '▼'}</span>
              </button>
              
              <AnimatePresence>
                {openSections[section.key] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">
                      {section.isNested ? renderNestedContent(content) : (
                        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* Fredningsstatus - always visible */}
        {animal.fredningsstatus && (
          <div className="mt-4 p-4 bg-gradient-to-r from-nature-100 to-water-100 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/80">
                <span className="text-lg">🛡️</span>
              </div>
              <div>
                <p className="font-medium text-nature-700 text-sm">Fredningsstatus</p>
                <p className="text-nature-600 text-sm">{animal.fredningsstatus}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimalCard
