import ReturnProcessLayout from "@layouts/ReturnProcessLayout"
import Calendar from "@components/calander";
import Reveal from "@components/common/reveal";
import Link from "next/link";
import { SectionDescription } from "@components/common/section";
import { SectionHeader } from "@components/common/section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function SchedulePickupCalendar() {


  return (
    <>
      <ReturnProcessLayout>
        <div className="  flex items-start space-y-4 p-10">
          <div className=' mt-14 flex  flex-col space-y-4 mb-4 p-10'>
            <Reveal>
              <SectionHeader>What day do you need to pickup?</SectionHeader>
            </Reveal>
            <Reveal>
              <SectionDescription className="text-start sm:text-center font-normal">
                We&apos;ll text you the morning of your pickup<br /> with an
                estimated time arrival.
              </SectionDescription>
            </Reveal>
          </div>
          <div className=' mt-14 flex  flex-col space-y-2  p-14 items-start'>
            <h3 className="text-xl font-bold ">Select pickup date</h3>
            <Calendar />
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
            </div>
          </div>
        </div>
      </ReturnProcessLayout>
    </>
  )
}