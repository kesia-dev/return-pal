import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function PackageInfo() {
  const handleUpload = () => {
    console.log('uploading!')
  }
  return (
    <div className="mx-5 my-10 flex flex-col flex-wrap justify-around lg:mx-10">
      <div className="my-5 text-mediumText font-bold text-brand">
        Package Details
      </div>
      <div className="mb-5 text-brand">
        Select label type and we&apos;ll handle the label printing and
        repackaging. You can add multiple packages.
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-2/5 min-w-fit rounded-lg border-4 border-primary bg-white">
          <div className="">
            <div className="flex flex-row bg-paleBlue font-bold text-primary lg:px-5 ">
              <div className="min-w-1/4 w-1/4 overflow-hidden text-clip break-words text-center">
                Attachment
              </div>
              <div className="min-w-1/4 w-1/4 overflow-hidden text-clip break-words text-center">
                Label Type
              </div>
              <div className="min-w-1/4 w-1/4 overflow-hidden text-clip break-words text-center">
                Description
              </div>
            </div>
            <Separator className="h-0.5 bg-primary" />
            <div className="flex flex-row py-4 lg:px-5">
              <div className="min-w-1/4 w-1/4 overflow-hidden text-clip break-words text-center">
                label.png
              </div>
              <div className="min-w-1/4 w-1/4 overflow-hidden text-clip break-words rounded-full  bg-green-200 text-center">
                Digital
              </div>
              <div className="min-w-1/4 w-1/4 overflow-hidden text-clip break-words text-center">
                description
              </div>
              <div className="min-w-1/4 flex w-1/4 justify-around overflow-hidden text-clip break-words text-center lg:px-5">
                {' '}
                <div onClick={() => void console.log('editing')}>
                  <svg
                    className="fill-primary"
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 306.637 306.637"
                  >
                    <g>
                      <g>
                        <path
                          d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
			l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"
                        />
                        <path
                          d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
			L265.13,75.602L231.035,41.507z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div onClick={() => void console.log('deleting')}>
                  <svg
                    className="fill-primary"
                    height="20px"
                    width="20px"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 463 463"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path d="M375.5,48H295V31.5C295,14.131,280.869,0,263.5,0h-64C182.131,0,168,14.131,168,31.5V48H87.5C65.72,48,48,65.72,48,87.5v24  c0,4.142,3.357,7.5,7.5,7.5H64v288.5c0,10.336,6.71,19.128,16,22.266v9.734c0,12.958,10.542,23.5,23.5,23.5h256  c12.958,0,23.5-10.542,23.5-23.5v-9.734c9.29-3.138,16-11.93,16-22.266V119h8.5c4.143,0,7.5-3.358,7.5-7.5v-24  C415,65.72,397.28,48,375.5,48z M183,31.5c0-9.098,7.402-16.5,16.5-16.5h64c9.098,0,16.5,7.402,16.5,16.5V48h-97V31.5z M79,159.5  c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V416h-8.5c-4.687,0-8.5-3.813-8.5-8.5V159.5z M359.5,448h-256  c-4.687,0-8.5-3.813-8.5-8.5V431h273v8.5C368,444.187,364.187,448,359.5,448z M168,416h-17V159.5c0-4.687,3.813-8.5,8.5-8.5  s8.5,3.813,8.5,8.5V416z M240,416h-17V159.5c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V416z M312,416h-17V159.5  c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V416z M384,407.5c0,4.687-3.813,8.5-8.5,8.5H367V159.5c0-4.687,3.813-8.5,8.5-8.5  s8.5,3.813,8.5,8.5V407.5z M384,137.597c-2.638-1.027-5.503-1.597-8.5-1.597c-12.958,0-23.5,10.542-23.5,23.5V416h-25V159.5  c0-12.958-10.542-23.5-23.5-23.5S280,146.542,280,159.5V416h-25V159.5c0-12.958-10.542-23.5-23.5-23.5S208,146.542,208,159.5V416  h-25V159.5c0-12.958-10.542-23.5-23.5-23.5S136,146.542,136,159.5V416h-25V159.5c0-12.958-10.542-23.5-23.5-23.5  c-2.997,0-5.862,0.57-8.5,1.597V119h305V137.597z M400,104H63V87.5C63,73.991,73.99,63,87.5,63h288c13.51,0,24.5,10.991,24.5,24.5  V104z" />
                  </svg>
                </div>
              </div>
            </div>
            <Separator className="mx-[5%] h-0.5 w-[90%]" />
          </div>
        </div>
        <div className="flex w-3/5 flex-col justify-between px-5 text-center md:flex-row">
          <div className="w-[30%] min-w-fit rounded-md border-4 border-brand font-bold text-brand lg:text-2xl">
            <Dialog>
              <DialogTrigger>
                Physical Label
                <div className="text-largeText text-primary  lg:text-6xl">
                  +
                </div>
              </DialogTrigger>
              <DialogContent className="bg-paleBlue">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold text-brand">
                    Add Physical Label
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col px-5">
                  <div className="font-bold text-brand">
                    Upload Return Label
                  </div>
                  <div className="font-bold text-brand">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      defaultValue='Label the item(s) inside: e.g. "laptop covers/"'
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full px-5"> Add Package</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-[30%] min-w-fit rounded-md border-4 border-brand font-bold text-brand lg:text-2xl">
            <Dialog>
              <DialogTrigger>
                Digital Label
                <div className="text-largeText text-primary  lg:text-6xl">
                  +
                </div>
              </DialogTrigger>
              <DialogContent className="bg-paleBlue">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold text-brand">
                    Add Digital Label
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col px-5">
                  <div className="font-bold text-brand">
                    Upload Return Label
                  </div>
                  <div className="font-bold text-brand">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      defaultValue='Label the item(s) inside: e.g. "laptop covers/"'
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full px-5"> Add Package</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-[30%] min-w-fit rounded-md border-4 border-brand font-bold text-brand lg:text-2xl">
            Amazon QR Code
            <div className="text-largeText text-primary  lg:text-6xl">+</div>
          </div>
        </div>
      </div>
    </div>
  )
}

PackageInfo.getLayout = getLayout
