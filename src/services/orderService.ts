import axios, { type AxiosResponse } from 'axios'
import { type PaginatedResponse } from '@components/DashBoard/types'
import { type Order } from '@returnprocess/confirm-pickup'
import * as dotenv from 'dotenv'
dotenv.config()

const baseUrl: string = process.env.BASE_URL ?? 'http://localhost:4200'
export const fetchRecentOrders = async (page: number): Promise<Order[]> => {
  try {
    const response: AxiosResponse<PaginatedResponse> = await axios.get(
      `${baseUrl}/api/orders?page=${page}`
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

    console.log('Request Payload:', payload)

    const response = await axios.put(
      `${baseUrl}/api/orders/${String(orderId)}`,
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

export const getOrderDetails = async (
  orderId: string
): Promise<Order | undefined> => {
  const apiUrl = 'http://localhost:4200/api/payment/orderDetails'
  try {
    const response = await axios.post(
      apiUrl,
      {
        orderRef: orderId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data as Order
  } catch (error) {
    console.error('Error:', error)
  }
}
