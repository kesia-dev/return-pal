import { getLayout } from '@/layouts/ReturnProcessLayout'
import PickDate from './pick-date'
import ReturnProcessContextProvider from '@/context/ReturnProcessContext'
import Pickup from './pickup'

const steps = [
  {
    id: 'pick-date',
    component: <PickDate />,
  },
  {
    id: 'pickup-details',
    component: <Pickup />,
  },
]

export default function ContextTest() {
  return (
    <ReturnProcessContextProvider steps={steps}>
      <div>asd</div>
    </ReturnProcessContextProvider>
  )
}

ContextTest.getLayout = getLayout
