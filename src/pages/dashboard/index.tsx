import React, { Fragment, useState, useEffect } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import DashBoardMain from '@/components/DashBoard/DashBoardMain'
import { type UserInfo } from '@/components/DashBoard/types'
import { dummyUser } from './dummy-user'

function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo>(dummyUser)
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
