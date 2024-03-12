import OrderSummary from '@/components/ConfirmPickup/OrderSummary'
import Calendar from '@/components/SvgComponents/ConfirmPickup/Calendar'
import EditContainer from '@/components/SvgComponents/ConfirmPickup/EditContainer'
import Location from '@/components/SvgComponents/ConfirmPickup/Location'
import Package from '@/components/SvgComponents/ConfirmPickup/Package'
import PickupTrolley from '@/components/SvgComponents/ConfirmPickup/PickupTrolley'
import ScrollContainer from '@/components/SvgComponents/ConfirmPickup/ScrollContainer'
import { ReturnProcessBackButton } from '@/components/common/return-process'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { type ReturnProcessFullObjectType } from '@context/ReturnProcessContext'
import { Separator } from '@/components/ui/separator'
import {
  useState,
  useEffect,
  useRef,
  type FocusEvent,
  type FormEvent,
} from 'react'
import Reveal from '@components/common/reveal'
import { priceData } from '@/return-process/prices'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { PromoCode } from '@components/DashBoard/types'
import { Address, Order, orderStatus, subscriptionPlans } from './types'
import { updateAddress } from '@/services/addressService'

const addExpiryDate = (orderDate: Date, subscription: string): Date => {
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
  return expiryDate
}

const calculateCost = (
  subscription: string,
  packages: number,
  promoCode?: PromoCode
) => {
  if (subscription === 'Bronze') {
    const bronzePrice = priceData.find(
      (plan) => plan.name.toLowerCase() === subscription.toLowerCase()
    )!.price
    const extraPrice = priceData.find(
      (plan) => plan.name.toLowerCase() === 'Extra'.toLowerCase()
    )!.price
    const total = bronzePrice + (packages - 1) * extraPrice
    return !promoCode
      ? total
      : total - total * (promoCode.discountPercentage / 100)
  } else {
    const subscriptionPrice = priceData.find(
      (plan) => plan.name.toLowerCase() === subscription.toLowerCase()
    )!.price
    const total = subscriptionPrice
    return !promoCode
      ? total
      : total - total * (promoCode.discountPercentage / 100)
  }
}

