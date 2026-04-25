import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import fauna from '../data/fauna.json'
import AnimalCard from './AnimalCard'

const Search = ({ onBack }) => {
  const [term, setTerm] = useState('')
  const [idx, setIdx] = useState(0)
  const [filter, setFilter] = useState('alle')

  const results = useMemo(() => {
    let filtered = fauna.arter

    // Apply category filter
    if (filter !== 'alle') {
      filtered = filtered.filter(a => a.kategori === filter)
    }

    // Apply search term
    if (term.trim()) {
      const t = term.toLowerCase()
      filtered = filtered.filter(a =>
        a.danskNavn.toLowerCase().includes(t) ||
        a.latinskNavn.toLowerCase().includes(t) ||
        a.kategori.toLowerCase().includes(t) ||
        a.habitat?.toLowerCase().includes(t) ||
        a.type?.toLowerCase().includes(t) ||
        JSON.stringify(a.kendetegn || {}).toLowerCase().includes(t) ||
        JSON.stringify(a.fysiologi || {}).toLowerCase().includes(t)
      )
    }

    return filtered
  }, [term, filter])

  const categories = [
    { id: 'alle', label: 'Alle', emoji: '📋' },
    { id: 'padder', label: 'Padder', emoji: '🐸' },
    { id: 'krybdyr', label: 'Krybdyr', emoji: '🦎' },
    { id: 'pattedyr', label: 'Pattedyr', emoji: '🦦' },
    { id: 'fisk', label: 'Fisk', emoji: '🐟' },
    { id: 'insekt', label: 'Insekter', emoji: '🦋' },
    { id: 'bløddyr', label: 'Bløddyr', emoji: '🐚' },
  ]

  return (
    <motion.div
      className="min-h-screen p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors">
          ← Tilbage
        </button>
        <h1 className="text-2xl font-bold text-nature-700">Søg efter arter</h1>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-4">
        <input
          type="text"
          placeholder="Søg på navn, latinsk navn, habitat, kendetegn..."
          value={term}
          onChange={(e) => { setTerm(e.target.value); setIdx(0) }}
          className="w-full px-5 py-4 rounded-2xl bg-white/90 border-2 border-nature-200 focus:border-nature-400 outline-none shadow-lg"
        />
      </div>

      {/* Category Filters */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setFilter(cat.id); setIdx(0) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.id
                  ? 'bg-nature-500 text-white shadow-md'
                  : 'bg-white/80 text-gray-600 hover:bg-nature-100'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-2xl mx-auto mb-4 text-center">
        <span className="text-sm text-nature-600 bg-white/80 px-4 py-2 rounded-full">
          {results.length} {results.length === 1 ? 'art' : 'arter'} fundet
          {results.length > 0 && ` • Viser ${idx + 1} af ${results.length}`}
        </span>
      </div>

      {/* Results */}
      <div className="max-w-2xl mx-auto">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-nature-600">Ingen arter fundet</p>
            <p className="text-nature-400 text-sm mt-2">Prøv et andet søgeord eller filter</p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={results[idx]?.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <AnimalCard animal={results[idx]} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {results.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setIdx(i => Math.max(0, i - 1))}
                  disabled={idx === 0}
                  className="px-6 py-3 rounded-xl bg-nature-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  ← Forrige
                </button>
                <button
                  onClick={() => setIdx(i => Math.min(results.length - 1, i + 1))}
                  disabled={idx === results.length - 1}
                  className="px-6 py-3 rounded-xl bg-water-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Næste →
                </button>
              </div>
            )}

            {/* Quick jump */}
            {results.length > 5 && (
              <div className="mt-4 text-center">
                <select
                  value={idx}
                  onChange={(e) => setIdx(Number(e.target.value))}
                  className="px-4 py-2 rounded-xl bg-white/80 border border-nature-200 text-sm"
                >
                  {results.map((r, i) => (
                    <option key={r.id} value={i}>
                      {r.danskNavn} ({r.latinskNavn})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Search
