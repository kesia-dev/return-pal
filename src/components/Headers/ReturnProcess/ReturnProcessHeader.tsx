import Link from 'next/link'
import ReturnPalTitle from '../../SvgComponents/ReturnPalTitle'
import { HeaderContent, HeaderLogoRoot, HeaderRoot, HeaderSub } from '../Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../SvgComponents/Logo'
import { cn } from '@/lib/utils'

type ProgressBarProps = {
  name: string
  state: 'not-completed' | 'in-progress' | 'completed'
  end?: boolean // TODO: We will most likely move this into an array, so we won't need this variable later
}

function ProgressBarItem({ name, end = false, state }: ProgressBarProps) {
  return (
    <div className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div
          className={cn(
            'z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary',
            state === 'in-progress' && 'border-4 border-primary bg-brand',
            state === 'not-completed' && 'border-2 border-primary bg-brand'
          )}
        >
          {state === 'completed' && (
            <FontAwesomeIcon
              icon={faCheck}
              width="15"
              height="15"
              className="text-white"
            />
          )}
        </div>
        {!end && (
          <div
            className={cn(
              'hidden h-0.5 w-full bg-primary dark:bg-gray-700 sm:flex',
              state === 'completed' && 'h-1'
            )}
          />
        )}
      </div>
      <div className="abs mt-1 sm:pr-8">
        <p
          className={cn(
            'text-sm font-normal text-white',
            state === 'in-progress' && 'font-bold'
          )}
        >
          {name}
        </p>
      </div>
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
          <ProgressBarItem name="Pickup Date" state="completed" />
          <ProgressBarItem name="Pickup Details" state="in-progress" />
          <ProgressBarItem name="Choose Plan" state="not-completed" />
          <ProgressBarItem name="Package Details" state="not-completed" />
          <ProgressBarItem name="Confirm" end state="not-completed" />
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
