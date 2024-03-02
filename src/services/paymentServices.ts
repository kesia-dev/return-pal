import dotenv from 'dotenv'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { type PaymentData } from '@components/DashBoard/types'

dotenv.config()
const baseUrl: string = process.env.BASE_URL ?? 'http://localhost:4100'

const paymentData: PaymentData = {
  amount: 5,
}

export const processPayment = async () => {
  if (!process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
  }
  const stripe = await loadStripe(
    process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY?.toString()
  )

  const headers = {
    'Content-Type': 'application/json',
  }

  const body = JSON.stringify(paymentData)

  try {
    const response = await axios.post<{ id: string }>(
      `${baseUrl}/api/payment`,
      body,
      {
        headers: headers,
      }
    )

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
