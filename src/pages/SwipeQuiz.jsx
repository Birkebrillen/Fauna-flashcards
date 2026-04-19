import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import fauna from '../data/fauna.json'

const SwipeQuiz = ({ onBack }) => {
  const [questions, setQuestions] = useState([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [feedback, setFeedback] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const qs = fauna.arter.map(a => ({ id: a.id, statement: `${a.danskNavn}: "${a.kendetegn.slice(0, 60)}..."`, isTrue: true }))
    const falseQs = [
      { id: 100, statement: "Stor Vandsalamander har blå bug med hvide pletter", isTrue: false },
      { id: 101, statement: "Odderen blev totalfredet i 1992", isTrue: false },
      { id: 102, statement: "Markfirben lever i fugtige skove", isTrue: false }
    ]
    setQuestions([...qs, ...falseQs].sort(() => Math.random() - 0.5).slice(0, 6))
  }, [])

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-20, 20])
  const rightOp = useTransform(x, [0, 100], [0, 1])
  const leftOp = useTransform(x, [-100, 0], [1, 0])

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) < 100) return
    const right = info.offset.x > 0
    const correct = right === questions[idx].isTrue
    setScore(s => correct ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setFeedback(correct ? '✅ Korrekt!' : '❌ Forkert!')
    setTimeout(() => { setFeedback(null); if (idx < questions.length - 1) setIdx(i => i + 1); else setDone(true) }, 1000)
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
      <div className="max-w-md mx-auto">
        <div className="h-2 bg-gray-200 rounded-full mb-4"><div className="h-full bg-gradient-to-r from-nature-400 to-water-400 rounded-full transition-all" style={{ width: `${((idx + (done ? 1 : 0)) / questions.length) * 100}%` }} /></div>
        {done ? (
          <div className="bg-white/90 rounded-3xl p-8 shadow-xl text-center">
            <p className="text-5xl mb-4">🏆</p><h2 className="text-2xl font-bold mb-2">Færdig!</h2>
            <p className="text-gray-600 mb-4">{score.correct} af {questions.length} rigtige</p>
            <button onClick={() => { setIdx(0); setScore({ correct: 0, wrong: 0 }); setDone(false); setQuestions(q => [...q].sort(() => Math.random() - 0.5)) }} className="px-6 py-3 bg-nature-500 text-white rounded-xl">Prøv igen</button>
          </div>
        ) : (
          <div className="relative h-[300px]">
            <AnimatePresence>{feedback && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-20"><div className={`p-6 rounded-2xl text-2xl font-bold ${feedback.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{feedback}</div></motion.div>}</AnimatePresence>
            {!feedback && (
              <motion.div className="absolute w-full cursor-grab active:cursor-grabbing" style={{ x, rotate }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
                <motion.div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-10" style={{ opacity: leftOp }}>❌</motion.div>
                <motion.div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-10" style={{ opacity: rightOp }}>✓</motion.div>
                <div className="bg-white/90 rounded-3xl p-6 shadow-xl">
                  <p className="text-sm text-nature-500 text-center mb-4">Er dette rigtigt eller forkert?</p>
                  <div className="bg-nature-50 rounded-2xl p-5 mb-4"><p className="text-gray-700">{questions[idx].statement}</p></div>
                  <p className="text-xs text-gray-400 text-center">← Forkert | Rigtigt →</p>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
export default SwipeQuiz
