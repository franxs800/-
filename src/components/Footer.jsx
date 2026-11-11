import React, { useState } from 'react'

export const Footer = ({ onSelectCategory }) => {
  const [emailSub, setEmailSub] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (emailSub.trim() && emailSub.includes('@')) {
      setSubscribed(true)
      setEmailSub('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="store-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <div className="navbar-brand footer-brand">
              <div className="brand-logo-icon">
                <span>FX</span>
              </div>
              <div className="brand-text">
                <span className="brand-title">FRANXX<span>.STORE</span></span>
                <span className="brand-subtitle">Онлайн-маркет техники</span>
              </div>
            </div>
            <p className="footer-desc">
              Ваш надежный проводник в мир умной техники, флагманских гаджетов и стильных решений для дома и работы.
            </p>
            <div className="footer-contacts">
              <div>📞 Горячая линия: <strong>8 (800) 555-35-35</strong> (круглосуточно)</div>
              <div>✉️ Поддержка: <strong>support@franxx-store.ru</strong></div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Каталог товаров</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onSelectCategory('smartphones')}>Смартфоны и часы</button></li>
              <li><button onClick={() => onSelectCategory('audio')}>Наушники и акустика</button></li>
              <li><button onClick={() => onSelectCategory('computers')}>Ноутбуки и ПК</button></li>
              <li><button onClick={() => onSelectCategory('smarthome')}>Техника для дома</button></li>
              <li><button onClick={() => onSelectCategory('accessories')}>Аксессуары и кабели</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4 className="footer-col-title">Покупателям</h4>
            <ul className="footer-links-list">
              <li><a href="#how-to-buy" onClick={(e) => { e.preventDefault(); alert('Оформите заказ на сайте в 1 клик, добавив нужный товар в корзину.') }}>Как сделать заказ</a></li>
              <li><a href="#delivery" onClick={(e) => { e.preventDefault(); alert('Доставка курьером по всей России от 1 дня. Бесплатно при заказе от 5 000 ₽.') }}>Доставка и пункты выдачи</a></li>
              <li><a href="#payment" onClick={(e) => { e.preventDefault(); alert('Принимаем карты МИР, Visa, Mastercard, СБП и оплату при получении.') }}>Способы оплаты</a></li>
              <li><a href="#warranty" onClick={(e) => { e.preventDefault(); alert('Официальная гарантия 12 месяцев на все товары каталога.') }}>Гарантия и сервис</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); alert('Возврат в течение 14 дней без лишних вопросов.') }}>Возврат и обмен</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">Акции и скидки</h4>
            <p className="newsletter-desc">
              Подпишитесь на закрытые распродажи и первыми получайте промокоды до 30%:
            </p>
            {subscribed ? (
              <div className="subscribe-success">
                ✅ Спасибо! Мы отправили промокод на скидку 10% на ваш email.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Подписаться
                </button>
              </form>
            )}
            <div className="payment-badges-row">
              <span className="pay-badge">МИР</span>
              <span className="pay-badge">СБП</span>
              <span className="pay-badge">VISA</span>
              <span className="pay-badge">MasterCard</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>© {new Date().getFullYear()} FRANXX STORE. Все права защищены.</div>
          <div className="footer-bottom-links">
            <span>Политика конфиденциальности</span>
            <span>Пользовательское соглашение</span>
            <span>Публичная оферта</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
