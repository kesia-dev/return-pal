import axios, { type AxiosResponse } from 'axios'
import { type PaginatedResponse, type Order } from '@components/DashBoard/types'

export const fetchRecentOrders = async (page: number): Promise<Order[]> => {
  try {
    const response: AxiosResponse<PaginatedResponse> = await axios.get(
      `http://localhost:4200/api/orders?page=${page}`
    )

    if (response.status !== 200) {
      throw new Error(`Failed to fetch orders. Status: ${response.status}`)
    }

    const responseData: PaginatedResponse = response.data

    return responseData.paginatedOrders
  } catch (error) {
    console.error('Error fetching recent orders:', error)
    throw error
  }
}
export const cancelOrder = async (orderId: string): Promise<boolean> => {
  try {
    const payload = {
      status: 'Cancelled',
    }

    console.log(
      'Request url:',
      `http://localhost:4200/api/orders/${String(orderId)}`
    )

    console.log('Request Payload:', payload)

    const response = await axios.put(
      `http://localhost:4200/api/orders/${String(orderId)}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.status === 200
  } catch (error) {
    console.error('Error updating order status:', error)
    return false
  }
}
