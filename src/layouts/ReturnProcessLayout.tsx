import { type PropsWithChildren } from 'react'
import ReturnProcessHeader from '@/components/Headers/ReturnProcessHeader'
import ReturnProcessContext from '@/context/ReturnProcessContext'

export default function ReturnProcessLayout({ children }: PropsWithChildren) {
  // TODO: ${nunito.className} - Move this into _app?
  return (
    <ReturnProcessContext>
      <div className={`flex h-[100dvh] overflow-hidden bg-paleBlue`}>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <ReturnProcessHeader />
          <main className="grow">{children}</main>
        </div>
      </div>
    </ReturnProcessContext>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <ReturnProcessLayout>{page}</ReturnProcessLayout>
}
