import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@components/Orders/ConfirmationDialog'
import { useRouter } from 'next/router'
import { fetchRecentOrders } from '@/services/orderService'
import OrderStatusNodes from '@/components/Orders/OrderStatusNodes'
import { Order, ObjectId } from '@components/DashBoard/types'

const RecentOrders: React.FC = () => {
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
          <h2 className="mb-2 text-3xl font-bold font-medium">Recent Orders</h2>
        </div>
        <div>
          <Link href="/orders">
            <Button variant="secondary" className="h-8">
              View More
            </Button>
          </Link>
        </div>
      </div>

      <div className="recent-orders-list flex flex-wrap">
        {recentOrders.map((order) => (
          <div
            key={order.order_number}
            className="order-box mb-4 mr-4 flex-shrink-0 overflow-hidden rounded-lg border"
            style={{ width: '100%', maxWidth: '25rem' }} // Set a fixed width for each container
          >
            <div className="h-full rounded-xl bg-white p-4">
              <p className="mb-2 text-base font-normal">
                Order #{order.order_number}
              </p>

              <div
                className={`flex ${
                  order.status !== 'Cancelled' ? 'pl-10' : ''
                }`}
              >
                <OrderStatusNodes order={order} />
              </div>

              <div className="ml-7 pl-7">
                <div className="order-buttons mt-2">
                  <Button
                    className="h-8"
                    variant="secondary"
                    onClick={() =>
                      handleCancelOrder(order._id, order.order_number)
                    }
                    style={getCancelOrderButtonStyles(order.status)}
                    disabled={[
                      'Cancelled',
                      'Delivered',
                      'Delivered to Post Office',
                    ].includes(order.status)}
                  >
                    Cancel Order
                  </Button>

                  <Link href={`/orders/${String(order._id)}`}>
                    <Button className="ml-4 h-8">Manage Order</Button>
                  </Link>
                </div>
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

      {/* CSS media queries */}
      <style jsx>{`
        @media only screen and (min-width: 992px) {
          .order-box {
            width: calc(50% - 2px); // Set width to half minus margin
          }
        }
      `}</style>
    </div>
  )
}

export default RecentOrders
