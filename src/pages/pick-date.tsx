import { HeaderRoot, HeaderSub } from '@/components/Headers/Header'
import ReturnPalTitle from '@/components/SvgComponents/ReturnPalTitle'
import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { type PropsWithChildren } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

type PickCardType = PropsWithChildren & {
  dayNum: number
  day: string
  selected?: boolean
}

function PickDateCard({ dayNum, day, ...props }: PickCardType) {
  return (
    <Card
      className={cn(
        'w-[9.5rem] select-none border-brand bg-paleBlue text-brand hover:cursor-pointer data-[state=on]:scale-110 data-[state=on]:border-8 data-[state=on]:border-primary data-[state=on]:bg-white data-[state=on]:shadow-2xl'
      )}
      {...props}
    >
      <CardContent className="flex flex-col items-center space-y-4 pt-6">
        <p className="text-2xl font-semibold">Sep</p>
        <p className="text-5xl font-bold">{dayNum}</p>
        <p className="text-2xl font-semibold">{day}</p>
      </CardContent>
    </Card>
  )
}

export default function PickDate() {
  return (
    <>
      <HeaderRoot className="border-brand bg-brand">
        <HeaderSub className="gap-x-12">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <ReturnPalTitle className="hidden h-10 w-40 fill-white lg:flex" />
            </div>
          </Link>

          {/* <ol className="items-center justify-center sm:flex">
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <FontAwesomeIcon
                    icon={faCheck}
                    width="15"
                    height="15"
                    className="text-white"
                  />
                </div>
                <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex"></div>
              </div>
              <div className="abs mt-1 sm:pr-8">
                <p className="text-sm font-normal text-white">Pickup Date</p>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-primary" />
                <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
              </div>
              <div className="abs mt-1 sm:pr-8">
                <p className="text-sm font-normal text-white">Pickup Details</p>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
                <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
              </div>
              <div className="abs mt-1 sm:pr-8">
                <p className="text-sm font-normal text-white">Pickup Date</p>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
                <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
              </div>
              <div className="abs mt-1 sm:pr-8">
                <p className="text-sm font-normal text-white">Pickup Date</p>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
              </div>
              <div className="abs mt-1 sm:pr-8">
                <p className="text-sm font-normal text-white">Pickup Date</p>
              </div>
            </li>
          </ol> */}

          {/* <div className="w-full px-4">
            <div className="mx-auto w-full max-w-md">
              <div className="relative">
                <div className="absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-primary" />
                <ul className="relative flex w-full justify-between">
                  <li className="relative">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-primary bg-primary">
                      <FontAwesomeIcon
                        icon={faCheck}
                        width="15"
                        height="15"
                        className="text-white"
                      />
                    </div>
                    <div className="absolute left-[-1rem] right-0 m-auto w-screen text-sm text-white">
                      Pickup Date
                    </div>
                  </li>
                  <li className="relative">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-primary bg-brand" />
                    <div className="absolute left-[-2rem]  right-0 m-auto w-screen text-sm font-bold text-white">
                      Pickup Details
                    </div>
                  </li>
                  <li>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-brand" />
                  </li>
                  <li>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-brand" />
                  </li>
                  <li>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-brand" />
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </HeaderSub>
      </HeaderRoot>

      <div className="container space-y-20 bg-paleBlue pt-16">
        <HomeSection className="items-start space-y-3">
          <SectionHeader className="flex w-full justify-between font-semibold">
            <div>
              Choose a pickup{' '}
              <SectionHeaderHighlight>date</SectionHeaderHighlight>
            </div>
            {/* TODO: This may need to change later depending on what we decide to
            do to exit the return process. Confirmation prompt? */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
            >
              <FontAwesomeIcon icon={faClose} width={'35'} height={'35'} />
              <p>Cancel</p>
            </Link>
          </SectionHeader>
          <SectionDescription>
            We&apos;ll text you the morning of your pickup with an estimated
            time arrival.
          </SectionDescription>
        </HomeSection>

        <div className="flex-row justify-center gap-x-4 space-y-11">
          {/* <div className="flex  items-center justify-center space-y-4 text-center font-semibold text-brand"> */}
          <div className="flex justify-center gap-x-11 xl:hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary">
              <FontAwesomeIcon
                size="2x"
                width={'50'}
                height={'60'}
                icon={faChevronLeft}
              />
              <p className="text-2xl">Last Week</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary">
              <FontAwesomeIcon
                size="2x"
                width={'50'}
                height={'60'}
                icon={faChevronRight}
              />
              <p className="text-2xl">Last Week</p>
            </div>
          </div>

          <div className="flex">
            <div className="hidden w-fit flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary xl:flex">
              <FontAwesomeIcon
                size="2x"
                width={'30'}
                height={'45'}
                icon={faChevronLeft}
              />
              <p className="text-xl">Last Week</p>
            </div>
            <ToggleGroup.Root
              type="single"
              className="grid w-full grid-cols-1 place-content-center place-items-center content-center items-center justify-center gap-x-7 gap-y-5 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
              onValueChange={(s) => {
                console.log('New value: ', s)
              }}
            >
              <ToggleGroup.Item value="fri-22" asChild>
                <PickDateCard dayNum={22} day="Fri" />
              </ToggleGroup.Item>

              <ToggleGroup.Item value="sat-23" asChild>
                <PickDateCard dayNum={23} day="Sat" />
              </ToggleGroup.Item>

              <ToggleGroup.Item value="sun-24" asChild>
                <PickDateCard dayNum={24} day="Sun" />
              </ToggleGroup.Item>

              <ToggleGroup.Item value="mon-25" asChild>
                <PickDateCard dayNum={25} day="Mon" />
              </ToggleGroup.Item>

              <ToggleGroup.Item value="tue-26" asChild>
                <PickDateCard dayNum={26} day="Tue" />
              </ToggleGroup.Item>

              <ToggleGroup.Item value="wed-27" asChild>
                <PickDateCard dayNum={27} day="Wed" />
              </ToggleGroup.Item>

              <ToggleGroup.Item value="thu-28" asChild>
                <PickDateCard dayNum={28} day="Thu" />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
            <div className="hidden w-fit flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary xl:flex">
              <FontAwesomeIcon
                size="2x"
                width={'30'}
                height={'45'}
                icon={faChevronRight}
              />
              <p className="text-xl">Last Week</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// PickDate.getLayout = getLayout
