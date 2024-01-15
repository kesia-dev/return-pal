// import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { IoCheckmarkCircleSharp } from 'react-icons/io5'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { cn } from '@lib/utils'
// import React from 'react'

// interface OrderStatusNodeProps {
//   label: string
//   isActive: boolean
//   isLast: boolean
// }

// const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
//   label,
//   isActive,
//   isLast,
// }) => (
//   <div className={`w-1/5 ${isLast ? 'pr-2' : 'pr-0'}  pt-5`}>
//     <div className="relative mb-4">
//       <div className="align-center absolute top-5 flex w-2/4 translate-x-[-50%] translate-y-[-50%] content-center items-center align-middle">
//         {isLast || (
//           <div
//             className={cn(
//               'align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle',
//               isActive && 'h-2'
//             )}
//           />
//         )}
//       </div>

//       <div
//         className={cn(
//           'relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary text-lg text-white',
//           isActive && 'bg-brand',
//           isActive && 'border-[6px]'
//         )}
//       >
//         {isActive && (
//           <span className="flex w-full items-center justify-center text-center text-gray-600">
//             <FontAwesomeIcon
//               icon={faCheck}
//               width="25"
//               height="25"
//               className="text-center text-white"
//             />
//           </span>
//         )}
//       </div>
//     </div>
//     <p className="select-none text-center text-xs  text-black md:text-base">
//       {label}
//     </p>
//   </div>
// )

// interface OrderStatusNodesProps {
//   status: string | undefined
// }

// const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({ status }) => (
//   <div className="mt-16 flex items-center justify-center">
//     <div className="order-status-nodes-container flex">
//       <OrderStatusNode
//         label="Order Placed"
//         isActive={status === 'OrderPlaced'}
//         isLast={true}
//       />

//       <OrderStatusNode
//         label="Picked Up"
//         isActive={status === 'PickedUp'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="In Transit"
//         isActive={status === 'InTransit'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="Returned"
//         isActive={status === 'Returned'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="Order Cancelled"
//         isActive={status === 'OrderCancelled'}
//         isLast={false}
//       />
//     </div>
//   </div>
// )

// export default OrderStatusNodes

// import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// // Add this to the beginning of your file
// import { library } from '@fortawesome/fontawesome-svg-core'

// // Add this after importing faCheck
// library.add(faCheck)

// import { cn } from '@lib/utils'
// import React from 'react'

// interface OrderStatusNodeProps {
//   label: string
//   isActive: boolean
//   isLast: boolean
// }

// const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
//   label,
//   isActive,
//   isLast,
// }) => (

//   <div className={`w-1/5 ${isLast ? 'pr-2' : 'pr-0'}  pt-5`}>
//     <div className="relative mb-4">
//       <div className="align-center absolute top-5 flex w-2/4 translate-x-[-50%] translate-y-[-50%] content-center items-center align-middle">
//         {isLast || (
//           <div
//             className={cn(
//               'align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle',
//               isActive && 'h-2'
//             )}
//           >
//             {isActive && (
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 width="25"
//                 height="25"
//                 className="text-center text-white"
//               />
//             )}
//           </div>
//         )}
//       </div>

//       <div
//         className={cn(
//           'relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary text-lg text-white',
//           isActive && 'bg-brand',
//           isActive && 'border-[6px]'
//         )}
//       >
//         {/* This part remains unchanged */}
//       </div>
//     </div>
//     <p className="select-none text-center text-xs  text-black md:text-base">
//       {label}
//     </p>
//   </div>
// )

// // ... (rest of the code remains unchanged)

// interface OrderStatusNodesProps {
//   status: string | undefined
// }

// const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({ status }) => (
//   <div className="mt-16 flex items-center justify-center">
//     <div className="order-status-nodes-container flex">
//       <OrderStatusNode
//         label="Order Placed"
//         isActive={status === 'OrderPlaced'}
//         isLast={true}
//       />

//       <OrderStatusNode
//         label="Picked Up"
//         isActive={status === 'PickedUp'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="In Transit"
//         isActive={status === 'InTransit'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="Returned"
//         isActive={status === 'Returned'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="Order Cancelled"
//         isActive={status === 'OrderCancelled'}
//         isLast={false}
//       />
//     </div>
//   </div>
// )

// export default OrderStatusNodes

// import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { cn } from '@lib/utils'
// import React from 'react'

// // Add this after importing faCheck
// library.add(faCheck)

// interface OrderStatusNodeProps {
//   label: string
//   isActive: boolean
//   isLast: boolean
// }

