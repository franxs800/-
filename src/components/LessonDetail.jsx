import React, { useState } from 'react'
import { getLessonById, ALL_LESSONS } from '../data/lessons'
import { IconVideo, IconBook, IconBrain, IconCheckCircle, IconXCircle, IconRotate, IconChevronRight, IconPlay, IconAward } from './icons'

export const LessonDetail = ({
  lessonId,
  initialTab = 'video',
  onBack,
  onOpenNextLesson,
  testProgress,
  onSaveAnswer,
  onResetLessonTests,
}) => {
  const lesson = getLessonById(lessonId)
  const [activeTab, setActiveTab] = useState(initialTab) // 'video' | 'theory' | 'tests'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Current lesson's saved answers: { [questionId]: { selectedOption, isCorrect } }
  const lessonAnswers = testProgress[lesson.id]?.answers || {}

  const currentQuestion = lesson.tests[currentQuestionIndex]
  const currentAnswer = lessonAnswers[currentQuestion.id]

  // Stats for this lesson
  const totalQuestions = lesson.tests.length // 30
  const answeredCount = Object.keys(lessonAnswers).length
  const correctCount = Object.values(lessonAnswers).filter(a => a.isCorrect).length
  const isAllAnswered = answeredCount === totalQuestions

  const handleSelectOption = (optionIndex) => {
    // If already answered, allow re-selection or stay
    const isCorrect = optionIndex === currentQuestion.correct
    onSaveAnswer(lesson.id, currentQuestion.id, optionIndex, isCorrect)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Calculate grade based on score out of 30
  const getGrade = (score) => {
    if (score >= 27) return { text: 'Отлично! (Оценка 5)', color: '#16a34a' }
    if (score >= 22) return { text: 'Хорошо! (Оценка 4)', color: '#2563eb' }
    if (score >= 16) return { text: 'Удовлетворительно (Оценка 3)', color: '#d97706' }
    return { text: 'Нужно повторить материал (Оценка 2)', color: '#dc2626' }
  }

  return (
    <div className="lesson-detail-page">
      {/* Top Breadcrumb & Navigation */}
      <div className="lesson-top-bar">
        <button className="back-link-btn" onClick={onBack}>
          ← Вернуться в каталог уроков
        </button>
        <span className="lesson-breadcrumb-tag">
          {lesson.moduleTitle} • Урок {lesson.id} из {ALL_LESSONS.length}
        </span>
      </div>

      {/* Lesson Header */}
      <div className="lesson-header-box">
        <div className="lesson-header-meta">
          <span className="difficulty-badge">{lesson.difficulty}</span>
          <span className="duration-badge">⏱️ {lesson.duration}</span>
        </div>
        <h1 className="lesson-header-title">{lesson.title}</h1>
        <p className="lesson-header-desc">{lesson.summary}</p>

        {/* Tab Buttons */}
        <div className="lesson-tabs-nav">
          <button
            className={`lesson-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            <IconVideo />
            <span>1. Видео-лекция YouTube</span>
          </button>
          <button
            className={`lesson-tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            <IconBook />
            <span>2. Теория и формулы</span>
          </button>
          <button
            className={`lesson-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <IconBrain />
            <span>3. 30 Интерактивных тестов</span>
            <span className="tab-counter-badge">{correctCount}/30</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Video Lecture */}
      {activeTab === 'video' && (
        <div className="tab-pane video-tab-pane">
          <div className="video-player-container">
            <iframe
              className="youtube-iframe"
              src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="video-bottom-panel">
            <div className="video-timecodes-card">
              <h3 className="pane-card-title">📌 Ключевые таймкоды видео-лекции:</h3>
              <div className="timecodes-list">
                {lesson.videoTimecodes.map((tc, index) => (
                  <div key={index} className="timecode-row">
                    <span className="timecode-stamp">{tc.time}</span>
                    <span className="timecode-label">{tc.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="video-action-box">
              <h4>Посмотрели видео?</h4>
              <p>Закрепите материал конспектом и проверьте свои знания в 30 тестах этого урока!</p>
              <div className="btn-group-row">
                <button
                  className="btn btn-outline"
                  onClick={() => setActiveTab('theory')}
                >
                  Читать теорию →
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('tests')}
                >
                  Перейти к 30 тестам →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Theory and Formulas */}
      {activeTab === 'theory' && (
        <div className="tab-pane theory-tab-pane">
          <div className="theory-sections-container">
            {lesson.theory.sections.map((section, idx) => (
              <div key={idx} className="theory-section-card">
                <h3 className="theory-section-title">{section.heading}</h3>
                <div
                  className="theory-section-body"
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
              </div>
            ))}

            {/* Rules and tips box */}
            <div className="theory-rules-card">
              <h3 className="rules-card-title">💡 Золотые правила и частые ошибки:</h3>
              <ul className="rules-list">
                {lesson.theory.rules.map((rule, idx) => (
                  <li key={idx}>
                    <IconCheckCircle className="rule-icon" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="theory-next-action">
              <h3>Готовы к практике?</h3>
              <p>Пройдите 30 тестов к этому уроку, чтобы надежно закрепить материал в памяти.</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setActiveTab('tests')}
              >
                <span>Начать 30 проверочных тестов</span>
                <IconChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 30 Interactive Tests */}
      {activeTab === 'tests' && (
        <div className="tab-pane tests-tab-pane">
          {/* Top Progress & Stats Bar */}
          <div className="tests-status-bar">
            <div className="tests-status-left">
              <span className="tests-counter-title">
                Вопрос <strong>{currentQuestionIndex + 1}</strong> из <strong>{totalQuestions}</strong>
              </span>
              <div className="tests-bar-track">
                <div
                  className="tests-bar-fill"
                  style={{ width: `${Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%` }}
                />
              </div>
            </div>

            <div className="tests-status-right">
              <span className="badge-correct">✅ Верно: {correctCount}</span>
              <span className="badge-total">Решено: {answeredCount}/{totalQuestions}</span>
              <button
                className="reset-tests-btn"
                onClick={() => {
                  if (window.confirm('Сбросить ваши ответы для этого урока и начать 30 тестов заново?')) {
                    onResetLessonTests(lesson.id)
                    setCurrentQuestionIndex(0)
                  }
                }}
                title="Сбросить все ответы"
              >
                <IconRotate />
                <span>Заново</span>
              </button>
            </div>
          </div>

          {/* 1-to-30 Question Jump Navigation Pills */}
          <div className="question-pills-bar">
            {lesson.tests.map((test, index) => {
              const ans = lessonAnswers[test.id]
              const isCurrent = index === currentQuestionIndex
              let pillClass = 'unattempted'

              if (ans) {
                pillClass = ans.isCorrect ? 'correct' : 'incorrect'
              }
              if (isCurrent) {
                pillClass += ' current'
              }

              return (
                <button
                  key={test.id}
                  className={`q-pill ${pillClass}`}
                  onClick={() => setCurrentQuestionIndex(index)}
                  title={`Вопрос ${index + 1}`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>

          {/* If all 30 answered, show summary card at top */}
          {isAllAnswered && (
            <div className="tests-finished-card">
              <div className="finished-header">
                <IconAward className="trophy-icon" />
                <div>
                  <h3>Поздравляем! Все 30 тестов пройдены!</h3>
                  <p>
                    Ваш результат: <strong>{correctCount} из 30</strong> правильных ответов.
                  </p>
                  <span
                    className="grade-badge"
                    style={{ backgroundColor: getGrade(correctCount).color }}
                  >
                    {getGrade(correctCount).text}
                  </span>
                </div>
              </div>

              {lesson.id < ALL_LESSONS.length && (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => onOpenNextLesson(lesson.id + 1)}
                >
                  <span>Перейти к следующему уроку (Урок {lesson.id + 1})</span>
                  <IconChevronRight />
                </button>
              )}
            </div>
          )}

          {/* Active Question Card */}
          <div className="test-question-card">
            <div className="question-header">
              <span className="q-number-tag">Вопрос #{currentQuestionIndex + 1}</span>
              <span className="q-hint-tag">Выберите один правильный ответ</span>
            </div>

            <h2 className="question-text">{currentQuestion.question}</h2>

            {/* Options List */}
            <div className="options-grid">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = currentAnswer?.selectedOption === optIdx
                const isCorrectOption = optIdx === currentQuestion.correct
                const hasAnswered = !!currentAnswer

                let optionClass = ''
                if (hasAnswered) {
                  if (isCorrectOption) {
                    optionClass = 'option-correct'
                  } else if (isSelected && !currentAnswer.isCorrect) {
                    optionClass = 'option-wrong'
                  }
                } else if (isSelected) {
                  optionClass = 'option-selected'
                }

                return (
                  <button
                    key={optIdx}
                    className={`option-btn ${optionClass}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <span className="option-letter">
                      {['A', 'B', 'C', 'D'][optIdx]}
                    </span>
                    <span className="option-label">{opt}</span>
                    {hasAnswered && isCorrectOption && (
                      <span className="option-badge-icon">✓</span>
                    )}
                    {hasAnswered && isSelected && !isCorrectOption && (
                      <span className="option-badge-icon">✗</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explanation Box (Visible after answer) */}
            {currentAnswer && (
              <div
                className={`explanation-card ${
                  currentAnswer.isCorrect ? 'exp-correct' : 'exp-wrong'
                }`}
              >
                <div className="exp-header">
                  {currentAnswer.isCorrect ? (
                    <>
                      <IconCheckCircle className="exp-icon correct" />
                      <strong>Верно! Отличная работа!</strong>
                    </>
                  ) : (
                    <>
                      <IconXCircle className="exp-icon wrong" />
                      <strong>Неверно. Давайте разберем пошаговое решение:</strong>
                    </>
                  )}
                </div>
                <div className="exp-body">
                  <p><strong>Пояснение и ход решения:</strong></p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="question-bottom-controls">
              <button
                className="btn btn-outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                ← Предыдущий вопрос
              </button>

              <div className="q-nav-center">
                <span>Вопрос {currentQuestionIndex + 1} из 30</span>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                <span>Следующий вопрос</span>
                <IconChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
