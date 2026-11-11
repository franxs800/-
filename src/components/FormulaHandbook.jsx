import React, { useState } from 'react'
import { FORMULAS_DATA } from '../data/formulasData'
import { IconSearch, IconCalculator, IconCheck } from './icons'

export const FormulaHandbook = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedFormula, setCopiedFormula] = useState(null)

  const handleCopy = (formula) => {
    navigator.clipboard.writeText(formula)
    setCopiedFormula(formula)
    setTimeout(() => setCopiedFormula(null), 2500)
  }

  const filteredCategories = FORMULAS_DATA.map((cat) => {
    if (selectedCategory !== 'all' && cat.category !== selectedCategory) {
      return null
    }

    const filteredItems = cat.items.filter((item) => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return (
        item.name.toLowerCase().includes(q) ||
        item.formula.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    })

    return filteredItems.length > 0 ? { ...cat, items: filteredItems } : null
  }).filter(Boolean)

  return (
    <div className="formulas-page-container">
      <div className="formulas-header">
        <h1 className="formulas-title">Справочник математических формул и правил</h1>
        <p className="formulas-subtitle">
          Удобная интерактивная шпаргалка: формулы, свойства, ограничения и примеры применения.
        </p>
      </div>

      {/* Toolbar */}
      <div className="formulas-toolbar">
        <div className="category-pills">
          <button
            className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Все формулы
          </button>
          {FORMULAS_DATA.map((c) => (
            <button
              key={c.category}
              className={`filter-pill ${selectedCategory === c.category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(c.category)}
            >
              {c.category}
            </button>
          ))}
        </div>

        <div className="formulas-search-box">
          <IconSearch className="search-icon" />
          <input
            type="text"
            placeholder="Искать формулу (Пифагор, дискриминант, разность квадратов...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Formula Sections */}
      <div className="formulas-sections-list">
        {filteredCategories.length === 0 ? (
          <div className="no-formulas-card">
            <IconCalculator className="empty-icon" />
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить поисковый запрос</p>
          </div>
        ) : (
          filteredCategories.map((cat, idx) => (
            <div key={idx} className="formula-category-block">
              <h2 className="cat-title">{cat.category}</h2>

              <div className="formulas-grid">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="formula-card">
                    <div className="formula-card-top">
                      <h4 className="formula-name">{item.name}</h4>
                      <button
                        className="copy-formula-btn"
                        onClick={() => handleCopy(item.formula)}
                        title="Скопировать формулу"
                      >
                        {copiedFormula === item.formula ? (
                          <>
                            <IconCheck />
                            <span>Скопировано</span>
                          </>
                        ) : (
                          <span>Копировать</span>
                        )}
                      </button>
                    </div>

                    <div className="formula-highlight-box">
                      <code>{item.formula}</code>
                    </div>

                    <p className="formula-desc">{item.description}</p>

                    <div className="formula-example-box">
                      <span className="ex-label">Пример расчета:</span>
                      <span className="ex-content">{item.example}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
