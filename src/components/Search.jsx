import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import fauna from '../data/fauna.json'
import AnimalCard from './AnimalCard'

const Search = ({ onBack }) => {
  const [term, setTerm] = useState('')
  const [idx, setIdx] = useState(0)
  const results = useMemo(() => {
    if (!term.trim()) return []
    const t = term.toLowerCase()
    return fauna.arter.filter(a => a.danskNavn.toLowerCase().includes(t) || a.latinskNavn.toLowerCase().includes(t) || a.kategori.toLowerCase().includes(t))
  }, [term])

  return (
    <motion.div className="min-h-screen p-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white">← Tilbage</button>
        <h1 className="text-2xl font-bold text-nature-700">Søg efter arter</h1>
      </div>
      <div className="max-w-xl mx-auto mb-6">
        <input type="text" placeholder="Søg på dansk eller latinsk navn..." value={term} onChange={(e) => { setTerm(e.target.value); setIdx(0) }} className="w-full px-5 py-4 rounded-2xl bg-white/90 border-2 border-nature-200 focus:border-nature-400 outline-none shadow-lg" />
      </div>
      <div className="max-w-2xl mx-auto">
        {term && results.length === 0 && <p className="text-center text-nature-600 py-12">Ingen arter fundet for "{term}"</p>}
        {results.length > 0 && (
          <>
            <p className="text-center text-nature-600 mb-4">{idx + 1} af {results.length}</p>
            <AnimatePresence mode="wait"><motion.div key={results[idx]?.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AnimalCard animal={results[idx]} /></motion.div></AnimatePresence>
            {results.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="px-6 py-3 rounded-xl bg-nature-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed">← Forrige</button>
                <button onClick={() => setIdx(i => Math.min(results.length - 1, i + 1))} disabled={idx === results.length - 1} className="px-6 py-3 rounded-xl bg-water-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed">Næste →</button>
              </div>
            )}
          </>
        )}
        {!term && <div className="text-center py-12"><p className="text-6xl mb-4">🦎</p><p className="text-nature-600">Indtast et søgeord for at finde arter</p></div>}
      </div>
    </motion.div>
  )
}
export default Search
