/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HomePage } from './components/HomePage'
import { LessonsCatalog } from './components/LessonsCatalog'
import { LessonDetail } from './components/LessonDetail'
import { QuizTrainer } from './components/QuizTrainer'
import { FormulaHandbook } from './components/FormulaHandbook'
import { ProfilePage } from './components/ProfilePage'
import { ALL_LESSONS } from './data/lessons'
import './index.css'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [currentLessonId, setCurrentLessonId] = useState(1)
  const [lessonInitialTab, setLessonInitialTab] = useState('video')

  // User stats from localStorage
  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem('math_user_stats')
      return saved ? JSON.parse(saved) : { name: 'Александр', xp: 50, streak: 3 }
    } catch {
      return { name: 'Александр', xp: 50, streak: 3 }
    }
  })

  // Test progress: { [lessonId]: { correctCount, totalAnswered, answers: { [qId]: { selectedOption, isCorrect } } } }
  const [testProgress, setTestProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('math_test_progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('math_user_stats', JSON.stringify(userStats))
  }, [userStats])

  useEffect(() => {
    localStorage.setItem('math_test_progress', JSON.stringify(testProgress))
  }, [testProgress])

  // Open a specific lesson
  const handleOpenLesson = (lessonId, tab = 'video') => {
    setCurrentLessonId(lessonId)
    setLessonInitialTab(tab)
    setActivePage('lesson')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Save answer for a question in a lesson
  const handleSaveAnswer = (lessonId, questionId, selectedOption, isCorrect) => {
    setTestProgress(prev => {
      const lessonData = prev[lessonId] || { correctCount: 0, totalAnswered: 0, answers: {} }
      const prevAnswer = lessonData.answers[questionId]

      // If already correctly answered, don't change count
      let newCorrect = lessonData.correctCount
      if (!prevAnswer) {
        if (isCorrect) newCorrect += 1
      } else {
        if (!prevAnswer.isCorrect && isCorrect) newCorrect += 1
        if (prevAnswer.isCorrect && !isCorrect) newCorrect = Math.max(0, newCorrect - 1)
      }

      const newAnswers = {
        ...lessonData.answers,
        [questionId]: { selectedOption, isCorrect }
      }

      return {
        ...prev,
        [lessonId]: {
          answers: newAnswers,
          correctCount: newCorrect,
          totalAnswered: Object.keys(newAnswers).length
        }
      }
    })

    // Award XP if correct
    if (isCorrect) {
      setUserStats(prev => ({ ...prev, xp: (prev.xp || 0) + 10 }))
    }
  }

  // Reset tests for single lesson
  const handleResetLessonTests = (lessonId) => {
    setTestProgress(prev => {
      const copy = { ...prev }
      delete copy[lessonId]
      return copy
    })
  }

  // Reset all progress
  const handleResetAllProgress = () => {
    setTestProgress({})
    setUserStats(prev => ({ ...prev, xp: 0, streak: 1 }))
  }

  const handleUpdateName = (newName) => {
    setUserStats(prev => ({ ...prev, name: newName }))
  }

  const handleAddXp = (amount) => {
    setUserStats(prev => ({ ...prev, xp: (prev.xp || 0) + amount }))
  }

  return (
    <div className="edu-app">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(p) => {
          setActivePage(p)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        userStats={userStats}
      />

      {/* Main Page Content */}
      <main className="edu-main-wrapper">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenLesson={handleOpenLesson}
            testProgress={testProgress}
            userStats={userStats}
          />
        )}

        {activePage === 'catalog' && (
          <LessonsCatalog
            onOpenLesson={handleOpenLesson}
            testProgress={testProgress}
          />
        )}

        {activePage === 'lesson' && (
          <LessonDetail
            lessonId={currentLessonId}
            initialTab={lessonInitialTab}
            onBack={() => setActivePage('catalog')}
            onOpenNextLesson={(nextId) => handleOpenLesson(nextId, 'video')}
            testProgress={testProgress}
            onSaveAnswer={handleSaveAnswer}
            onResetLessonTests={handleResetLessonTests}
          />
        )}

        {activePage === 'trainer' && (
          <QuizTrainer
            onOpenLesson={handleOpenLesson}
            onAddXp={handleAddXp}
          />
        )}

        {activePage === 'formulas' && (
          <FormulaHandbook />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            userStats={userStats}
            onUpdateName={handleUpdateName}
            testProgress={testProgress}
            onResetAllProgress={handleResetAllProgress}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="edu-footer">
        <div className="edu-footer-inner">
          <div className="footer-brand-box">
            <span className="footer-logo">∑ АльфаМатематика</span>
            <p>Полный интерактивный курс математики с нуля: видео-лекции из YouTube и по 30 тестов к каждому уроку.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Главная</button>
            <button onClick={() => { setActivePage('catalog'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Все уроки</button>
            <button onClick={() => { setActivePage('trainer'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Тренажер 30 тестов</button>
            <button onClick={() => { setActivePage('formulas'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Справочник формул</button>
            <button onClick={() => { setActivePage('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Мой прогресс</button>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} АльфаМатематика. Все права защищены. Образовательная платформа для изучения математики.
          </div>
        </div>
      </footer>
    </div>
  )
}
