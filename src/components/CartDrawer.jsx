import React, { useState } from 'react'
import { IconX, IconTrash, IconPlus, IconMinus, IconCart, IconCheck, IconTag } from './icons'

export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  promoDiscountPercent,
  appliedPromoCode,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  if (!isOpen) return null

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discountAmount = promoDiscountPercent > 0 ? Math.round((subtotal * promoDiscountPercent) / 100) : 0
  const freeShippingThreshold = 5000
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 350
  const total = subtotal - discountAmount + shippingCost
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal)
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))

  const handleApplyPromoCode = (e) => {
    e.preventDefault()
    setPromoError('')
    const code = promoInput.trim().toUpperCase()

    if (!code) return

    if (code === 'FRANXX') {
      onApplyPromo('FRANXX', 15)
      setPromoInput('')
    } else if (code === 'SALE10' || code === 'SALE') {
      onApplyPromo(code, 10)
      setPromoInput('')
    } else {
      setPromoError('Неверный промокод. Попробуйте промокод FRANXX (-15%)')
    }
  }

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <IconCart />
            <h3>Корзина</h3>
            <span className="drawer-count-badge">{cartItems.length}</span>
          </div>

          <div className="drawer-header-actions">
            {cartItems.length > 0 && (
              <button className="drawer-clear-btn" onClick={onClearCart} title="Очистить всю корзину">
                Очистить
              </button>
            )}
            <button className="drawer-close-btn" onClick={onClose} title="Закрыть">
              <IconX />
            </button>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {cartItems.length > 0 && (
          <div className="shipping-progress-banner">
            <div className="shipping-text-row">
              {freeShippingLeft > 0 ? (
                <span>
                  Добавьте товаров на <strong>{freeShippingLeft.toLocaleString('ru-RU')} ₽</strong> для бесплатной доставки!
                </span>
              ) : (
                <span className="text-success-strong">
                  🎉 Поздравляем! Вам доступна <strong>бесплатная доставка</strong>!
                </span>
              )}
            </div>
            <div className="progress-track">
              <div
                className={`progress-fill ${shippingProgress === 100 ? 'complete' : ''}`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-state-icon">
                <IconCart />
              </div>
              <h4>Ваша корзина пуста</h4>
              <p>Вы пока не добавили ни одного товара. Выберите интересные новинки в каталоге!</p>
              <button className="btn btn-primary" onClick={onClose}>
                Перейти к покупкам
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-card">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  
                  <div className="cart-item-info">
                    <h5 className="cart-item-title">{product.name}</h5>
                    <div className="cart-item-price-unit">
                      {product.price.toLocaleString('ru-RU')} ₽ / шт.
                    </div>

                    <div className="cart-item-bottom-row">
                      {/* Quantity Controls */}
                      <div className="qty-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          title="Уменьшить"
                        >
                          <IconMinus />
                        </button>
                        <span className="qty-number">{quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          title="Увеличить"
                        >
                          <IconPlus />
                        </button>
                      </div>

                      <div className="cart-item-total-price">
                        {(product.price * quantity).toLocaleString('ru-RU')} ₽
                      </div>

                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => onRemoveItem(product.id)}
                        title="Удалить из корзины"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {cartItems.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Input */}
            <div className="promo-code-container">
              {appliedPromoCode ? (
                <div className="applied-promo-tag">
                  <div className="promo-tag-info">
                    <span className="tag-icon">🎟️</span>
                    <span>Промокод <strong>{appliedPromoCode}</strong> (-{promoDiscountPercent}%)</span>
                  </div>
                  <button className="promo-remove-btn" onClick={onRemovePromo}>
                    <IconX />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromoCode} className="promo-input-row">
                  <input
                    type="text"
                    placeholder="Промокод (FRANXX на -15%)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    Применить
                  </button>
                </form>
              )}
              {promoError && <div className="promo-error-text">{promoError}</div>}
            </div>

            {/* Calculations Breakdown */}
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span>Товары ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} шт.)</span>
                <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row text-discount">
                  <span>Скидка по промокоду ({promoDiscountPercent}%)</span>
                  <span>-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}

              <div className="summary-row">
                <span>Доставка</span>
                <span>{shippingCost === 0 ? <strong className="text-success">Бесплатно</strong> : `${shippingCost} ₽`}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <span>Итого к оплате</span>
                <span className="total-amount">{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-block btn-lg checkout-trigger-btn"
              onClick={() => {
                onClose()
                onProceedToCheckout()
              }}
            >
              <span>Перейти к оформлению</span>
              <span className="checkout-btn-price">{total.toLocaleString('ru-RU')} ₽</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