// const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
//   label,
//   isActive,
//   isLast,
// }) => {
//   console.log('isActive:', true) // Add this line

//   return (
//     <div className={`w-1/5 ${isLast ? 'pr-2' : 'pr-0'}  pt-5`}>
//       <div className="relative mb-4">
//         <div className="align-center absolute top-5 flex w-2/4 translate-x-[-50%] translate-y-[-50%] content-center items-center align-middle">
//           {isLast || (
//             <div
//               className={cn(
//                 'align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle',
//                 'h-2' // Always add this class when isActive is true
//               )}
//             >
//               {isActive && (
//                 <FontAwesomeIcon
//                   icon={faCheck}
//                   width="25"
//                   height="25"
//                   className="text-center text-white"
//                 />
//               )}
//             </div>
//           )}
//         </div>

//         <div
//           className={cn(
//             'relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary text-lg text-white',
//             isActive && 'bg-brand',
//             isActive && 'border-[6px]'
//           )}
//         >
//           {/* This part remains unchanged */}
//         </div>
//       </div>
//       <p className="select-none text-center text-xs text-black md:text-base">
//         {label}
//       </p>
//     </div>
//   )
// }

// interface OrderStatusNodesProps {
//   status: string | undefined
// }

// const OrderStatusNodes: React.FC<OrderStatusNodesProps> = ({ status }) => (
//   <div className="mt-16 flex items-center justify-center">
//     <div className="order-status-nodes-container flex">
//       <OrderStatusNode
//         label="Order Placed"
//         isActive={status === 'OrderPlaced'}
//         isLast={true}
//       />

//       <OrderStatusNode
//         label="Picked Up"
//         isActive={status === 'PickedUp'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="In Transit"
//         isActive={status === 'InTransit'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="Returned"
//         isActive={status === 'Returned'}
//         isLast={false}
//       />
//       <OrderStatusNode
//         label="Order Cancelled"
//         isActive={status === 'OrderCancelled'}
//         isLast={false}
//       />
//     </div>
//   </div>
// );

// export default OrderStatusNodes


//components/Orders/OrderStatusNodes.tsx
import { IoCheckmarkCircle } from 'react-icons/io5'
import { cn } from '@lib/utils'
import React from 'react'

interface OrderStatusNodeProps {
  label: string
  isActive: boolean
  isLast: boolean
}

const OrderStatusNode: React.FC<OrderStatusNodeProps> = ({
  label,
  isActive,
  isLast,
}) => {
  console.log('isActive:', true) // Add this line

  return (
    <div className={`w-1/5 ${isActive ? 'pr-2' : 'pr-0'}  pt-5`}>
      <div className="relative mb-4">
        <div className="align-center absolute top-5 flex w-2/4 translate-x-[-50%] translate-y-[-50%] content-center items-center align-middle">
          {isLast || (
            <div
              className={cn(
                'align-center z-10 h-1 w-full flex-1 items-center rounded bg-primary align-middle',
                isActive && 'h-2' // Add this class when isActive is true
              )}
            >
              {isActive && (
                <IoCheckmarkCircle
                  size={25}
                  className="bg-primary text-center text-white"
                />
              )}
            </div>
          )}
        </div>

        <div
          className={cn(
            // <IoCheckmarkCircle
            //   size={25}
            //   className="bg-primary text-center text-white"
            // />,
            'relative z-30 mx-auto flex h-10 w-10 items-center rounded-full border-2 border-primary text-lg text-white',
            isActive && 'bg-brand',
            isActive && 'border-[6px]'
          )}
        >
          {/* This part remains unchanged */}
          {isActive && isLast ? (
                <img
              //     src={checkmarkImage}
              //     alt="Checkmark"
              //     width="25"
              //     height="25"
              // className="bg-primary text-center text-white"
            />
              ) : (
                <IoCheckmarkCircle
                  size={40}
              className="rounded-full bg-primary "
                  
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
    <div className="order-status-nodes-container flex">
      <OrderStatusNode
        label="Order Placed"
        isActive={status === 'OrderPlaced'}
        isLast={true}
      />
      <OrderStatusNode
        label="Picked Up"
        isActive={status === 'PickedUp'}
        isLast={false}
      />
      <OrderStatusNode
        label="In Transit"
        isActive={status === 'InTransit'}
        isLast={false}
      />
      <OrderStatusNode
        label="Returned"
        isActive={status === 'Returned'}
        isLast={false}
      />
      <OrderStatusNode
        label="Order Cancelled"
        isActive={status === 'OrderCancelled'}
        isLast={false}
      />
    </div>
  </div>
)

export default OrderStatusNodes