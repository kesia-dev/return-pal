import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashBoardMain from '@/components/DashBoard/DashBoardMain'
import { type UserInfo } from '@/components/DashBoard/types'
import axios from 'axios'
import Router from 'next/router'
import dummyUser from './dummy-user.json'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router';
function Dashboard() {

  const router = useRouter();

  useEffect(() => {

    let { _id, access_token } = router.query;

    if (_id && router.query.token && access_token) {
      localStorage.setItem("userId", _id.toString());
      localStorage.setItem("token", router.query.token.toString());
    }

    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");

    if (!token) {
      const funCall = async () =>{
        await Router.push("/signin")
      }
      funCall()
    }

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/api/authorize", { userId, token })
      .then((a) => console.log(a))
      .catch((a) => console.log(a))


  });

  const [userInfo, setUserInfo] = useState<any>(dummyUser);

  return (
    <div>
      <ToastContainer /> <DashBoardMain userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  )
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DashboardLayout isHeaderShow={true} isFooterShow={false}>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard
