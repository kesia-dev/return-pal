import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
import { getLayout } from '@/layouts/DefaultLayout'
import Image from 'next/image'

import hasan from '@images/Hasan-cropped_founder.jpg'
import mohammed from '@images/Mohammed-cropped_founder.jpg'

import Earth from '@/components/svg/Earth'
import People from '@/components/svg/People'
import Hands from '@/components/svg/Hands'
import Toronto from '@/components/svg/Toronto'
import OurFoundersBackground from '@/components/svg/OurFoundersBackground'
import WhyChooseUsBackground from '@/components/svg/WhyChooseUsBackground'

export default function AboutUs() {
  return (
    <div className="container mx-auto flex max-w-5xl pb-16 pt-20">
      <div className="w-full space-y-16">
        <HomeSection>
          <SectionHeader className="text-center">
            How <SectionHeaderHighlight>ReturnPal</SectionHeaderHighlight> Began
          </SectionHeader>
          <SectionDescription className="md:w-4/6">
            ReturnPal was born out of a simple realization: the traditional
            process of returning online purchases is far too complicated. Two
            brothers after waiting in line at the post office, decided there had
            to be a better way. Thus, ReturnPal was created to streamline
            returns for both consumers and businesses, while also making a
            positive impact on the community.
          </SectionDescription>
        </HomeSection>

        <div className="m-[calc(-50vw+50%)]">
          <div className="relative">
            <OurFoundersBackground className="h-[60rem] w-screen fill-current stroke-brand text-brand md:h-[45rem]" />

            <div className="absolute top-28 w-full py-2.5 text-center text-xs leading-4 text-white">
              {/* <div className="container mx-auto max-w-5xl space-y-10 md:space-y-14"> */}
              <HomeSection>
                <SectionHeader className="text-center">
                  Our <SectionHeaderHighlight>Founders</SectionHeaderHighlight>
                </SectionHeader>
                <div className="grid max-w-5xl place-items-center gap-7 md:flex md:grid-cols-2 md:justify-between md:px-9">
                  <div className="space-y-4">
                    <Image
                      className="h-52 w-52 rounded-full border-8 border-primary"
                      src={hasan}
                      priority
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

                  <div className="space-y-4">
                    <Image
                      className="h-52 w-52 rounded-full border-8 border-primary"
                      src={mohammed}
                      priority
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
              </HomeSection>
              {/* </div> */}
            </div>
          </div>
        </div>

        <HomeSection>
          <SectionHeader>
            Our <SectionHeaderHighlight>Mission</SectionHeaderHighlight>
          </SectionHeader>
          <SectionDescription className="md:w-4/6">
            Our goal is to revolutionize the returns process for online shoppers
            by offering a hassle-free and convenient solution. We aim to
            alleviate the stress of the return process by managing the entire
            repackaging and delivery process on your behalf, allowing you to sit
            back and relax.
          </SectionDescription>
        </HomeSection>

        <div className="m-[calc(-50vw+50%)]">
          <div className="relative">
            <WhyChooseUsBackground className="h-[45rem] w-screen fill-brand" />

            <div className="absolute top-28 w-full py-2.5 text-center leading-4 text-white">
              <div className="container mx-auto space-y-8">
                <HomeSection className="space-y-5 text-white">
                  <SectionHeader>
                    Why Choose{' '}
                    <SectionHeaderHighlight>Us</SectionHeaderHighlight>?
                  </SectionHeader>
                  <SectionDescription className="text-white">
                    <SectionHeaderHighlight>You</SectionHeaderHighlight> can
                    help us create{' '}
                    <SectionHeaderHighlight>
                      Social Impact
                    </SectionHeaderHighlight>{' '}
                    together
                  </SectionDescription>
                  <SectionDescription className="text-white md:w-4/6">
                    We value sustainability and community empowerment. Through
                    our Corporate Social Responsibility (CSR) initiatives, we
                    collaborate with businesses to repurpose and donate goods,
                    directly benefiting underserved communities. If your
                    organization is looking to fulfill its CSR goals, we invite
                    you to reach out to us. Let&rsquo;s join hands and create a
                    positive change together.
                  </SectionDescription>
                </HomeSection>
                <div className="hidden items-end justify-evenly sm:flex">
                  <Earth />
                  <People />
                  <Hands />
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomeSection>
          <SectionHeader>
            Our <SectionHeaderHighlight>Operation</SectionHeaderHighlight>
          </SectionHeader>
          <SectionDescription className="md:w-4/6">
            We are all over the greater Toronto area, operating a local facility
            designed to ensure that the repackaging of items can accommodate
            same-day return needs.
          </SectionDescription>
          <Toronto className="h-56 w-56" />
        </HomeSection>
      </div>
    </div>
  )
}

AboutUs.getLayout = getLayout
