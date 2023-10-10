import React from 'react'
import ContactForm from '@/components/ContactForm/ContactForm'

function Contact() {
  return (
    <div className="bg-paleBule flex h-screen w-screen flex-col pl-10 pt-28 font-bold text-white">
      <h2 className="text-subtitle relative">
        <span className="mr-2 font-thin text-black">CONTACT</span>
        <span className="from-gradientL bg-gradient-to-r to-primary bg-clip-text font-bold text-transparent">
          US
        </span>
      </h2>
      <ContactForm />
    </div>
  )
}

export default Contact
