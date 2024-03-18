import React from 'react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@components/ui/textarea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Head from 'next/head'
import { type Address } from './types'
import { SectionDescription, SectionHeader } from '@/components/common/section'
import Reveal from '@components/common/reveal'
import {
  isPhoneNumberValid,
  isPostalCodeValid,
  isProvinceValid,
} from '@lib/utils'
import { createAddress, getAddresses } from '@/services/addressService'

const formSchema = z.object({
  deliveryAddress: z.string().min(1),
})

function NewAddressForm({
  addresses,
  setAddresses,
  setAddressFormVisiblity,
}: {
  addresses: Address[]
  setAddresses: React.Dispatch<Address[]>
  setAddressFormVisiblity: React.Dispatch<Boolean>
}) {
  const [addressFromForm, setAddressFromForm] = useState<Address>({
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    province: 'Ontario',
    country: 'Canada',
    postalCode: '',
    isPrimary: false,
  })
  const { toast } = useToast()
  const returnProcess = useReturnProcess()

  const isFormValid = () => {
    if (addressFromForm.name.length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your full name',
      })
      return false
    }

    if (addressFromForm.phoneNumber.length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your phone number',
      })
      return false
    }

    if (addressFromForm.address.length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your street address',
      })
      return false
    }

    if (addressFromForm.city.length === 0) {
      toast({
        variant: 'destructive',
        description: 'Please enter your city',
      })
      return false
    }
    if (!isPostalCodeValid(addressFromForm?.postalCode ?? '')) {
      toast({
        variant: 'destructive',
        description: 'Please ensure your postal code is correct',
      })
      return false
    }

    if (!isProvinceValid(addressFromForm?.province ?? '')) {
      toast({
        variant: 'destructive',
        description: 'Please ensure your province field is correct',
      })
      return false
    }

    if (!isPhoneNumberValid(addressFromForm.phoneNumber ?? '')) {
      toast({
        variant: 'destructive',
        description: 'Please ensure your phone number is correct',
      })
      return false
    }
    return true
  }

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (isFormValid()) {
      // Add a new address and update our current state
      const address = await createAddress(addressFromForm)

      const newUserInfo = {
        ...returnProcess.currentData.userInfo,
        addresses: [
          ...(returnProcess.currentData.userInfo?.addresses ?? []),
          address,
        ],
      }

      returnProcess.setCurrentData({ userInfo: newUserInfo })
      setAddresses([...addresses, address!])
      setAddressFormVisiblity(false)
    }
  }

  const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      name: e.target.value,
    })
  }

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      phoneNumber: e.target.value,
    })
  }

  const handleStreetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      address: e.target.value,
    })
  }

  const handleUnitNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      unit: e.target.value,
    })
  }

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      city: e.target.value,
    })
  }

  const handlePostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      postalCode: e.target.value.toUpperCase(),
    })
  }

  const handleInstructions = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddressFromForm({
      ...addressFromForm,
      instructions: e.target.value,
    })
  }

  const inputGroupStyles =
    'my-2 w-3/4 placeholder:text-slate-500 rounded-xl border-[3px] border-solid border-primary text-lg'

  return (
    <>
      <form className="lg:flex-column justify-around gap-5 space-y-8 lg:flex lg:space-y-0">
        <div className="flex-column flex">
          <div className="flex flex-row items-center">
            <div className="items-center space-y-8">
              <div id="contact-information-container">
                <Label className="text-lg font-bold">Contact Information</Label>
                <div className="flex gap-2">
                  <Reveal width="100%">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className={`${inputGroupStyles} w-full`}
                      onChange={handleFullName}
                    />
                  </Reveal>
                  <Reveal width="100%">
                    <Input
                      type="text"
                      name="phoneNumber"
                      className={`${inputGroupStyles} w-full`}
                      placeholder="Phone Number"
                      onChange={handlePhoneNumber}
                    />
                  </Reveal>
                </div>
              </div>
              <div className="flex flex-col" id="whole-container">
                <Label className="text-lg font-bold">Pickup Address</Label>
                <div className="grow" id="top-row-container">
                  <Reveal width="100%">
                    <div className="">
                      <Input
                        type="text"
                        name="address"
                        className={`${inputGroupStyles} w-full`}
                        placeholder="Street Address"
                        onChange={handleStreetAddress}
                      />
                    </div>
                  </Reveal>
                </div>
                <div className="flex gap-2" id="Bottom-row-container">
                  <div className="grow basis-5/12 lg:basis-3/5">
                    <Reveal width="100%">
                      <Input
                        type="text"
                        name="unit"
                        className={`${inputGroupStyles} placeholder: w-full `}
                        placeholder="Office, Apt. (optional)"
                        onChange={handleUnitNumber}
                      />
                    </Reveal>
                  </div>
                  <div className="basis-3/12 lg:basis-4/12">
                    <Reveal width="100%">
                      <Input
                        type="text"
                        name="city"
                        className={`${inputGroupStyles} w-full`}
                        placeholder="City"
                        onChange={handleCity}
                      />
                    </Reveal>
                  </div>
                  {/* <Reveal width="100%">
                            <div className="flex items-center pr-2">
                              <Label className="mx-2 w-1/3">
                                Province: (e.g. ON){' '}
                              </Label>
                              <Input
                                type="text"
                                name="address"
                                className={inputGroupStyles}
                                placeholder="Postal"
                                onChange={(e) =>
                                  setAddressFromForm({
                                    ...addressFromForm,
                                    province: e.target.value,
                                  } as Address)
                                }
                              />
                            </div>
                          </Reveal> */}
                  {/* <Reveal width="100%">
                            <div className="flex items-center">
                              <Label className="mx-2 w-1/3">Country: </Label>
                              <Input
                                type="text"
                                name="address"
                                className="my-2  w-3/4"
                                onChange={(e) =>
                                  setAddressFromForm({
                                    ...addressFromForm,
                                    country: e.target.value,
                                  } as Address)
                                }
                              />
                            </div>
                          </Reveal> */}
                  <div className="basis-4/12 lg:basis-3/12">
                    <Reveal width="100%">
                      <Input
                        type="text"
                        name="postalCode"
                        className={`${inputGroupStyles} w-full uppercase placeholder:normal-case`}
                        placeholder="Postal"
                        onChange={handlePostalCode}
                      />
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-around gap-12 lg:w-1/4">
          <Reveal width="100%">
            <div className="mb-4 inline-flex w-full flex-col items-stretch">
              <Label className="text-lg font-bold">
                Special Instructions{' '}
                <Label className="text-lg text-slate-500">(optional)</Label>
              </Label>
              <Textarea
                name="instructions"
                className={`my-2 min-h-[110px] resize-none rounded-xl border-[3px] border-solid border-primary text-lg placeholder:text-lg`}
                placeholder="i.e building access code, location of door, etc"
                onChange={handleInstructions}
              />
            </div>
          </Reveal>
          <Reveal width="100%">
            <div className="flex w-full justify-end">
              <Button
                className="text-md break-word order-2 hidden w-28 select-none space-x-2 px-2 text-white sm:px-4 lg:flex"
                type="submit"
                onClick={handleFormSubmit}
              >
                Next
                <FontAwesomeIcon className="ml-2 w-2" icon={faArrowRight} />
              </Button>
            </div>
          </Reveal>
        </div>
      </form>
      <span className="mt-5 flex justify-between">
        <Reveal>
          <ReturnProcessBackButton
            onClick={() => setAddressFormVisiblity(false)}
          />
        </Reveal>
        <Reveal>
          <Button
            className="text-md break-word order-2 flex w-28 select-none space-x-2 px-2 text-white sm:px-4 lg:hidden"
            type="submit"
            onClick={handleFormSubmit}
          >
            Next
            <FontAwesomeIcon className="ml-2 w-2" icon={faArrowRight} />
          </Button>
        </Reveal>
      </span>
    </>
  )
}

