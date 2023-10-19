import FastTruck from '@/components/SvgComponents/FastTruck'
import { Button } from '@/components/ui/button'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import { X } from 'lucide-react'
import Link from 'next/link'

interface Order {
  name: string
  orderRef: string
  email: string
  location: string
  pickupDate: string
  pickupMethod: string
  totalPackages: number
  cardType: string
  cardNumber: number
}

const mockOrder: Order = {
  name: 'John',
  orderRef: 'R957394',
  email: 'johndoe2394@gmail.com',
  location: '6500 Boulevard de Rome, Brossard, QC J4Y 0B6',
  pickupDate: 'Mon, Sep 25th',
  pickupMethod: 'Direct Handoff',
  totalPackages: 1,
  cardType: 'Visa',
  cardNumber: 4832,
}

export default function Confirmation() {
  return (
    <div className="flex w-full flex-col items-center justify-start tracking-wide">
      <section className="relative my-10 w-11/12 text-smallText text-brand sm:mt-12 sm:w-2/3 sm:pr-12">
        <p className="mb-2 text-subtitle">
          <span className="font-bold text-primary">Thank you</span> for
          scheduling a return pickup with us!
        </p>
        <p className="mb-2">
          {mockOrder.name}, your pickup order{' '}
          <span className="font-bold text-primary">#{mockOrder.orderRef}</span>{' '}
          is confirmed
        </p>
        <p>
          A confirmation email will be sent to:{' '}
          <span className="font-bold text-primary">{mockOrder.email}</span>
        </p>
        <Link href="/" className="absolute -top-4 right-0 text-primary">
          <X size={44} strokeWidth={1} />
        </Link>
      </section>

      <div className="flex w-11/12 justify-between gap-x-4 text-smallText text-brand sm:mb-8 sm:w-2/3">
        <section className="h-fit rounded-3xl border-2 border-primary bg-white p-8">
          <p className="mb-4">
            <span className="font-bold">Location:</span> {mockOrder.location}
          </p>
          <p className="mb-4">
            <span className="font-bold">Pickup Date:</span>{' '}
            {mockOrder.pickupDate}
          </p>
          <p className="mb-4">
            <span className="font-bold">Pickup Method:</span>{' '}
            {mockOrder.pickupMethod}
          </p>
          <p className="mb-4">
            <span className="font-bold">Total Packages:</span>{' '}
            {mockOrder.totalPackages}
          </p>
          <p className="mb-0">
            <span className="font-bold">Payment Method:</span>{' '}
            {mockOrder.cardType} ending in {mockOrder.cardNumber}
          </p>
        </section>
        <section className="flex flex-col items-center justify-end">
          <div>
            <FastTruck />
          </div>
          <div>
            <Button className="mt-8 whitespace-nowrap px-8 text-base tracking-wider">
              Return to Dashboard
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

Confirmation.getLayout = getLayout
