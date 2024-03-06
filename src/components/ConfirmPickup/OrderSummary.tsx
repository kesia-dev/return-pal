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
import { FormEvent, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  type Order,
  Item,
  subscriptionPlans,
} from '@returnprocess/confirm-pickup'
import { PromoCode } from '@components/DashBoard/types'
import { getAllPromoCodes } from '@/services/promocodeServices'
import { processPayment } from '@/services/paymentServices'
import { useToast } from '@components/ui/use-toast'

interface OrderBreakdownProps {
  order: Order
  onOrder: React.Dispatch<Order>
}
interface OrderSummaryProps {
  order: Order
  onOrder: React.Dispatch<Order>
}

const formSchema = z.object({
  promoCode: z.string(),
})

function OrderBreakdown({ order }: OrderBreakdownProps) {
  const { orderDetails } = order

  return order.subscription.type == subscriptionPlans['Bronze'] ? (
    <>
      <Reveal width="100%">
        <div className="flex w-full flex-col justify-center">
          <p className="font-regular mt-2 flex w-5/6 justify-between self-center text-smallText sm:text-xl">
            <span>{order.subscription.type} Plan</span>
            <span>$ {(order.subscription.price / 100).toFixed(2)}</span>
          </p>
          {orderDetails.extraPackages ? (
            <Reveal width="100%" center={true}>
              <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
                <span>
                  {orderDetails.extraPackages} additional box
                  {orderDetails.extraPackages > 1 && 'es'}
                </span>
                <span>
                  ${' '}
                  {(
                    (Number(orderDetails.extraPackages) * Number(399)) /
                    100
                  ).toFixed(2)}
                </span>
              </p>
            </Reveal>
          ) : undefined}
          {order.discount && (
            <Reveal width="100%" center={true}>
              <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText text-red-500 sm:text-xl">
                <span>Discount</span>
                <span>
                  {(
                    (orderDetails.totalCost / 100) *
                    (order.discount.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              </p>
            </Reveal>
          )}
        </div>
      </Reveal>
      {/* <Reveal width="100%" center={true}>
        <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
          <span>Tax</span>
          <span>
            {((order.order_details.total_cost / 100) * 0.13).toFixed(2)}
          </span>
        </p>
      </Reveal> */}
    </>
  ) : (
    <>
      <Reveal width="100%">
        <div className="flex w-full justify-center">
          <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
            <span>{order.subscription.type} Plan</span>
            <span>$ {(order.subscription.price / 100).toFixed(2)}</span>
          </p>
        </div>
      </Reveal>
      {order.discount && (
        <Reveal width="100%" center={true}>
          <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText text-red-500 sm:text-xl">
            <span>Discount</span>
            <span>
              {(
                (orderDetails.totalCost / 100) *
                (order.discount.discountPercentage / 100)
              ).toFixed(2)}
            </span>
          </p>
        </Reveal>
      )}
      {/* <Reveal width="100%" center={true}>
        <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
          <span>Tax</span>
          <span>
            {((order.order_details.total_cost / 100) * 0.13).toFixed(2)}
          </span>
        </p>
      </Reveal> */}
    </>
  )
}

export default function OrderSummary({ order, onOrder }: OrderSummaryProps) {
  const [isCheckingout, setIsCheckingout] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onPromoCodeApply = async (e: FormEvent) => {
    e.preventDefault()
    /**
     * Compares all promo codes in the database and verifies if the promo code entered is valid or not
     */
    const handlePromoCodeApply = async () => {
      const promoCodes: PromoCode[] = await getAllPromoCodes()
      const promoCodeInput = form.getValues().promoCode.trim().toLowerCase()
      const currentDate = new Date()

      const isValidPromoCode = promoCodes.find((promo: PromoCode) => {
        const isValidCode = promo.promoCode.toLowerCase() === promoCodeInput
        const isNotExpired = new Date(promo.expireDate) >= currentDate
        return isValidCode && isNotExpired
      })

      if (isValidPromoCode) {
        onOrder({
          ...order,
          discount: {
            promoCode: promoCodeInput,
            expireDate: promoCodes.find(
              (promo) => promo.promoCode.toLowerCase() === promoCodeInput
            )!.expireDate,
            discountPercentage: promoCodes.find(
              (promo) => promo.promoCode.toLowerCase() === promoCodeInput
            )!.discountPercentage,
          },
        })
        toast({
          variant: 'success',
          description: 'Promo code applied successfully!',
        })
      } else {
        toast({
          variant: 'destructive',
          description: 'Invalid promo code',
        })
      }
    }

    try {
      await handlePromoCodeApply()
    } catch (err) {
      console.error('Error applying promo code:', err)
      toast({
        variant: 'destructive',
        description: 'Uh oh! There was an error processing your promo code',
      })
    }
  }

  const onCheckout = () => {
    setIsCheckingout(true)
    processPayment(order)
      .then(() => {
        //Call to return process api with the necessary Payload
      })
      .catch((error) => {
        console.error('Error processing payment:', error)
      })
  }

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
          {/* <Reveal width="100%" center={true}>
            <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
              <span>One-time Return</span>
              <span>$ {(Number(1999) / 100).toFixed(2)}</span>
            </p>
          </Reveal> */}
          {/* {extraBoxes && (
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
          )} */}
          {/* <Reveal width="100%" center={true}>
            <p className="font-regular mt-2 flex w-5/6 justify-between text-smallText sm:text-xl">
              <span>Tax</span>
              <span>$ 1.50</span>
            </p>
          </Reveal> */}
          <OrderBreakdown order={order} onOrder={onOrder} />
          <Reveal width="100%" center={true}>
            <p className="mt-2 flex w-5/6 justify-between text-smallText font-bold sm:text-xl">
              <span>Total</span>
              <span>
                $ {(Number(order.orderDetails.totalCost) / 100).toFixed(2)}
              </span>
            </p>
          </Reveal>
          <Reveal width="100%" center={true}>
            <Form {...form}>
              <form className="my-6 flex h-10 w-[87%] justify-between rounded-xl border-4 border-primary sm:h-14">
                <FormField
                  control={form.control}
                  name="promoCode"
                  render={({ field }) => (
                    <FormItem className="flex w-2/3 justify-center">
                      <FormControl>
                        <input
                          className="flex h-full w-11/12 rounded-none border-0 bg-transparent px-2 text-xl text-brand placeholder:text-center placeholder:text-grey focus:border-0 focus:outline-none focus:ring-0 active:border-0 active:outline-none active:ring-0"
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
                  onClick={onPromoCodeApply}
                  className="h-full w-1/3 rounded-l-none rounded-r-lg text-xl"
                  type="submit"
                >
                  Apply
                </Button>
              </form>
            </Form>
          </Reveal>

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
        >
          {!isCheckingout ? `Confirm Pickup` : `Processing`}
        </Button>
      </Reveal>
    </section>
  )
}
