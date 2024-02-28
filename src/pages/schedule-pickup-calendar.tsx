import React, {useState} from "react";
import ReturnProcessLayout from "@layouts/ReturnProcessLayout"
import Calendar from "@components/calander";
import Reveal from "@components/common/reveal";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { SectionDescription } from "@components/common/section";
import { SectionHeader } from "@components/common/section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ReturnProcessNextButton } from "@components/common/return-process";
import { useForm } from 'react-hook-form'
import NextArrow from "@components/SvgComponents/NextArrow";
export default function SchedulePickupCalendar() {
 
  const [isDateSelected,setIsDateSelected] = useState(false);

  const handleDateSelected = (date : Date) => {
    setIsDateSelected(true);
  }
  return (
    <>
      <ReturnProcessLayout>
         
        <div className="  flex items-start space-y-4 px-10 pt-10">
          <div className=' mt-14 flex  flex-col space-y-10 mb-4 p-10 '>
            <Reveal>
              <SectionHeader>What day do you need to pickup?</SectionHeader>
            </Reveal>
            <Reveal>
              <SectionDescription className="text-left  font-normal ">
                We&apos;ll text you the morning of your pickup <br/> with an estimated time arrival.
              </SectionDescription>
            </Reveal>
          </div>
          <div className=' mt-14 flex  flex-col space-y-6  p-14 items-start'>
            <h3 className="text-xl font-bold ">Select pickup date</h3>
            <Calendar onDateSelect={handleDateSelected}/>
            <div className="flex min-h-[59px] min-w-[50px] items-center justify-start absolute top-10 right-10 pt-[60px] pr-4">
              <Reveal>
                <Link
                  href="/"
                  className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    width={'35'}
                    height={'35'}
                  />
                  <p>Cancel</p>
                </Link>
              </Reveal>
              <div className=" fixed bottom-4 right-4 ">
             
                 <Button
      
      variant={isDateSelected ? "default" : "outline"}
              onClick={() => console.log('Date selected:', isDateSelected)}
              disabled={!isDateSelected}
      type={'submit'}
      className={'text-md w-28 select-none space-x-2'}
      
    >
      <div className="flex items-center justify-center space-x-2">
        <p>Next</p>
        <NextArrow />
      </div>
    </Button>
            </div>
            </div>
          </div>
        </div>
        
      </ReturnProcessLayout>
    </>
  )
}