import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import NounDelivery from '@/components/SvgComponents/NounDelivery'
import Link from 'next/link'
import { type UserInfo } from '@/components/DashBoard/types'
import { planTextClassName } from '@/components/Plan'
import Reveal from '@components/common/reveal'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import HandingPackage from '@/components/SvgComponents/HandingPackage'
import { useRouter } from 'next/navigation'
import Profile from './Profile'
import { CiCalendar } from 'react-icons/ci'
import { FaRegCircleUser, FaRegClock } from 'react-icons/fa6'

function DashBoardMain({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}) {
  const [showProfile, setShowProfile] = useState(false)

  const cardClassnames =
    'border-l-0 border-r-0 border-t-0 border-b-0  border-black flex h-45 md:w-1/3 select-none flex-row items-center p-4 bg-white text-brand'
  const cardTitleClassnames = 'text-xl md:text-2xl font-semibold'

  const cardDescriptionClassNames = 'text-sm text-brand'

  const router = useRouter()

  const handleRedirect = (path: string) => {
    router.push(path)
  }

  const handleProfileClick = () => {
    setShowProfile(true)
  }

  return (
    <section className="lg:p-30 flex flex-col justify-center space-y-8  p-20 lg:space-y-16">
      {!showProfile && (
        <div>
          <Reveal>
            <h3 className="mb-6 text-subtitle font-bold lg:text-title">
              Your Dashboard
            </h3>
          </Reveal>

          <div className="justify-left mb-12 flex">
            <Card
              onClick={() => handleRedirect('/return')}
              className={`${cardClassnames} mr-4`}
              style={{ borderLeft: '16px solid black' }}
            >
              <CardHeader className="flex items-center pl-5">
                <Reveal>
                  <div className="flex items-center">
                    {' '}
                    {/* Added a container */}
                    <div className="mr-4">
                      {' '}
                      {/* Container for the icon */}
                      <Reveal>
                        <CiCalendar className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                        {/* <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" /> */}
                      </Reveal>
                    </div>
                    <div>
                      <CardTitle className={cardTitleClassnames}>
                        Schedule Pickup
                      </CardTitle>
                      <Reveal>
                        <CardDescription className={cardDescriptionClassNames}>
                          Set up a new pickup for your returns.
                        </CardDescription>
                      </Reveal>
                    </div>
                  </div>
                </Reveal>
              </CardHeader>
            </Card>

            <Card
              onClick={() => handleRedirect('/return')}
              className={`${cardClassnames} mr-4`}
              style={{ borderLeft: '16px solid black' }}
            >
              <CardHeader className="flex items-center pl-5">
                <Reveal>
                  <div className="flex items-center">
                    {' '}
                    {/* Added a container */}
                    <div className="mr-4">
                      {' '}
                      {/* Container for the icon */}
                      <Reveal>
                        {/* <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" /> */}
                        <FaRegClock className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                      </Reveal>
                    </div>
                    <div>
                      <CardTitle className={cardTitleClassnames}>
                        View Recent Orders
                      </CardTitle>
                      <Reveal>
                        <CardDescription className={cardDescriptionClassNames}>
                          View all your recently scheduled orders here.
                        </CardDescription>
                      </Reveal>
                    </div>
                  </div>
                </Reveal>
              </CardHeader>
            </Card>

            <Card
              onClick={handleProfileClick}
              className={`${cardClassnames}`}
              style={{ borderLeft: '16px solid black' }}
            >
              <CardHeader className="flex items-center pl-5">
                <Reveal>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Reveal>
                        <FaRegCircleUser className="h-12 w-12 fill-secondary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24"/>
                        {/* <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" /> */}
                      </Reveal>
                    </div>
                    <div>
                      <CardTitle className={cardTitleClassnames}>
                        Manage Account
                      </CardTitle>
                      <Reveal>
                        <CardDescription className={cardDescriptionClassNames}>
                          Edit your profile setting and subscriptions here.
                        </CardDescription>
                      </Reveal>
                    </div>
                  </div>
                </Reveal>
              </CardHeader>
            </Card>
          </div>
          <h4 className="text-subtitle font-bold">Recent Orders</h4>
        </div>
      )}
      {showProfile && <Profile userInfo={userInfo} setUserInfo={setUserInfo} />}
    </section>
  )
}

export default DashBoardMain
