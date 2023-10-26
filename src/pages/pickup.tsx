import React, { type ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
} from '@/components/ui/common'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  ExtendedToggleGroup,
  ExtendedToggleGroupItem,
} from '@/components/ui/extended-toggle-group'

type PickCardType = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  details: string
  image: ReactNode
  selected?: boolean
}
const PickMethodCard = React.forwardRef<HTMLDivElement, PickCardType>(
  // eslint-disable-next-line react/prop-types
  ({ title, details, image, className, ...props }, ref) => {
    return (
      <Card
        className={cn(
          'mx-2 h-full select-none border-brand bg-paleBlue text-brand hover:cursor-pointer data-[state=on]:scale-110 data-[state=on]:border-8 data-[state=on]:border-primary data-[state=unselected]:border-brand data-[state=off]:opacity-50 data-[state=on]:shadow-2xl lg:w-2/5',
          className
        )}
        ref={ref}
        {...props}
      >
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          {image}
          <p className="sm: flex h-[10%] justify-center text-center text-sm font-bold md:text-smallText">
            {title}
          </p>
          <p className="">{details}</p>
        </CardContent>
      </Card>
    )
  }
)
PickMethodCard.displayName = 'PickMethodCard'

const handOffPic = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="80px"
      height="80px"
      viewBox="0 0 79.1 83"
      className="fill-primary"
    >
      <path
        d="M0,73.1c0,0.8,0.7,1.5,1.5,1.5h23.7l2.3,1.7l7.9,5.8c0.8,0.6,1.8,0.9,2.7,0.9c1.4,0,2.8-0.6,3.7-1.8
c0.3-0.4,0.6-0.9,0.7-1.5c0.6,0.3,1.3,0.5,2,0.5c0.2,0,0.5,0,0.7-0.1c1.2-0.2,2.3-0.8,3-1.8c0.3-0.4,0.6-0.9,0.7-1.5
c0.7,0.3,1.4,0.5,2.1,0.5c1.4,0,2.8-0.6,3.7-1.8c0.2-0.3,0.4-0.7,0.5-1h22.4c0.8,0,1.5-0.7,1.5-1.5V16.3c0,0,0-0.1,0-0.1
c0,0,0-0.1,0-0.1c0-0.1,0-0.2-0.1-0.3c0,0,0,0,0,0c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0L67.2,0.6C66.9,0.2,66.4,0,66,0H45.4H33.7
H13.1c-0.5,0-0.9,0.2-1.2,0.6L0.3,15.4c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.3c0,0,0,0,0,0C0.1,15.9,0,16,0,16.1c0,0,0,0.1,0,0.1
c0,0,0,0.1,0,0.1C0,16.3,0,73.1,0,73.1z M3,71.6V58.1l8.2,6c0.3,0.2,0.6,0.3,0.9,0.3c0.1,0,0.1,0,0.2,0l0,0c0.3,0.6,0.7,1.1,1.3,1.5
l7.6,5.6L3,71.6L3,71.6z M24.6,43.5C24.6,43.5,24.6,43.5,24.6,43.5l-11,14.9l-1.9,2.5L6,56.6l13.2-17.9L25,43L24.6,43.5z M50,74.1
L47.2,72c0,0,0,0,0,0l-10.7-7.9c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l10.7,7.9c0.3,0.2,0.5,0.6,0.6,1
c0.1,0.4,0,0.8-0.3,1.2s-0.6,0.6-1,0.6c-0.4,0.1-0.8,0-1.2-0.3L32.9,69c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l7.9,5.8
c0.3,0.2,0.5,0.6,0.6,1c0.1,0.4,0,0.8-0.3,1.2c-0.5,0.7-1.5,0.8-2.2,0.3l-7.9-5.8L15.3,63.5c-0.3-0.2-0.5-0.6-0.6-1
c-0.1-0.4,0-0.8,0.3-1.1l12-16.2c0.2-0.3,0.6-0.5,1-0.6l13.4-2c0.2,1.7-1.1,3.3-2.8,3.5L33.3,47c-0.6,0.1-1.1,0.5-1.2,1.1
s0.1,1.2,0.6,1.6l9.4,7l10.7,7.9c0.3,0.2,0.5,0.6,0.6,1c0.1,0.4,0,0.8-0.3,1.2s-0.6,0.6-1,0.6c-0.4,0.1-0.8,0-1.2-0.3l-10.7-7.9
c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1L49,69.5l0,0l2.9,2.1c0.3,0.2,0.5,0.6,0.6,1c0,0,0,0.1,0,0.1c0,0.1,0,0.2,0,0.3
c0,0,0,0.1,0,0.1c0,0.2-0.1,0.4-0.3,0.6C51.7,74.5,50.7,74.6,50,74.1z M76.1,71.6H55.3c-0.2-0.7-0.6-1.3-1.1-1.9
c0.5-0.3,0.9-0.7,1.2-1.1c0.7-1,1-2.2,0.8-3.4s-0.8-2.3-1.8-3l-10.7-7.9l-6.5-4.8l1.8-0.3c1.7-0.2,3.1-1.1,4.1-2.5s1.4-3,1.2-4.7
c-0.1-0.7-0.5-1.4-1.1-1.8s-1.3-0.6-2.1-0.5l-13,1.9c-0.1-0.1-0.1-0.1-0.2-0.2l-8.2-6.1c-0.7-0.5-1.6-0.3-2.1,0.3L3,55.5V17.8h26.7
v12.8c0,0.5,0.3,1,0.8,1.3c0.5,0.3,1.1,0.2,1.5,0l7.6-4.7l7.6,4.7c0.2,0.2,0.5,0.2,0.8,0.2c0.2,0,0.5-0.1,0.7-0.2
c0.5-0.3,0.8-0.8,0.8-1.3V17.8h26.7V71.6z M32.7,17.8h13.8v10.1l-6.1-3.8c-0.2-0.2-0.5-0.2-0.8-0.2S39,24,38.7,24.1l-6.1,3.8
C32.7,27.9,32.7,17.8,32.7,17.8z M74.5,14.8H49.2L47.2,3h18.1L74.5,14.8z M44.1,3l2,11.8H32.9L35,3H44.1z M13.8,3h18.1l-2,11.8H4.6
L13.8,3z"
      />
    </svg>
  )
}

