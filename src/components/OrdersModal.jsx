import React from 'react'
import { IconX, IconPackage, IconTruck, IconCheck } from './icons'

export const OrdersModal = ({ isOpen, onClose, orders, onOpenShop }) => {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content orders-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <IconX />
        </button>

        <div className="orders-header">
          <div className="orders-icon-badge">
            <IconPackage />
          </div>
          <h2>История заказов</h2>
          <p>Все ваши покупки и статус текущих доставок</p>
        </div>

        <div className="orders-body">
          {orders.length === 0 ? (
            <div className="orders-empty-state">
              <div className="empty-box-icon">📦</div>
              <h4>У вас пока нет оформленных заказов</h4>
              <p>Оформите первый заказ прямо сейчас — у нас действует скидка 15% по промокоду FRANXX!</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose()
                  if (onOpenShop) onOpenShop()
                }}
              >
                Выбрать товары
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item-card">
                  <div className="order-header-row">
                    <div className="order-meta-left">
                      <span className="order-id">Заказ #{order.id}</span>
                      <span className="order-date">от {order.date}</span>
                    </div>

                    <div className="order-status-badge">
                      <span className="status-dot pulse" />
                      <span>{order.status || 'В обработке'}</span>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    <div className="order-customer-info">
                      <div><strong>Получатель:</strong> {order.customer.name}</div>
                      <div><strong>Адрес:</strong> г. {order.customer.city}, {order.customer.address}</div>
                    </div>

                    <div className="order-price-summary">
                      <span className="order-price-label">Сумма заказа:</span>
                      <span className="order-price-val">{order.total.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  {/* List of items in this order */}
                  <div className="order-items-strip">
                    {order.items.map((it) => (
                      <div key={it.product.id} className="order-subitem">
                        <img src={it.product.image} alt={it.product.name} />
                        <div className="subitem-info">
                          <span className="subitem-name">{it.product.name}</span>
                          <span className="subitem-meta">
                            {it.quantity} шт. × {it.product.price.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
