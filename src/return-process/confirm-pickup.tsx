import OrderSummary from '@/components/ConfirmPickup/OrderSummary'
import Calendar from '@/components/SvgComponents/ConfirmPickup/Calendar'
import CreditCard from '@/components/SvgComponents/ConfirmPickup/CreditCard'
import EditContainer from '@/components/SvgComponents/ConfirmPickup/EditContainer'
import Location from '@/components/SvgComponents/ConfirmPickup/Location'
import Package from '@/components/SvgComponents/ConfirmPickup/Package'
import PickupTrolley from '@/components/SvgComponents/ConfirmPickup/PickupTrolley'
import ScrollContainer from '@/components/SvgComponents/ConfirmPickup/ScrollContainer'
import { ReturnProcessBackButton } from '@/components/common/return-process'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { type ReturnProcessFullObjectType } from '@context/ReturnProcessContext'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  useState,
  useEffect,
  useRef,
  type FocusEvent,
  type FormEvent,
} from 'react'
import Reveal from '@components/common/reveal'
import type { Item, Order } from '@/components/DashBoard/types'
import { priceData } from '@/return-process/prices'
import type { ObjectId } from 'mongodb'
import { Input } from '@components/ui/input'
import { ProvincesSelector } from '@components/DashBoard/ProvincesSelector'
import { canadaProvinces } from '@lib/constants'
import {
  isPhoneNumberValid,
  isPostalCodeValid,
  isProvinceValid,
} from '@lib/utils'
import { useToast } from '@components/ui/use-toast'
import { Button } from '@components/ui/button'
import { Label } from '@components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// export interface MockData {
//   plan: 'bronze' | 'silver' | 'gold' | 'platinum'
//   extraBoxes?: number
//   bronzePrice: number
//   extraBoxPrice: number
//   productList: Record<string, number>
// }

// export interface Order {
//   name: string
//   tel: string
//   orderRef: string
//   email: string
//   address: string
//   pickupDate: string
//   pickupMethod: string
//   totalPackages: number
//   cardType: string
//   cardNumber: number
// }

type FormValues = {
  fullName: string
}