const doorstepPic = () => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      width="80px"
      height="80px"
      className="fill-primary"
    >
      <path d="m895.57 134.74h-591.15c-10.352 0-18.75 8.3984-18.75 18.75v893.02c0 10.352 8.3984 18.75 18.75 18.75h591.19c10.352 0 18.75-8.3984 18.75-18.75v-893.02c-0.039062-10.387-8.4023-18.75-18.789-18.75zm-18.75 893.02h-553.65v-855.52h553.69v855.52z" />
      <path d="m791.55 646.46c25.613 0 46.461-20.852 46.461-46.461 0-25.613-20.852-46.461-46.461-46.461-25.613 0-46.426 20.812-46.426 46.461s20.812 46.461 46.426 46.461zm0-55.422c4.9492 0 8.9609 4.0117 8.9609 8.9609 0 9.8984-17.926 9.8984-17.926 0 0.039062-4.9492 4.0508-8.9609 8.9648-8.9609z" />
      <path d="m534.04 372h131.93c22.086 0 40.051-17.961 40.051-40.012l-0.003906-21.227c0-22.086-17.961-40.012-40.051-40.012h-131.93c-22.086 0-40.051 17.961-40.051 40.012v21.188c0.003906 22.09 17.965 40.051 40.055 40.051zm0-63.75 134.44 2.5117v21.188c0 1.3867-1.125 2.5117-2.5508 2.5117l-134.44-2.5117z" />
    </svg>
  )
}

