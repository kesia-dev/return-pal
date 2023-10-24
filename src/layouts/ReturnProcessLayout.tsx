import { type PropsWithChildren } from 'react'
import ReturnProcessHeader from '@/components/Headers/ReturnProcess/ReturnProcessHeader'
import ReturnProcessContextProvider, {
  type ReturnProcessStep,
} from '@/context/ReturnProcessContext'
import PickDateTESTPAGE from '@/test_pages/pick-date_test'
import PickupTESTPAGE from '@/test_pages/pickup_test'

const steps: ReturnProcessStep[] = [
  {
    id: 'pick-date',
    name: 'Pickup Date',
    component: <PickDateTESTPAGE />,
  },
  {
    id: 'pickup-details',
    name: 'Pickup Details',
    component: <PickupTESTPAGE />,
  },
]

export default function ReturnProcessLayout({ children }: PropsWithChildren) {
  return (
    <ReturnProcessContextProvider steps={steps}>
      <div className="flex h-[100dvh] overflow-hidden bg-paleBlue">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <ReturnProcessHeader />
          <main className="grow">{children}</main>
        </div>
      </div>
    </ReturnProcessContextProvider>
  )
}

export const getLayout = (page: React.ReactElement) => {
  return <ReturnProcessLayout>{page}</ReturnProcessLayout>
}