function AddressPickupInformation({ order }: { order: Order }) {
  const { toast } = useToast()
  const returnProcess = useReturnProcess()
  const [isShowing, setIsShowing] = useState(false)
  const [province, setProvince] = useState(
    order.order_details.pickup_details.province
  )
  const pickupFormRef = useRef<HTMLFormElement>(null)
  const inputsRef = useRef<HTMLDivElement>(null)

  const isFormValid = (form: FormData) => {
    if ((form.get('fullName') as string).length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your full name',
      })
      return false
    }

    if ((form.get('phoneNumber') as string).length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your phone number',
      })
      return false
    }

    if ((form.get('street') as string).length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your street address',
      })
      return false
    }

    if ((form.get('city') as string).length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your city',
      })
      return false
    }

    if (!isPostalCodeValid(form.get('postalCode') as string)) {
      toast({
        variant: 'destructive',
        description: 'Please ensure your postal code is correct',
      })
      return false
    }

    if (!isProvinceValid(form.get('province') as string)) {
      toast({
        variant: 'destructive',
        description: 'Please ensure your province field is correct',
      })
      return false
    }

    if (!isPhoneNumberValid(form.get('phoneNumber') as string)) {
      toast({
        variant: 'destructive',
        description: 'Please ensure your phone number is correct',
      })
      return false
    }
    return true
  }

  const handleEdit = () => {
    setIsShowing(true)
  }

  const handleFinishEdit = () => {
    pickupFormRef.current?.requestSubmit()
  }

  const hasClickedProvince = (element: HTMLDivElement) => {
    if (element == null) {
      return false
    }
    return Boolean(
      canadaProvinces.find((province) =>
        element.innerText.includes(province.name)
      )
    )
  }

  /**
   *  Handles the blurring effect by checking if any of the inputs
   * were not clicked
   *
   * @param e FocusEvent<HTMLDivElement,Element>
   */
  const handleBlur = (e: FocusEvent<HTMLDivElement, Element>) => {
    const target = e.relatedTarget

    if (hasClickedProvince(target as HTMLDivElement)) {
      return
    }

    // Check if the focus has moved outside the div
    if (!inputsRef.current!.contains(target as Node)) {
      pickupFormRef.current?.requestSubmit()
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(pickupFormRef.current!)
    formData.append('province', province)

    // Verify, if valid then proceed with submit
    if (!isFormValid(formData)) {
      return
    }

    returnProcess.setCurrentData({
      contact_full_name: formData.get('fullName') as string,
      contact_phone_number: formData.get('phoneNumber') as string,
      street: formData.get('street') as string,
      unit_number: formData.get('unitNumber') as string,
      city: formData.get('city') as string,
      province: formData.get('province') as string,
      postal_code: formData.get('postalCode') as string,
      instructions: formData.get('instructions') as string,
    })
    setIsShowing(false)
  }

  const inputStyles =
    'md:text-lg  my-2 placeholder:text-slate-400 rounded-xl border-[3px] border-solid border-primary'

  const provinceToShow = canadaProvinces.find(
    (province) => province.name == order.order_details.pickup_details.province
  )!.value

  return !isShowing ? (
    <div className="flex w-full justify-between gap-2 md:gap-5">
      <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
        <div className="h-[28px] w-[21px] pt-3 sm:h-[56px] sm:w-[42px] sm:pt-0">
          <Reveal>
            <Location />
          </Reveal>
        </div>
      </div>
      <div className="w-full space-y-3">
        <Reveal>
          <p className="font-bold">
            {order.order_details.pickup_details.contact_full_name}
            <span className="text-mediumText font-normal">&nbsp;|&nbsp;</span>
            {order.order_details.pickup_details.contact_phone_number}
          </p>
        </Reveal>
        <Reveal>
          <p className="whitespace-pre-wrap">
            {order.order_details.pickup_details.unit_number
              ? `${order.order_details.pickup_details.unit_number} \u2013 ${order.order_details.pickup_details.street}, ${order.order_details.pickup_details.city}, ${provinceToShow}, ${order.order_details.pickup_details.postal_code}`
              : `${order.order_details.pickup_details.street}, ${order.order_details.pickup_details.city}, ${provinceToShow}, ${order.order_details.pickup_details.postal_code}`}
          </p>
        </Reveal>
        {order.order_details.pickup_details.instructions && (
          <Reveal>
            <p className="text-grey md:tracking-wide">
              {order.order_details.pickup_details.instructions}
            </p>
          </Reveal>
        )}
      </div>
      <div>
        <EditContainer
          onFinish={handleFinishEdit}
          onClick={handleEdit}
          isShowingIcon={!isShowing}
        />
      </div>
    </div>
  ) : (
    <div
      ref={inputsRef}
      onBlur={handleBlur}
      className="flex w-full justify-between gap-2 md:gap-10"
    >
      <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
        <div className="h-[28px] w-[21px] pt-3 sm:h-[56px] sm:w-[42px] sm:pt-0">
          <Reveal>
            <Location />
          </Reveal>
        </div>
      </div>
      <form
        ref={pickupFormRef}
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-2 space-y-3 md:gap-0"
      >
        <Reveal width="100%">
          <div className="flex flex-col gap-1 xl:flex-row">
            <Input
              className={`${inputStyles} basis-[75%]`}
              name="fullName"
              type="text"
              placeholder="Full Name"
              autoFocus={true}
              defaultValue={
                order.order_details.pickup_details.contact_full_name
              }
            />
            <Input
              className={`${inputStyles} basis-4/5`}
              name="phoneNumber"
              placeholder="Phone Number"
              type="text"
              defaultValue={
                order.order_details.pickup_details.contact_phone_number
              }
            />
          </div>
        </Reveal>
        <Reveal width="100%">
          <div className="flex flex-col gap-1 xl:flex-row">
            <Input
              className={`${inputStyles} basis-[65%]`}
              name="street"
              type="text"
              placeholder="Street Address"
              defaultValue={order.order_details.pickup_details.street}
            />
            <Input
              className={`${inputStyles} basis-1/3`}
              name="unitNumber"
              placeholder="Office, Apt. (optional)"
              type="text"
              defaultValue={
                order.order_details.pickup_details.unit_number || ''
              }
            />
            <Input
              className={`${inputStyles} basis-1/3`}
              name="city"
              type="text"
              placeholder="City"
              defaultValue={order.order_details.pickup_details.city}
            />
          </div>
        </Reveal>
        <Reveal width="100%">
          <div className={`flex flex-col gap-1 xl:flex-row`}>
            <ProvincesSelector
              selectorStyles={`basis-1/2 text-sm ${inputStyles}`}
              onValueChange={(value) => {
                setProvince(canadaProvinces.find((p) => p.value == value)!.name)
              }}
              defaultValue={
                canadaProvinces.find(
                  (province) =>
                    province.name ==
                      order.order_details.pickup_details.province ||
                    province.value ==
                      order.order_details.pickup_details.province
                )!.value
              }
            />
            <Input
              className={`${inputStyles} basis-1/2`}
              name="postalCode"
              type="text"
              placeholder="Postal"
              defaultValue={order.order_details.pickup_details.postal_code}
            />
          </div>
        </Reveal>
        <Reveal width="100%">
          <div className="w-full">
            <Input
              className={`${inputStyles}`}
              name="instructions"
              type="text"
              placeholder="i.e building access code, location of door, etc"
              defaultValue={
                order.order_details.pickup_details.instructions || ''
              }
            />
          </div>
        </Reveal>
      </form>
      <EditContainer
        onFinish={handleFinishEdit}
        onClick={handleEdit}
        isShowingIcon={!isShowing}
      />
    </div>
  )
}

