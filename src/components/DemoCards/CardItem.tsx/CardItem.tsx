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
      <CardHeader>
        <CardTitle className="flex items-center justify-between ">
          {/* <div className="flex h-14 w-14 items-center  justify-center rounded-full bg-primary text-subtitle font-bold text-white">
            1
          </div> */}
          <AiFillCheckCircle className="h-6 w-6 text-primary" />
          {/* <CalendarSvg /> */}
          {/* <PackageDeliverySvg /> */}
          {/* <VanSvg /> */}
          {/* <NounBarcodeSvg /> */}
          {/* <TimerSvg /> */}
          <NounPinSvg />
        </CardTitle>
        <CardTitle className="text-center text-largeText font-bold">
          Schedule A Return
        </CardTitle>
        <CardDescription className="text-subtitle text-white">
          Step-by-step guide to entering pickup details
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="text-subtitle">
        Step-by-step guide to entering pickup details
      </CardContent> */}
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}

export default CardItem
