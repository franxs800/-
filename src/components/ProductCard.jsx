import React from 'react'
import { IconHeart, IconCart, IconStar, IconEye, IconCheck } from './icons'

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  isInCart,
  cartQuantity,
  onAddToCart,
  onQuickBuy,
  onOpenDetails,
}) => {
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className="product-card">
      {/* Card Image Wrapper */}
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
          onClick={() => onOpenDetails(product)}
        />

        {/* Badges */}
        <div className="card-badges">
          {discountPercent > 0 && (
            <span className="badge badge-discount">-{discountPercent}%</span>
          )}
          {product.isHit && <span className="badge badge-hit">🔥 Хит</span>}
          {product.isNew && <span className="badge badge-new">Новинка</span>}
        </div>

        {/* Favorite Heart Button */}
        <button
          className={`card-favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(product)
          }}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          aria-label="Избранное"
        >
          <IconHeart fill={isFavorite ? '#ef4444' : 'none'} className={isFavorite ? 'heart-filled' : ''} />
        </button>

        {/* Quick View Button */}
        <button
          className="card-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation()
            onOpenDetails(product)
          }}
          title="Быстрый просмотр"
        >
          <IconEye />
          <span>Быстрый просмотр</span>
        </button>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Rating */}
        <div className="card-rating-row" onClick={() => onOpenDetails(product)}>
          <div className="card-rating">
            <IconStar fill="#f59e0b" className="star-icon" />
            <span className="rating-num">{product.rating}</span>
          </div>
          <span className="reviews-count">({product.reviewsCount} отзывов)</span>
          <span className={`stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'В наличии' : 'Под заказ'}
          </span>
        </div>

        {/* Title */}
        <h3 className="card-title" onClick={() => onOpenDetails(product)} title={product.name}>
          {product.name}
        </h3>

        {/* Short Specs */}
        <div className="card-specs">
          {product.features && product.features.slice(0, 2).map((feat, i) => (
            <span key={i} className="spec-tag">{feat}</span>
          ))}
        </div>

        {/* Price Row */}
        <div className="card-price-row">
          <div className="price-box">
            <span className="current-price">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions-row">
          <button
            className={`btn-add-cart ${isInCart ? 'already-in-cart' : ''}`}
            onClick={() => onAddToCart(product)}
          >
            {isInCart ? (
              <>
                <IconCheck />
                <span>В корзине ({cartQuantity})</span>
              </>
            ) : (
              <>
                <IconCart />
                <span>В корзину</span>
              </>
            )}
          </button>

          <button
            className="btn-quick-buy"
            onClick={() => onQuickBuy(product)}
            title="Купить сейчас в один клик"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  )
}
