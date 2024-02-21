import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Order } from '@components/DashBoard/types'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@components/Orders/ConfirmationDialog'
import { useRouter } from 'next/router'
import { type ObjectId } from 'mongodb'
import OrderStatusNodes from '@/components/Orders/OrderStatusNodes'

const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentOrders = await fetchRecentOrders(currentPage)
        setOrders(recentOrders)
      } catch (error) {
        console.error('Error fetching recent orders:', error)
      }
    }
    fetchData().catch((error) => console.error('Error in fetchData:', error))
  }, [currentPage])

  const getCancelOrderButtonStyles = (status: string) => {
    const isDisabled =
      status === 'Cancelled' ||
      status === 'Delivered' ||
      status === 'Driver delivered to post office'

    return {
      opacity: isDisabled ? '0.7' : '1',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }
  }

  const handleCancelOrder = (id: ObjectId, order_number: string) => {
    setSelectedOrder({ _id: id, order_number } as Order)
  }

  const confirmCancellation = () => {
    if (selectedOrder) {
      console.log(
        `Cancel Order ${selectedOrder.order_number} (${String(
          selectedOrder._id
        )})`
      )

      router
        .replace('/dashboard')
        .then(() => {
          setSelectedOrder(null)
          window.location.reload()
        })
        .catch((error) => {
          console.error('Error navigating to dashboard:', error)
        })
    }
  }

  const cancelCancellation = () => {
    setSelectedOrder(null)
  }

  const recentOrders = orders.slice(0, 3)

  if (recentOrders.length === 0) {
    return null
  }

  return (
    <div className="recent-orders-container mt-14 flex flex-col items-start">
      <div className="mb-5 flex w-full items-center justify-between">
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
            key={order.order_number}
            className="order-box mb-4 mr-4 flex-shrink-0 overflow-hidden rounded-lg border"
          >
            <div className="rounded-xl bg-white p-4">
              <p className="mb-2 text-base font-bold">
                Order #{order.order_number}
              </p>
              <div>
                <OrderStatusNodes status={order.status} />
              </div>
              <div className="order-buttons mt-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleCancelOrder(order._id, order.order_number)
                  }
                  style={getCancelOrderButtonStyles(order.status)}
                  disabled={[
                    'Cancelled',
                    'Delivered',
                    'Driver delivered to post office',
                  ].includes(order.status)}
                >
                  Cancel Order
                </Button>
                <Link href={`/orders/${String(order._id)}`}>
                  <Button className="ml-2">Manage Order</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <ConfirmationDialog
          message={`Are you sure you want to cancel Order #${selectedOrder.order_number}?`}
          onCancel={cancelCancellation}
          onConfirm={confirmCancellation}
          orderId={selectedOrder._id}
        />
      )}
    </div>
  )
}

export default RecentOrders