function AddressesList({
  addresses,
  form,
  setAddressFormVisiblity,
}: {
  addresses: Address[]
  form: any
  setAddressFormVisiblity: React.Dispatch<Boolean>
}) {
  const handleAddNewAddress = () => setAddressFormVisiblity(true)

  return (
    <div>
      <div>
        <Reveal>
          <div className="text-smallText font-bold text-brand max-sm:text-base sm:mt-0">
            Your Addresses:
          </div>
        </Reveal>
        <Reveal width="100%">
          <Separator className="h-[0.15rem] rounded-full bg-brand sm:w-3/4" />
        </Reveal>
        <FormField
          control={form?.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormControl className="space-y-0">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="mt-2 flex flex-col space-y-3"
                >
                  {addresses?.map((address) => {
                    const addressId = address._id?.toString()
                    const deliveryAddress = address.unit
                      ? `${address.unit}-${address.address}, ${address.city}, ${address.province}, ${address.country} ${address.postalCode}`
                      : `${address.address}, ${address.city}, ${address.province}, ${address.country} ${address.postalCode}`

                    return (
                      <Reveal key={addressId} width="100%">
                        <FormItem className="h-15 flex w-full items-center space-y-0.5 sm:h-10">
                          <RadioGroupItem id={addressId} value={addressId!} />
                          <Label
                            htmlFor={addressId}
                            className="sm:keep-all mx-6 ml-2 w-[20%] max-sm:text-xs sm:w-[18%] sm:font-bold md:pl-2 lg:mx-2 lg:w-[15%]"
                          >
                            {address.name}
                          </Label>
                          <Label
                            htmlFor={addressId}
                            className="break-word mx-2 my-4 w-[40%] max-w-max max-sm:text-xs sm:w-[50%] md:mx-0"
                          >
                            {deliveryAddress}
                          </Label>
                          <Label
                            htmlFor={addressId}
                            className="sm:keep-all mx-6 ml-2 w-[20%] max-sm:text-xs sm:w-[18%] sm:font-bold md:pl-2 lg:mx-2 lg:w-[15%]"
                          >
                            {address.instructions && address.instructions}
                          </Label>
                          <Label
                            htmlFor={addressId}
                            className="mx-2 font-bold text-primary max-sm:text-xs"
                          >
                            {address.isPrimary && 'Default address'}
                          </Label>
                        </FormItem>
                      </Reveal>
                    )
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Reveal>
          <Button
            className="mt-4 bg-transparent font-bold text-primary hover:bg-transparent"
            onClick={handleAddNewAddress}
          >
            + Add a new address{' '}
          </Button>
        </Reveal>
        <span className="mt-5 flex justify-between">
          <Reveal>
            <ReturnProcessBackButton />
          </Reveal>
          <Reveal>
            <ReturnProcessNextButton />
          </Reveal>
        </span>
      </div>
    </div>
  )
}

export default function Address() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [addressFormVisibility, setAddressFormVisiblity] =
    useState<Boolean>(false)
  const returnProcess = useReturnProcess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryAddress: returnProcess.currentData.address_id?.toString(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedAddress = addresses.find(
      (address) => address._id?.toString() === values.deliveryAddress
    )

    returnProcess.setCurrentData({
      contact_full_name: selectedAddress?.name,
      contact_phone_number: selectedAddress?.phoneNumber,
      street: selectedAddress?.address,
      unit_number: selectedAddress?.unit,
      city: selectedAddress?.city,
      province: selectedAddress?.province,
      country: selectedAddress?.country,
      postal_code: selectedAddress?.postalCode,
      address_id: selectedAddress?._id,
      instructions: selectedAddress?.instructions,
    })
    returnProcess.forward()
  }

  useEffect(() => {
    // Get the users current addresses
    const getUserAddresses = async () => {
      const addresses = await getAddresses()
      setAddresses(addresses ?? [])
    }
    getUserAddresses()
  }, [])

  return (
    <>
      <Head>
        <title>Return Process - Pick Address</title>
      </Head>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ReturnProcessRoot>
            <ReturnProcessSection>
              <Reveal>
                <SectionHeader className="max-xxs:text-3xl">
                  Pickup Details
                </SectionHeader>
              </Reveal>
              <Reveal>
                <SectionDescription className="text-slate-500 max-xxs:text-left max-xxs:text-sm">
                  {addressFormVisibility
                    ? 'Enter your contact info and your pickup address'
                    : 'Select or add your pickup address'}
                </SectionDescription>
              </Reveal>
            </ReturnProcessSection>
            {addressFormVisibility ? (
              <NewAddressForm
                addresses={addresses}
                setAddresses={setAddresses}
                setAddressFormVisiblity={setAddressFormVisiblity}
              />
            ) : (
              <AddressesList
                addresses={addresses}
                form={form}
                setAddressFormVisiblity={setAddressFormVisiblity}
              />
            )}
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