function DatePickupInformation({ order }: { order: Order }) {
  const returnProcess = useReturnProcess()
  const inputsRef = useRef<HTMLDivElement>(null)
  const dateFormRef = useRef<HTMLFormElement>(null)
  const [isShowing, setIsShowing] = useState(false)

  const handleBlur = (e: FocusEvent<HTMLDivElement, Element>) => {
    const target = e.relatedTarget

    // Check if the focus has moved outside the div
    if (!inputsRef.current!.contains(target)) {
      dateFormRef.current?.requestSubmit()
    }
  }

  const handleFinish = () => {
    dateFormRef.current?.requestSubmit()
  }

  const handleClick = () => {
    setIsShowing(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(dateFormRef.current!)
    const date = new Date(
      (formData.get('pickupDate') as string) + 'T00:00:00-05:00' // EST
    )

    const formattedDate = date.toLocaleDateString('en-CA').replace(/\//g, '/')

    returnProcess.setCurrentData({
      dateAndTime: formattedDate,
    })
    setIsShowing(false)
  }

  const dateDefault = new Date()

  const dateString = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(dateDefault)

  return !isShowing ? (
    <div className="flex w-full justify-between gap-2 md:gap-7">
      <div className="flex min-w-[25px] items-center justify-center md:min-w-[63px]">
        <div className="flex h-[25px] w-[25px] items-center sm:h-[79px] sm:w-[63px]">
          <Reveal>
            <Calendar />
          </Reveal>
        </div>
      </div>
      <p className="mb-1 ml-2 flex w-full items-center sm:mb-2 sm:ml-0">
        <Reveal width="100%">
          <>
            <span className="font-bold">Pickup Date:</span>
            <span>
              &nbsp;
              {dateString}
            </span>
          </>
        </Reveal>
      </p>
      <div className="mb-2 flex items-center justify-center">
        <Reveal>
          <EditContainer
            onFinish={handleFinish}
            isShowingIcon={!isShowing}
            onClick={handleClick}
          />
        </Reveal>
      </div>
    </div>
  ) : (
    <div
      onBlur={handleBlur}
      ref={inputsRef}
      className="flex w-full justify-between gap-2 md:gap-10"
    >
      <div className="flex min-w-[35px] justify-center md:min-w-[63px]">
        <div className="h-[39px] w-[31px] sm:h-[79px] sm:w-[63px]">
          <Reveal>
            <Calendar />
          </Reveal>
        </div>
      </div>
      <form
        ref={dateFormRef}
        onSubmit={handleSubmit}
        className="mb-1 flex w-full items-center sm:mb-2"
      >
        <Reveal width="100%">
          <Input
            className={`basis-[65%] rounded-xl border-[3px] border-solid border-primary py-0 placeholder:text-slate-400 md:text-lg`}
            name="pickupDate"
            type="date"
            autoFocus={true}
            placeholder="Street Address"
            defaultValue={dateDefault.toLocaleDateString('en-CA')}
          />
        </Reveal>
      </form>
      <div>
        <EditContainer
          onFinish={handleFinish}
          isShowingIcon={!isShowing}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

function PickupMethodInformation({ order }: { order: Order }) {
  const [isShowing, setIsShowing] = useState(false)
  const inputsRef = useRef<HTMLDivElement>(null)
  const [deliveryOption, setDeliveryOption] = useState<
    ReturnProcessFullObjectType['deliveryOption']
  >(order.order_details.pickup_method)

  const returnProcess = useReturnProcess()

  const options = ['Direct Handoff', 'Leave on Doorstep']

  const hasClickedOption = (element: HTMLDivElement) => {
    if (element == null) {
      return false
    }

    return Boolean(options.find((option) => element.innerText.includes(option)))
  }

  const updateDeliveryOption = () => {
    returnProcess.setCurrentData({
      deliveryOption,
    })
    setIsShowing(false)
  }

  const handleBlur = (e: FocusEvent<HTMLDivElement, Element>) => {
    const target = e.relatedTarget

    if (hasClickedOption(target as HTMLDivElement)) {
      return
    }

    // Check if the focus has moved outside the div
    if (!inputsRef.current!.contains(target as Node)) {
      updateDeliveryOption()
    }
  }

  const handleClick = () => {
    setIsShowing(true)
  }

  const handleSelectChange = (
    value: ReturnProcessFullObjectType['deliveryOption']
  ) => {
    setDeliveryOption(value)
  }

  return !isShowing ? (
    <div className="flex w-full items-center justify-between gap-2 md:gap-10">
      <div className="min-w-[35px] justify-center md:h-[60px] md:w-[68px]">
        <div className="h-[34px] w-[30px] sm:h-[60px] sm:w-[68px]">
          <Reveal>
            <PickupTrolley />
          </Reveal>
        </div>
      </div>
      <div className="flex w-full items-center">
        <Reveal width="100%">
          <p className="grow">
            <span className="font-bold">Pickup Method:</span>
            <span>&nbsp;{order.order_details.pickup_method}</span>
          </p>
        </Reveal>
      </div>
      <EditContainer
        isShowingIcon={!isShowing}
        onFinish={updateDeliveryOption}
        onClick={handleClick}
      />
    </div>
  ) : (
    <div
      ref={inputsRef}
      onBlur={handleBlur}
      className="flex w-full items-center justify-between gap-2 md:gap-10"
    >
      <div className="min-w-[35px] justify-center md:min-h-[60px] md:w-[68px]">
        <div className="h-[34px] w-[30px] md:min-h-[60px] md:min-w-[68px]">
          <Reveal>
            <PickupTrolley />
          </Reveal>
        </div>
      </div>
      <div className="flex w-full items-center">
        <Select
          defaultValue={deliveryOption}
          onValueChange={handleSelectChange}
        >
          <Reveal width="100%">
            <SelectTrigger
              autoFocus={true}
              className="w-full rounded-xl border-[3px] border-solid border-primary placeholder:text-slate-400 md:text-lg"
            >
              {deliveryOption}
            </SelectTrigger>
          </Reveal>
          <SelectContent>
            <SelectGroup>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <EditContainer
          isShowingIcon={!isShowing}
          onFinish={updateDeliveryOption}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default function ConfirmPickup() {
  // If the user enters a Promo Code in the Order Summary, it will be held in state here
  const [promoCode, setPromoCode] = useState('')

  // Logic for the Scroll-to-Bottom button
  const [showScrollBtn, setShowScrollBtn] = useState(true)

  const returnProcess = useReturnProcess()

  const items: Item[] = []
  const foundSubscription = priceData.find(
    (plan) =>
      plan.name.toLowerCase() ===
      returnProcess.currentData.subscription.toLowerCase()
  )
  if (foundSubscription) {
    const subscriptionItem = {
      itemId: foundSubscription.itemId,
      itemName: foundSubscription.name,
      quantity: 1,
    }
    items.push(subscriptionItem)
    if (
      returnProcess.currentData.subscription === 'Bronze' &&
      returnProcess.currentData.labelFileUploads.length > 1
    ) {
      const packageItem = {
        itemId: priceData.find((plan) => plan.name.toLowerCase() === 'extra')!
          .itemId,
        itemName: priceData.find((plan) => plan.name.toLowerCase() === 'extra')!
          .name,
        quantity: returnProcess.currentData.labelFileUploads.length - 1,
      }
      items.push(packageItem)
    }
  }

  const addExpiryDate = (orderDate: Date, subscription: string): string => {
    const expiryDate = new Date(orderDate)

    switch (subscription) {
      case 'Silver':
        expiryDate.setDate(expiryDate.getDate() + 30)
        break
      case 'Gold':
        expiryDate.setDate(expiryDate.getDate() + 90)
        break
      case 'Platinum':
        expiryDate.setDate(expiryDate.getDate() + 365)
        break
      default:
        break
    }
    return expiryDate.toString()
  }

  const calculateCost = (subscription: string, packages: number) => {
    if (subscription === 'Bronze') {
      const bronzePrice = priceData.find(
        (plan) => plan.name.toLowerCase() === subscription.toLowerCase()
      )!.price
      const extraPrice = priceData.find(
        (plan) => plan.name.toLowerCase() === 'Extra'.toLowerCase()
      )!.price
      return bronzePrice + (packages - 1) * extraPrice
    } else {
      const subscriptionPrice = priceData.find(
        (plan) => plan.name.toLowerCase() === subscription.toLowerCase()
      )!.price
      return subscriptionPrice
    }
  }
  const order: Order = {
    // generate order_number here
    _id: undefined as unknown as ObjectId,
    order_number: '',
    order_date: {
      $dateFromString: {
        dateString: new Date().toString(),
      },
    },
    order_status: 'Driver received',
    order_details: {
      total_cost: calculateCost(
        returnProcess.currentData.subscription,
        returnProcess.currentData.labelFileUploads.length
      ),
      pickup_date: {
        $dateFromString: {
          dateString: returnProcess.currentData.dateAndTime,
        },
      },
      pickup_method: returnProcess.currentData.deliveryOption,
      total_packages: returnProcess.currentData.labelFileUploads.length,
      extra_packages_included:
        returnProcess.currentData.subscription === 'Bronze'
          ? returnProcess.currentData.labelFileUploads.length - 1
          : 0,
      promo_code: '',
      pickup_details: {
        address_id: undefined as unknown as ObjectId,
        contact_full_name: returnProcess.currentData.contact_full_name,
        contact_phone_number: returnProcess.currentData.contact_phone_number,
        street: returnProcess.currentData.street,
        unit_number: returnProcess.currentData.unit_number,
        city: returnProcess.currentData.city,
        province: returnProcess.currentData.province,
        country: returnProcess.currentData.country,
        postal_code: returnProcess.currentData.postal_code,
        instructions: returnProcess.currentData.instructions ?? '',
      },
    },
    client_details: returnProcess.currentData.userInfo,
    subscription_expiry_date: {
      $dateFromString: {
        dateString: addExpiryDate(
          new Date(),
          returnProcess.currentData.subscription
        ),
      },
    },
    // pickupMethod: 'Direct Handoff',
    // pickupMethod: returnProcess.currentData.pickupType,
    // totalPackages: returnProcess.currentData.labelFileUploads.length,
    // cardType: 'Visa',
    // cardNumber: 4832,
    // plan: 'bronze',
    // extraBoxes: 1,
    // bronzePrice: 1099,
    // extraBoxPrice: 399,
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setShowScrollBtn(true)
      } else {
        setShowScrollBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll, true)
    return window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollDown: () => void = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }
  return (
    <div className="mt-6 flex w-full flex-col items-center sm:mt-10 md:flex-row md:items-start md:justify-around md:tracking-wide">
      <section className="mx-1 flex w-full flex-col items-center text-base sm:mb-10 sm:w-2/3 sm:text-smallText">
        <div className="flex w-11/12 flex-col md:w-3/4">
          <section className="mb-4 sm:mb-10">
            <Reveal>
              <h1 className="md-1 w-full text-mediumText sm:mb-2 sm:text-subtitle">
                Confirm Pickup
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-grey md:tracking-wide">
                Make sure all the details look good!
              </p>
            </Reveal>
          </section>

          <section className="gap-4 sm:mb-10 sm:gap-0">
            <Reveal>
              <h2 className="text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
                Pickup Information
              </h2>
            </Reveal>
            <AddressPickupInformation order={order} />
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 hidden w-full bg-brand sm:flex" />
            </Reveal>
            <DatePickupInformation order={order} />
            <Reveal width="100%">
              <Separator className="mb-4 hidden w-full bg-brand sm:flex" />
            </Reveal>

            <PickupMethodInformation order={order} />

            <Reveal width="100%">
              <Separator className="mb-4 mt-4 hidden w-full bg-brand sm:flex sm:flex" />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <h2 className="mb-2 text-smallText font-semibold text-primary sm:mb-6 sm:text-2xl">
                Package Summary
              </h2>
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[21px] w-[27px] sm:h-[46px] sm:w-[60px]">
                  <Reveal>
                    <Package />
                  </Reveal>
                </div>
              </div>
              <div className="grow">
                <Reveal width="100%">
                  <p>
                    <span className="font-bold">Total Packages:&nbsp;</span>
                    <span>
                      {returnProcess.currentData.labelFileUploads.length}
                    </span>
                  </p>
                </Reveal>
                <Link href="/" className="w-2/3 text-primary">
                  <Reveal width="100%">
                    <div className="flex items-center justify-start">
                      <div className="text-normal sm:text-subtitle">+</div>
                      <div className="mt-1">&nbsp;Add a package</div>
                    </div>
                  </Reveal>
                </Link>
              </div>
              <EditContainer />
            </div>
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 hidden w-full bg-brand sm:flex" />
            </Reveal>
          </section>

          {/* <section>
            <Reveal>
              <h2 className="text-smallText font-semibold text-primary sm:mb-2 sm:text-2xl">
                Payment Method
              </h2>
            </Reveal>
            <div className="flex w-full justify-between gap-2 md:gap-10">
              <div className="flex min-w-[35px] justify-center md:min-w-[70px]">
                <div className="h-[35px] w-[35px] sm:h-[70px] sm:w-[70px]">
                  <Reveal>
                    <CreditCard />
                  </Reveal>
                </div>
              </div>
              <div className="mt-1 grow sm:mt-3">
                <Reveal width="100%">
                  <p>
                    <span className="font-bold">Visa ending in:&nbsp;</span>
                    <span>1234 </span>
                  </p>
                </Reveal>
              </div>
              <EditContainer />
            </div>
          </section> */}
          <div className="my-2 flex sm:my-10">
            <Reveal>
              <ReturnProcessBackButton />
            </Reveal>
          </div>
        </div>
      </section>
      {/* {order.packageOrderType === 'bronze' && ( */}
      <OrderSummary
        promoState={[promoCode, setPromoCode]}
        order={order}
        items={items}
      />
      {/* )} */}
      {showScrollBtn && <ScrollContainer scrollDown={scrollDown} />}
    </div>
  )
}
