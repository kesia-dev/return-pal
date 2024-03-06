import dotenv from 'dotenv'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { type PaymentData } from '@components/DashBoard/types'
import { type Order } from '@returnprocess/confirm-pickup'

dotenv.config()
const baseUrl: string = process.env.BASE_URL ?? 'http://localhost:4200'

export const processPayment = async (order: Order) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
  }
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.toString()
  )

  const body = JSON.stringify(order)

  try {
    const response = await axios.post(`${baseUrl}/api/payment`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status !== 200) {
      throw new Error('Failed to process payment')
    }

    const sessionId: string = response.data.id

    const result = await stripe?.redirectToCheckout({
      sessionId: sessionId,
    })

    if (result?.error) {
      console.error(result.error)
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    throw error
  }
}
