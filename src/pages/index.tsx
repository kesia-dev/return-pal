import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'

function Home() {
  return (
    <>
      <section className="mx-20 my-16 flex">
        <article>desc</article>
        <div>img container</div>
      </section>
    </>
  )
}

export default Home

Home.getLayout = getLayout
