import { IoCheckmarkCircle } from 'react-icons/io5'
import React from 'react'
interface OrderStatusNodeProps {
  label: string
  isActive: boolean
}
const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
  label,
  isActive,
}) => {
  return (
    <div className={`w-1/5 pl-0 pr-0 pt-5`}>
      {isActive && (
        <div className="relative mb-4">
          <div
            className="align-center absolute top-5 flex translate-x-[-50%] translate-y-[-50%] transform content-center items-center align-middle "
            style={{ width: '70%' }}
          >
            <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle "></div>
          </div>
          <div className="z-30 mx-auto flex h-8 w-8 items-center rounded-full border-2 border-primary text-lg text-white">
            <IoCheckmarkCircle size={40} className="rounded-full bg-primary" />
          </div>
          <p className="mb-2 w-full select-none space-x-10 pt-3 text-center text-xl text-black md:text-base">
            {label}
          </p>
        </div>
      )}
      {!isActive && (
        <div className="relative mb-4">
          <div
            className="align-center absolute top-5 flex translate-x-[-50%] translate-y-[-50%] transform content-center items-center align-middle "
            style={{ width: '70%' }}
          >
            <div className="align-center z-10 h-1 w-full flex-1 items-center rounded bg-gray-300 align-middle mb-2 "></div>
          </div>
          <div className="z-30 mx-auto flex h-8 w-8 items-center rounded-full border-2 border-gray-300 text-lg text-white">
            {/* Placeholder for hidden checkmark */}
          </div>
          <p className="mb-2 w-full select-none space-x-10 pt-3 text-center text-xl text-gray-500 md:text-base">
            {label}
          </p>
        </div>
      )}
    </div>
  )
}
interface OrderStatusNodesProps {
  order: { status: string } | undefined
}
const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({ order }) => {
  const statuses = [
    'Driver received',
    'Driver on the way',
    'Driver delivered to post office',
    'Delivered',
    'Cancelled',
  ]
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="order-status-nodes-container flex space-x-0.5">
        {statuses.map((status) => (
          <OrderStatusNode
            key={status}
            label={status}
            isActive={order?.status === status}
          />
        ))}
      </div>
    </div>
  )
}
export default OrderStatusNodes
