import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import fauna from '../data/fauna.json'

const MultipleChoice = ({ onBack }) => {
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [done, setDone] = useState(false)

  useEffect(() => { setQuestions([...fauna.quizQuestions].sort(() => Math.random() - 0.5).slice(0, 6)) }, [])

  const handleAnswer = (ans) => {
    if (showResult) return
    setSelected(ans); setShowResult(true)
    const correct = ans === questions[idx].correctAnswer
    setScore(s => correct ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setTimeout(() => { if (idx < questions.length - 1) { setIdx(i => i + 1); setSelected(null); setShowResult(false) } else setDone(true) }, 1500)
  }

  const getStyle = (opt) => {
    if (!showResult) return 'bg-white hover:bg-nature-50 border-nature-200'
    if (opt === questions[idx].correctAnswer) return 'bg-green-100 border-green-500'
    if (opt === selected) return 'bg-red-100 border-red-500'
    return 'bg-gray-100 border-gray-200 opacity-50'
  }

  if (!questions.length) return <div className="min-h-screen flex items-center justify-center">Indlæser...</div>

  return (
    <motion.div className="min-h-screen p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md">← Tilbage</button>
        <div className="flex gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">✓ {score.correct}</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">✗ {score.wrong}</span>
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        <div className="h-2 bg-gray-200 rounded-full mb-6"><div className="h-full bg-gradient-to-r from-nature-400 to-water-400 rounded-full transition-all" style={{ width: `${((idx + (done ? 1 : 0)) / questions.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/90 rounded-3xl p-8 shadow-xl text-center">
              <p className="text-5xl mb-4">🏆</p><h2 className="text-2xl font-bold mb-2">Færdig!</h2>
              <p className="text-gray-600 mb-6">{score.correct} af {questions.length} rigtige</p>
              <button onClick={() => { setIdx(0); setScore({ correct: 0, wrong: 0 }); setSelected(null); setShowResult(false); setDone(false); setQuestions(q => [...q].sort(() => Math.random() - 0.5)) }} className="px-6 py-3 bg-nature-500 text-white rounded-xl">Prøv igen</button>
            </motion.div>
          ) : (
            <motion.div key={idx} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} className="bg-white/90 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs ${questions[idx].difficulty === 'let' ? 'bg-green-100 text-green-700' : questions[idx].difficulty === 'mellem' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{questions[idx].difficulty === 'let' ? '🟢 Let' : questions[idx].difficulty === 'mellem' ? '🟡 Mellem' : '🔴 Svær'}</span>
                <span className="text-gray-400 text-sm">{idx + 1}/{questions.length}</span>
              </div>
              <div className="bg-nature-50 rounded-2xl p-5 mb-6"><p className="text-lg text-gray-700 font-medium text-center">{questions[idx].question}</p></div>
              <div className="space-y-3">{questions[idx].options.map((opt, i) => <button key={i} onClick={() => handleAnswer(opt)} disabled={showResult} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${getStyle(opt)}`}>{opt}</button>)}</div>
              {showResult && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-4 rounded-xl text-center ${selected === questions[idx].correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{selected === questions[idx].correctAnswer ? '✅ Korrekt!' : `❌ Forkert! Svar: ${questions[idx].correctAnswer}`}</motion.div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
export default MultipleChoice
