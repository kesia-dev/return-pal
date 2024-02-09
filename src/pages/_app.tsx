import { Toaster } from '@/components/ui/toaster'

import { type ReactElement, type ReactNode } from 'react'
import { type NextPage } from 'next'
import { type AppProps } from 'next/app'
import { type AppType } from 'next/dist/shared/lib/utils'

import Head from 'next/head'
import '@/styles/globals.css'
import { Nunito } from 'next/font/google'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const nunito = Nunito({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
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
      <div className={`${nunito.className}`}>
        {layout}
        <Toaster />
      </div>
      </>

  )
}

export default MyApp
