import { Toaster } from '@/components/ui/toaster'

import { type ReactElement, type ReactNode } from 'react'
import { type NextPage } from 'next'
import { type AppProps } from 'next/app'
import { type AppType } from 'next/dist/shared/lib/utils'
import 'dotenv/config';
import Head from 'next/head'
import '@/styles/globals.css'
import localFont from 'next/font/local'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const avenirNext = localFont({
  src: [
    {
      path: '../../public/fonts/AvenirNextLTPro-Regular.otf',
      weight: '500',
    },
    {
      path: '../../public/fonts/AvenirNextLTPro-It.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/AvenirNextLTPro-Bold.otf',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--font-avenir',
})

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const layout = getLayout(<Component {...pageProps} />)
  return (
    <>
      <Head>
        <title>Return-Pal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${avenirNext.variable} font-avenirNext`}>
        {layout}
        <Toaster />
      </div>
    </>
  )
}

export default MyApp