function AddressPickupInformation({ order }: { order: Order }) {
  const { toast } = useToast()
  const returnProcess = useReturnProcess()
  const [isShowing, setIsShowing] = useState(false)
  const [province, setProvince] = useState(
    order.orderDetails.pickupDetails.province
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
    if (
      inputsRef.current &&
      !inputsRef.current!.contains(target as Node) &&
      isShowing
    ) {
      pickupFormRef.current!.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(pickupFormRef.current!)
    formData.append('province', province)

    // Verify, if valid then proceed with submit
    if (!isFormValid(formData)) {
      return
    }

    // Update the related address
    const editedAddress: Address = {
      _id: returnProcess.currentData.address_id,
      name: formData.get('fullName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      address: formData.get('street') as string,
      unit: formData.get('unitNumber') as string,
      city: formData.get('city') as string,
      province: formData.get('province') as string,
      country: returnProcess.currentData.country,
      postalCode: formData.get('postalCode') as string,
      instructions: formData.get('instructions') as string,
    }

    await updateAddress(editedAddress)

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
    (province) => province.name == order.orderDetails.pickupDetails.province
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
            {order.orderDetails.pickupDetails.name}
            <span className="text-mediumText font-normal">&nbsp;|&nbsp;</span>
            {order.orderDetails.pickupDetails.phoneNumber}
          </p>
        </Reveal>
        <Reveal>
          <p className="whitespace-pre-wrap">
            {order.orderDetails.pickupDetails.unit
              ? `${order.orderDetails.pickupDetails.unit} \u2013 ${order.orderDetails.pickupDetails.address}, ${order.orderDetails.pickupDetails.city}, ${provinceToShow}, ${order.orderDetails.pickupDetails.postalCode}`
              : `${order.orderDetails.pickupDetails.address}, ${order.orderDetails.pickupDetails.city}, ${provinceToShow}, ${order.orderDetails.pickupDetails.postalCode}`}
          </p>
        </Reveal>
        {order.orderDetails.pickupDetails.instructions && (
          <Reveal>
            <p className="text-grey md:tracking-wide">
              {order.orderDetails.pickupDetails.instructions}
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
              defaultValue={order.orderDetails.pickupDetails.name}
            />
            <Input
              className={`${inputStyles} basis-4/5`}
              name="phoneNumber"
              placeholder="Phone Number"
              type="text"
              defaultValue={order.orderDetails.pickupDetails.phoneNumber}
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
              defaultValue={order.orderDetails.pickupDetails.address}
            />
            <Input
              className={`${inputStyles} basis-1/3`}
              name="unitNumber"
              placeholder="Office, Apt. (optional)"
              type="text"
              defaultValue={order.orderDetails.pickupDetails.unit || ''}
            />
            <Input
              className={`${inputStyles} basis-1/3`}
              name="city"
              type="text"
              placeholder="City"
              defaultValue={order.orderDetails.pickupDetails.city}
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
                      order.orderDetails.pickupDetails.province ||
                    province.value == order.orderDetails.pickupDetails.province
                )!.value
              }
            />
            <Input
              className={`${inputStyles} basis-1/2`}
              name="postalCode"
              type="text"
              placeholder="Postal"
              defaultValue={order.orderDetails.pickupDetails.postalCode}
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
              defaultValue={order.orderDetails.pickupDetails.instructions || ''}
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
    if (
      inputsRef.current &&
      !inputsRef.current!.contains(target) &&
      isShowing
    ) {
      dateFormRef.current!.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  const handleFinish = () => {
    dateFormRef.current!.requestSubmit()
  }

  const handleClick = () => {
    setIsShowing(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(dateFormRef.current!)
    const date = new Date(
      formData.get('pickupDate') as string // EST
    )

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Toronto',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })))

    returnProcess.setCurrentData({
      dateAndTime: formattedDate,
    })
    setIsShowing(false)
  }

  const dateDefault = new Date(returnProcess.currentData.dateAndTime)
  const dateString = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Toronto',
  }).format(dateDefault)

  return (
    <div
      onBlur={handleBlur}
      ref={inputsRef}
      className="flex w-full justify-between gap-2 md:gap-7"
    >
      <div className="flex min-w-[25px] items-center justify-center md:min-w-[63px]">
        <div className="flex h-[25px] w-[25px] items-center sm:h-[79px] sm:w-[63px]">
          <Reveal>
            <Calendar />
          </Reveal>
        </div>
      </div>
      {!isShowing ? (
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
      ) : (
        <form
          ref={dateFormRef}
          onSubmit={handleSubmit}
          className="mb-1 flex w-full items-center sm:mb-2"
        >
          <Reveal width="100%">
            <Input
              className={`block w-full rounded-xl border-[3px] border-solid border-primary py-0 placeholder:text-slate-400 md:text-lg`}
              name="pickupDate"
              type="date"
              autoFocus={true}
              placeholder="Pickup Date"
              defaultValue={dateDefault.toLocaleDateString('en-CA', {
                timeZone: 'America/Toronto',
              })}
            />
          </Reveal>
        </form>
      )}
      <div className="mb-2 flex items-center justify-center">
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
  >(order.orderDetails.pickupMethod)

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
            <span>&nbsp;{order.orderDetails.pickupMethod}</span>
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
  // Logic for the Scroll-to-Bottom button
  const [showScrollBtn, setShowScrollBtn] = useState(true)
  const returnProcess = useReturnProcess()
  const [order, setOrder] = useState<Order>({
    orderDate: new Date(),
    orderStatus: orderStatus['Driver received'],
    orderDetails: {
      user: localStorage.getItem('userId')!,
      totalCost: calculateCost(
        returnProcess.currentData.subscription,
        returnProcess.currentData.labelFileUploads.length
      ),
      pickupDate: new Date(returnProcess.currentData.dateAndTime),
      pickupMethod: returnProcess.currentData.deliveryOption,
      totalPackages: returnProcess.currentData.labelFileUploads.length,
      extraPackages:
        returnProcess.currentData.subscription === 'Bronze'
          ? returnProcess.currentData.labelFileUploads.length - 1
          : 0,
      pickupDetails: {
        name: returnProcess.currentData.contact_full_name,
        phoneNumber: returnProcess.currentData.contact_phone_number,
        address: returnProcess.currentData.street,
        unit: returnProcess.currentData.unit_number,
        city: returnProcess.currentData.city,
        province: returnProcess.currentData.province,
        country: returnProcess.currentData.country,
        postalCode: returnProcess.currentData.postal_code,
        instructions: returnProcess.currentData.instructions ?? '',
        isPrimary: false,
      },
    },
    subscription: {
      type: returnProcess.currentData.subscription as subscriptionPlans,
      expiryDate: addExpiryDate(
        new Date(),
        returnProcess.currentData.subscription
      ),
      price: priceData.find(
        (plan) =>
          plan.name.toLowerCase() ===
          returnProcess.currentData.subscription.toLowerCase()
      )!.price,
    },
  })

  // scroll handler
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

  // update order
  useEffect(() => {
    setOrder({
      ...order,
      orderDetails: {
        user: localStorage.getItem('userId')!,
        totalCost: calculateCost(
          returnProcess.currentData.subscription,
          returnProcess.currentData.labelFileUploads.length,
          order.discount ? order.discount : undefined
        ),
        pickupDate: new Date(returnProcess.currentData.dateAndTime),
        pickupMethod: returnProcess.currentData.deliveryOption,
        totalPackages: returnProcess.currentData.labelFileUploads.length,
        extraPackages:
          returnProcess.currentData.subscription === 'Bronze'
            ? returnProcess.currentData.labelFileUploads.length - 1
            : 0,
        pickupDetails: {
          name: returnProcess.currentData.contact_full_name,
          phoneNumber: returnProcess.currentData.contact_phone_number,
          address: returnProcess.currentData.street,
          unit: returnProcess.currentData.unit_number,
          city: returnProcess.currentData.city,
          province: returnProcess.currentData.province,
          country: returnProcess.currentData.country,
          postalCode: returnProcess.currentData.postal_code,
          instructions: returnProcess.currentData.instructions ?? '',
          isPrimary: false,
        },
      },
      subscription: {
        type: returnProcess.currentData.subscription as subscriptionPlans,
        expiryDate: addExpiryDate(
          new Date(),
          returnProcess.currentData.subscription
        ),
        price: priceData.find(
          (plan) =>
            plan.name.toLowerCase() ===
            returnProcess.currentData.subscription.toLowerCase()
        )!.price,
      },
    })
  }, [returnProcess.currentData, order.discount])

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
              <Separator className="mb-4 mt-4 hidden w-full bg-brand sm:flex" />
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
                <Button
                  onClick={() => returnProcess.back()}
                  className="w-2/3 bg-transparent text-primary hover:bg-transparent hover:opacity-100"
                >
                  <Reveal width="100%">
                    <div className="flex items-center justify-start">
                      <div className="text-normal sm:text-subtitle">+</div>
                      <div className="ml-0.5 mt-0.5 text-xl">
                        &nbsp;Add a package
                      </div>
                    </div>
                  </Reveal>
                </Button>
              </div>
            </div>
            <Reveal width="100%">
              <Separator className="mb-4 mt-4 hidden w-full bg-brand sm:flex" />
            </Reveal>
          </section>

          <div className="my-2 flex sm:my-10">
            <Reveal>
              <ReturnProcessBackButton />
            </Reveal>
          </div>
        </div>
      </section>

      <OrderSummary order={order} onOrder={setOrder} />

      {showScrollBtn && <ScrollContainer scrollDown={scrollDown} />}
    </div>
  )
}
