import React, { useState } from 'react'
import Image from 'next/image'
import SignInForm from '@/components/SignInForm/SignInForm'
import GuestSignInForm from '@/components/SignInForm/GuestSignInForm'

function SignIn() {
  const [isGuest, setIsGuest] = useState(false)

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start bg-paleBule pt-16">
      <Image
        src="/images/returnpal-short-logo.png"
        alt="Return Pal logo"
        width="0"
        height="0"
        sizes="100vw"
        className="ml-4 h-[134px] w-auto"
      />

      <p className="mb-8 text-subtitle font-semibold">
        <span
          className={`hover:cursor-pointer ${
            isGuest ? 'text-grey' : 'text-brand'
          }`}
          onClick={() => setIsGuest(false)}
        >
          Sign In
        </span>
        <span className="text-title font-normal text-primary">{' | '}</span>
        <span
          className={`hover:cursor-pointer ${
            isGuest ? 'text-brand' : 'text-grey'
          }`}
          onClick={() => setIsGuest(true)}
        >
          Guest
        </span>
      </p>
      {isGuest ? <GuestSignInForm /> : <SignInForm />}
    </div>
  )
}

export default SignIn
