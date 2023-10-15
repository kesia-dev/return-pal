import * as React from 'react'
// import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CalendarSvg from '@/components/SvgComponents/CalendarSvg'
import PackageDeliverySvg from '@/components/SvgComponents/PackageDeliverySvg'
import VanSvg from '@/components/SvgComponents/VanSvg'
import NounBarcodeSvg from '@/components/SvgComponents/NounBarcodeSvg'
import TimerSvg from '@/components/SvgComponents/TimerSvg'
import NounPinSvg from '@/components/SvgComponents/NounPinSvg'
import { AiFillCheckCircle } from 'react-icons/ai'

export function CardItem() {
  return (
    <Card className="w-[350px]">
      <section className="mt-4 flex items-center justify-between px-4">
        {/* <div className="flex h-14 w-14 items-center  justify-center rounded-full bg-primary text-subtitle font-bold text-white">
            1
          </div> */}
        <AiFillCheckCircle className="h-12 w-12 rounded-full border-4 border-primary bg-white text-primary">
          <style>
            {`
            .text-primary path:first-child {
              fill: white;
            }
          `}
          </style>
        </AiFillCheckCircle>{' '}
        {/* <CalendarSvg /> */}
        {/* <PackageDeliverySvg /> */}
        {/* <VanSvg /> */}
        {/* <NounBarcodeSvg /> */}
        {/* <TimerSvg /> */}
        <NounPinSvg />
      </section>
      <CardHeader>
        <CardTitle>Schedule A Return</CardTitle>
      </CardHeader>
      <CardContent className="text-subtitle">
        Step-by-step guide to entering pickup details
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}

export default CardItem
