import { useState } from 'react'
import { Order } from '../../types/Order'
import { OrderModal } from '../OrderModal'
import { Board, OrderContainer } from './styles'
import { api } from '../../utils/api'
import { toast } from 'react-toastify'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenOrderModal(order: Order) {
    setSelectedOrder(order)
    setIsModalVisible(true)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true)

    const newStatus =
      selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE'

    api.patch(`orders/${selectedOrder?._id}`, {
      status: newStatus,
    })

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`,
    )
    onChangeOrderStatus(selectedOrder!._id, newStatus)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  async function handleCancelOrder() {
    setIsLoading(true)
    await api.delete(`/orders/${selectedOrder?._id}`)

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`)
    onCancelOrder(selectedOrder!._id)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  return (
    <Board>
      <OrderModal
        handleChangeOrderStatus={handleChangeOrderStatus}
        handleCancelOrder={handleCancelOrder}
        order={selectedOrder}
        isOpen={isModalVisible}
        handleCloseModal={handleCloseModal}
        isLoading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{`( ${orders.length} )`}</span>
      </header>
      <OrderContainer>
        {orders.map((order) => (
          <button
            onClick={() => handleOpenOrderModal(order)}
            key={order._id}
            type="button"
          >
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        ))}
      </OrderContainer>
    </Board>
  )
}
