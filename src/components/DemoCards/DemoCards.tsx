import React from 'react'
import CardItem from '@components/DemoCards/CardItem.tsx/CardItem'

function DemoCards() {
  return (
    <div className="absolute top-64 w-full space-y-10 py-2.5 text-center leading-4 text-white md:top-56">
      <section className="px-20">
        <div className=" mx-auto flex max-w-7xl justify-between gap-6">
          <title className="block max-w-5xl text-left text-5xl">
            How It Works
          </title>
        </div>
        <div className=" mx-auto flex max-w-7xl justify-between gap-6">
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </section>
      <section className="px-20">
        <title className="block max-w-5xl text-left text-5xl">Benefits</title>
        <div className=" mx-auto flex max-w-7xl justify-between gap-8">
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </section>
    </div>
  )
}

export default DemoCards
