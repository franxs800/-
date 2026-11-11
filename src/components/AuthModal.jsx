import React, { useState } from 'react'
import { IconX, IconUser, IconCheck, IconEye } from './icons'

export const AuthModal = ({ isOpen, onClose, onLogin, onRegister, onShowToast }) => {
  const [activeTab, setActiveTab] = useState('login') // 'login' | 'register'

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  // Register form state
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)

  // Errors state
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Пожалуйста, заполните все поля для входа')
      return
    }

    if (!loginEmail.includes('@')) {
      setError('Пожалуйста, введите корректный адрес электронной почты')
      return
    }

    if (loginPassword.length < 4) {
      setError('Пароль должен содержать не менее 4 символов')
      return
    }

    const userData = {
      name: loginEmail.split('@')[0],
      email: loginEmail,
      phone: '+7 (999) 000-00-00',
    }

    onLogin(userData)
    onShowToast(`Добро пожаловать, ${userData.name}!`, 'success')
    onClose()
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Пожалуйста, заполните обязательные поля')
      return
    }

    if (!regEmail.includes('@')) {
      setError('Введите корректный Email адрес')
      return
    }

    if (regPassword.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }

    if (regPassword !== regPasswordConfirm) {
      setError('Введенные пароли не совпадают')
      return
    }

    if (!agreeTerms) {
      setError('Необходимо согласиться с правилами сервиса')
      return
    }

    const newUser = {
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || '+7 (900) 123-45-67',
    }

    onRegister(newUser)
    onShowToast(`Аккаунт успешно создан! Приятных покупок, ${newUser.name}.`, 'success')
    onClose()
  }

  const handleQuickDemoLogin = () => {
    const demoUser = {
      name: 'Алексей Смирнов',
      email: 'alex.smirnov@example.ru',
      phone: '+7 (916) 789-01-23',
    }
    onLogin(demoUser)
    onShowToast('Вы вошли как демо-пользователь: Алексей Смирнов', 'success')
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <IconX />
        </button>

        <div className="auth-header">
          <div className="auth-icon-badge">
            <IconUser />
          </div>
          <h2 className="auth-title">
            {activeTab === 'login' ? 'Вход в личный кабинет' : 'Регистрация покупателя'}
          </h2>
          <p className="auth-subtitle">
            {activeTab === 'login'
              ? 'Войдите для быстрого оформления заказов и синхронизации избранного'
              : 'Создайте аккаунт, чтобы копить бонусы и отслеживать доставки'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login')
              setError('')
            }}
          >
            Войти
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register')
              setError('')
            }}
          >
            Регистрация
          </button>
        </div>

        {error && (
          <div className="auth-error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group">
              <label>Email или логин</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <div className="label-with-aside">
                <label>Пароль</label>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => alert('Для демо-режима используйте кнопку "Быстрый вход как демо-пользователь"')}
                >
                  Забыли пароль?
                </button>
              </div>
              <div className="input-with-button">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-eye-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  <IconEye />
                </button>
              </div>
            </div>

            <div className="form-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Запомнить меня на этом устройстве</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Войти в профиль
            </button>

            <div className="auth-divider">
              <span>или для быстрого тестирования</span>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-block"
              onClick={handleQuickDemoLogin}
            >
              ⚡ Быстрый вход (Демо-аккаунт)
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="form-group">
              <label>Ваше имя и фамилия *</label>
              <input
                type="text"
                placeholder="Иван Петров"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label>Электронная почта *</label>
              <input
                type="email"
                placeholder="ivan@mail.ru"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Номер телефона для связи</label>
              <input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Пароль *</label>
                <input
                  type="password"
                  placeholder="Минимум 6 знаков"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Повторите пароль *</label>
                <input
                  type="password"
                  placeholder="Повтор пароля"
                  value={regPasswordConfirm}
                  onChange={(e) => setRegPasswordConfirm(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>Согласен с правилами обработки персональных данных</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Зарегистрироваться
            </button>

            <div className="auth-footer-text">
              Уже есть аккаунт?{' '}
              <button
                type="button"
                className="link-inline"
                onClick={() => {
                  setActiveTab('login')
                  setError('')
                }}
              >
                Войти
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
