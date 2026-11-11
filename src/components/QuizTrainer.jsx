import React, { useState, useEffect } from 'react'
import { ALL_LESSONS } from '../data/lessons'
import { IconBrain, IconClock, IconAward, IconCheckCircle, IconXCircle, IconRotate, IconPlay, IconChevronRight } from './icons'

export const QuizTrainer = ({ onOpenLesson, onAddXp }) => {
  const [selectedLessonId, setSelectedLessonId] = useState(1)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // { [qId]: { selected, isCorrect } }
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 min in seconds
  const [timerActive, setTimerActive] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  const activeLesson = ALL_LESSONS.find(l => l.id === Number(selectedLessonId)) || ALL_LESSONS[0]
  const questions = activeLesson.tests // 30 questions

  // Timer countdown
  useEffect(() => {
    let interval = null
    if (isTestRunning && !isFinished && timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTestRunning && !isFinished) {
      setIsFinished(true)
    }
    return () => clearInterval(interval)
  }, [isTestRunning, isFinished, timerActive, timeLeft])

  const startTest = () => {
    setUserAnswers({})
    setCurrentIdx(0)
    setTimeLeft(30 * 60)
    setIsFinished(false)
    setIsTestRunning(true)
  }

  const handleAnswer = (optionIdx) => {
    const q = questions[currentIdx]
    const isCorrect = optionIdx === q.correct
    setUserAnswers(prev => ({
      ...prev,
      [q.id]: { selected: optionIdx, isCorrect }
    }))
  }

  const finishTest = () => {
    setIsFinished(true)
    // Award XP
    const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length
    const earnedXp = correctCount * 15 + (correctCount >= 25 ? 100 : 20)
    if (onAddXp) onAddXp(earnedXp)
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const currentQ = questions[currentIdx]
  const currentAns = userAnswers[currentQ?.id]
  const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length

  return (
    <div className="trainer-page-container">
      <div className="trainer-header">
        <h1 className="trainer-title">Тренажер и экзаменатор по 30 тестам</h1>
        <p className="trainer-subtitle">
          Проверьте готовность в режиме реального времени с таймером или в спокойном темпе.
        </p>
      </div>

      {!isTestRunning ? (
        /* Configuration Screen */
        <div className="trainer-config-card">
          <div className="trainer-icon-badge">
            <IconBrain />
          </div>
          <h2>Выберите тему для тестирования из 30 вопросов</h2>
          <p>Каждый тест включает ровно 30 задач с возрастающей сложностью и подробными разборами.</p>

          <div className="trainer-select-row">
            <label>Урок для проверки:</label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(Number(e.target.value))}
              className="trainer-select"
            >
              {ALL_LESSONS.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  Урок {lesson.id}: {lesson.title} (30 тестов)
                </option>
              ))}
            </select>
          </div>

          <div className="timer-toggle-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={timerActive}
                onChange={(e) => setTimerActive(e.target.checked)}
              />
              <span>Включить таймер на 30 минут (как на настоящем экзамене)</span>
            </label>
          </div>

          <div className="trainer-start-actions">
            <button className="btn btn-primary btn-lg" onClick={startTest}>
              <IconPlay />
              <span>Начать тест (30 вопросов)</span>
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => onOpenLesson(selectedLessonId, 'theory')}
            >
              Сначала повторить теорию
            </button>
          </div>
        </div>
      ) : isFinished ? (
        /* Result Screen */
        <div className="trainer-result-card">
          <div className="trainer-result-header">
            <IconAward className="award-big-icon" />
            <h2>Тестирование завершено!</h2>
            <p className="result-lesson-name">{activeLesson.title}</p>
          </div>

          <div className="result-stats-grid">
            <div className="result-stat-box">
              <span className="stat-label">Правильных ответов:</span>
              <strong className="stat-val correct">{correctCount} из 30</strong>
            </div>
            <div className="result-stat-box">
              <span className="stat-label">Процент успеха:</span>
              <strong className="stat-val">{Math.round((correctCount / 30) * 100)}%</strong>
            </div>
            <div className="result-stat-box">
              <span className="stat-label">Оценка:</span>
              <strong className="stat-val">
                {correctCount >= 27 ? '5 (Отлично!)' : correctCount >= 22 ? '4 (Хорошо)' : correctCount >= 16 ? '3 (Удовл.)' : '2 (Повторить)'}
              </strong>
            </div>
          </div>

          {/* Review of all 30 questions */}
          <div className="trainer-review-section">
            <h3>Разбор всех 30 вопросов теста:</h3>
            <div className="trainer-review-list">
              {questions.map((q, idx) => {
                const ans = userAnswers[q.id]
                return (
                  <div key={q.id} className={`trainer-review-item ${ans?.isCorrect ? 'pass' : 'fail'}`}>
                    <div className="review-top-row">
                      <span className="review-q-num">Вопрос #{idx + 1}</span>
                      <span className="review-status">
                        {ans?.isCorrect ? '✅ Верно' : '❌ Ошибка'}
                      </span>
                    </div>
                    <p className="review-q-text">{q.question}</p>
                    <div className="review-answer-info">
                      <div>Правильный ответ: <strong>{q.options[q.correct]}</strong></div>
                      {ans && !ans.isCorrect && (
                        <div className="text-wrong">Ваш ответ: <strong>{q.options[ans.selected]}</strong></div>
                      )}
                    </div>
                    <div className="review-exp-box">
                      <strong>Пояснение:</strong> {q.explanation}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="result-actions">
            <button className="btn btn-primary btn-lg" onClick={startTest}>
              <IconRotate />
              <span>Пройти этот тест заново</span>
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => setIsTestRunning(false)}>
              Выбрать другой урок
            </button>
          </div>
        </div>
      ) : (
        /* Ongoing Test Screen */
        <div className="trainer-active-test">
          {/* Status Header */}
          <div className="trainer-active-bar">
            <div className="trainer-active-info">
              <span className="trainer-active-qnum">
                Вопрос <strong>{currentIdx + 1}</strong> из 30
              </span>
              <span className="trainer-active-score">Верно: {correctCount}</span>
            </div>

            {timerActive && (
              <div className={`trainer-timer-badge ${timeLeft < 300 ? 'urgent' : ''}`}>
                <IconClock />
                <span>Осталось времени: {formatTime(timeLeft)}</span>
              </div>
            )}

            <button className="btn btn-outline btn-sm" onClick={finishTest}>
              Завершить тест
            </button>
          </div>

          {/* Quick jump pills */}
          <div className="question-pills-bar">
            {questions.map((q, idx) => {
              const ans = userAnswers[q.id]
              const isCurrent = idx === currentIdx
              let cls = ans ? (ans.isCorrect ? 'correct' : 'incorrect') : 'unattempted'
              if (isCurrent) cls += ' current'
              return (
                <button
                  key={q.id}
                  className={`q-pill ${cls}`}
                  onClick={() => setCurrentIdx(idx)}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          {/* Question Card */}
          <div className="test-question-card">
            <div className="question-header">
              <span className="q-number-tag">Вопрос #{currentIdx + 1} из 30</span>
              <span className="q-hint-tag">{activeLesson.title}</span>
            </div>

            <h2 className="question-text">{currentQ.question}</h2>

            <div className="options-grid">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = currentAns?.selected === optIdx
                const isCorrect = optIdx === currentQ.correct
                const answered = !!currentAns

                let cls = ''
                if (answered) {
                  if (isCorrect) cls = 'option-correct'
                  else if (isSelected) cls = 'option-wrong'
                } else if (isSelected) {
                  cls = 'option-selected'
                }

                return (
                  <button
                    key={optIdx}
                    className={`option-btn ${cls}`}
                    onClick={() => handleAnswer(optIdx)}
                  >
                    <span className="option-letter">{['A', 'B', 'C', 'D'][optIdx]}</span>
                    <span className="option-label">{opt}</span>
                  </button>
                )
              })}
            </div>

            {currentAns && (
              <div className={`explanation-card ${currentAns.isCorrect ? 'exp-correct' : 'exp-wrong'}`}>
                <div className="exp-header">
                  {currentAns.isCorrect ? (
                    <>
                      <IconCheckCircle className="exp-icon correct" />
                      <strong>Верно!</strong>
                    </>
                  ) : (
                    <>
                      <IconXCircle className="exp-icon wrong" />
                      <strong>Разбор правильного решения:</strong>
                    </>
                  )}
                </div>
                <div className="exp-body">
                  <p>{currentQ.explanation}</p>
                </div>
              </div>
            )}

            <div className="question-bottom-controls">
              <button
                className="btn btn-outline"
                onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
              >
                ← Назад
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentIdx(i => i + 1)}
                >
                  <span>Следующий вопрос</span>
                  <IconChevronRight />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={finishTest}>
                  Завершить и подвести итоги
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
