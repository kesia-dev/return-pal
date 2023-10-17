import { getLayout } from '@/layouts/DefaultLayout'

export default function PickupInfo () {
  return (
    <div className="flex flex-col flex-wrap justify-around">
      <div className="flex flex-row justify-between mx-5">
        <div className="min-w-fit w-2/5 border-4 rounded-lg border-primary bg-white">
          <div className="">
            <div className="flex flex-row bg-paleBlue">
              <div>Attachment</div>
              <div>Label Type</div>
              <div>Description</div>
            </div>
            <div>money</div>
          </div>
            

        </div>
        <div className="flex flex-col md:flex-row w-3/5">
          
        <div className="min-w-fit w-[33%] border-4 rounded-md border-brand">
          Physical Label
        </div>
        <div className="min-w-fit w-[33%] border-4 rounded-md border-brand">
          Digital Label
        </div>
        <div className="min-w-fit w-[33%] border-4 rounded-md border-brand">
          Amazon QR Code
        </div>
        </div>
      </div>
    </div>
  )
}

PickupInfo.getLayout = getLayout