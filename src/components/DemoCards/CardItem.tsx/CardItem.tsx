import * as React from 'react'
// import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CalendarSvg from '@/components/SvgComponents/CalendarSvg'
import PackageDeliverySvg from '@/components/SvgComponents/PackageDeliverySvg'

export function CardItem() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between ">
          <div className="flex h-14 w-14 items-center  justify-center rounded-full bg-primary text-subtitle font-bold text-white">
            1
          </div>
          {/* <CalendarSvg /> */}
          <PackageDeliverySvg />
          {/* <TfiCalendar className="text-primary" /> */}
        </CardTitle>
        <CardTitle className="text-center text-subtitle font-bold">
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