function Pickup() {
  const [selectedMethod, setSelectedMethod] = useState('')
  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue: string = event.target.value
  //   setSelectedMethod(newValue)
  //   const form = document.getElementById('selectPickupMethod')!
  //   if (form) {
  //     const radioInputs = form.querySelectorAll('input[type="radio"]')

  //     const inputArray: HTMLInputElement[] = Array.from(radioInputs).filter(
  //       (element): element is HTMLInputElement =>
  //         element instanceof HTMLInputElement
  //     )
  //     inputArray.forEach((input) => {
  //       const parentDiv: HTMLElement | null = input.parentNode
  //         ?.parentNode as HTMLElement | null
  //       if (parentDiv) {
  //         if (input.checked) {
  //           parentDiv.classList.remove('border-brand')
  //           parentDiv.classList.add('border-primary')
  //           parentDiv.classList.remove('opacity-50')
  //           parentDiv.classList.add('selected')
  //         } else {
  //           parentDiv.classList.add('border-brand')
  //           parentDiv.classList.remove('border-primary')
  //           parentDiv.classList.add('opacity-50')
  //           parentDiv.classList.remove('selected')
  //         }
  //       }
  //     })
  //   }
  // }

  // useEffect(() => {
  //   const selected = document.getElementsByClassName('selected')
  //   console.log(selected[0])
  // }, [selectedMethod])

  return (
    <div className="mx-5 my-5">
      <div className="text-largeText text-brand">Pickup Details</div>
      <div className="text-brand">Which pickup method do you prefer?</div>
      <div className="flex justify-center">
        <ExtendedToggleGroup
          onFirstSelectedValueChange={() => {
            console.log(
              'onFirstSelectedValueChange HAS BEEN CALLED FROM PARENT (TESTING)'
            )
          }}
          type="single"
          className="grid w-4/5 grid-cols-2  place-content-center place-items-center content-center items-center justify-center gap-y-5 self-center "
          onValueChange={(s) => {
            console.log('onValueChange: ', s)
          }}
        >
          <ExtendedToggleGroupItem value="handoff" asChild>
            <PickMethodCard
              title="Direct Handoff"
              details="Hand the package directly to our specialist at your door"
              image={handOffPic()}
            />
          </ExtendedToggleGroupItem>

          <ExtendedToggleGroupItem value="doorstep" asChild>
            <PickMethodCard
              title="Leave On Doorstep"
              details="Place items outside your door ahead of your pick up window"
              image={doorstepPic()}
            />
          </ExtendedToggleGroupItem>
        </ExtendedToggleGroup>
      </div>
      {/* <form id="selectPickupMethod" className="mt-5 flex justify-center">
        <div className="mx-1/5 flex w-5/6 flex-row justify-center md:w-3/4">
          <div className="mx-4 flex w-[40%] max-w-[45%] flex-col justify-between rounded-[12px] border-4  border-brand px-4 py-2">
            <Label
              htmlFor="handoff"
              className="flex h-1/6 justify-center md:h-1/5"
            >
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 79.1 83"
                className="fill-primary"
              >
                <path
                  d="M0,73.1c0,0.8,0.7,1.5,1.5,1.5h23.7l2.3,1.7l7.9,5.8c0.8,0.6,1.8,0.9,2.7,0.9c1.4,0,2.8-0.6,3.7-1.8
	c0.3-0.4,0.6-0.9,0.7-1.5c0.6,0.3,1.3,0.5,2,0.5c0.2,0,0.5,0,0.7-0.1c1.2-0.2,2.3-0.8,3-1.8c0.3-0.4,0.6-0.9,0.7-1.5
	c0.7,0.3,1.4,0.5,2.1,0.5c1.4,0,2.8-0.6,3.7-1.8c0.2-0.3,0.4-0.7,0.5-1h22.4c0.8,0,1.5-0.7,1.5-1.5V16.3c0,0,0-0.1,0-0.1
	c0,0,0-0.1,0-0.1c0-0.1,0-0.2-0.1-0.3c0,0,0,0,0,0c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0L67.2,0.6C66.9,0.2,66.4,0,66,0H45.4H33.7
	H13.1c-0.5,0-0.9,0.2-1.2,0.6L0.3,15.4c0,0,0,0,0,0c-0.1,0.1-0.1,0.2-0.2,0.3c0,0,0,0,0,0C0.1,15.9,0,16,0,16.1c0,0,0,0.1,0,0.1
	c0,0,0,0.1,0,0.1C0,16.3,0,73.1,0,73.1z M3,71.6V58.1l8.2,6c0.3,0.2,0.6,0.3,0.9,0.3c0.1,0,0.1,0,0.2,0l0,0c0.3,0.6,0.7,1.1,1.3,1.5
	l7.6,5.6L3,71.6L3,71.6z M24.6,43.5C24.6,43.5,24.6,43.5,24.6,43.5l-11,14.9l-1.9,2.5L6,56.6l13.2-17.9L25,43L24.6,43.5z M50,74.1
	L47.2,72c0,0,0,0,0,0l-10.7-7.9c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l10.7,7.9c0.3,0.2,0.5,0.6,0.6,1
	c0.1,0.4,0,0.8-0.3,1.2s-0.6,0.6-1,0.6c-0.4,0.1-0.8,0-1.2-0.3L32.9,69c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1l7.9,5.8
	c0.3,0.2,0.5,0.6,0.6,1c0.1,0.4,0,0.8-0.3,1.2c-0.5,0.7-1.5,0.8-2.2,0.3l-7.9-5.8L15.3,63.5c-0.3-0.2-0.5-0.6-0.6-1
	c-0.1-0.4,0-0.8,0.3-1.1l12-16.2c0.2-0.3,0.6-0.5,1-0.6l13.4-2c0.2,1.7-1.1,3.3-2.8,3.5L33.3,47c-0.6,0.1-1.1,0.5-1.2,1.1
	s0.1,1.2,0.6,1.6l9.4,7l10.7,7.9c0.3,0.2,0.5,0.6,0.6,1c0.1,0.4,0,0.8-0.3,1.2s-0.6,0.6-1,0.6c-0.4,0.1-0.8,0-1.2-0.3l-10.7-7.9
	c-0.7-0.5-1.6-0.3-2.1,0.3c-0.5,0.7-0.3,1.6,0.3,2.1L49,69.5l0,0l2.9,2.1c0.3,0.2,0.5,0.6,0.6,1c0,0,0,0.1,0,0.1c0,0.1,0,0.2,0,0.3
	c0,0,0,0.1,0,0.1c0,0.2-0.1,0.4-0.3,0.6C51.7,74.5,50.7,74.6,50,74.1z M76.1,71.6H55.3c-0.2-0.7-0.6-1.3-1.1-1.9
	c0.5-0.3,0.9-0.7,1.2-1.1c0.7-1,1-2.2,0.8-3.4s-0.8-2.3-1.8-3l-10.7-7.9l-6.5-4.8l1.8-0.3c1.7-0.2,3.1-1.1,4.1-2.5s1.4-3,1.2-4.7
	c-0.1-0.7-0.5-1.4-1.1-1.8s-1.3-0.6-2.1-0.5l-13,1.9c-0.1-0.1-0.1-0.1-0.2-0.2l-8.2-6.1c-0.7-0.5-1.6-0.3-2.1,0.3L3,55.5V17.8h26.7
	v12.8c0,0.5,0.3,1,0.8,1.3c0.5,0.3,1.1,0.2,1.5,0l7.6-4.7l7.6,4.7c0.2,0.2,0.5,0.2,0.8,0.2c0.2,0,0.5-0.1,0.7-0.2
	c0.5-0.3,0.8-0.8,0.8-1.3V17.8h26.7V71.6z M32.7,17.8h13.8v10.1l-6.1-3.8c-0.2-0.2-0.5-0.2-0.8-0.2S39,24,38.7,24.1l-6.1,3.8
	C32.7,27.9,32.7,17.8,32.7,17.8z M74.5,14.8H49.2L47.2,3h18.1L74.5,14.8z M44.1,3l2,11.8H32.9L35,3H44.1z M13.8,3h18.1l-2,11.8H4.6
	L13.8,3z"
                />
              </svg>
            </Label>
            <Label
              htmlFor="handoff"
              className="sm: flex h-[10%] justify-center text-center text-sm font-bold md:text-smallText"
            >
              Direct Handoff{' '}
            </Label>
            <Label
              htmlFor="handoff"
              className="flex h-1/2 justify-center text-center text-sm sm:min-h-0 lg:text-base"
            >
              {' '}
              Hand the package directly to our specialist at your door{' '}
            </Label>
            <div className="flex justify-center">
              <Input
                type="radio"
                id="handoff"
                value="handoff"
                name="pickupMethod"
                checked={selectedMethod === 'handoff'}
                onChange={handleRadioChange}
              />
            </div>
          </div>

          <div className="mx-4 flex w-[40%] max-w-[45%]  flex-col justify-between rounded-[12px] border-4 border-brand px-4 py-2">
            <Label
              htmlFor="doorstep"
              className="flex h-1/6  justify-center md:h-1/5"
            >
              <img
                className="text-primary"
                src="/images/pickup.svg"
                alt="Pickup At Door"
              />
            </Label>
            <Label
              htmlFor="doorstep"
              className="sm: flex h-[10%] justify-center text-center text-sm font-bold md:text-smallText"
            >
              Leave on Doorstep{' '}
            </Label>
            <Label
              htmlFor="doorstep"
              className="flex h-1/2 justify-center text-center text-sm sm:min-h-0 lg:text-base"
            >
              {' '}
              Place items outside your door ahead of your pick up window{' '}
            </Label>
            <div className="flex justify-center">
              <Input
                type="radio"
                id="doorstep"
                value="doorstep"
                name="pickupMethod"
                checked={selectedMethod === 'doorstep'}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        </div>
      </form> */}

      <span className="mt-5 flex justify-between">
        <Link href="/address">
          <ReturnProcessBackButton />
        </Link>
        <Link href="/temp-dashboard">
          <ReturnProcessNextButton />
        </Link>
      </span>
    </div>
  )
}

Pickup.getLayout = getLayout

export default Pickup
