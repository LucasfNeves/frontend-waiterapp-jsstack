import { useEffect, useState } from 'react'
import { Order } from '../../types/Order'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'
import { api } from '../../utils/api'

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  async function getOrder() {
    const response = await api.get<Order[]>('/orders')
    setOrders(response.data)
  }


  useEffect(() => {
    getOrder();
  }, []);

 function handleCancelOrders(orderId: string) {
  setOrders((prevState) => prevState.filter(order => order._id !== orderId))
 }

  const waitingOrders = orders.filter((order) => order.status === 'WAITING')
  const preparingOrders = orders.filter((order) => order.status === 'IN_PRODUCTION')
  const readyOrders = orders.filter((order) => order.status === 'DONE')



  return (
    <Container>
      <OrdersBoard onCancelOrder={handleCancelOrders} icon="🕒" title="Fila de espera" orders={waitingOrders} />
      <OrdersBoard onCancelOrder={handleCancelOrders} icon="👨🏻‍🍳" title="Em preparação" orders={preparingOrders} />
      <OrdersBoard onCancelOrder={handleCancelOrders} icon="✅" title="Pronto" orders={readyOrders} />
    </Container>
  )
}
