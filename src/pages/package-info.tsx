import { getLayout } from '@/layouts/DefaultLayout'

export default function PackageInfo() {
  return (
    <div className="flex flex-col flex-wrap justify-around">
      <div className="mx-5 flex flex-row justify-between">
        <div className="w-2/5 min-w-fit rounded-lg border-4 border-primary bg-white">
          <div className="">
            <div className="flex flex-row bg-paleBlue">
              <div>Attachment</div>
              <div>Label Type</div>
              <div>Description</div>
            </div>
            <div>money</div>
          </div>
        </div>
        <div className="flex w-3/5 flex-col md:flex-row">
          <div className="w-[33%] min-w-fit rounded-md border-4 border-brand">
            Physical Label
          </div>
          <div className="w-[33%] min-w-fit rounded-md border-4 border-brand">
            Digital Label
          </div>
          <div className="w-[33%] min-w-fit rounded-md border-4 border-brand">
            Amazon QR Code
          </div>
        </div>
      </div>
    </div>
  )
}

PackageInfo.getLayout = getLayout
