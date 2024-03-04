// import React, {useState} from "react";
// import ReturnProcessLayout from "@layouts/ReturnProcessLayout"
// import Calendar from "@components/calander";
// import Reveal from "@components/common/reveal";
// import Link from "next/link";
// import { Button } from "@components/ui/button";
// import { SectionDescription } from "@components/common/section";
// import { SectionHeader } from "@components/common/section";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose } from '@fortawesome/free-solid-svg-icons';
// import { ReturnProcessNextButton } from "@components/common/return-process";
// import { useForm } from 'react-hook-form'
// import NextArrow from "@components/SvgComponents/NextArrow";
// import { useReturnProcess } from "@hooks/useReturnProcess";
// import { useDateSelection } from "@hooks/useDateSelection";
// import { UserInfo } from "@components/DashBoard/types";
// import { z } from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod";
// export default function SchedulePickupCalendar() {
 
//   const [isDateSelected,setIsDateSelected] = useState(false);
//   const userId = '657a3c20334ac659a3b33708'
//   const returnProcess = useReturnProcess()
//   const dateSelection = useDateSelection(new Date())

//   const [user, setUser] = useState<UserInfo>()

//   const formSchema = z.object({
//     dateAndTime: z.coerce
//       .string()
//       .refine((data) => new Date(data) > dateSelection.initialDate, {
//         message: 'Start date must be in the future',
//       }),
//   })
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       dateAndTime: returnProcess.currentData.dateAndTime,
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // returnProcess.setCurrentData(values)
//     returnProcess.setCurrentData({
//       userInfo: user,
//       dateAndTime: values.dateAndTime,
//     })
//     returnProcess.forward()
//   }
//   const handleDateSelected = (date : String) => {
//     setIsDateSelected(true);
//   }

//   return (
//     <>

//          <Form></Form>
//         <div className="  flex items-start space-y-4 px-10 pt-10">
//           <div className=' mt-14 flex  flex-col space-y-10 mb-4 p-10 '>
//             <Reveal>
//               <SectionHeader>What day do you need to pickup?</SectionHeader>
//             </Reveal>
//             <Reveal>
//               <SectionDescription className="text-left  font-normal ">
//                 We&apos;ll text you the morning of your pickup <br/> with an estimated time arrival.
//               </SectionDescription>
//             </Reveal>
//           </div>
//           <div className=' mt-14 flex  flex-col space-y-6  p-14 items-start'>
//             <h3 className="text-xl font-bold ">Select pickup date</h3>
//             <Calendar onDateSelect={handleDateSelected}/>
//             <div className="flex min-h-[59px] min-w-[50px] items-center justify-start absolute top-10 right-10 pt-[60px] pr-4">
//               <Reveal>
//                 <Link
//                   href="/"
//                   className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
//                 >
//                   <FontAwesomeIcon
//                     icon={faClose}
//                     width={'35'}
//                     height={'35'}
//                   />
//                   <p>Cancel</p>
//                 </Link>
//               </Reveal>
//               <div className=" fixed bottom-4 right-4 ">
//               <span className="mt-5 flex justify-end">
//               <Reveal>
//                 <ReturnProcessNextButton />
//               </Reveal>
//             </span>
//             </div>
//             </div>
//           </div>
//         </div>
        
     
//     </>
//   )
// }