import React from 'react'
import CardItem from '@components/DemoCards/CardItem.tsx/CardItem'

function DemoCards() {
  return (
    <div className="absolute top-60 w-full space-y-10 py-2.5 text-center text-xs leading-4 text-white md:top-40">
      <section className="px-20">
        <title className="block text-left">How It Works</title>
        <div className="flex justify-evenly gap-10">
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </section>
      <section className="flex gap-10">
        Benefits
        <CardItem />
        <CardItem />
        <CardItem />
      </section>
    </div>
  )
}

export default DemoCards
