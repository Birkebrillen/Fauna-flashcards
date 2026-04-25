import React from 'react'
import { motion } from 'framer-motion'
import fauna from '../data/fauna.json'

const About = ({ onBack }) => {
  const stats = {
    arter: fauna.arter.length,
    padder: fauna.arter.filter(a => a.kategori === 'padder').length,
    krybdyr: fauna.arter.filter(a => a.kategori === 'krybdyr').length,
    pattedyr: fauna.arter.filter(a => a.kategori === 'pattedyr').length,
    fisk: fauna.arter.filter(a => a.kategori === 'fisk').length,
    insekt: fauna.arter.filter(a => a.kategori === 'insekt').length,
    bløddyr: fauna.arter.filter(a => a.kategori === 'bløddyr').length,
    bilagIV: fauna.arter.filter(a => a.type === 'bilag-iv').length,
    quiz: fauna.quizQuestions.length
  }

  return (
    <motion.div
      className="min-h-screen p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow-md">← Tilbage</button>
        <h1 className="text-2xl font-bold text-nature-700">Om Fauna Flashcards</h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white/90 rounded-3xl p-6 shadow-xl text-center">
          <p className="text-6xl mb-4">🌿🦎🐸🐟</p>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-nature-600 to-water-600 bg-clip-text text-transparent">
            Fauna Flashcards
          </h2>
          <p className="text-gray-500 mt-2">Version 2.0.0</p>
          <p className="text-gray-600 mt-4">
            En faglig læringsapp til danske Bilag IV-arter, beskyttede arter og ferskvandsfisk.
            Designet til biologer, naturvejledere og fagfolk.
          </p>
        </div>

        {/* Statistics */}
        <div className="bg-white/90 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">📊 Database-statistik</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-nature-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-nature-600">{stats.arter}</p>
              <p className="text-sm text-gray-600">Arter i alt</p>
            </div>
            <div className="bg-water-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-water-600">{stats.quiz}</p>
              <p className="text-sm text-gray-600">Quiz-spørgsmål</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.bilagIV}</p>
              <p className="text-sm text-gray-600">Bilag IV-arter</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.fisk}</p>
              <p className="text-sm text-gray-600">Ferskvandsfisk</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-around text-center flex-wrap gap-2">
              <div>
                <span className="text-2xl">🐸</span>
                <p className="text-sm text-gray-600">{stats.padder} padder</p>
              </div>
              <div>
                <span className="text-2xl">🦎</span>
                <p className="text-sm text-gray-600">{stats.krybdyr} krybdyr</p>
              </div>
              <div>
                <span className="text-2xl">🦦</span>
                <p className="text-sm text-gray-600">{stats.pattedyr} pattedyr</p>
              </div>
              <div>
                <span className="text-2xl">🐟</span>
                <p className="text-sm text-gray-600">{stats.fisk} fisk</p>
              </div>
              <div>
                <span className="text-2xl">🦋</span>
                <p className="text-sm text-gray-600">{stats.insekt} insekter</p>
              </div>
              <div>
                <span className="text-2xl">🐚</span>
                <p className="text-sm text-gray-600">{stats.bløddyr} bløddyr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/90 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">✨ Funktioner</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-nature-500">✓</span>
              <span><strong>Detaljerede kendetegn</strong> for alle livsstadier (voksen, juvenile, larver/haletudser)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-nature-500">✓</span>
              <span><strong>Fysiologi-sektion</strong> med kromosomtal, temperaturtolerancer, levetid mm.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-nature-500">✓</span>
              <span><strong>Detaljerede forvekslingsmuligheder</strong> inkl. nøglekarakterer (fodrodsknude, pupilform osv.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-nature-500">✓</span>
              <span><strong>Faglige quiz-spørgsmål</strong> sorteret efter kategori og sværhedsgrad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-nature-500">✓</span>
              <span><strong>Swipe-quiz</strong> med sandt/falsk udsagn genereret fra artsdata</span>
            </li>
          </ul>
        </div>

        {/* Data sources */}
        <div className="bg-gradient-to-r from-nature-50 to-water-50 rounded-2xl p-5">
          <h3 className="font-semibold text-nature-700 mb-2">📚 Datakilder</h3>
          <p className="text-nature-600 text-sm">
            Data er baseret på faglig litteratur, Miljøstyrelsens artsbeskrivelser, 
            DCE - Nationalt Center for Miljø og Energi, samt Dansk Herpetologisk Forening.
            Informationen er vejledende - konsultér altid officielle kilder ved konkrete projekter.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="bg-white/80 rounded-2xl p-5 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">🛠️ Teknologi</h3>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion'].map(t => (
              <span key={t} className="px-3 py-1 bg-nature-100 text-nature-700 rounded-full text-sm">{t}</span>
            ))}
          </div>
        </div>

        <p className="text-center text-nature-500 text-sm pb-8">
          Lavet med 💚 for dansk natur og biodiversitet
        </p>
      </div>
    </motion.div>
  )
}

export default About
