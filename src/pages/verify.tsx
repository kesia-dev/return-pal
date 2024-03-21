import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import axios from 'axios'
import Router from 'next/router'


function Verify() {
  const searchParams = useSearchParams()
  const verifyToken = searchParams.get("token")
  console.log("token", verifyToken)

  if (verifyToken) {
    console.log("before post")
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/${verifyToken}`)
      .then(async(res) => {
        if (res.data.token) {
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('token', res.data.token)
          toast.dismiss();
          toast.success('Account has been verified!', {
            position: 'top-right',
            hideProgressBar: false,
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          await Router.push("/dashboard")
        }      
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container mx-auto flex flex-col max-w-xl pb-16 pt-20">
    </div>
  )
}
Verify.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={true} isFooterShow={true}>
      {page}
    </DefaultLayout>
  )
}

export default Verify
