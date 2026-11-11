import React from 'react'
import { IconBrain, IconBook, IconAward, IconCalculator, IconFlame, IconCheckCircle } from './icons'

export const Navbar = ({ activePage, setActivePage, userStats }) => {
  return (
    <header className="edu-navbar">
      <div className="edu-navbar-inner">
        {/* Brand */}
        <div className="edu-brand" onClick={() => setActivePage('home')}>
          <div className="edu-logo-box">
            <span className="edu-logo-sigma">∑</span>
          </div>
          <div className="edu-brand-info">
            <span className="edu-brand-name">Альфа<span>Математика</span></span>
            <span className="edu-brand-tag">Курс с нуля • Видео • 30 тестов на урок</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="edu-nav-links">
          <button
            className={`edu-nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            Главная
          </button>
          <button
            className={`edu-nav-item ${activePage === 'catalog' ? 'active' : ''}`}
            onClick={() => setActivePage('catalog')}
          >
            <IconBook />
            <span>Уроки и курс</span>
          </button>
          <button
            className={`edu-nav-item ${activePage === 'trainer' ? 'active' : ''}`}
            onClick={() => setActivePage('trainer')}
          >
            <IconBrain />
            <span>Тренажер тестов</span>
          </button>
          <button
            className={`edu-nav-item ${activePage === 'formulas' ? 'active' : ''}`}
            onClick={() => setActivePage('formulas')}
          >
            <IconCalculator />
            <span>Справочник формул</span>
          </button>
          <button
            className={`edu-nav-item ${activePage === 'profile' ? 'active' : ''}`}
            onClick={() => setActivePage('profile')}
          >
            <IconAward />
            <span>Мой прогресс</span>
          </button>
        </nav>

        {/* User Stats Pill */}
        <div className="edu-user-stats" onClick={() => setActivePage('profile')} title="Перейти в личный кабинет">
          <div className="stat-pill streak-pill">
            <IconFlame className="flame-icon" />
            <span>{userStats.streak || 1} дн.</span>
          </div>
          <div className="stat-pill xp-pill">
            <span className="xp-icon">⚡</span>
            <span>{userStats.xp || 0} XP</span>
          </div>
          <div className="stat-pill user-avatar-pill">
            <span className="avatar-letter">{userStats.name ? userStats.name[0] : 'У'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
