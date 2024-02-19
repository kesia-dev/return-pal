import ReturnProcessLayout from "@layouts/ReturnProcessLayout"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Calendar from "@components/calander";
import CalendarComponent from "@components/calander";
export default function SchedulePickupCalendar(){


  return(
<>
<ReturnProcessLayout >

<div className="  flex items-start space-y-4 p-10">
{/* <div className="recent-orders-container mt-14 flex flex-col items-start "> */}

<div className=' mt-14 flex  flex-col space-y-4 mb-4 p-10'>
  <h1 className=" mb-2 text-3xl font-bold">What day do you need to pickup?</h1>
  <p>
    we'll text yoy the morning of your pickup <br/>
    with an estimated arrival time.
  </p>
</div>
<div className=' mt-14 flex  flex-col space-y-4  p-10'>
<h3 className="mb-0 text-1xl font-bold">Select pickup date</h3>
<form className=' h-10 shrink rounded-md border-8 text-sm mb-4  flex flex-col  bg-white rounded  w-[600px] h-[500px]   p-10'>
<Calendar/>
</form>
</div>
</div>


</ReturnProcessLayout >
</>
  )
}