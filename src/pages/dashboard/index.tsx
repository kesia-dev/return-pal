import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashBoardMain from '@/components/DashBoard/DashBoardMain'
import { type UserInfo } from '@/components/DashBoard/types'
import axios from 'axios'
import Router from 'next/router'
import { dummyUser } from './dummy-user'

function Dashboard() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    console.log({ userId, token })

    axios
      .post("http://localhost:4100/api/authorize", { userId, token })
      .then((a) => console.log(a))
      .catch((a) => console.log(a))

    if (!token) {
      Router.push("/signin")
    }
  });

  const [userInfo, setUserInfo] = useState<UserInfo>(dummyUser);

  return <DashBoardMain userInfo={userInfo} setUserInfo={setUserInfo} />
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DashboardLayout isHeaderShow={true} isFooterShow={false}>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard
