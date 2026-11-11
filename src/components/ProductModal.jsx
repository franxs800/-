import React from 'react'
import { IconX, IconHeart, IconCart, IconStar, IconShield, IconTruck, IconRotate, IconCheck } from './icons'

export const ProductModal = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInCart,
  cartQuantity,
  onAddToCart,
  onQuickBuy,
}) => {
  if (!product) return null

  const discount = product.oldPrice ? product.oldPrice - product.price : 0
  const discountPercent = product.oldPrice
    ? Math.round((discount / product.oldPrice) * 100)
    : 0

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <IconX />
        </button>

        <div className="product-modal-grid">
          {/* Gallery / Image */}
          <div className="product-modal-gallery">
            <div className="modal-image-wrapper">
              <img src={product.image} alt={product.name} className="modal-main-image" />
              {discountPercent > 0 && (
                <span className="badge badge-discount modal-discount-badge">-{discountPercent}%</span>
              )}
            </div>
            <div className="modal-guarantees">
              <div className="modal-guarantee-item">
                <IconShield />
                <span>Официальная гарантия 12 месяцев</span>
              </div>
              <div className="modal-guarantee-item">
                <IconTruck />
                <span>Доставка по городу от 1 дня</span>
              </div>
              <div className="modal-guarantee-item">
                <IconRotate />
                <span>Возврат товара в течение 14 дней</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="product-modal-info">
            <div className="modal-category-badge">
              {product.category === 'smartphones' && 'Смартфоны и гаджеты'}
              {product.category === 'audio' && 'Аудио и звук'}
              {product.category === 'computers' && 'Компьютеры и периферия'}
              {product.category === 'smarthome' && 'Умный дом'}
              {product.category === 'accessories' && 'Аксессуары'}
            </div>

            <h2 className="modal-product-title">{product.name}</h2>

            <div className="modal-rating-row">
              <div className="card-rating">
                <IconStar fill="#f59e0b" className="star-icon" />
                <span className="rating-num">{product.rating}</span>
              </div>
              <span className="reviews-count">({product.reviewsCount} отзывов покупателей)</span>
              <span className="stock-badge in-stock">
                {product.inStock ? '● В наличии на складе' : '○ Под заказ'}
              </span>
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Specs / Features */}
            {product.features && product.features.length > 0 && (
              <div className="modal-specs-section">
                <h4 className="specs-title">Характеристики и особенности:</h4>
                <ul className="modal-specs-list">
                  {product.features.map((item, index) => (
                    <li key={index} className="modal-spec-item">
                      <span className="spec-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price Box */}
            <div className="modal-price-box">
              <div className="modal-price-main">
                <span className="modal-current-price">{product.price.toLocaleString('ru-RU')} ₽</span>
                {product.oldPrice && (
                  <span className="modal-old-price">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
                )}
              </div>
              {discount > 0 && (
                <div className="modal-discount-saving">
                  Экономия: <strong>{discount.toLocaleString('ru-RU')} ₽</strong>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="modal-actions-panel">
              <button
                className={`btn btn-primary modal-cart-btn ${isInCart ? 'already-in-cart' : ''}`}
                onClick={() => onAddToCart(product)}
              >
                {isInCart ? (
                  <>
                    <IconCheck />
                    <span>В корзине ({cartQuantity} шт)</span>
                  </>
                ) : (
                  <>
                    <IconCart />
                    <span>Добавить в корзину</span>
                  </>
                )}
              </button>

              <button
                className="btn btn-secondary modal-buy-btn"
                onClick={() => {
                  onClose()
                  onQuickBuy(product)
                }}
              >
                Купить сейчас в 1 клик
              </button>

              <button
                className={`modal-favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(product)}
                title={isFavorite ? 'Удалить из избранного' : 'В избранное'}
              >
                <IconHeart fill={isFavorite ? '#ef4444' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
