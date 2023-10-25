import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
import { Card, CardContent } from '@/components/ui/card'
import { cn, getDayName } from '@/lib/utils'
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
  FormMessage,
} from '@/components/ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import Head from 'next/head'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDateSelection } from '@/hooks/useDateSelection'

type PickCardType = React.HTMLAttributes<HTMLDivElement> & {
  date: Date
}
// TODO: Selecting a card moves all the other cards down, make sure only the selected card grows and the other ones don't move

const PickDateCard = React.forwardRef<HTMLDivElement, PickCardType>(
  // eslint-disable-next-line react/prop-types
  ({ date, className, ...props }, ref) => {
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
          <p className="text-2xl font-semibold">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
            {getDayName(date.getDay())?.substring(0, 3)}
          </p>
          <p className="text-5xl font-bold">{date.getDate()}</p>
          <p className="flex text-lg font-semibold">
            {date.toLocaleString('en-us', { month: 'short', year: 'numeric' })}
          </p>
        </CardContent>
      </Card>
    )
  }
)
PickDateCard.displayName = 'PickDateCard'

export default function PickDate() {
  const returnProcess = useReturnProcess()
  const dateSelection = useDateSelection(new Date())
  const formSchema = z.object({
    pickupDate: z.coerce
      .string()
      .refine((data) => new Date(data) > dateSelection.initialDate, {
        message: 'Start date must be in the future',
      }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupDate: returnProcess.currentData.pickupDate,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values)
    returnProcess.setCurrentData(values)
    returnProcess.forward()
  }

  return (
    <>
      <Head>
        <title>Return Process - Pick Date</title>
      </Head>

      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
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

                <FormField
                  control={form.control}
                  name="pickupDate"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <ToggleGroup.Root
                          type="single"
                          className="grid w-full grid-cols-1 place-content-center place-items-center content-center items-center justify-center gap-x-7 gap-y-5 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {dateSelection.getCurrentDays.map((date) => {
                            const dateString = `${date.getFullYear()}/${
                              date.getMonth() + 1
                            }/${date.getDate()}`
                            console.log('dateString: ', dateString)
                            return (
                              <ToggleGroup.Item
                                key={dateString}
                                value={dateString}
                                asChild
                              >
                                <PickDateCard date={date} />
                              </ToggleGroup.Item>
                            )
                          })}
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
              </div>
            </div>

            <div className="flex w-full flex-row-reverse">
              <div>
                <Button type="submit">Submit</Button>
              </div>
              {/* <Button
                variant={'default'}
                disabled={!form.formState.isDirty || !form.formState.isValid}
                onClick={() => returnProcess.forward()}
              >
                NEXT
              </Button> */}
              {/* <ReturnProcessNextButton
            disabled={!isDirty || !isValid}
            //onClick={() => returnProcess.forward()}
          >
            NEXT
          </ReturnProcessNextButton> */}
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
