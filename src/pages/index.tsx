import React from 'react'
import Image from 'next/image'
import {
  HomeSection,
  HomeSectionDescription,
  HomeSectionTitle,
  HomeSectionTitleHighlight,
} from '@/components/home/Home'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'

function Home() {
  return (
    <div className="container mx-auto flex max-w-6xl pb-16 pt-12 md:pt-20">
      <section className="mx-auto flex w-full gap-8 space-y-8 px-4 sm:px-3">
        <HomeSection className="flex-1">
          <HomeSectionTitle className="font-medium">
            Return Your Package The{' '}
            <HomeSectionTitleHighlight>Easy Way</HomeSectionTitleHighlight>
          </HomeSectionTitle>
          <HomeSectionDescription className="px-10 text-start text-sm sm:text-base md:px-0 lg:text-lg">
            We handle returns of purchases from all online retailers. No need
            for printing labels, packaging, or visits to the post office.
          </HomeSectionDescription>
          <Button className="self-start">Schedule a Pickup Now</Button>
        </HomeSection>
        <Image
          className="hidden flex-1 self-center md:block"
          src="/images/np_delivery_man.png"
          alt="Return Pal"
          width={516}
          height={381}
        />
      </section>
    </div>
  )
}

export default Home

Home.getLayout = getLayout
