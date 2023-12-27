// components/Orders/RecentOrders.tsx
// need to integrate the Order status component once available

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Order } from '@components/DashBoard/types'
import { Button } from '@/components/ui/button'

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch('/api/orders')
      .then((response) => response.json())
      .then((data: Order[]) => setOrders(data))
      .catch((error) => console.error('Error fetching orders', error))
  }, [])

  const handleCancelOrder = (orderNumber: string) => {
    // Implement cancel order logic here
    console.log(`Cancel Order ${orderNumber}`)
  }

  const handleManageOrder = (orderNumber: string) => {
    console.log(`Manage Order ${orderNumber}`)
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="recent-orders-container mt-14 flex flex-col items-start p-5">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="recent-order-header">
          <h2 className="mb-2 text-3xl font-bold">Recent Orders</h2>
        </div>
        <div>
          <Link href="/orders">
            <Button variant="secondary">View More</Button>
          </Link>
        </div>
      </div>

      <div className="recent-orders-list flex flex-wrap">
        {recentOrders.map((order) => (
          <div
            key={order.orderNumber}
            className="order-box mb-4 mr-4 flex-shrink-0 overflow-hidden rounded-lg border"
          >
            <div className="rounded-xl bg-white p-4">
              <p className="mb-2 text-xl font-bold">
                Order #{order.orderNumber}
              </p>

              <div className="order-buttons mt-2">
                <Button
                  variant="secondary"
                  onClick={() => handleCancelOrder(order.orderNumber)}
                  style={{
                    opacity:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? '0.7'
                        : '1',
                    cursor:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  disabled={
                    order.status === 'Cancelled' || order.status === 'Delivered'
                  }
                >
                  Cancel Order
                </Button>
                <Button
                  onClick={() => handleManageOrder(order.orderNumber)}
                  className="ml-2"
                  style={{
                    backgroundColor:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? '#3182ce'
                        : '#4299e1',
                    opacity:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? '0.7'
                        : '1',
                    cursor:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? 'not-allowed'
                        : 'pointer',
                    color: '#ffffff',
                  }}
                  disabled={
                    order.status === 'Cancelled' || order.status === 'Delivered'
                  }
                >
                  Manage Order
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentOrders
