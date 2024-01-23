
import React from 'react'
import { type UserInfo } from '@/components/DashBoard/types'
import Reveal from '@components/common/reveal'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
<<<<<<< HEAD
// import Profile from '@/components/DashBoard/Profile'
=======
import Profile from '@/components/DashBoard/Profile'
import Profile from '@/components/DashBoard/Profile'
>>>>>>> 2f85ae6 (new code from slack)
import { CiCalendar } from 'react-icons/ci'
import { FaRegCircleUser, FaRegClock } from 'react-icons/fa6'
import RecentOrders from '@components/Orders/RecentOrders'
<<<<<<< HEAD
function DashBoardMain({
  userInfo,
  setUserInfo,
}: {
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}) {
=======

function DashBoardMain() {
  const [showProfile, setShowProfile] = useState(false)
<<<<<<< HEAD

>>>>>>> e4b2ab8 (test: commented unnessary lines)
  const cardClassnames =
    'border-l-0 border-r-0 border-t-0 border-b-0 border-black flex h-23 h-23 sm:w-1/3 md:w-1/3 lg:w-1/4  select-none flex-row items-center p-1 bg-white mr-8 text-brand '
  const cardTitleClassnames =
    'text-xl sm:text-base md:text-l lg:text-xl font-semibold '
  const cardDescriptionClassNames =
    'text-sm text-brand sm:text-base md:text-l lg:text-xl'
=======
  const cardClassnames =
    'border-l-0 border-r-0 border-t-0 border-b-0  border-black flex h-23 md:w-3/4 select-none flex-row items-center p-4 bg-white mr-100 text-brand'
  const cardTitleClassnames = 'text-xl md:text-2xl font-semibold '
  const cardDescriptionClassNames = 'text-sm text-brand'
>>>>>>> 2f85ae6 (new code from slack)
  const router = useRouter()
  const handleRedirect = (path: string) => {
    router.push(path)
  }
<<<<<<< HEAD
=======
  const handleProfileClick = () => {
    setShowProfile(true)
  }
>>>>>>> 2f85ae6 (new code from slack)
  return (
<<<<<<< HEAD
    <section className="lg:p-30 flex flex-col justify-center space-y-8 pb-10 pl-20 pr-20 pt-10 lg:space-y-16">
      <div>
        <Reveal>
          <h3 className="mb-6 text-subtitle font-bold lg:text-4xl">
            Your Dashboard
          </h3>
        </Reveal>
        <div className="justify-left mb-12 flex">
          <Card
            className={`${cardClassnames}`}
            style={{
              borderLeft: '16px solid black',
              minWidth: '335px',
              minHeight: '150px',
              maxHeight: '150px',
            }}
=======
    <section className="lg:p-30 flex flex-col justify-center space-y-8  p-20 lg:space-y-16">
<<<<<<< HEAD
      <div>
        <Reveal>
          <h3 className="mb-6 text-subtitle font-bold lg:text-5xl">
            Your Dashboard
          </h3>
        </Reveal>

        <div className="justify-left mb-12 flex">
          <Card
            onClick={() => handleRedirect('/return')}
            className={`${cardClassnames} mr-4`}
            style={{ borderLeft: '16px solid black' }}
>>>>>>> e4b2ab8 (test: commented unnessary lines)
          >
            <CardHeader className="flex items-center pl-5">
              <Reveal>
                <div className="flex items-center">
<<<<<<< HEAD
                  <div className="mr-4">
                    <Reveal>
                      <CiCalendar className="fill-secondary xs:h-19 xs:w-19 h-12 w-12 xxs:h-16 xxs:w-16" />
=======
                  {' '}
                  {/* Added a container */}
                  <div className="mr-4">
                    {' '}
                    {/* Container for the icon */}
                    <Reveal>
                      <CiCalendar className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                      {/* <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" /> */}
>>>>>>> e4b2ab8 (test: commented unnessary lines)
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
<<<<<<< HEAD
                  </div>
=======
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
=======
      {!showProfile && (
        <div>
          <Reveal>
            <h3 className="mb-6 text-subtitle font-bold lg:text-5xl">
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
>>>>>>> 2f85ae6 (new code from slack)
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
                        <FaRegCircleUser className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
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
<<<<<<< HEAD
>>>>>>> e4b2ab8 (test: commented unnessary lines)
                </div>
              </Reveal>
            </CardHeader>
          </Card>
<<<<<<< HEAD
          <Card
            className={`${cardClassnames}`}
            style={{
              borderLeft: '16px solid black',
              minWidth: '335px',
              minHeight: '150px',
              maxHeight: '150px',
            }}
=======

          <Card
            onClick={handleProfileClick}
            className={`${cardClassnames}`}
            style={{ borderLeft: '16px solid black' }}
>>>>>>> e4b2ab8 (test: commented unnessary lines)
          >
            <CardHeader className="flex items-center pl-5">
              <Reveal>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Reveal>
<<<<<<< HEAD
                      <FaRegClock className="fill-secondary xs:h-19 xs:w-19 h-12 w-12 xxs:h-16 xxs:w-16" />
=======
                      <FaRegCircleUser className="fill-secondary h-12 w-12 xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                      {/* <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" /> */}
>>>>>>> e4b2ab8 (test: commented unnessary lines)
                    </Reveal>
                  </div>
                  <div>
                    <CardTitle className={cardTitleClassnames}>
<<<<<<< HEAD
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
            className={`${cardClassnames}`}
            style={{
              borderLeft: '16px solid black',
              minWidth: '335px',
              minHeight: '150px',
              maxHeight: '150px',
            }}
          >
            <CardHeader className="flex items-center pl-5">
              <Reveal>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Reveal>
                      <FaRegCircleUser className="fill-secondary xs:h-19 xs:w-19 h-12 w-12 xxs:h-16 xxs:w-16" />
                    </Reveal>
                  </div>
                  <div>
                    <CardTitle className={cardTitleClassnames}>
=======
>>>>>>> e4b2ab8 (test: commented unnessary lines)
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
        <RecentOrders />
      </div>
<<<<<<< HEAD
=======

      {/* {showProfile && <Profile userInfo={userInfo} setUserInfo={setUserInfo} />} */}
>>>>>>> e4b2ab8 (test: commented unnessary lines)
=======
                </Reveal>
              </CardHeader>
            </Card>
          </div>
          <RecentOrders />
        </div>
      )}
      {showProfile && <Profile userInfo={userInfo} setUserInfo={setUserInfo} />}
>>>>>>> 2f85ae6 (new code from slack)
    </section>
  )
}
export default DashBoardMain