import React from 'react'
import { Button } from '@/components/ui/button'
import NounDelivery from '@/components/SvgComponents/NounDelivery'
import Link from 'next/link'
import { type UserInfo } from '@/components/DashBoard/types'
import { planTextClassName } from '@/components/Plan'

function DashBoardMain({ userInfo }: { userInfo: UserInfo }) {
  return (
    <section className="flex flex-col justify-center space-y-8 p-20  lg:space-y-16 lg:p-36">
      <h3 className=" text-subtitle lg:text-title">
        Welcome back,{' '}
        <span
          className={`${planTextClassName(
            userInfo.role
          )} text-subtitle sm:text-subtitle lg:text-title`}
        >
          {userInfo.role}
        </span>{' '}
        user{' '}
        <span className="font-bold text-primary">{userInfo.firstName}</span>
      </h3>
      <div className="flex rounded-3xl bg-brand p-8 text-subtitle">
        <div className="flex w-4/5 flex-col space-y-5">
          <h3 className="text-start text-sm text-white sm:text-lg lg:text-subtitle xl:text-4xl">
            Ready to schedule your pickup?
          </h3>
          <Link href={'/return'}>
            <Button className="w-fit px-8">Schedule Pickup</Button>
          </Link>
        </div>
        <NounDelivery />
      </div>
    </section>
  )
}

export default DashBoardMain
