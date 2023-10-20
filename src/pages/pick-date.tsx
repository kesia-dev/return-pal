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
import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import Head from 'next/head'
import { Button } from '@/components/ui/button'

// TODO: Change type to just accept a full date instead of having 2 props for day number and actual name date
type PickCardType = React.HTMLAttributes<HTMLDivElement> & {
  dayNum: number
  day: string
  selected?: boolean
}

// TODO: Selecting a card moves all the other cards down, make sure only the selected card grows and the other ones don't move

const PickDateCard = React.forwardRef<HTMLDivElement, PickCardType>(
  // eslint-disable-next-line react/prop-types
  ({ day, dayNum, className, ...props }, ref) => {
    return (
      <Card
        className={cn(
          'w-[9.5rem] select-none border-brand bg-paleBlue text-brand hover:cursor-pointer data-[state=on]:scale-110 data-[state=on]:border-8 data-[state=on]:border-primary data-[state=on]:bg-white data-[state=on]:shadow-2xl',
          className
        )}
        ref={ref}
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
)
PickDateCard.displayName = 'PickDateCard'

export default function PickDate() {
  return (
    <>
      <Head>
        <title>Pick Date</title>
      </Head>

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

        <div className="w-full bg-brand py-6">
          <div className="flex">
            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="align-center absolute top-5 flex w-full content-center items-center align-middle"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                ></div>

                <div className="relative z-30 mx-auto flex h-10 w-10 items-center rounded-full bg-primary text-lg text-white">
                  <span className="flex w-full items-center justify-center text-center text-gray-600">
                    <FontAwesomeIcon
                      icon={faCheck}
                      width="25"
                      height="25"
                      className="text-center text-white"
                    />
                  </span>
                </div>
              </div>
              <div className="select-none text-center text-xs text-white md:text-base">
                Pickup Date
              </div>
            </div>

            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="align-center absolute top-5 flex w-full content-center items-center align-middle"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle" />
                </div>

                <div className="relative z-20 mx-auto flex h-10 w-10 items-center rounded-full border-4 border-primary bg-brand text-lg text-white">
                  <span className="w-full text-center text-gray-600" />
                </div>
              </div>
              <div className="text-center text-xs font-bold text-white md:text-base">
                Pickup Details
              </div>
            </div>

            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="align-center absolute top-5 flex w-full content-center items-center align-middle"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle" />
                </div>

                <div className="relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary bg-brand text-lg text-white">
                  <span className="w-full text-center text-gray-600" />
                </div>
              </div>
              <div className="text-center text-xs text-white md:text-base">
                Choose Plan
              </div>
            </div>

            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="align-center absolute top-5 flex w-full content-center items-center align-middle"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle" />
                </div>

                <div className="relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary bg-brand text-lg text-white">
                  <span className="w-full text-center text-gray-600" />
                </div>
              </div>
              <div className="text-center text-xs text-white md:text-base">
                Package Details
              </div>
            </div>
            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="align-center absolute top-5 flex w-full content-center items-center align-middle"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle" />
                </div>

                <div className="relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary bg-brand text-lg text-white">
                  <span className="w-full text-center text-gray-600" />
                </div>
              </div>
              <div className="text-center text-xs text-white md:text-base">
                Confirm
              </div>
            </div>
          </div>
        </div>
        {/* 
        <ul className="md:col-gap-10 md:row-gap-10 md:grid md:grid-cols-3">
          <li className="bg-gray-100 p-5 pb-10 text-center">
            <div className="flex flex-col items-center">
              <div className="relative top-0 -mt-16 flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-indigo-500 text-xl font-semibold text-white">
                  1
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold leading-6 text-gray-900">
                  Headline
                </h4>
              </div>
            </div>
          </li>
          <li className="bg-gray-100 p-5 pb-10 text-center">
            <div className="flex flex-col items-center">
              <div className="relative top-0 -mt-16 flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-indigo-500 text-xl font-semibold text-white">
                  2
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold leading-6 text-gray-900">
                  Headline
                </h4>
              </div>
            </div>
          </li>
          <li className="bg-gray-100 p-5 pb-10 text-center">
            <div className="flex flex-col items-center">
              <div className="relative top-0 -mt-16 flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-indigo-500 text-xl font-semibold text-white">
                  3
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold leading-6 text-gray-900">
                  Headline
                </h4>
              </div>
            </div>
          </li>
        </ul> */}
        {/* &:after {
      content: counter(step);
      counter-increment: step;
      z-index: 1;
      @apply bg-base-300 text-base-content relative col-start-1 row-start-1 grid h-8 w-8 place-items-center place-self-center rounded-full;
      after:bg-base-300 after:text-base-content after:relative after:col-start-1 after:row-start-1 after:grid after:h-8 after:w-8 after:place-items-center after:place-self-center after:rounded-full;
    } */}

        {/* &:before {
      @apply bg-base-300 text-base-content top-0 col-start-1 row-start-1 h-2 w-full transform;
      content: "";
      margin-left: -100%;
    } */}

        {/* &:before {
      before:bg-primary before:text-purple-300 before:top-0 before:col-start-1 before:row-start-1 before:h-2 before:w-full before:transform;
      before:none
      before:-ml-[100%]
    } */}

        {/* steps */}
        {/* <ul className="inline-grid auto-cols-[1fr] grid-flow-col grid-cols-1 overflow-hidden overflow-x-auto">
          <li className="grid grid-cols-1 grid-rows-2 place-items-center text-center after:relative after:col-start-1 after:row-start-1 after:grid after:h-8 after:w-8 after:place-items-center after:place-self-center after:rounded-full after:bg-purple-300 after:text-primary">
            <div className="bg-base-300 text-base-content  relative col-start-1 after:row-start-1 after:grid after:h-8 after:w-8 after:place-items-center after:place-self-center">
              asd
            </div>
            <p>Register</p>
          </li>
          <li
            className="before:transform; before:none grid grid-cols-1 grid-rows-2 place-items-center text-center before:top-0 before:col-start-1 before:row-start-1 before:-ml-[100%] before:h-2 before:w-full before:bg-primary before:text-purple-300 after:relative       after:col-start-1 after:row-start-1 after:grid after:h-8 after:w-8 after:place-items-center after:place-self-center after:rounded-full
      after:bg-purple-300
      after:text-primary"
          >
            Register
          </li>
          <li className="step">Purchase</li>
          <li className="step">Receive Product</li>
        </ul> */}

        {/* <div>
          dsffffffff
          <div>
            <div className="overflow-hidden rounded-full bg-gray-200">
              <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
            </div>

            <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-gray-500">
              <li className="flex items-center justify-start text-blue-600 sm:gap-1.5">
                <span className="hidden sm:inline"> Details </span>

                <svg
                  className="h-6 w-6 sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </li>

              <li className="flex items-center justify-center text-blue-600 sm:gap-1.5">
                <span className="hidden sm:inline"> Address </span>

                <svg
                  className="h-6 w-6 sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </li>

              <li className="flex items-center justify-end sm:gap-1.5">
                <span className="hidden sm:inline"> Payment </span>

                <svg
                  className="h-6 w-6 sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </li>
            </ol>
          </div>
        </div> */}

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

        <div className="flex w-full flex-row-reverse">
          {/* TODO: Move this into separate component */}
          <Link href="/address">
            <Button className="rounded-full" size={'lg'}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

PickDate.getLayout = getLayout
