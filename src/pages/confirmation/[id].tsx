import FastTruck from '@/components/SvgComponents/FastTruck'
import {
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import {
  SectionDescription,
  SectionHeaderHighlight,
} from '@/components/common/section'
import { Button } from '@/components/ui/button'
import CloseX from '@components/SvgComponents/CloseX'
import Link from 'next/link'
import Reveal from '@components/common/reveal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import moment from 'moment'
import ReturnProcessLayout from '@layouts/ReturnProcessLayout'
import { getOrderDetails } from '@/services/orderService'
import { User, OrderResponse } from '@returnprocess/types'
export default function Confirmation() {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState<OrderResponse>()
  const [user, setUser] = useState<User>()
  const [location, setLocation] = useState<string>()

  useEffect(() => {
    if (id) {
      getOrder(id as string)
    }
  }, [id])

  const getOrder = async (id: string) => {
    try {
      const recentOrder = await getOrderDetails(id)
      const pickupDetails = recentOrder?.orderDetails?.pickupDetails
      const { address, city, province, postalCode } = pickupDetails!
      setOrder(recentOrder)
      setUser(recentOrder?.orderDetails.user)
      setLocation(
        `${
          pickupDetails?.unit || ''
        } ${address} ${city}, ${province} ${postalCode}`
      )
    } catch (error) {
      console.error('Error fetching recent orders:', error)
    }
  }

  return (
    <>
      <ReturnProcessLayout step={7}>
        <ReturnProcessRoot className="mb-4 flex w-full flex-col items-center space-y-2 pt-2 sm:space-y-8 sm:pt-6 md:pt-10 lg:pt-16">
          <ReturnProcessSection className="relative mt-0 w-full space-y-1 text-base text-brand sm:my-2 sm:w-5/6 sm:space-y-3 sm:pr-12 md:my-4 md:text-smallText">
            <div className="absolute right-2 top-2 h-6 w-6 text-primary sm:h-9 sm:w-9 md:h-12 md:w-12">
              <Link href="/">
                <Reveal width="100%" center={true}>
                  <CloseX />
                </Reveal>
              </Link>
            </div>
            <Reveal>
              <div className="mb-2 w-11/12 text-smallText font-normal text-brand sm:w-full md:text-4xl">
                <SectionHeaderHighlight className="text-smallText font-bold text-primary md:text-4xl">
                  Thank you
                </SectionHeaderHighlight>{' '}
                for scheduling a return pickup with us!
              </div>
            </Reveal>
            <Reveal>
              <SectionDescription className="text-left md:text-xl md:font-normal">
                {order?.orderDetails?.pickupDetails.name} , your pickup order{' '}
                <SectionHeaderHighlight>
                  #{order?.invoiceNumber}
                </SectionHeaderHighlight>{' '}
                is confirmed.
              </SectionDescription>
            </Reveal>
            <Reveal>
              <SectionDescription className="text-left md:text-xl md:font-normal">
                A confirmation email will be sent to:{' '}
                <SectionHeaderHighlight>{user?.email}</SectionHeaderHighlight>
              </SectionDescription>
            </Reveal>
          </ReturnProcessSection>

          <div className="mb-8 mt-0 flex w-full flex-col justify-between text-base text-brand sm:w-5/6 sm:gap-x-4 sm:text-smallText md:flex-row lg:mt-0">
            <Reveal>
              <section className="h-fit rounded-3xl border-2 border-primary bg-white p-4 sm:p-8">
                <Reveal>
                  <p className="mb-2 sm:mb-4">
                    <span className="font-bold">Location:</span> {location}
                  </p>
                </Reveal>
                <Reveal>
                  <p className="mb-2 sm:mb-4">
                    <span className="font-bold">Pickup Date:</span>{' '}
                    {moment(order?.orderDetails?.pickupDate).format(
                      'YYYY-MM-DD'
                    )}
                  </p>
                </Reveal>
                <Reveal>
                  <p className="mb-2 sm:mb-4">
                    <span className="font-bold">Pickup Method:</span>{' '}
                    {order?.orderDetails.pickupMethod}
                  </p>
                </Reveal>
                <Reveal>
                  <p className="mb-2 sm:mb-4">
                    <span className="font-bold">Total Packages:</span>{' '}
                    {order?.orderDetails.totalPackages}
                  </p>
                </Reveal>
              </section>
            </Reveal>
            <section className="flex flex-col items-center justify-end">
              <Reveal>
                <div className="scale-90 sm:scale-100">
                  <FastTruck />
                </div>
              </Reveal>
              <div>
                <Link href="/dashboard">
                  <Reveal>
                    <Button className="mt-0 whitespace-nowrap px-8 text-base tracking-wider sm:mt-8">
                      Return to Dashboard
                    </Button>
                  </Reveal>
                </Link>
              </div>
            </section>
          </div>
        </ReturnProcessRoot>
      </ReturnProcessLayout>
    </>
  )
}
