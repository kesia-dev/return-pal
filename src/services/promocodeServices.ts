import { PromoCode } from '@components/DashBoard/types'
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getAllPromoCodes = async (): Promise<PromoCode[]> => {
  try {
    console.log(baseUrl)
    const response = await axios.get<PromoCode[]>(`${baseUrl}/api/promocode`)
    return response.data
  } catch (error) {
    console.error('Error fetching promo codes:', error)
    throw error
  }
}

export { getAllPromoCodes }
