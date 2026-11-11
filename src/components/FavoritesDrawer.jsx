import React from 'react'
import { IconX, IconHeart, IconCart, IconTrash, IconCheck, IconStar } from './icons'

export const FavoritesDrawer = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onAddToCart,
  onAddAllToCart,
  cartItemIds,
}) => {
  if (!isOpen) return null

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel favorites-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <IconHeart fill="#ef4444" className="heart-active" />
            <h3>Избранное</h3>
            <span className="drawer-count-badge badge-red">{favorites.length}</span>
          </div>

          <div className="drawer-header-actions">
            {favorites.length > 0 && (
              <button
                className="drawer-clear-btn"
                onClick={onClearFavorites}
                title="Очистить все избранные"
              >
                Очистить
              </button>
            )}
            <button className="drawer-close-btn" onClick={onClose} title="Закрыть">
              <IconX />
            </button>
          </div>
        </div>

        {/* Action strip if items exist */}
        {favorites.length > 0 && (
          <div className="favorites-action-strip">
            <span>В списке <strong>{favorites.length}</strong> {favorites.length === 1 ? 'товар' : 'товаров'}</span>
            <button className="btn btn-outline btn-sm" onClick={onAddAllToCart}>
              <IconCart />
              <span>Добавить все в корзину</span>
            </button>
          </div>
        )}

        {/* Drawer Body */}
        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-state-icon text-danger-soft">
                <IconHeart fill="#fecaca" />
              </div>
              <h4>В избранном пока ничего нет</h4>
              <p>Сохраняйте понравившиеся товары, нажимая на сердечко на карточке, чтобы вернуться к ним позже.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Перейти к каталогу
              </button>
            </div>
          ) : (
            <div className="favorites-items-list">
              {favorites.map((product) => {
                const isInCart = cartItemIds.includes(product.id)
                return (
                  <div key={product.id} className="favorite-item-card">
                    <img src={product.image} alt={product.name} className="fav-item-img" />

                    <div className="fav-item-info">
                      <div className="fav-item-rating">
                        <IconStar fill="#f59e0b" />
                        <span>{product.rating}</span>
                        <span className="fav-stock-status">
                          {product.inStock ? '● В наличии' : '○ Под заказ'}
                        </span>
                      </div>

                      <h5 className="fav-item-title">{product.name}</h5>

                      <div className="fav-item-price-row">
                        <span className="fav-current-price">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {product.oldPrice && (
                          <span className="fav-old-price">
                            {product.oldPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>

                      <div className="fav-item-actions">
                        <button
                          className={`btn-add-cart btn-sm ${isInCart ? 'already-in-cart' : ''}`}
                          onClick={() => onAddToCart(product)}
                        >
                          {isInCart ? (
                            <>
                              <IconCheck />
                              <span>В корзине</span>
                            </>
                          ) : (
                            <>
                              <IconCart />
                              <span>В корзину</span>
                            </>
                          )}
                        </button>

                        <button
                          className="fav-remove-btn"
                          onClick={() => onRemoveFavorite(product.id)}
                          title="Удалить из избранного"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
