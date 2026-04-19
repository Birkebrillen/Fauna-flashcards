import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import MainMenu from './components/MainMenu'
import Search from './components/Search'
import Flashcards from './components/Flashcards'
import About from './components/About'
import SwipeQuiz from './pages/SwipeQuiz'
import MultipleChoice from './pages/MultipleChoice'

function App() {
  const [view, setView] = useState('menu')
  const views = {
    menu: <MainMenu onNavigate={setView} />,
    search: <Search onBack={() => setView('menu')} />,
    flashcards: <Flashcards onNavigate={setView} onBack={() => setView('menu')} />,
    about: <About onBack={() => setView('menu')} />,
    'swipe-quiz': <SwipeQuiz onBack={() => setView('flashcards')} />,
    'multiple-choice': <MultipleChoice onBack={() => setView('flashcards')} />
  }
  return <div className="min-h-screen"><AnimatePresence mode="wait">{views[view]}</AnimatePresence></div>
}
export default App
