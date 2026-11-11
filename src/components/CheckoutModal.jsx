import React, { useState, useEffect } from 'react'
import { IconX, IconCheck, IconTruck, IconCreditCard, IconShield, IconPackage } from './icons'

export const CheckoutModal = ({
  isOpen,
  onClose,
  itemsToBuy,
  user,
  appliedPromoCode,
  promoDiscountPercent,
  onOrderSuccess,
  onViewOrders,
}) => {
  // Form fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('Москва')
  const [address, setAddress] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('courier') // 'courier' | 'pvz' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' | 'sbp' | 'cash' | 'parts'
  const [comment, setComment] = useState('')

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)
  const [error, setError] = useState('')

  // Pre-fill user data when user changes or modal opens
  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name)
      if (user.phone) setPhone(user.phone)
      if (user.email) setEmail(user.email)
    }
  }, [user, isOpen])

  if (!isOpen) return null

  // Financial calculations
  const subtotal = itemsToBuy.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = promoDiscountPercent > 0 ? Math.round((subtotal * promoDiscountPercent) / 100) : 0
  
  let deliveryPrice = 0
  if (deliveryMethod === 'express') {
    deliveryPrice = 490
  } else if (deliveryMethod === 'courier') {
    deliveryPrice = subtotal >= 5000 ? 0 : 350
  } else {
    // pvz
    deliveryPrice = subtotal >= 3000 ? 0 : 190
  }

  const grandTotal = subtotal - discount + deliveryPrice

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Пожалуйста, укажите имя, телефон и адрес для доставки')
      return
    }

    setIsSubmitting(true)

    // Simulate order placement
    setTimeout(() => {
      const orderId = `FX-${Math.floor(100000 + Math.random() * 900000)}`
      const orderDate = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      const newOrder = {
        id: orderId,
        date: orderDate,
        items: itemsToBuy,
        total: grandTotal,
        subtotal,
        discount,
        deliveryPrice,
        deliveryMethod,
        paymentMethod,
        customer: { name, phone, email, city, address },
        status: 'В обработке',
      }

      setCompletedOrder(newOrder)
      setIsSubmitting(false)
      onOrderSuccess(newOrder)
    }, 1200)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <IconX />
        </button>

        {completedOrder ? (
          /* Success Screen */
          <div className="checkout-success-view">
            <div className="success-icon-badge">
              <IconCheck />
            </div>
            <h2 className="success-title">Поздравляем с покупкой!</h2>
            <p className="success-subtitle">
              Ваш заказ <strong>#{completedOrder.id}</strong> успешно оформлен и передан на сборку.
            </p>

            <div className="order-summary-card">
              <div className="order-summary-row">
                <span>Дата заказа:</span>
                <strong>{completedOrder.date}</strong>
              </div>
              <div className="order-summary-row">
                <span>Получатель:</span>
                <strong>{completedOrder.customer.name} ({completedOrder.customer.phone})</strong>
              </div>
              <div className="order-summary-row">
                <span>Адрес доставки:</span>
                <strong>г. {completedOrder.customer.city}, {completedOrder.customer.address}</strong>
              </div>
              <div className="order-summary-row">
                <span>Способ оплаты:</span>
                <strong>
                  {paymentMethod === 'card' && '💳 Банковская карта онлайн'}
                  {paymentMethod === 'sbp' && '⚡ СБП (Система быстрых платежей)'}
                  {paymentMethod === 'cash' && '💵 При получении заказа'}
                  {paymentMethod === 'parts' && '🧩 Оплата частями (Долями)'}
                </strong>
              </div>
              <div className="order-summary-divider" />
              <div className="order-summary-row total">
                <span>Итого оплачено:</span>
                <span className="success-total-price">{completedOrder.total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* List of ordered items */}
            <div className="ordered-items-preview">
              <h4>Купленные товары:</h4>
              <div className="preview-items-list">
                {completedOrder.items.map((it) => (
                  <div key={it.product.id} className="preview-item">
                    <img src={it.product.image} alt={it.product.name} />
                    <div className="preview-item-info">
                      <div className="preview-name">{it.product.name}</div>
                      <div className="preview-qty">{it.quantity} шт. × {it.product.price.toLocaleString('ru-RU')} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="success-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setCompletedOrder(null)
                  onClose()
                }}
              >
                Продолжить покупки
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => {
                  setCompletedOrder(null)
                  onClose()
                  onViewOrders()
                }}
              >
                <IconPackage />
                <span>Перейти в мои заказы</span>
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="checkout-form-container">
            <div className="checkout-header">
              <h2>Оформление покупки</h2>
              <p>Заполните контактные данные и выберите удобный способ получения</p>
            </div>

            {error && <div className="checkout-error-box">⚠️ {error}</div>}

            <form onSubmit={handlePlaceOrder} className="checkout-main-grid">
              {/* Left Column: Form Details */}
              <div className="checkout-fields-col">
                {/* 1. Contact Info */}
                <div className="checkout-section">
                  <h3 className="section-title">
                    <span className="step-num">1</span>
                    <span>Контактные данные</span>
                  </h3>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Имя и фамилия *</label>
                      <input
                        type="text"
                        placeholder="Алексей Смирнов"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Номер телефона *</label>
                      <input
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Электронная почта (для чека)</label>
                    <input
                      type="email"
                      placeholder="alex@mail.ru"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* 2. Delivery Method */}
                <div className="checkout-section">
                  <h3 className="section-title">
                    <span className="step-num">2</span>
                    <span>Способ получения</span>
                  </h3>
                  <div className="delivery-options-grid">
                    <label className={`option-card ${deliveryMethod === 'courier' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="courier"
                        checked={deliveryMethod === 'courier'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                      />
                      <div className="option-content">
                        <div className="option-header">
                          <IconTruck />
                          <strong>Курьер до двери</strong>
                        </div>
                        <span className="option-desc">Завтра, 10:00–18:00</span>
                        <span className="option-price">{subtotal >= 5000 ? 'Бесплатно' : '350 ₽'}</span>
                      </div>
                    </label>

                    <label className={`option-card ${deliveryMethod === 'pvz' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pvz"
                        checked={deliveryMethod === 'pvz'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                      />
                      <div className="option-content">
                        <div className="option-header">
                          <IconPackage />
                          <strong>Пункт выдачи (ПВЗ)</strong>
                        </div>
                        <span className="option-desc">Более 1500 пунктов</span>
                        <span className="option-price">{subtotal >= 3000 ? 'Бесплатно' : '190 ₽'}</span>
                      </div>
                    </label>

                    <label className={`option-card ${deliveryMethod === 'express' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={deliveryMethod === 'express'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                      />
                      <div className="option-content">
                        <div className="option-header">
                          <span>⚡</span>
                          <strong>Экспресс 2 часа</strong>
                        </div>
                        <span className="option-desc">Срочная доставка</span>
                        <span className="option-price">490 ₽</span>
                      </div>
                    </label>
                  </div>

                  <div className="form-grid-2" style={{ marginTop: '14px' }}>
                    <div className="form-group">
                      <label>Город доставки</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Москва"
                      />
                    </div>
                    <div className="form-group">
                      <label>Улица, дом, квартира *</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="ул. Ленина, д. 12, кв. 45"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="checkout-section">
                  <h3 className="section-title">
                    <span className="step-num">3</span>
                    <span>Способ оплаты</span>
                  </h3>
                  <div className="payment-options-list">
                    <label className={`payment-row-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <IconCreditCard />
                      <div className="payment-text">
                        <strong>Банковской картой онлайн</strong>
                        <span>МИР, Visa, Mastercard (без комиссии)</span>
                      </div>
                    </label>

                    <label className={`payment-row-card ${paymentMethod === 'sbp' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="sbp"
                        checked={paymentMethod === 'sbp'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="badge-sbp">СБП</span>
                      <div className="payment-text">
                        <strong>Система быстрых платежей</strong>
                        <span>Оплата по QR-коду любого банка</span>
                      </div>
                    </label>

                    <label className={`payment-row-card ${paymentMethod === 'parts' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="parts"
                        checked={paymentMethod === 'parts'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>🧩</span>
                      <div className="payment-text">
                        <strong>Оплата Долями (4 платежа по {Math.round(grandTotal / 4).toLocaleString('ru-RU')} ₽)</strong>
                        <span>Первый платеж 25% сейчас, остальные каждые 2 недели</span>
                      </div>
                    </label>

                    <label className={`payment-row-card ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>💵</span>
                      <div className="payment-text">
                        <strong>При получении</strong>
                        <span>Наличными или картой курьеру</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="checkout-sidebar-col">
                <div className="checkout-summary-box">
                  <h3 className="summary-title">Ваш заказ</h3>

                  {/* List of items in checkout */}
                  <div className="checkout-items-preview">
                    {itemsToBuy.map(({ product, quantity }) => (
                      <div key={product.id} className="checkout-mini-item">
                        <img src={product.image} alt={product.name} />
                        <div className="item-meta">
                          <span className="item-name">{product.name}</span>
                          <span className="item-pricing">
                            {quantity} × {product.price.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <span className="item-total">
                          {(product.price * quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="summary-calc-list">
                    <div className="calc-row">
                      <span>Товары</span>
                      <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>

                    {discount > 0 && (
                      <div className="calc-row text-discount">
                        <span>Промокод {appliedPromoCode}</span>
                        <span>-{discount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}

                    <div className="calc-row">
                      <span>Доставка</span>
                      <span>{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</span>
                    </div>

                    <div className="summary-calc-divider" />

                    <div className="calc-row grand-total">
                      <span>Итого</span>
                      <span className="grand-total-price">{grandTotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-lg place-order-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="spinner-text">⏳ Оформляем заказ...</span>
                    ) : (
                      <>
                        <IconShield />
                        <span>Купить и оплатить {grandTotal.toLocaleString('ru-RU')} ₽</span>
                      </>
                    )}
                  </button>

                  <div className="security-note">
                    🔒 Безопасное соединение. Данные платежа зашифрованы по протоколу SSL.
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
