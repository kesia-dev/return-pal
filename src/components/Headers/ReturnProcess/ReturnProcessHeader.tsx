import Link from 'next/link'
import ReturnPalTitle from '../../SvgComponents/ReturnPalTitle'
import { HeaderContent, HeaderLogoRoot, HeaderRoot, HeaderSub } from '../Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../SvgComponents/Logo'
import { cn } from '@/lib/utils'

type ProgressBarProps2 = {
  name: string
  state: 'not-completed' | 'in-progress' | 'completed'
  start?: boolean // TODO: We will most likely move this into an array, so we won't need this variable later
}

function ProgressBarItem2({ name, start = false, state }: ProgressBarProps2) {
  return (
    <div className="w-1/4">
      <div className="relative mb-2">
        <div
          className="align-center absolute top-5 flex w-full content-center items-center align-middle"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          {!start && (
            <div
              className={cn(
                'align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle',
                state === 'completed' && 'h-2'
              )}
            />
          )}
        </div>

        <div
          className={cn(
            'relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary bg-brand text-lg text-white',
            state === 'in-progress' && 'border-4',
            state === 'completed' && 'bg-primary'
          )}
        >
          {state === 'completed' && (
            <span className="flex w-full items-center justify-center text-center text-gray-600">
              <FontAwesomeIcon
                icon={faCheck}
                width="25"
                height="25"
                className="text-center text-white"
              />
            </span>
          )}
        </div>
      </div>
      <p
        className={cn(
          'select-none text-center text-xs text-white md:text-base',
          state === 'in-progress' && 'font-bold'
        )}
      >
        {name}
      </p>
    </div>
  )
}

export default function ReturnProcessHeader() {
  return (
    <HeaderRoot className="border-brand bg-brand px-0 sm:px-9">
      <HeaderSub>
        <Link href="/">
          <HeaderLogoRoot>
            <ReturnPalTitle className="hidden h-10 w-40 fill-white lg:flex" />
            <Logo className="hidden h-7 w-7 shrink-0 fill-primary sm:flex" />
          </HeaderLogoRoot>
        </Link>

        <HeaderContent className="items-center justify-center sm:flex">
          <div className="flex w-full">
            <ProgressBarItem2 start name="Pickup Date" state="completed" />
            <ProgressBarItem2 name="Pickup Details" state="completed" />
            <ProgressBarItem2 name="Choose Plan" state="in-progress" />
            <ProgressBarItem2 name="Package Details" state="not-completed" />
            <ProgressBarItem2 name="Confirm" state="not-completed" />
          </div>

          {/* <div className="flex">
            <ul className="steps">
              <li className="step step-primary">Register</li>
              <li className="step step-primary">Choose plan</li>
              <li className="step">Purchase</li>
              <li className="step">Receive Product</li>
            </ul>
          </div> */}

          {/* <div className="relative mb-6 sm:mb-0">
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
          </div>
          <div className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-primary" />
              <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
            </div>
            <div className="abs mt-1 sm:pr-8">
              <p className="text-sm font-normal text-white">Pickup Details</p>
            </div>
          </div>
          <div className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
              <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
            </div>
            <div className="abs mt-1 sm:pr-8">
              <p className="text-sm font-normal text-white">Choose Plan</p>
            </div>
          </div>
          <div className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
              <div className="hidden h-1 w-full bg-primary dark:bg-gray-700 sm:flex" />
            </div>
            <div className="abs mt-1 sm:pr-8">
              <p className="text-sm font-normal text-white">Package Details</p>
            </div>
          </div>
          <div className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary" />
            </div>
            <div className="abs mt-1 sm:pr-8">
              <p className="text-sm font-normal text-white">Pay & Confirm</p>
            </div>
          </div> */}
        </HeaderContent>
      </HeaderSub>
    </HeaderRoot>
  )
}
