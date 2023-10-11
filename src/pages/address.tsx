import React from 'react'
// import ContactForm from '@/components/ContactForm/ContactForm'
import Image from 'next/image'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'

function Address() {
  return (
    // <div className="bg-paleBlue h-screen w-screen pl-10 pt-24">
    <>
    <Button className="next text-white"  >next </Button>
      {/* <div className="flex max-w-lg flex-col">
        <h2 className="relative text-subtitle">
          <span className="mr-2 font-thin text-black">CONTACT</span>
          <span className="bg-gradient-to-r from-gradientL to-primary bg-clip-text font-bold text-transparent">
            US
          </span>
        </h2>

        <Image
          className=" mt-4 self-center"
          src="/images/robot.png"
          alt="Contact Us"
          width={160}
          height={160}
        />
      </div>
      <Image
        className="mt-8"
        src="/images/navbar-logo-transparent.png"
        alt="Contact Us"
        width={160}
        height={0}
      /> */}
    </>
    // </div>
  )
}
Address.getLayout = getLayout

export default Address
