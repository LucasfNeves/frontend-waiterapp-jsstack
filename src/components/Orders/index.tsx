import { useEffect, useState } from 'react'
import socketIo from 'socket.io-client'

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
    getOrder()
  }, [])

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

   
    socket.on('orders@new', (newOrder: Order) => {
      setOrders((prevOrders) => {
        
        const isOrderAlreadyExists = prevOrders.some(order => order._id === newOrder._id);

        if (!isOrderAlreadyExists) {
          return [...prevOrders, newOrder];
        }
        
        return prevOrders;
      });
    });

    // Desconecta o socket ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleCancelOrders(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId))
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order,
      ),
    )
  }

  const waitingOrders = orders.filter((order) => order.status === 'WAITING')
  const preparingOrders = orders.filter(
    (order) => order.status === 'IN_PRODUCTION',
  )
  const readyOrders = orders.filter((order) => order.status === 'DONE')

  return (
    <Container>
      <OrdersBoard
        onChangeOrderStatus={handleOrderStatusChange}
        onCancelOrder={handleCancelOrders}
        icon="🕒"
        title="Fila de espera"
        orders={waitingOrders}
      />
      <OrdersBoard
        onChangeOrderStatus={handleOrderStatusChange}
        onCancelOrder={handleCancelOrders}
        icon="👨🏻‍🍳"
        title="Em preparação"
        orders={preparingOrders}
      />
      <OrdersBoard
        onChangeOrderStatus={handleOrderStatusChange}
        onCancelOrder={handleCancelOrders}
        icon="✅"
        title="Pronto"
        orders={readyOrders}
      />
    </Container>
  )
}
