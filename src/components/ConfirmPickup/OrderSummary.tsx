import { Separator } from '../ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import Stamp from '../SvgComponents/Stamp'
import Link from 'next/link'
import { useReturnProcess } from '@hooks/useReturnProcess'
import Reveal from '@components/common/reveal'
import { useEffect, useState } from 'react'
import type { Order, Item, PromoCode } from '@/components/DashBoard/types'
import { getAllPromoCodes } from '@/services/promocodeServices'
import { processPayment } from '@/services/paymentServices'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

interface Props {
  promoState: [
    string | PromoCode | null,
    React.Dispatch<React.SetStateAction<string | PromoCode | null>>,
  ]
  order: Order
  items: Item[]
}

interface CheckoutResponse {
  checkoutLinkUrl: string
  CHECKOUT_SESSION_ID: string
}

const formSchema = z.object({
  promo: z.string(),
})

export default function OrderSummary({
  promoState: [promoCode, setPromoCode],
  order,
  items,
}: Props) {
  const [isCheckingout, setIsCheckingout] = useState(false)
  const [promoMessage, setPromoMessage] = useState('')

  const returnProcess = useReturnProcess()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promo: promoCode,
    },
  })

  // mock data
  const extraBoxes = 2
  const extraBoxPrice = 999

  function handleApplyButtonClickWrapper() {
    handleApplyButtonClick().catch((error) => {
      console.error('Error handling apply button click:', error)
    })
  }
  async function handleApplyButtonClick() {
    try {
      const promoCodes: PromoCode[] = await getAllPromoCodes()
      const promoCodeInput = form.getValues().promo.trim().toLowerCase()
      const currentDate = new Date()

      const validPromo = promoCodes.find((promo) => {
        const isValidCode = promo.promoCode.toLowerCase() === promoCodeInput
        const isNotExpired = new Date(promo.expireDate) >= currentDate
        return isValidCode && isNotExpired
      })

      if (validPromo) {
        setPromoMessage('Promo code applied successfully')
        setPromoCode(validPromo)
      } else {
        setPromoMessage('Invalid promo code')
        setPromoCode('')
      }
    } catch (error) {
      console.error('Error applying promo code:', error)
      setPromoMessage('Invalid promo code')
      setPromoCode('')
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {}

  const onCheckout = () => {
    setIsCheckingout(true)
    processPayment()
      .then(() => {
        //Call to return process api with the necessary Payload
      })
      .catch((error) => {
        console.error('Error processing payment:', error)
      })
  }

  interface ReceivedData {
    action: string
    price: number
  }

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (typeof event.data == 'string') {
        const receivedData = JSON.parse(event.data) as ReceivedData
        if (receivedData.action === 'CheckoutSuccess') {
          console.log('Received CheckoutSuccess message!')

          order.order_details.total_cost = receivedData.price
          order.client_details.subscription =
            returnProcess.currentData.subscription

          fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: returnProcess.currentData.userInfo,
              order: order,
            }),
          })
            .then((response) => {
              if (response.ok) {
                returnProcess.forward()
              }
              if (!response.ok) {
                throw new Error('Error saving to database')
              }
            })
            .catch((error) => {
              console.error(error)
            })
            .finally(() => {
              // Remove the event listener only if it's still there
              if (window.removeEventListener) {
                window.removeEventListener('message', handleMessage)
              }
            })
        }
      }
    }
    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <section className="mx-1 tracking-normal md:w-1/3">
      <Reveal>
        <div className="flex h-fit max-w-[300px] flex-col items-center rounded-xl border-2 border-brand bg-white shadow-2xl">
          <Reveal>
            <p className="mt-6 text-smallText font-semibold text-primary lg:text-2xl">
              Order Summary
            </p>
          </Reveal>
          <Reveal width="100%" center={true}>
            <Separator className="mb-4 mt-4 w-2/3 bg-brand" />
          </Reveal>
          <Reveal width="100%" center={true}>
            <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
              <span>One-time Return</span>
              <span>$ {(Number(1999) / 100).toFixed(2)}</span>
            </p>
          </Reveal>
          {extraBoxes && (
            <Reveal width="100%" center={true}>
              <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
                <span>
                  {extraBoxes} additional box
                  {extraBoxes > 1 && 'es'}
                </span>
                <span>
                  ${' '}
                  {((Number(extraBoxes) * Number(extraBoxPrice)) / 100).toFixed(
                    2
                  )}
                </span>
              </p>
            </Reveal>
          )}
          <Reveal width="100%" center={true}>
            <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
              <span>Tax</span>
              <span>$ 1.50</span>
            </p>
          </Reveal>
          <Reveal width="100%" center={true}>
            <p className="mt-2 flex w-5/6 justify-between text-smallText font-bold sm:text-xl">
              <span>Total</span>
              <span>$ 16.48</span>
            </p>
          </Reveal>
          <Reveal width="100%" center={true}>
            <Form {...form}>
              <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(onSubmit)}
                className="my-6 flex h-10 w-[87%] justify-between rounded-xl border-4 border-primary sm:h-14"
              >
                <FormField
                  control={form.control}
                  name="promo"
                  render={({ field }) => (
                    <FormItem className="flex w-2/3 justify-center">
                      <FormControl>
                        <input
                          className="flex h-full w-11/12 rounded-none border-0 bg-transparent text-xl text-brand placeholder:text-center placeholder:text-grey focus:outline-0"
                          type="text"
                          placeholder="Promo Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={handleApplyButtonClickWrapper}
                  className="h-full w-1/3 rounded-l-none rounded-r-lg text-xl"
                >
                  Apply
                </Button>
              </form>
            </Form>
          </Reveal>

          {promoMessage && (
            <Reveal width="100%" center={true}>
              <div>
                <p
                  className={`text-sm ${promoMessage.includes('successfully') ? 'text-blue-500' : 'text-red-500'}`}
                >
                  {promoMessage}
                </p>
              </div>
            </Reveal>
          )}
          <Reveal width="100%" center={true}>
            <div className="mb-6 flex w-[87%] justify-between rounded-xl bg-paleBlue p-4">
              <Stamp />
              <Link href="/" className="w-8/12 text-primary underline">
                Upgrade to unlimited pickups for $19.99/month
              </Link>
            </div>
          </Reveal>
        </div>
      </Reveal>
      <Reveal width="100%">
        <Button
          className="my-6 h-fit w-full max-w-[300px] sm:text-xl"
          onClick={onCheckout}
          disabled={isCheckingout}
          // onClick={() => returnProcess.forward()}
        >
          {!isCheckingout ? `Confirm Pickup` : `Processing`}
        </Button>
      </Reveal>
    </section>
  )
}
