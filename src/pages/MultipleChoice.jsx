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
  const [categoryFilter, setCategoryFilter] = useState('alle')
  const [difficultyFilter, setDifficultyFilter] = useState('alle')
  const [quizStarted, setQuizStarted] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState([])

  const categories = ['alle', 'morfologi', 'fysiologi', 'artsbestemmelse', 'adfærd', 'reproduktion', 'livscyklus', 'terminologi', 'bevarelse', 'udbredelse', 'økologi', 'taxonomi']
  const difficulties = ['alle', 'let', 'mellem', 'svær']

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const startQuiz = () => {
    let filtered = [...fauna.quizQuestions]
    
    if (categoryFilter !== 'alle') {
      filtered = filtered.filter(q => q.kategori === categoryFilter)
    }
    if (difficultyFilter !== 'alle') {
      filtered = filtered.filter(q => q.difficulty === difficultyFilter)
    }
    
    const shuffled = shuffleArray(filtered).slice(0, 10)
    setQuestions(shuffled)
    
    if (shuffled.length > 0) {
      setShuffledOptions(shuffleArray(shuffled[0].options))
    }
    
    setQuizStarted(true)
  }

  useEffect(() => {
    if (questions.length > 0 && idx < questions.length) {
      setShuffledOptions(shuffleArray(questions[idx].options))
    }
  }, [idx, questions])

  const handleAnswer = (ans) => {
    if (showResult) return
    setSelected(ans)
    setShowResult(true)
    const correct = ans === questions[idx].correctAnswer
    setScore(s => correct ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setTimeout(() => {
      if (idx < questions.length - 1) {
        setIdx(i => i + 1)
        setSelected(null)
        setShowResult(false)
      } else {
        setDone(true)
      }
    }, 2000)
  }

  const getStyle = (opt) => {
    if (!showResult) return 'bg-white hover:bg-nature-50 border-nature-200'
    if (opt === questions[idx].correctAnswer) return 'bg-green-100 border-green-500 text-green-800'
    if (opt === selected) return 'bg-red-100 border-red-500 text-red-800'
    return 'bg-gray-100 border-gray-200 opacity-50'
  }

  const resetQuiz = () => {
    setIdx(0)
    setScore({ correct: 0, wrong: 0 })
    setSelected(null)
    setShowResult(false)
    setDone(false)
    setQuizStarted(false)
    setShuffledOptions([])
  }

  if (!quizStarted) {
    return (
      <motion.div className="min-h-screen p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md">← Tilbage</button>
          <h1 className="text-2xl font-bold text-nature-700">Multiple Choice Quiz</h1>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
            <h2 className="font-bold text-lg text-gray-800 mb-4">⚙️ Quiz-indstillinger</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-nature-200 focus:border-nature-400 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'alle' ? '📋 Alle kategorier' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sværhedsgrad</label>
              <div className="flex gap-2">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                      difficultyFilter === diff
                        ? diff === 'let' ? 'bg-green-500 text-white'
                        : diff === 'mellem' ? 'bg-yellow-500 text-white'
                        : diff === 'svær' ? 'bg-red-500 text-white'
                        : 'bg-nature-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {diff === 'alle' ? 'Alle' : diff === 'let' ? '🟢 Let' : diff === 'mellem' ? '🟡 Mellem' : '🔴 Svær'}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuiz}
              className="w-full py-4 bg-gradient-to-r from-nature-500 to-water-500 text-white rounded-xl font-bold text-lg shadow-lg"
            >
              🎯 Start Quiz
            </motion.button>
          </div>

          <div className="bg-nature-50 rounded-xl p-4 text-center">
            <p className="text-sm text-nature-600">
              {fauna.quizQuestions.length} spørgsmål tilgængelige
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-nature-600 mb-4">Ingen spørgsmål matcher dine filtre</p>
        <button onClick={resetQuiz} className="px-6 py-3 bg-nature-500 text-white rounded-xl">
          Prøv andre indstillinger
        </button>
      </div>
    )
  }

  return (
    <motion.div className="min-h-screen p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={resetQuiz} className="p-2 rounded-full bg-white/80 shadow-md">← Afslut</button>
        <div className="flex gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✓ {score.correct}</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">✗ {score.wrong}</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="h-full bg-gradient-to-r from-nature-400 to-water-400 rounded-full transition-all"
            style={{ width: `${((idx + (done ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
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
                🔄 Ny quiz
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={idx}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              className="bg-white/90 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    questions[idx].difficulty === 'let' ? 'bg-green-100 text-green-700' :
                    questions[idx].difficulty === 'mellem' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {questions[idx].difficulty === 'let' ? '🟢 Let' :
                     questions[idx].difficulty === 'mellem' ? '🟡 Mellem' : '🔴 Svær'}
                  </span>
                  {questions[idx].kategori && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {questions[idx].kategori}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 text-sm">{idx + 1}/{questions.length}</span>
              </div>

              <div className="bg-gradient-to-br from-nature-50 to-water-50 rounded-2xl p-5 mb-6">
                <p className="text-lg text-gray-700 font-medium text-center leading-relaxed">
                  {questions[idx].question}
                </p>
              </div>

              <div className="space-y-3">
                {shuffledOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${getStyle(opt)}`}
                  >
                    <span className="text-sm">{opt}</span>
                  </button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl text-center ${
                    selected === questions[idx].correctAnswer
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <p className="font-medium">
                    {selected === questions[idx].correctAnswer ? '✅ Korrekt!' : '❌ Forkert!'}
                  </p>
                  {selected !== questions[idx].correctAnswer && (
                    <p className="text-sm mt-1">Rigtigt svar: {questions[idx].correctAnswer}</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default MultipleChoice
