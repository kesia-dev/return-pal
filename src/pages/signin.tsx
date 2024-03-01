import React from 'react'
import SignInForm from '@components/SignInForm/SignInForm';
import DefaultLayout from '@/layouts/DefaultLayout'
import { ToastContainer } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import axios from 'axios'
import Router from 'next/router'


function SignIn() {
  const searchParams = useSearchParams()
  const verifyToken = searchParams.get("token")
  console.log("token", verifyToken)

  if (verifyToken) {
    axios.post(`http://localhost:4100/api/verify/${verifyToken}`)
    .then((res) => {
      localStorage.setItem('userId', res.data.userId)
      localStorage.setItem('token', res.data.token)
      Router.push("/dashboard")
    })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container mx-auto flex flex-col max-w-xl pb-16 pt-20">
      <h1 className="mt-4 text-4xl font-bold tracking-wide text-navy text-center">
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
