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
import { AiFillCheckCircle } from 'react-icons/ai'
import { type CardItemProps } from './type'

export function CardItem({ step, icon, title, description }: CardItemProps) {
  return (
    <Card className="w-[350px]  lg:h-[26rem] lg:w-[20rem] xl:h-[30rem] xl:w-[24rem]">
      <section className="mt-4 flex items-center justify-between px-4">
        {typeof step === 'number' ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold  text-white lg:h-12 lg:w-12 xl:h-16 xl:w-16 xl:text-subtitle">
            {step}
          </div>
        ) : (
          <AiFillCheckCircle className="h-8 w-8 rounded-full border-4 border-primary bg-white text-primary lg:h-12 lg:w-12 xl:h-16 xl:w-16">
            <style>
              {`
            .text-primary path:first-child {
              fill: white;
            }
          `}
            </style>
          </AiFillCheckCircle>
        )}
        {icon}
      </section>
      <CardHeader>
        <CardTitle className="text-base font-bold sm:text-lg md:text-mediumText lg:text-subtitle">
          {title ? title : description}
        </CardTitle>
      </CardHeader>
      {title ? (
        <CardContent className="text-base sm:text-lg md:text-mediumText lg:text-2xl xl:text-subtitle">
          {description}
        </CardContent>
      ) : null}
    </Card>
  )
}

export default CardItem
