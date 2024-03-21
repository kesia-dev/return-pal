import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios, { type AxiosResponse } from 'axios'
import { VscArchive, VscCreditCard } from 'react-icons/vsc'
import { GoCreditCard } from 'react-icons/go'
import { IconContext } from 'react-icons'
import OrderStatusNodes from '@/components/Orders/OrderStatusNodes'
// import { Order } from '@returnprocess/confirm-pickup'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@components/Orders/ConfirmationDialog'
import { type ObjectId } from 'mongodb'
import DashboardLayout from '@/layouts/DashboardLayout'
import moment from 'moment'

const OrderId = () => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const router = useRouter()
  const { orderId } = router.query
  const [order, setOrder] = useState<any | null>(null)
  const baseUrl: any = process.env.NEXT_PUBLIC_BASE_URL;
  const [address,setAddress] = useState();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const response: AxiosResponse<any> = await axios.get(
            `${baseUrl}/api/orders/${String(orderId)}`
          )
          console.log('response is :: ', response.data)

          if (response.status === 200) {
            console.log('response is ok')
            const data = response.data
            setOrder(data?.order)
            setAddress(data?.pickupDetails)
          } else {
            console.error('Error fetching order details:', response.statusText)
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
      }
    }

    fetchOrderDetails()
      .then(() => {
        console.log('Order details fetched successfully')
      })
      .catch((error) => {
        console.error('Error in fetchOrderDetails:', error)
      })
  }, [orderId])

  const cancelCancellation = () => {
    setSelectedOrder(null)
  }

  const confirmCancellation = () => {
    if (selectedOrder) {
      console.log(
        `Cancel Order ${selectedOrder.invoiceNumber} (${String(
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
    setSelectedOrder({ _id: id, order_number } as any)
  }

  const pickupTime = order?.orderDetails?.pickupDate
    ? new Date(order.orderDetails.pickupDate).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    : ''

  const orderDate = order?.orderDate ?? '' // Extracting order date
  const pickupDate = order?.orderDetails?.pickupDate ?? '' // Extracting pickup date

  return (
    <DashboardLayout>
      <div className="container mx-auto mb-2 max-w-7xl">
        {order ? (
          <>
            <div className="flex justify-center">
              <div
                className="border-thick flex-row space-x-7 border border-blue-950 bg-white "
                style={{
                  width: '1250px',
                  height: '450px',
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
                    className="font-avenir-next text-color: #052A42; text-2xl font-normal
"
                  >
                    Order #{order.invoiceNumber}
                  </div>
                  <div className="text-black-900 font-avenir-next flex items-center space-x-4 text-2xl font-bold">
                    {order?.order_details?.package_details[0]?.description
                      ? order?.order_details?.package_details[0]?.description
                      : 'Nike Return'}
                  </div>

                  <div className="w-{80} flex items-center space-x-4 text-smallText text-gray-900">
                    Order placed on
                    <span className="text-black-900 font-avenir-next with p-sm ml-1 flex items-center space-x-4 text-smallText font-bold">
                      {orderDate
                        ? new Date(orderDate).toLocaleDateString()
                        : ''}
                    </span>
                  </div>

                  <div className="w-{80} flex items-center space-x-4 text-smallText text-gray-900">
                    Pick up scheduled for
                    <span className="text-black-900 font-avenir-next with p-sm ml-1 flex items-center space-x-4 text-smallText font-bold">
                      {pickupTime} ,{' '}
                      {pickupDate
                        ? new Date(pickupDate).toLocaleDateString()
                        : ''}{' '}
                      &nbsp;
                      <span className="font-normal"> at </span>
                    </span>
                  </div>
                  <div className="text-black-900 font-avenir-next with flex items-center space-x-2 text-smallText font-bold">
                    <p className="pl-0">
                      {address}
                    </p>
                  </div>
                  {/* <OrderStatusNodes status={order?.status} /> */}
                  <OrderStatusNodes order={order} />
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
                      {order.order_details?.total_packages?order.order_details?.total_packages:1}
                    </span>
                  </div>
                  {/* Visa information */}
                  <div className="flex items-center space-x-4">
                    <IconContext.Provider value={{ size: '1.5em' }}>
                      <GoCreditCard style={{ color: '008BE6' }} />
                    </IconContext.Provider>
                    <span className="text-black-900 font-avenir-next with flex items-center text-smallText font-bold">
                      Payment Method:
                    </span>
                    <span className="w-{80} space-x-4 text-smallText text-gray-900">
                      {order.client_details?.payment_type? order.client_details?.payment_type : 'Visa'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-buttons mt-2 flex justify-end">
              <div className="button-container">
                <Link href="/orders">
                  <Button className="buttons h-8">Back</Button>
                </Link>
                &nbsp;
                <Button
                  className="buttons h-8"
                  onClick={() =>
                    handleCancelOrder(order._id, order.order_number)
                  }
                  style={{
                    backgroundColor:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered' ||
                      order.status === 'Delivered to Post Office'
                        ? '#A3BEE8'
                        : '',
                    border:
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered' ||
                      order.status === 'Delivered to Post Office'
                        ? '1px solid #4299E1'
                        : 'none',
                    cursor:
                      order.status === 'Delivered to Post Office' ||
                      order.status === 'Cancelled' ||
                      order.status === 'Delivered'
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  disabled={[
                    'Cancelled',
                    'Delivered',
                    'Delivered to Post Office',
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
