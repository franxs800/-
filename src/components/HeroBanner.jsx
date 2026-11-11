import React from 'react'
import { IconTruck, IconShield, IconCreditCard, IconRotate, IconSparkles } from './icons'

export const HeroBanner = ({ onSelectCategory, onShowDiscountsOnly }) => {
  return (
    <div className="hero-banner-section">
      <div className="hero-banner-card">
        <div className="hero-banner-content">
          <div className="hero-tag">
            <IconSparkles />
            <span>Сезонные скидки до 30%</span>
          </div>
          <h1 className="hero-title">
            Технологии будущего <br />
            <span className="hero-gradient-text">для вашей комфортной жизни</span>
          </h1>
          <p className="hero-desc">
            Онлайн-магазин премиальной электроники, умных устройств и стильных аксессуаров.
            Официальная гарантия, быстрая доставка и удобная оплата.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                const el = document.getElementById('catalog-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Перейти в каталог
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={onShowDiscountsOnly}
            >
              🔥 Товары со скидкой
            </button>
          </div>
        </div>

        <div className="hero-banner-visual">
          <div className="promo-badge-float">
            <span className="promo-badge-title">Промокод</span>
            <span className="promo-badge-code">FRANXX</span>
            <span className="promo-badge-sub">-15% на весь заказ</span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
            alt="Флагманские гаджеты FRANXX"
            className="hero-image"
          />
        </div>
      </div>

      {/* Trust perks */}
      <div className="perks-grid">
        <div className="perk-card">
          <div className="perk-icon-wrap">
            <IconTruck />
          </div>
          <div>
            <div className="perk-title">Бесплатная доставка</div>
            <div className="perk-desc">При заказе от 5 000 ₽ до двери или ПВЗ</div>
          </div>
        </div>

        <div className="perk-card">
          <div className="perk-icon-wrap">
            <IconShield />
          </div>
          <div>
            <div className="perk-title">100% Оригинал</div>
            <div className="perk-desc">Гарантия от производителя 12 месяцев</div>
          </div>
        </div>

        <div className="perk-card">
          <div className="perk-icon-wrap">
            <IconCreditCard />
          </div>
          <div>
            <div className="perk-title">Удобная оплата</div>
            <div className="perk-desc">Картой, СБП, частями или при получении</div>
          </div>
        </div>

        <div className="perk-card">
          <div className="perk-icon-wrap">
            <IconRotate />
          </div>
          <div>
            <div className="perk-title">14 дней на возврат</div>
            <div className="perk-desc">Легкий возврат без лишних вопросов</div>
          </div>
        </div>
      </div>
    </div>
  )
}
