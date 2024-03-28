import React, { useEffect, useState } from 'react'
import OrderList from '@components/Orders/OrderList'
import axios from 'axios'
import { type Order, type PaginatedResponse } from '@components/DashBoard/types'
import { Button } from '@/components/ui/button'
import DashboardLayout from '@/layouts/DashboardLayout'
import Router from 'next/router'
import OneMonthCalendar from '@components/OneMonthCalender'

interface OrdersProps {
  initialOrders: Order[]
}

const pageSize = 4
const Orders: React.FC<OrdersProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedDate, setDateSelected] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleDateSelected = (date: Date) => {
    setDateSelected(date.toISOString());
    setIsDateSelected(true)
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchOrders = async (page: number) => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get<PaginatedResponse>(
        `${baseUrl}/api/orders?page=${page}&userId=${userId}&perPage=${pageSize}&date=${selectedDate}`
      )

      if (Array.isArray(response.data.paginatedOrders)) {
        setOrders(response.data.paginatedOrders)
        setCurrentPage(response.data.currentPage)

        setTotalPages(Math.ceil(response.data.totalOrders / pageSize))
      } else {
        console.error('Invalid data format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setLoading(true)

    fetchOrders(newPage)
      .then(() => setLoading(false))
      .catch((error) => console.error('Error fetching orders:', error))
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders(currentPage)
    }

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [currentPage, selectedDate])

  const canShowPagination = totalPages > 1

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!token) {
      const funCall = async () =>{
        await Router.push("/signin")
      }
      funCall();
    }
  })

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-paleBlue p-16">
        <h1 className="mb-10 ml-3 bg-paleBlue text-3xl font-medium">
          Recent Orders
        </h1>
        <div className='grid grid-cols-10 gap-8'>
          <div className="lg:col-span-7 md:col-span-7 col-span-10 overflow-hidden rounded-xl bg-white font-bold sm:flex-row">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {orders?.length > 0 ? (
                  <OrderList orders={orders} />
                ) : (
                  <p className="ml-3 font-medium">Currently no orders placed.</p>
                )}
                {/* {canShowPagination && ( */}
                  <div className="pagination p-2 flex justify-center text-center items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="mr-2"
                    >
                      Previous
                    </Button>
                    <span className="mr-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="mr-2"
                    >
                      Next
                    </Button>
                  </div>
                {/* )} */}
              </>
            )}
          </div>
          <div className='lg:col-span-3 md:col-span-3 col-span-10'>
            <OneMonthCalendar onDateSelect={handleDateSelected} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Orders
