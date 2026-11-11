import React, { useState } from 'react'
import { ALL_LESSONS } from '../data/lessons'
import { IconAward, IconCheckCircle, IconFlame, IconRotate, IconUser, IconBook, IconBrain } from './icons'

export const ProfilePage = ({ userStats, onUpdateName, testProgress, onResetAllProgress }) => {
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(userStats.name || 'Ученик')
  const [showCertificate, setShowCertificate] = useState(false)

  // Calculate statistics
  const totalCorrect = Object.values(testProgress).reduce((sum, l) => sum + (l.correctCount || 0), 0)
  const totalAnswered = Object.values(testProgress).reduce((sum, l) => sum + (l.totalAnswered || 0), 0)
  const completedLessons = ALL_LESSONS.filter(l => (testProgress[l.id]?.correctCount || 0) >= 25).length

  // Calculate level based on XP
  const level = Math.floor((userStats.xp || 0) / 300) + 1
  const xpCurrentLevel = (userStats.xp || 0) % 300
  const xpNextLevel = 300
  const levelTitles = [
    'Новичок в математике',
    'Исследователь чисел',
    'Укротитель дробей',
    'Знаток алгебры',
    'Геометрический мастер',
    'Магистр высшей математики'
  ]
  const currentTitle = levelTitles[Math.min(level - 1, levelTitles.length - 1)]

  const handleSaveName = (e) => {
    e.preventDefault()
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim())
      setIsEditingName(false)
    }
  }

  // Badges
  const badges = [
    {
      id: 'first_lesson',
      title: 'Первый шаг',
      desc: 'Решите первые 10 тестов в любом уроке',
      unlocked: totalCorrect >= 10,
      icon: '🌱'
    },
    {
      id: 'fractions',
      title: 'Мастер дробей',
      desc: 'Наберите 25+ баллов в уроке 3 по дробям',
      unlocked: (testProgress[3]?.correctCount || 0) >= 25,
      icon: '🍕'
    },
    {
      id: 'pythagoras',
      title: 'Теорема Пифагора',
      desc: 'Успешно решите тесты по геометрии (Урок 7)',
      unlocked: (testProgress[7]?.correctCount || 0) >= 20,
      icon: '📐'
    },
    {
      id: 'streak',
      title: 'Железная воля',
      desc: 'Решите 60 тестов суммарно',
      unlocked: totalCorrect >= 60,
      icon: '🔥'
    },
    {
      id: 'halfway',
      title: 'Экватор курса',
      desc: 'Решите 120 тестов суммарно',
      unlocked: totalCorrect >= 120,
      icon: '⚡'
    },
    {
      id: 'grandmaster',
      title: 'Магистр курса',
      desc: 'Завершите все уроки курса и получите сертификат',
      unlocked: completedLessons >= 6,
      icon: '👑'
    }
  ]

  return (
    <div className="profile-page-container">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar-box">
          <span>{nameInput ? nameInput[0].toUpperCase() : 'У'}</span>
        </div>

        <div className="profile-main-info">
          <div className="profile-name-row">
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="name-edit-form">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Сохранить
                </button>
              </form>
            ) : (
              <>
                <h1 className="profile-name">{userStats.name || 'Ученик'}</h1>
                <button
                  className="edit-name-btn"
                  onClick={() => setIsEditingName(true)}
                  title="Изменить имя"
                >
                  ✎ Изменить
                </button>
              </>
            )}
          </div>

          <div className="profile-title-tag">
            <span>Уровень {level}: <strong>{currentTitle}</strong></span>
          </div>

          {/* XP Progress */}
          <div className="profile-xp-box">
            <div className="xp-labels">
              <span>Опыт (XP): <strong>{userStats.xp || 0} XP</strong></span>
              <span>До следующего уровня: {xpNextLevel - xpCurrentLevel} XP</span>
            </div>
            <div className="xp-track">
              <div
                className="xp-fill"
                style={{ width: `${Math.round((xpCurrentLevel / xpNextLevel) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="profile-cert-cta">
          <button
            className="btn btn-primary"
            onClick={() => setShowCertificate(true)}
          >
            <IconAward />
            <span>Сертификат обучения</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="profile-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap primary">
            <IconCheckCircle />
          </div>
          <div className="stat-data">
            <span className="stat-num">{totalCorrect} / 240</span>
            <span className="stat-text">Решено тестов из 30 на урок</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap success">
            <IconBook />
          </div>
          <div className="stat-data">
            <span className="stat-num">{completedLessons} / {ALL_LESSONS.length}</span>
            <span className="stat-text">Пройдено уроков (≥25 баллов)</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap warning">
            <IconFlame />
          </div>
          <div className="stat-data">
            <span className="stat-num">{userStats.streak || 1} дней</span>
            <span className="stat-text">Серия непрерывных занятий</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap accent">
            <IconBrain />
          </div>
          <div className="stat-data">
            <span className="stat-num">
              {totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '100%'}
            </span>
            <span className="stat-text">Точность решений</span>
          </div>
        </div>
      </div>

      {/* Achievements & Badges */}
      <div className="profile-badges-section">
        <h2 className="section-title">Достижения и награды</h2>
        <div className="badges-grid">
          {badges.map((b) => (
            <div key={b.id} className={`badge-card ${b.unlocked ? 'unlocked' : 'locked'}`}>
              <div className="badge-icon-emoji">{b.icon}</div>
              <h4 className="badge-card-title">{b.title}</h4>
              <p className="badge-card-desc">{b.desc}</p>
              <div className="badge-status-pill">
                {b.unlocked ? '✅ Получено' : '🔒 Закрыто'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="reset-progress-footer">
        <button
          className="btn-danger-outline"
          onClick={() => {
            if (window.confirm('Вы уверены, что хотите сбросить весь прогресс обучения и начать заново?')) {
              onResetAllProgress()
            }
          }}
        >
          <IconRotate />
          <span>Сбросить весь прогресс обучения</span>
        </button>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="modal-backdrop" onClick={() => setShowCertificate(false)}>
          <div className="certificate-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowCertificate(false)}>
              ×
            </button>

            <div className="cert-inner-frame">
              <div className="cert-top-emblem">∑</div>
              <div className="cert-org">ОБРАЗОВАТЕЛЬНАЯ ПЛАТФОРМА АЛЬФА-МАТЕМАТИКА</div>
              <h2 className="cert-heading">СЕРТИФИКАТ О ПРОХОЖДЕНИИ КУРСА</h2>
              <p className="cert-sub">Настоящий сертификат подтверждает, что</p>

              <div className="cert-student-name">
                {userStats.name || 'Ученик курса'}
              </div>

              <p className="cert-text">
                успешно освоил(а) программу курса <strong>«Полный курс математики с нуля»</strong>,
                включающую арифметику, обыкновенные и десятичные дроби, степени, уравнения, геометрию треугольников и тригонометрию, с выполнением <strong>{totalCorrect} практических тестов</strong>.
              </p>

              <div className="cert-footer-row">
                <div className="cert-stamp">
                  <div className="stamp-circle">ПОВЕРЕНО</div>
                </div>
                <div className="cert-date">
                  Дата: {new Date().toLocaleDateString('ru-RU')}
                </div>
              </div>
            </div>

            <div className="cert-actions">
              <button className="btn btn-primary" onClick={() => window.print()}>
                🖨️ Распечатать / Сохранить в PDF
              </button>
              <button className="btn btn-outline" onClick={() => setShowCertificate(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
