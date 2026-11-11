import React from 'react'
import { CATEGORIES } from '../data/products'
import { IconFilter, IconCategory, IconX, IconRotate } from './icons'

export const Filters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  onlyDiscounts,
  setOnlyDiscounts,
  onlyInStock,
  setOnlyInStock,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults,
  isFilterActive,
}) => {
  return (
    <div className="filters-section" id="catalog-section">
      {/* Category Pills Bar */}
      <div className="category-scroll-container">
        <div className="category-pills">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <IconCategory name={cat.icon} className="category-pill-icon" />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Filter Controls Box */}
      <div className="filters-controls-panel">
        <div className="filters-row-top">
          <div className="filters-heading-group">
            <div className="filters-title">
              <IconFilter />
              <span>Параметры фильтрации</span>
            </div>
            <span className="results-count-badge">Найдено: {totalResults}</span>
          </div>

          <div className="sort-wrapper">
            <label htmlFor="sort-select">Сортировка:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">По популярности</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="rating-desc">По рейтингу</option>
              <option value="discount-desc">По размеру скидки</option>
            </select>
          </div>
        </div>

        <div className="filters-grid">
          {/* Price Range */}
          <div className="filter-group">
            <span className="filter-label">Цена, ₽</span>
            <div className="price-inputs-row">
              <input
                type="number"
                placeholder="От 0"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="price-input"
                min="0"
              />
              <span className="price-divider">—</span>
              <input
                type="number"
                placeholder="До 150 000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="price-input"
                min="0"
              />
            </div>
            {/* Quick Price Tags */}
            <div className="quick-price-tags">
              <button
                type="button"
                className="quick-price-btn"
                onClick={() => setPriceRange({ min: '', max: '10000' })}
              >
                до 10 000 ₽
              </button>
              <button
                type="button"
                className="quick-price-btn"
                onClick={() => setPriceRange({ min: '10000', max: '30000' })}
              >
                10к - 30к ₽
              </button>
              <button
                type="button"
                className="quick-price-btn"
                onClick={() => setPriceRange({ min: '30000', max: '' })}
              >
                от 30 000 ₽
              </button>
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="filter-group">
            <span className="filter-label">Особенности</span>
            <div className="filter-checkboxes">
              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={onlyDiscounts}
                  onChange={(e) => setOnlyDiscounts(e.target.checked)}
                />
                <span className="checkbox-custom" />
                <span className="checkbox-text">🔥 Только со скидкой</span>
              </label>

              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                <span className="checkbox-custom" />
                <span className="checkbox-text">📦 Только в наличии</span>
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <span className="filter-label">Рейтинг покупателей</span>
            <div className="rating-filter-options">
              {[
                { val: 0, label: 'Любой' },
                { val: 4.5, label: '★ 4.5+' },
                { val: 4.8, label: '★ 4.8+' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  className={`rating-btn ${minRating === opt.val ? 'active' : ''}`}
                  onClick={() => setMinRating(opt.val)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <div className="filter-group filter-actions-group">
            <span className="filter-label">&nbsp;</span>
            {isFilterActive ? (
              <button
                className="reset-filters-btn active"
                onClick={onResetFilters}
                title="Сбросить все примененные фильтры"
              >
                <IconRotate />
                <span>Сбросить фильтры</span>
              </button>
            ) : (
              <div className="filters-hint">Фильтры не применены</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
