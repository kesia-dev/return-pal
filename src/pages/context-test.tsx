import ReturnProcessHeader from '@/components/Headers/ReturnProcess/ReturnProcessHeader'
import TestReturnProcessRender from '@/components/Headers/ReturnProcess/TestReturnProcessRender'
import ReturnProcessContextProvider, {
  type ReturnProcessStep,
} from '@/context/ReturnProcessContext'
import Address from '@/test_pages/address'
import PickDate from '@/test_pages/pick-date'
import Pickup from '@/test_pages/pickup'
import Pricing from '@/test_pages/pricing'

const steps: ReturnProcessStep[] = [
  {
    id: 'pick-date',
    name: 'Pickup Date',
    component: <PickDate />,
  },
  {
    id: 'address',
    name: 'Addresses',
    component: <Address />,
  },
  {
    id: 'pickup-details',
    name: 'Pickup Details',
    component: <Pickup />,
  },
  {
    id: 'pricing',
    name: 'Pricing',
    component: <Pricing />,
  },
]

export default function ContextTest() {
  return (
    <ReturnProcessContextProvider steps={steps}>
      <div className="flex h-[100dvh] overflow-hidden bg-paleBlue">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <ReturnProcessHeader />
          <main className="grow">
            <TestReturnProcessRender />
          </main>
        </div>
      </div>
    </ReturnProcessContextProvider>
  )
}

// ContextTest.getLayout = getLayout
