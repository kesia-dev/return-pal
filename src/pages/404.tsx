import { Button } from '@/components/ui/button'
import { getLayout } from '@/layouts/DefaultLayout'
import Head from 'next/head'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="404 - Page not found" />
      </Head>

      <div className="flex h-screen flex-col items-center justify-center space-y-10">
        <p className="text-9xl font-light text-primary">404</p>
        <div className="flex flex-col">
          <div className="mb-6 text-brand">
            The requested page you are looking for doesn&rsquo;t exist!
          </div>
          <Button asChild>
            <Link href="/">Back To Home</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

NotFoundPage.getLayout = getLayout
