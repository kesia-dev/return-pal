import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
function Dashboard() {
  return (
    <Tabs defaultValue="main" className="w-full">
      <section className="flex">
        <TabsList className="flex flex-col">
          <TabsTrigger value="main">DashBoard</TabsTrigger>
          <TabsTrigger value="mrofile">Profile</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="signOut">Sign Out</TabsTrigger>
        </TabsList>
        <TabsContent value="main">main</TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you will be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </section>
    </Tabs>
  )
}

Dashboard.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={false} isFooterShow={false}>
      {page}
    </DefaultLayout>
  )
}

export default Dashboard
