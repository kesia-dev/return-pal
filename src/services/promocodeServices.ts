import axios from 'axios'

const baseUrl: string = process.env.BASE_URL ?? 'http://localhost:4200'

const getAllPromoCodes = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${baseUrl}/api/promocode`)
    return response.data
  } catch (error) {
    console.error('Error fetching promo codes:', error)
    throw error
  }
}

export { getAllPromoCodes }
