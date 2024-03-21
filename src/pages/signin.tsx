import React from 'react'
import SignInForm from '@components/SignInForm/SignInForm'
import DefaultLayout from '@/layouts/DefaultLayout'
import { ToastContainer } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Router from 'next/router'


const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function SignIn() {
  const searchParams = useSearchParams()
  const verifyToken = searchParams.get('token')
  console.log('token', verifyToken)

  if (verifyToken) {
    axios
      .post(`${NEXT_PUBLIC_BASE_URL}/api/verify/${verifyToken}`)
      .then(async(res) => {
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('token', res.data.token)
        await Router.push("/dashboard")
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container mx-auto flex max-w-xl flex-col pb-16 pt-20">
      <h1 className="text-navy mt-4 text-center text-4xl font-bold tracking-wide">
        Sign In{' '}
      </h1>
      <ToastContainer />
      <SignInForm />
    </div>
  )
}
SignIn.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={true} isFooterShow={true}>
      {page}
    </DefaultLayout>
  )
}

export default SignIn
