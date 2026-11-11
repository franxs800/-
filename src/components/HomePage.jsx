import React from 'react'
import { MODULES, ALL_LESSONS } from '../data/lessons'
import { IconPlay, IconCheckCircle, IconBook, IconBrain, IconAward, IconSparkles, IconChevronRight } from './icons'

export const HomePage = ({ setActivePage, onOpenLesson, testProgress, userStats }) => {
  // Find current active lesson (first uncompleted or lesson 1)
  const currentLesson = ALL_LESSONS.find(l => {
    const passed = testProgress[l.id]?.correctCount || 0
    return passed < 30
  }) || ALL_LESSONS[0]

  const totalTestsAnswered = Object.values(testProgress).reduce(
    (sum, cur) => sum + (cur.correctCount || 0),
    0
  )

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="edu-hero-card">
        <div className="edu-hero-content">
          <div className="edu-hero-badge">
            <IconSparkles />
            <span>Обучение математике с нуля до результата</span>
          </div>
          <h1 className="edu-hero-title">
            Понятная математика: <br />
            <span className="edu-gradient-text">Видео-курс и 30 тестов к каждому уроку</span>
          </h1>
          <p className="edu-hero-desc">
            Никакой зубрежки без понимания! Мы начинаем с простейших чисел и дробей и пошагово доходим до алгебры, квадратных уравнений, геометрии и тригонометрии. Каждая тема закрепляется <strong>30 подробными тестами</strong> с пошаговым разбором.
          </p>

          <div className="edu-hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onOpenLesson(currentLesson.id)}
            >
              <IconPlay />
              <span>{userStats.xp > 0 ? 'Продолжить обучение' : 'Начать обучение с нуля'}</span>
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => setActivePage('catalog')}
            >
              <IconBook />
              <span>Каталог всех уроков</span>
            </button>
          </div>

          <div className="edu-hero-stats-strip">
            <div className="hero-stat-item">
              <strong>8</strong>
              <span>полных уроков</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>240</strong>
              <span>интерактивных тестов</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>100%</strong>
              <span>разборов решений</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>YouTube</strong>
              <span>видео к урокам</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card / Continue widget */}
        <div className="edu-hero-widget">
          <div className="continue-lesson-card">
            <div className="widget-tag">Текущий урок</div>
            <h3 className="widget-title">{currentLesson.title}</h3>
            <p className="widget-subtitle">{currentLesson.subtitle}</p>

            <div className="widget-progress-row">
              <div className="widget-progress-info">
                <span>Прогресс тестов:</span>
                <strong>{testProgress[currentLesson.id]?.correctCount || 0} из 30 решено</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${Math.min(100, Math.round(((testProgress[currentLesson.id]?.correctCount || 0) / 30) * 100))}%`
                  }}
                />
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={() => onOpenLesson(currentLesson.id)}
            >
              <span>Перейти к уроку</span>
              <IconChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Course Roadmap (4 Modules) */}
      <section className="edu-roadmap-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">Программа обучения по модулям</h2>
            <p className="section-main-subtitle">
              Логичный путь от базовой арифметики к уверенному решению уравнений и задач
            </p>
          </div>
          <button className="btn btn-outline" onClick={() => setActivePage('catalog')}>
            Смотреть все уроки →
          </button>
        </div>

        <div className="modules-grid">
          {MODULES.map((module) => {
            const moduleLessons = ALL_LESSONS.filter(l => module.lessonIds.includes(l.id))
            const moduleTestsTotal = moduleLessons.length * 30
            const moduleTestsDone = moduleLessons.reduce((sum, l) => sum + (testProgress[l.id]?.correctCount || 0), 0)

            return (
              <div key={module.id} className="module-card">
                <div className="module-card-header">
                  <span className="module-badge" style={{ backgroundColor: module.color }}>
                    {module.badge}
                  </span>
                  <span className="module-tests-count">{moduleLessons.length} уроков • {moduleTestsTotal} тестов</span>
                </div>

                <h3 className="module-title">{module.title}</h3>
                <p className="module-desc">{module.description}</p>

                {/* Lessons in module */}
                <div className="module-lessons-list">
                  {moduleLessons.map(lesson => {
                    const doneCount = testProgress[lesson.id]?.correctCount || 0
                    const isCompleted = doneCount >= 25

                    return (
                      <div
                        key={lesson.id}
                        className="module-lesson-row"
                        onClick={() => onOpenLesson(lesson.id)}
                      >
                        <div className="lesson-left">
                          <span className={`lesson-status-icon ${isCompleted ? 'completed' : ''}`}>
                            {isCompleted ? <IconCheckCircle /> : <IconPlay />}
                          </span>
                          <span className="lesson-row-name">{lesson.title}</span>
                        </div>
                        <div className="lesson-right">
                          <span className="lesson-tests-stat">{doneCount}/30 тестов</span>
                          <IconChevronRight className="arrow-icon" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features-section">
        <h2 className="section-main-title center">Почему наш курс работает</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-circle primary">
              <IconPlay />
            </div>
            <h4>Видео с YouTube</h4>
            <p>В каждый урок встроена понятная видео-лекция с таймкодами и объяснением наглядных примеров.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle success">
              <IconCheckCircle />
            </div>
            <h4>По 30 тестов к уроку</h4>
            <p>Ни один курс не дает столько практики! 30 тестов на каждую тему с мгновенной проверкой и подсказками.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle accent">
              <IconBrain />
            </div>
            <h4>Подробные решения</h4>
            <p>При любой ошибке система показывает пошаговый математический разбор правильного ответа.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle warning">
              <IconAward />
            </div>
            <h4>Шпаргалки и сертификат</h4>
            <p>Интерактивный справочник формул всегда под рукой, а по завершении курса выдается диплом.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
