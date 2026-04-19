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
    // Generate questions from fauna data
    const generatedQuestions = []

    // True statements from kendetegn
    fauna.arter.forEach(art => {
      if (art.kendetegn) {
        const kendetegn = typeof art.kendetegn === 'string' 
          ? art.kendetegn 
          : art.kendetegn.voksen || Object.values(art.kendetegn)[0]
        
        if (kendetegn && kendetegn.length > 20) {
          generatedQuestions.push({
            id: `true-${art.id}`,
            statement: `${art.danskNavn}: "${kendetegn.slice(0, 80)}${kendetegn.length > 80 ? '...' : ''}"`,
            isTrue: true,
            explanation: kendetegn
          })
        }
      }

      // True statements from fysiologi
      if (art.fysiologi) {
        const fysioKey = Object.keys(art.fysiologi)[0]
        if (fysioKey && art.fysiologi[fysioKey]) {
          generatedQuestions.push({
            id: `fysio-${art.id}`,
            statement: `${art.danskNavn} - Fysiologi: "${art.fysiologi[fysioKey].slice(0, 70)}..."`,
            isTrue: true,
            explanation: art.fysiologi[fysioKey]
          })
        }
      }
    })

    // False statements
    const falseStatements = [
      { id: 'false-1', statement: "Stor vandsalamander har en BLÅ bug med hvide pletter", isTrue: false, explanation: "Stor vandsalamander har ORANGE bug med sorte pletter" },
      { id: 'false-2', statement: "Butsnudet frø har 2n = 24 kromosomer", isTrue: false, explanation: "Butsnudet frø har 2n = 26 kromosomer (spidssnudet har 2n = 24)" },
      { id: 'false-3', statement: "Hugorm har RUND pupil ligesom snog", isTrue: false, explanation: "Hugorm har LODRET pupil - snog har rund pupil" },
      { id: 'false-4', statement: "Markfirben føder levende unger", isTrue: false, explanation: "Markfirben er ÆGLÆGGENDE - det er skovfirben der føder levende unger" },
      { id: 'false-5', statement: "Odderen blev totalfredet i Danmark i 1992", isTrue: false, explanation: "Odderen blev totalfredet i 1967" },
      { id: 'false-6', statement: "Løgfrø har VANDRET pupil som andre frøer", isTrue: false, explanation: "Løgfrø har LODRET pupil - unikt blandt danske frøer" },
      { id: 'false-7', statement: "Bæklampret er en PARASIT på andre fisk", isTrue: false, explanation: "Bæklampret har STUMPE tænder og kan IKKE parasitere - det er flodlampret der parasiterer" },
      { id: 'false-8', statement: "Klokkefrø har den TYKKESTE hud blandt danske padder", isTrue: false, explanation: "Klokkefrø har den TYNDESTE hud - kan optage 90% ilt gennem huden" },
      { id: 'false-9', statement: "Spidssnudet frøs fodrodsknude er lav og rund", isTrue: false, explanation: "Spidssnudet frø har HØJ, SAMMENTRYKT, SPADEFORMET fodrodsknude - det er butsnudet der har lav, rund" },
      { id: 'false-10', statement: "Laks har pletter BÅDE over og under sidelinjen", isTrue: false, explanation: "Laks har pletter OVERVEJENDE OVER sidelinjen - havørred har pletter både over og under" },
      { id: 'false-11', statement: "Grønbroget tudse er DIPLOID (2n = 22)", isTrue: false, explanation: "Grønbroget tudse er TETRAPLOID (4n = 44)" },
      { id: 'false-12', statement: "Ål gyder i Middelhavet", isTrue: false, explanation: "Ål gyder i SARGASSOHAVET i Atlanterhavet - over 5000 km væk" },
    ]

    const allQuestions = [...generatedQuestions, ...falseStatements]
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)

    setQuestions(allQuestions)
  }, [])

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-20, 20])
  const rightOp = useTransform(x, [0, 100], [0, 1])
  const leftOp = useTransform(x, [-100, 0], [1, 0])

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) < 100) return
    
    const swipedRight = info.offset.x > 0
    const correct = swipedRight === questions[idx].isTrue
    
    setScore(s => correct ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setFeedback({
      correct,
      explanation: questions[idx].explanation,
      wasTrue: questions[idx].isTrue
    })
    
    setTimeout(() => {
      setFeedback(null)
      if (idx < questions.length - 1) {
        setIdx(i => i + 1)
      } else {
        setDone(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setIdx(0)
    setScore({ correct: 0, wrong: 0 })
    setFeedback(null)
    setDone(false)
    setQuestions(q => [...q].sort(() => Math.random() - 0.5))
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-nature-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <motion.div className="min-h-screen p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md">← Tilbage</button>
        <div className="flex gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✓ {score.correct}</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">✗ {score.wrong}</span>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="h-2 bg-gray-200 rounded-full mb-4">
          <div
            className="h-full bg-gradient-to-r from-nature-400 to-water-400 rounded-full transition-all"
            style={{ width: `${((idx + (done ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-500 mb-4">{idx + 1} / {questions.length}</p>

        {done ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 rounded-3xl p-8 shadow-xl text-center"
          >
            <p className="text-5xl mb-4">
              {score.correct === questions.length ? '🏆' :
               score.correct >= questions.length * 0.7 ? '🎉' :
               score.correct >= questions.length * 0.5 ? '👍' : '💪'}
            </p>
            <h2 className="text-2xl font-bold mb-2">Quiz færdig!</h2>
            <p className="text-gray-600 mb-2">{score.correct} af {questions.length} rigtige</p>
            <p className="text-lg font-bold text-nature-600 mb-6">
              {Math.round((score.correct / questions.length) * 100)}% korrekt
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-nature-500 to-water-500 text-white rounded-xl font-medium"
            >
              🔄 Prøv igen
            </button>
          </motion.div>
        ) : (
          <div className="relative h-[350px]">
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <div className={`p-6 rounded-2xl max-w-sm ${
                    feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <p className="text-2xl font-bold text-center mb-2">
                      {feedback.correct ? '✅ Korrekt!' : '❌ Forkert!'}
                    </p>
                    <p className="text-sm text-center">
                      Udsagnet var {feedback.wasTrue ? 'SANDT' : 'FALSK'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!feedback && (
              <motion.div
                className="absolute w-full cursor-grab active:cursor-grabbing"
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                <motion.div
                  className="absolute -left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-10"
                  style={{ opacity: leftOp }}
                >
                  ❌ FORKERT
                </motion.div>
                <motion.div
                  className="absolute -right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-10"
                  style={{ opacity: rightOp }}
                >
                  ✓ RIGTIGT
                </motion.div>

                <div className="bg-white/90 rounded-3xl p-6 shadow-xl">
                  <p className="text-sm text-nature-500 text-center mb-4 font-medium">
                    Er dette udsagn RIGTIGT eller FORKERT?
                  </p>
                  <div className="bg-gradient-to-br from-nature-50 to-water-50 rounded-2xl p-5 mb-4 min-h-[120px] flex items-center justify-center">
                    <p className="text-gray-700 text-center leading-relaxed">
                      {questions[idx].statement}
                    </p>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 px-2">
                    <span>← Swipe venstre = Forkert</span>
                    <span>Rigtigt = Swipe højre →</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {!done && !feedback && (
          <p className="text-center text-nature-600 text-sm mt-4">
            💡 Spørgsmålene tester din viden om fysiologi, morfologi og artsbestemmelse
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default SwipeQuiz
