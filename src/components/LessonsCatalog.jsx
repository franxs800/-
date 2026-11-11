import React, { useState } from 'react'
import { ALL_LESSONS, MODULES } from '../data/lessons'
import { IconSearch, IconVideo, IconBrain, IconCheckCircle, IconPlay } from './icons'

export const LessonsCatalog = ({ onOpenLesson, testProgress }) => {
  const [selectedModule, setSelectedModule] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLessons = ALL_LESSONS.filter((lesson) => {
    if (selectedModule !== 'all' && lesson.moduleId !== Number(selectedModule)) {
      return false
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchTitle = lesson.title.toLowerCase().includes(q)
      const matchSubtitle = lesson.subtitle.toLowerCase().includes(q)
      const matchSummary = lesson.summary.toLowerCase().includes(q)
      if (!matchTitle && !matchSubtitle && !matchSummary) {
        return false
      }
    }

    return true
  })

  return (
    <div className="catalog-page-container">
      <div className="catalog-header">
        <h1 className="catalog-title">Каталог всех уроков курса</h1>
        <p className="catalog-subtitle">
          8 полноценных уроков от азов счета до тригонометрии. В каждом уроке: видео-лекция + 30 тестов.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="catalog-toolbar">
        {/* Module Filter Pills */}
        <div className="module-filter-pills">
          <button
            className={`filter-pill ${selectedModule === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedModule('all')}
          >
            Все темы ({ALL_LESSONS.length})
          </button>
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              className={`filter-pill ${selectedModule === String(mod.id) ? 'active' : ''}`}
              onClick={() => setSelectedModule(String(mod.id))}
            >
              {mod.badge}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="catalog-search-box">
          <IconSearch className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по урокам (дроби, степени, уравнения, пифагор...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lessons List Grid */}
      <div className="lessons-catalog-grid">
        {filteredLessons.map((lesson) => {
          const stats = testProgress[lesson.id] || { correctCount: 0, totalAnswered: 0 }
          const correctCount = stats.correctCount || 0
          const percent = Math.round((correctCount / 30) * 100)
          const isDone = correctCount >= 25

          return (
            <div key={lesson.id} className="lesson-catalog-card">
              <div className="lesson-card-top">
                <span className="lesson-module-tag">{lesson.moduleTitle.split(':')[0]}</span>
                <span className="lesson-diff-tag">{lesson.difficulty}</span>
              </div>

              <h3 className="lesson-card-title">{lesson.title}</h3>
              <p className="lesson-card-subtitle">{lesson.subtitle}</p>

              <div className="lesson-card-perks">
                <span className="perk-badge video">
                  <IconVideo />
                  <span>Видео из YouTube</span>
                </span>
                <span className="perk-badge tests">
                  <IconBrain />
                  <span>30 интерактивных тестов</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="lesson-card-progress">
                <div className="progress-labels">
                  <span>Решено тестов:</span>
                  <strong>{correctCount} из 30 ({percent}%)</strong>
                </div>
                <div className="progress-track-small">
                  <div
                    className={`progress-fill-small ${isDone ? 'done' : ''}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="lesson-card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => onOpenLesson(lesson.id, 'theory')}
                >
                  <IconPlay />
                  <span>Смотреть урок</span>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => onOpenLesson(lesson.id, 'tests')}
                >
                  <span>30 тестов</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
