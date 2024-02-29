import {
  type StripeResponseData,
  type PaymentData,
} from '@components/DashBoard/types'

const baseUrl: string = process.env.BASE_URL ?? 'http://localhost:4100'

export const processPayment = async (paymentData: PaymentData) => {
  console.log('Inside processPayment Function')
  try {
    const response = await fetch(`${baseUrl}/api/payment/charge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
    console.log(response)

    if (response.ok) {
      const responseData = (await response.json()) as StripeResponseData
      return responseData
    } else {
      console.error('Error processing payment:', response.statusText)
      throw new Error('Failed to process payment')
    }
  } catch (error) {
    console.error('Error processing payment:', error)
    throw error
  }
}
