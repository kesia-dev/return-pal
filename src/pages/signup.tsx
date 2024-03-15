import React from 'react'
import SignUpForm from '@/components/SignUpForm/SignUpForm'
import DefaultLayout from '@/layouts/DefaultLayout'

function SignUp() {
  return (
    <div className="container mx-auto flex flex-col max-w-xl pb-16 pt-20">
      <h1 className="mt-4 text-4xl font-bold tracking-wide text-navy text-center">
        Sign Up{' '}
      </h1>
      <SignUpForm />
    </div>
  )
}
SignUp.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={true} isFooterShow={true}>
      {page}
    </DefaultLayout>
  )
}

export default SignUp
