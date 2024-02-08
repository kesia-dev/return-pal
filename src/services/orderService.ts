import { type PaginatedResponse, type Order } from '@components/DashBoard/types'

export const fetchRecentOrders = async (page: number): Promise<Order[]> => {
  try {
    const response = await fetch(
      `http://localhost:4200/api/orders?page=${page}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch orders. Status: ${response.status}`)
    }

    const responseData = (await response.json()) as PaginatedResponse

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

    const response = await fetch(
      `http://localhost:4200/api/orders/${String(orderId)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      console.error('Error updating order status:', errorMessage)
      return false
    }

    return true
  } catch (error) {
    console.error('Error updating order status:', error)
    return false
  }
}
