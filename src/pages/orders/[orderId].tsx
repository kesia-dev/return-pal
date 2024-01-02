import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const OrderId = () => {
  const router = useRouter()
  const { orderId } = router.query
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const orderIdString = Array.isArray(orderId) ? orderId[0] : orderId
          const response = await fetch(`/api/orders/${orderIdString}`)

          if (response.ok) {
            const data = await response.json()
            setOrder(data)
          } else {
            setError(`Error fetching order details: ${response.statusText}`)
          }
        }
      } catch (error) {
        setError('An error occurred while fetching order details')
        console.error('Error fetching order details', error)
      } finally {
        setLoading(false)
      }
    }

    ;(async () => {
      await fetchOrderDetails()
    })().catch((error) => {
      console.error('Error in fetchOrderDetails:', error)
      setLoading(false)
      setError('An unexpected error occurred')
    })
  }, [orderId])

  return (
    <div className="p-20">
      <div
        className="flex items-center justify-between p-4"
        style={{ backgroundColor: '#052A42' }}
      >
        <Image
          src="/images/returnpal-logo.png"
          alt="ReturnPal Logo"
          width={160} // adjust the width as needed
          height={40} // adjust the height as needed
        />
        <div
          style={{
            width: '185px',
            height: '49px',
            top: '80px',
            left: '475px',
            fontFamily: 'Avenir Next',
            fontSize: '26px',
            fontWeight: '500',
            lineHeight: '49px',
            letterSpacing: '0px',
            textAlign: 'left',
            background: '#052A42',
            color: '#FFFFFF',
            marginLeft: '10px', // Adjust the left margin as needed
          }}
        >
          <Link href="/dashboard">
            {' '}
            {/* Update the href to '/dashboard' */}
            <a>Dashboard</a>
          </Link>
        </div>
        <div
          style={{
            width: '185px',
            height: '49px',
            top: '80px',
            left: '475px',
            fontFamily: 'Avenir Next',
            fontSize: '26px',
            fontWeight: '500',
            lineHeight: '49px',
            letterSpacing: '0px',
            textAlign: 'left',
            background: '#052A42',
            color: '#FFFFFF',
            marginLeft: '10px', // Adjust the left margin as needed
          }}
        >
          <Link href="/dashboard">
            {' '}
            {/* Update the href to '/dashboard' */}
            <a>Sign out</a>
          </Link>
        </div>
        <Image
          style={{
            width: '60px',
            height: '60px',
            top: '74px',
            left: '1606px',
            padding: '2.8px 7.35px 2.8px 7.35px',
            borderRadius: '3px', // Assuming you want a border-radius of 3px
          }}
          alt="noun-profile-4402038-FFFFFF 3"
          width={160} // adjust the width as needed
          height={40} // adjust the height as needed
        />
      </div>
      {/* <div className="width-1728px height-1117px bg-#E1F6FF bg-paleBlue"> */}
      <div className="w-1728px h-1117px relative bg-paleBlue">
        

        <div className="bg-gradient w-1527px h-690px left-97px top-0px absolute rounded-2xl border border-solid border-gray-300 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-blue-700">
            Manage Order Page
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {order ? (
                <>
                  <h2 className="text-xl font-bold">Order Details 211112</h2>
                  <p>Order Number: {order.order_number}</p>
                  <p>Item Name: {order.itemName}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Orders Status: {order.status}</p>
                  <p>
                    Orders Placed on:{' '}
                    {order.order_date?.$dateFromString?.dateString}
                  </p>
                </>
              ) : (
                <p className="text-red-500">{error ?? 'Order not found'}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderId
