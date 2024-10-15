import { Actions, ModalBody, OrderDetails, Overlay } from './styles'
import closeIcon from '../../assets/images/close-icon.svg'
import { Order } from '../../types/Order'
import { formatCurrency } from '../../utils/formatCurrency'
import { useEffect } from 'react'

interface OrderModalProps {
  isOpen: boolean
  handleCloseModal: () => void
  order: Order | null
  handleCancelOrder: () => Promise<void>
  isLoading: boolean
  handleChangeOrderStatus: () => Promise<void>
}

export function OrderModal({
  isOpen,
  handleCloseModal,
  order,
  handleCancelOrder,
  isLoading,
  handleChangeOrderStatus,
}: OrderModalProps) {
  if (!isOpen || !order) {
    return null
  } else {
    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          handleCloseModal()
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [handleCloseModal])

    const orderTotal = order.products.reduce((acc, product) => {
      return (acc += product.product.price * product.quantity)
    }, 0)

    return (
      <Overlay>
        <ModalBody>
          <header>
            <strong>{`Mesa ${order?.table}`}</strong>
            <button type="button" onClick={handleCloseModal}>
              <img
                src={closeIcon}
                alt="x-shaped button to close order details modal"
              />
            </button>
          </header>

          <div className="status-container">
            <small>Status do Pedido</small>
            <div>
              <span>
                {order.status === 'WAITING'
                  ? '🕒'
                  : order.status === 'IN_PRODUCTION'
                    ? '👨🏻‍🍳'
                    : '✅'}
              </span>
              <strong>
                {order.status === 'WAITING'
                  ? 'Fila de espera'
                  : order.status === 'IN_PRODUCTION'
                    ? 'Em preparação'
                    : 'Pronto'}
              </strong>
            </div>
          </div>

          <OrderDetails>
            <strong>Itens</strong>

            <div className="order-itens">
              {order.products.map(({ _id, product, quantity }) => (
                <div className="item" key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width="56"
                    height="28.51"
                  />

                  <span className="quantity">{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency.format(product.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Total</span>
              <strong>{formatCurrency.format(orderTotal)}</strong>
            </div>
          </OrderDetails>

          <Actions>
            {order.status !== 'DONE' && (
              <button
                onClick={handleChangeOrderStatus}
                disabled={isLoading}
                type="button"
                className="primary"
              >
                <span>
                  {order.status === 'WAITING'
                    ? '👨🏻‍🍳'
                    : order.status === 'IN_PRODUCTION'
                      ? '✅'
                      : ''}
                </span>

                <strong>
                  {order.status === 'WAITING'
                    ? 'Preparar Pedido'
                    : order.status === 'IN_PRODUCTION'
                      ? 'Finalizar Pedido'
                      : ''}
                </strong>
              </button>
            )}

            <button
              disabled={isLoading}
              onClick={handleCancelOrder}
              type="button"
              className="secundary"
            >
              <strong>Cancelar Pedido</strong>
            </button>
          </Actions>
        </ModalBody>
      </Overlay>
    )
  }
}
