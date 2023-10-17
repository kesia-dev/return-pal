import Image from 'next/image'
import SignInForm from '@/components/SignInForm/SignInForm'
import GuestSignInForm from '@/components/SignInForm/GuestSignInForm'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

function SignIn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign-In</Button>
      </DialogTrigger>
      <DialogContent className="m-0 flex h-3/4 flex-col flex-nowrap items-center justify-start gap-0 bg-paleBlue p-0">
        <Image
          src="/images/returnpal-short-logo.png"
          alt="Return Pal logo"
          width="0"
          height="0"
          sizes="100vw"
          className="mt-4 h-[40px] w-auto sm:my-6"
        />

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="mb-2 flex justify-center text-lg font-semibold text-grey sm:text-3xl">
            <TabsTrigger value="account">Sign In</TabsTrigger>
            <span className="text-xl font-normal text-primary sm:text-4xl">
              {' | '}
            </span>
            <TabsTrigger value="password">Guest</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <SignInForm />
          </TabsContent>
          <TabsContent value="password">
            <GuestSignInForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default SignIn

{
  /* <button
        type="button"
        onClick={() => router.back()}
        className="absolute bottom-[40px] left-[13%] flex items-center bg-transparent text-base font-normal text-primary sm:bottom-[80px] sm:left-[10%] sm:text-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>&nbsp;Back</span>
      </button> */
}
