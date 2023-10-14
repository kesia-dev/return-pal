import { useState } from 'react'
import Plan from './Plan'
import { RadioGroup } from '@/components/ui/radio-group'

const planData = [
  {
    name: 'Bronze',
    price: 1099,
    period: '+$3.99 per additional box',
    total: '(One-time pickup)',
    duration: 'One-time pickup',
    speed: 'Repackaging and labeling',
    support: 'Email and phone support',
  },
  {
    name: 'Silver',
    price: 2099,
    period: 'per month',
    total: '$20.99 billed monthly',
    duration: 'Unlimited pickups during the month',
    speed: 'Repackaging and labeling',
    support: 'Email and phone support',
  },
  {
    name: 'Gold',
    price: 1899,
    period: 'per month',
    total: '$56.97 billed quarterly',
    duration: 'Unlimited pickups for 3 months',
    speed: 'Expedited repackaging and labeling service',
    support: 'Email and phone support',
  },
  {
    name: 'Platinum',
    price: 1479,
    period: 'per month',
    total: '$177.48 billed yearly',
    duration: 'Unlimited pickups for 1 year',
    speed: 'Expedited repackaging and labeling service',
    support: 'Email and phone support',
  },
]

export default function ChoosePlan() {
  const [selectedPlanName, setSelectedPlanName] = useState('')

  return (
    <div className="flex min-h-screen w-screen justify-center bg-paleBlue p-10">
      <RadioGroup className="flex w-full flex-wrap justify-around gap-4">
        {planData.map(plan => {
          const status = !selectedPlanName
            ? 'normal'
            : selectedPlanName === plan.name
            ? 'selected'
            : 'unselected'
          return (
            <Plan
              key={plan.name}
              plan={plan}
              status={status}
              setSelectedPlanName={setSelectedPlanName}
            />
          )
        })}
      </RadioGroup>
    </div>
  )
}
