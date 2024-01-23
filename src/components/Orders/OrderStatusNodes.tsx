// components/Orders/OrderStatusNodes.tsx
import { IoCheckmarkCircle } from 'react-icons/io5'
import { cn } from '@lib/utils'
import React from 'react'
interface OrderStatusNodeProps {
  label: string
  isActive: boolean
}
const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
  label,
  isActive,
}) => {
  console.log('isActive:', true) // Add this line
  return (
    <div className={'w-1/5 pl-0 pr-0 pt-5'}>
      <div className="relative mb-4">
        <div
          className="align-center absolute top-5 flex translate-x-[-50%] translate-y-[-50%] transform content-center items-center align-middle "
          style={{ width: '70%' }}
        >
          <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle "></div>
        </div>
        <div
          className={cn(
            ' z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary text-lg text-white'
          )}
        >
          {/* This part remains unchanged */}
          {isActive ? (
            <IoCheckmarkCircle size={40} className="rounded-full bg-primary " />
          ) : (
            <IoCheckmarkCircle
              size={40}
              className="h-2 rounded-full border-0 text-white "
              // className="relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-0 text-white"
            />
          )}
        </div>
      </div>
      <p className="select-none text-center text-xs text-black md:text-base">
        {label}
      </p>
    </div>
  )
}
interface OrderStatusNodesProps {
  status: string | undefined
}
const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({ status }) => (
  <div className="mt-16 flex items-center justify-center">
    <div className="order-status-nodes-container flex ">
      <OrderStatusNode
        label="Driver received"
        isActive={status === `Driver received` || false}
      />
      <OrderStatusNode
        label="Driver on the way"
        isActive={status === 'Driver on the way' || true}
      />
      <OrderStatusNode
        label="Driver delivered to post office"
        isActive={status === 'Driver delivered to post office' || true}
      />
      <OrderStatusNode
        label="Delivered"
        isActive={status === 'Delivered' || false}
      />
      <OrderStatusNode
        label="Cancelled"
        isActive={status === 'Cancelled' || false}
      />
    </div>
  </div>
)
export default OrderStatusNodes
