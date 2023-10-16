import {
  HomeSection,
  HomeSectionDescription,
  HomeSectionTitle,
  HomeSectionTitleHighlight,
} from '@/components/home/Home'
import { getLayout } from '@/layouts/DefaultLayout'
import Image from 'next/image'

import hasan from '@images/Hasan-cropped_founder.jpg'
import mohammed from '@images/Mohammed-cropped_founder.jpg'

import torontoIcon from '@svg/toronto.svg'
import earthIcon from '@svg/earth.svg'
import handsIcon from '@svg/hands.svg'
import peopleIcon from '@svg/people.svg'

import chooseUsBackground from '@svg/why_choose_us_background.svg'
import foundersBackground from '@svg/our_founders_background.svg'

export default function AboutUs() {
  return (
    <div className="container mx-auto flex max-w-5xl pb-16 pt-20">
      <div className="w-full space-y-16">
        <HomeSection>
          <HomeSectionTitle className="text-center">
            How <HomeSectionTitleHighlight>ReturnPal</HomeSectionTitleHighlight>{' '}
            Began
          </HomeSectionTitle>
          <HomeSectionDescription className="md:w-4/6">
            ReturnPal was born out of a simple realization: the traditional
            process of returning online purchases is far too complicated. Two
            brothers after waiting in line at the post office, decided there had
            to be a better way. Thus, ReturnPal was created to streamline
            returns for both consumers and businesses, while also making a
            positive impact on the community.
          </HomeSectionDescription>
        </HomeSection>

        <div className="m-[calc(-50vw+50%)]">
          <div className="relative">
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={foundersBackground}
              priority
              className="h-[60rem] w-screen fill-brand md:h-[45rem]"
              alt="Background for founders"
            />

            <div className="absolute top-28 w-full py-2.5 text-center text-xs leading-4 text-white">
              <div className="container mx-auto max-w-5xl space-y-10 md:space-y-14">
                <p className="text-4xl lg:text-5xl">
                  <a className="text-white">Our</a>{' '}
                  <a className="font-bold text-primary">Founders</a>
                </p>
                {/* <div className="flex justify-between space-x-10 sm:space-x-32 md:px-12"> */}
                {/* <div className="grid place-items-center gap-2 md:flex md:grid-cols-2"> */}
                <div className="grid max-w-5xl place-items-center gap-7 md:flex md:grid-cols-2 md:justify-between md:px-9">
                  <div className="h-52 w-52 space-y-4 md:h-72 md:w-72">
                    <Image
                      className="rounded-full border-8 border-primary"
                      src={hasan}
                      alt="Co-Founder of ReturnPal Mohammed Al-Salem"
                    />
                    <div>
                      <p className="text-lg font-bold text-white">
                        Mohammed Al-Salem
                      </p>
                      <p className="text-lg text-white">
                        Co-Founder of ReturnPal
                      </p>
                    </div>
                  </div>

                  <div className="h-52 w-52 space-y-4 md:h-72 md:w-72">
                    <Image
                      className="rounded-full border-8 border-primary"
                      src={mohammed}
                      alt="Co-Founder of ReturnPal Mohammed Al-Salem"
                    />
                    <div>
                      <p className="text-lg font-bold text-white">
                        Mohammed Al-Salem
                      </p>
                      <p className="text-lg text-white">
                        Co-Founder of ReturnPal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomeSection>
          <HomeSectionTitle>
            Our <HomeSectionTitleHighlight>Mission</HomeSectionTitleHighlight>
          </HomeSectionTitle>
          <HomeSectionDescription className="md:w-4/6">
            Our goal is to revolutionize the returns process for online shoppers
            by offering a hassle-free and convenient solution. We aim to
            alleviate the stress of the return process by managing the entire
            repackaging and delivery process on your behalf, allowing you to sit
            back and relax.
          </HomeSectionDescription>
        </HomeSection>

        <div className="m-[calc(-50vw+50%)]">
          <div className="relative">
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={chooseUsBackground}
              priority
              className="h-[45rem] w-screen fill-brand"
              alt="Picture of unity"
            />

            <div className="absolute top-28 w-full py-2.5 text-center leading-4 text-white">
              <div className="container mx-auto space-y-8">
                <HomeSection className="space-y-5 text-white">
                  <HomeSectionTitle>
                    Why Choose{' '}
                    <HomeSectionTitleHighlight>Us</HomeSectionTitleHighlight>?
                  </HomeSectionTitle>
                  <HomeSectionDescription className="text-white">
                    <HomeSectionTitleHighlight className="text-xl lg:text-xl">
                      You
                    </HomeSectionTitleHighlight>{' '}
                    can help us create{' '}
                    <HomeSectionTitleHighlight className="text-xl lg:text-xl">
                      Social Impact
                    </HomeSectionTitleHighlight>{' '}
                    together
                  </HomeSectionDescription>
                  <HomeSectionDescription className="leading-6 text-white md:w-4/6">
                    We value sustainability and community empowerment. Through
                    our Corporate Social Responsibility (CSR) initiatives, we
                    collaborate with businesses to repurpose and donate goods,
                    directly benefiting underserved communities. If your
                    organization is looking to fulfill its CSR goals, we invite
                    you to reach out to us. Let&rsquo;s join hands and create a
                    positive change together.
                  </HomeSectionDescription>
                </HomeSection>
                <div className="hidden items-end justify-evenly sm:flex">
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={earthIcon}
                    className="h-36 w-36 shrink"
                    alt="Picture of a cleaner earth"
                  />

                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={peopleIcon}
                    className="h-36 w-36 shrink"
                    alt="Picture of unity"
                  />

                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={handsIcon}
                    className="h-36 w-36 shrink"
                    alt="Picture of helping hands"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-14 text-center">
          <HomeSection>
            <HomeSectionTitle>
              Our{' '}
              <HomeSectionTitleHighlight>Operation</HomeSectionTitleHighlight>
            </HomeSectionTitle>
            <HomeSectionDescription className="md:w-4/6">
              We are all over the greater Toronto area, operating a local
              facility designed to ensure that the repackaging of items can
              accommodate same-day return needs.
            </HomeSectionDescription>
          </HomeSection>

          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={torontoIcon}
            className="h-56 w-56 flex-shrink"
            alt="Image of Toronto"
          />
        </div>
      </div>
    </div>
  )
}

AboutUs.getLayout = getLayout
