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
