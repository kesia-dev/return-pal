import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  faChevronLeft,
  faChevronRight,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import Head from 'next/head'
import { ReturnProcessNextButton } from '@/components/ui/common'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// TODO: Change type to just accept a full date instead of having 2 props for day number and actual name date
type PickCardType = React.HTMLAttributes<HTMLDivElement> & {
  dayNum: number
  day: string
  selected?: boolean
}

// TODO: Selecting a card moves all the other cards down, make sure only the selected card grows and the other ones don't move

const PickDateCard = React.forwardRef<HTMLDivElement, PickCardType>(
  // eslint-disable-next-line react/prop-types
  ({ day, dayNum, className, ...props }, ref) => {
    return (
      <Card
        className={cn(
          'w-[9.5rem] select-none border-brand bg-paleBlue text-brand hover:cursor-pointer data-[state=on]:scale-110 data-[state=on]:border-8 data-[state=on]:border-primary data-[state=on]:bg-white data-[state=on]:shadow-2xl',
          className
        )}
        ref={ref}
        {...props}
      >
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
          <p className="text-2xl font-semibold">Oct</p>
          <p className="text-5xl font-bold">{dayNum}</p>
          <p className="text-2xl font-semibold">{day}</p>
        </CardContent>
      </Card>
    )
  }
)
PickDateCard.displayName = 'PickDateCard'

export default function PickDate() {
  const returnProcess = useReturnProcess()
  const [initialDate] = useState(new Date())
  const formSchema = z.object({
    pickupDate: z.string().min(2),
    // pickupDate: z.coerce.date({
    //   invalid_type_error: 'Must be a valid date',
    //   required_error: 'Date selection is required',
    // }),
    // .min(initialDate, {
    //   message: 'You cannot pick a date in the past',
    // }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupDate: '',
    },
  })
  const { isDirty, isValid } = form.formState
  console.log('form.formState.isValid): ', form.formState.isValid)
  console.log('form.formState.error: ', form.formState.errors)
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('Submitted:', values)
  }

  // console.log('FORM pickupDate: ', form.getValues('pickupDate'))
  // console.log('form.formState.isValid: ', form.formState.isValid)

  return (
    <>
      <Head>
        <title>TEST - Pick-date</title>
      </Head>

      <div className="container space-y-20 bg-paleBlue pt-16">
        <HomeSection className="items-start space-y-3">
          <SectionHeader className="flex w-full justify-between font-semibold">
            <div>
              Choose a pickup{' '}
              <SectionHeaderHighlight>date</SectionHeaderHighlight>
            </div>
            {/* TODO: This may need to change later depending on what we decide to
            do to exit the return process. Confirmation prompt? */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
            >
              <FontAwesomeIcon icon={faClose} width={'35'} height={'35'} />
              <p>Cancel</p>
            </Link>
          </SectionHeader>
          <SectionDescription>
            We&apos;ll text you the morning of your pickup with an estimated
            time arrival.
          </SectionDescription>
        </HomeSection>

        <div className="flex-row justify-center gap-x-4 space-y-11">
          {/* <div className="flex  items-center justify-center space-y-4 text-center font-semibold text-brand"> */}
          <div className="flex justify-center gap-x-11 xl:hidden">
            <div className="flex flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary">
              <FontAwesomeIcon
                size="2x"
                width={'50'}
                height={'60'}
                icon={faChevronLeft}
              />
              <p className="text-2xl">Last Week</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary">
              <FontAwesomeIcon
                size="2x"
                width={'50'}
                height={'60'}
                icon={faChevronRight}
              />
              <p className="text-2xl">Last Week</p>
            </div>
          </div>

          <div className="flex">
            {/* <div className="hidden w-fit flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary xl:flex">
              <FontAwesomeIcon
                size="2x"
                width={'30'}
                height={'45'}
                icon={faChevronLeft}
              />
              <p className="text-xl">Last Week</p>
            </div> */}
            <Form {...form}>
              <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Notify me about...</FormLabel>
                      <FormControl>
                        <ToggleGroup.Root
                          type="single"
                          className="grid w-full grid-cols-1 place-content-center place-items-center content-center items-center justify-center gap-x-7 gap-y-5 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
                          // onValueChange={(s) => {
                          //   // form.setValue('pickupDate', new Date(s))
                          //   form.setValue('pickupDate', s)
                          //   console.log('New value: ', s)
                          // }}
                          // value={form.getValues('pickupDate')}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <ToggleGroup.Item value="2023-10-22" asChild>
                            <PickDateCard dayNum={22} day="Fri" />
                          </ToggleGroup.Item>

                          <ToggleGroup.Item value="2023-10-23" asChild>
                            <PickDateCard dayNum={23} day="Sat" />
                          </ToggleGroup.Item>

                          <ToggleGroup.Item value="2023-10-24" asChild>
                            <PickDateCard dayNum={24} day="Sun" />
                          </ToggleGroup.Item>
                        </ToggleGroup.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 
                <div className="hidden w-fit flex-col items-center justify-center space-y-4 text-center font-semibold text-brand hover:cursor-pointer hover:text-primary xl:flex">
                  <FontAwesomeIcon
                    size="2x"
                    width={'30'}
                    height={'45'}
                    icon={faChevronRight}
                  />
                  <p className="text-xl">Last Week</p>
                </div> */}
                <div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex w-full flex-row-reverse">
          <Button
            variant={'default'}
            disabled={!isDirty || !isValid}
            onClick={() => returnProcess.forward()}
          >
            NEXT
          </Button>
          {/* <ReturnProcessNextButton
            disabled={!isDirty || !isValid}
            //onClick={() => returnProcess.forward()}
          >
            NEXT
          </ReturnProcessNextButton> */}
        </div>
      </div>
    </>
  )
}
