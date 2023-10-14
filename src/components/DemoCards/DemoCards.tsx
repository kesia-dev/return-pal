import React from 'react'
import CardItem from '@components/DemoCards/CardItem.tsx/CardItem'

function DemoCards() {
  return (
    <div className="absolute top-60 w-full space-y-10 py-2.5 text-center text-xs leading-4 text-white md:top-40">
      <section className="flex gap-10">
        Works
        <CardItem />
        <CardItem />
        <CardItem />
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
