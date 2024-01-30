//pages/orders/[orderId].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { VscArchive, VscCreditCard } from 'react-icons/vsc'
import { IconContext } from 'react-icons'
import OrderStatusNodes from '@/components/Orders/OrderStatusNodes'
import { type Order } from '@/components/DashBoard/types'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@components/Orders/ConfirmationDialog'
import { type ObjectId } from 'mongodb'
import DashboardLayout from '@/layouts/DashboardLayout'
const OrderId = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const router = useRouter()
  const { orderId } = router.query
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          console.log('orderId : ', orderId)
          const orderIdString = Array.isArray(orderId) ? orderId[0] : orderId
          const response = await fetch(`/api/orders/${orderIdString}`)
          console.log('response is :: ', response)
          if (response.ok) {
            console.log('response is ok')
            const data = (await response.json()) as Order
            setOrder(data)
          } else {
            console.error('Error fetching order details', response.statusText)
          }
        }
      } catch (error) {
        console.error('Error fetching order details', error)
      }
    }
    ;(async () => {
      await fetchOrderDetails()
    })().catch((error) => {
      console.error('Error in fetchOrderDetails:', error)
    })
  }, [orderId])
  const cancelCancellation = () => {
    setSelectedOrder(null)
  }
  const confirmCancellation = () => {
    if (selectedOrder) {
      console.log(
        `Cancel Order ${selectedOrder.order_number} (${String(
          selectedOrder._id
        )})`
      )
      router
        .replace('/orders')
        .then(() => {
          setSelectedOrder(null)
        })
        .catch((error) => {
          console.error('Error navigating to dashboard:', error)
        })
    }
  }
  const handleCancelOrder = (id: ObjectId, order_number: string) => {
    setSelectedOrder({ _id: id, order_number } as Order)
  }
  const orderMonth = order?.order_date
    ? new Date(order.order_date).toLocaleString('en-US', { month: 'long' })
    : ''
  const pickupMonth =
    order?.order_details.pickup_details.pickup_date &&
    new Date(order.order_details.pickup_details.pickup_date).toLocaleString(
      'en-US',
      {
        month: 'long',
      }
    )
  return (
    <DashboardLayout>
      <div className="container mx-auto max-w-7xl">
        {order ? (
          <>
            <div className="flex justify-center">
              <div
                className="border-thick flex-row space-x-7 border border-blue-950 bg-white "
                style={{
                  width: '1250px',
                  height: '500px',
                  margin: '40px auto 0px auto', // Center the div vertically and horizontally
                  borderRadius: '20px',
                  border: '3px solid #blue-950',
                  display: 'flex', // Use flexbox
                  justifyContent: 'center', // Evenly distribute space between items
                }}
              >
                {/* Left side */}
                <div
                  className="flex flex-col space-y-5 p-0 "
                  style={{
                    marginRight: '50px',
                    marginLeft: '75px',
                    marginTop: '60px',
                  }}
                >
                  <div
                    className="font-avenir-next text-color: #052A42; text-2xl font-bold
"
                  >
                    Order #{order.order_number}
                  </div>
                  <div className="text-black-900 font-avenir-next flex items-center space-x-4 text-2xl font-bold">
                    {order.order_details.package_details[0].description} : Nike
                    Return
                  </div>
                  <div className="w-{80} flex items-center space-x-4 text-smallText text-gray-900">
                    Order placed on
                    <span className="text-black-900 font-avenir-next with p-sm ml-1 flex items-center space-x-4 text-smallText font-bold">
                      {orderMonth}
                    </span>
                  </div>
                  <div className="w-{80} flex items-center space-x-4 text-smallText text-gray-900 ">
                    Pick up scheduled for
                    <span className="text-black-900 font-avenir-next with p-sm ml-1 flex items-center space-x-4 text-smallText font-bold">
                      {pickupMonth}
                    </span>
                  </div>
                  <div className="text-black-900 font-avenir-next with flex items-center space-x-2 text-smallText font-bold">
                    <p className="pl-0">
                      {order.order_details.pickup_details.street},
                    </p>
                    <p className="m-0 pl-0">
                      {order.order_details.pickup_details.city},
                    </p>
                    <p className="m-0 p-0">
                      {order.order_details.pickup_details.province},
                    </p>
                    <p className="m-0 p-0">
                      {''}
                      {order.order_details.pickup_details.country},
                    </p>
                    <p className="m-0 p-0">
                      {''}
                      {order.order_details.pickup_details.postal_code}
                    </p>
                  </div>
                  <OrderStatusNodes status={order.status} />
                </div>
                {/* Right side */}
                <div
                  className="flex flex-col space-y-7 "
                  style={{
                    marginLeft: '50px',
                    marginRight: '75px',
                    marginTop: '160px',
                  }}
                >
                  {/* Total packages */}
                  <div className=" flex items-center space-x-4">
                    <IconContext.Provider value={{ size: '1.5em' }}>
                      <VscArchive style={{ color: '008BE6' }} />
                    </IconContext.Provider>
                    <span className="w-{80} text-black-900 font-avenir-next with p-sm flex items-center text-smallText font-bold">
                      Total Packages:
                    </span>
                    <span className="w-{80} text-smallText text-gray-900">
                      {order.order_details.total_packages}
                    </span>
                  </div>
                  {/* Visa information */}
                  <div className="flex items-center space-x-4">
                    <IconContext.Provider value={{ size: '1.5em' }}>
                      <VscCreditCard style={{ color: '008BE6' }} />
                    </IconContext.Provider>
                    <span className="text-black-900 font-avenir-next with flex items-center text-smallText font-bold">
                      Payment Method:
                    </span>
                    <span className="w-{80} space-x-4 text-smallText text-gray-900">
                      {order.client_details.payment_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-buttons mt-2 flex justify-end">
              <div className="button-container">
                <Link href="/orders">
                  <Button className="buttons">Back</Button>
                </Link>
                &nbsp;
                <Button
                  className="buttons"
                  onClick={() =>
                    handleCancelOrder(order._id, order.order_number)
                  }
                  style={{
                    backgroundColor:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered' ||
                      order.status === 'Driver delivered to post office'
                        ? '#A3BEE8'
                        : '',
                    border:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered' ||
                      order.status === 'Driver delivered to post office'
                        ? '1px solid #4299E1'
                        : 'none',
                    cursor:
                      order.status === 'Driver delivered to post office' ||
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  disabled={[
                    'Cancelled',
                    'Delivered',
                    'Driver delivered to post office',
                  ].includes(order.status)}
                >
                  Cancel Order
                </Button>
              </div>
            </div>
            {selectedOrder && (
              <ConfirmationDialog
                message={`Are you sure you want to cancel Order #${selectedOrder.order_number}?`}
                onCancel={cancelCancellation}
                onConfirm={confirmCancellation}
                orderId={selectedOrder._id}
              />
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </DashboardLayout>
  )
}
export default OrderId