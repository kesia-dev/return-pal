import React from 'react'
import CardItem from '@components/DemoCards/CardItem.tsx/CardItem'
import CalendarSvg from '@/components/SvgComponents/CalendarSvg'
import PackageDeliverySvg from '@/components/SvgComponents/PackageDeliverySvg'
import VanSvg from '@/components/SvgComponents/VanSvg'
import NounBarcodeSvg from '@/components/SvgComponents/NounBarcodeSvg'
import TimerSvg from '@/components/SvgComponents/TimerSvg'
import NounPinSvg from '@/components/SvgComponents/NounPinSvg'
import { AiFillCheckCircle } from 'react-icons/ai'
import Reveal from '@components/common/reveal'

const cardData = [
  {
    id: 1,
    step: 1,
    icon: CalendarSvg,
    title: 'Schedule A Return',
    description: 'Step-by-step guide to entering pickup details',
  },
  {
    id: 2,
    step: 2,
    icon: PackageDeliverySvg,
    title: 'Select Pickup Method',
    description:
      'Leave your package on your doorsteps or hand it off to our specialist.',
  },

  {
    id: 3,
    step: 3,
    icon: VanSvg,
    title: "We're On Our ",
    description: "Way We'll email you the tracking number once it ships!",
  },
]

const cardData2 = [
  {
    id: 4,
    step: AiFillCheckCircle,
    icon: NounBarcodeSvg,
    description: 'Let us handle the repackaging and label printing for you',
  },
  {
    id: 5,
    step: AiFillCheckCircle,
    icon: TimerSvg,
    description:
      'No more waiting in long lines or dealing with confusing return process',
  },

  {
    id: 6,
    step: AiFillCheckCircle,
    icon: NounPinSvg,
    description: 'Convenient pickup service from wherever you are',
  },
]

function DemoCards() {
  return (
    <div className="absolute top-52 w-full space-y-12 py-2.5 text-center leading-4 text-white md:top-20 lg:top-24">
      <section className="xl:px-18 px-10 md:px-7 lg:px-16">
        <div className="mx-auto mt-20 flex max-w-7xl justify-between gap-6 md:mt-10 lg:mt-8">
          <Reveal>
            <title className="mb-4 block max-w-5xl text-left text-mediumText lg:text-3xl xl:text-subtitle">
              How It Works
            </title>
          </Reveal>
        </div>
        <div className=" mx-auto flex max-w-7xl flex-col items-center gap-5 md:flex-row md:justify-evenly">
          {cardData.map((data) => (
            <Reveal key={data.step}>
              <CardItem
                step={data.step}
                // key={data.step}
                icon={data.icon()}
                description={data.description}
                title={data.title}
              />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="xl:px-18 px-10 md:px-7 lg:px-16">
        <div className=" mx-auto flex max-w-7xl justify-between gap-6">
          <Reveal>
            <title className="mb-4 block max-w-5xl text-left text-mediumText lg:text-3xl xl:text-subtitle">
              Your Benefits
            </title>
          </Reveal>
        </div>
        <div className=" mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row md:justify-evenly">
          {cardData2.map((data) => (
            <Reveal key={data.id}>
              <CardItem
                step={data.step}
                // key={data.id}
                icon={data.icon()}
                description={data.description}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DemoCards
