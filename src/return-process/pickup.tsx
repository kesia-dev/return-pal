import React from 'react'
import Head from 'next/head'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  ExtendedToggleGroup,
  ExtendedToggleGroupItem,
} from '@/components/ui/extended-toggle-group'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Door from '@/components/SvgComponents/Door'
import Box from '@/components/SvgComponents/Box'
import HandingPackage from '@/components/SvgComponents/HandingPackage'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import { SectionDescription, SectionHeader } from '@/components/common/section'
import Reveal from '@components/common/reveal'

const formSchema = z.object({
  deliveryOption: z.union([
    z.literal('Direct Handoff'),
    z.literal('Leave on Doorstep'),
  ]),
})

export default function Pickup() {
  const returnProcess = useReturnProcess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryOption: returnProcess.currentData.deliveryOption,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    returnProcess.setCurrentData(values)
    returnProcess.forward()
  }

  const cardClassnames =
    'data-[state=on]:border-6 sm:data-[state=on]:scale-120 flex sm:h-96 md:w-2/6  select-none flex-col items-center space-y-2 border-brand bg-white text-brand data-[state=on]:scale-110 data-[state=on]:border-primary data-[state=off]:bg-slate-300 data-[state=off]:opacity-50 data-[state=on]:shadow-2xl xs:data-[state=on]:border-8'

  const cardTitleClassnames =
    'flex-col text-base xxs:text-sm md:text-2xl text-start sm:text-center font-semibold md:font-bold sm:h-36'

  const cardDescriptionClassNames =
    'flex w-4/5 items-start sm:text-center text-xs xxs:text-sm text-brand xs:w-full xs:text-base'

  return (
    <>
      <Head>
        <title>Return Process - Pickup Method</title>
      </Head>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ReturnProcessRoot>
            <ReturnProcessSection>
              <Reveal>
                <ReturnProcessBackButton className="p-0 sm:hidden" />
              </Reveal>
              <Reveal>
                <SectionHeader>Pickup Details</SectionHeader>
              </Reveal>
              <Reveal>
                <SectionDescription className="text-start sm:text-center">
                  Which pickup method do you prefer?
                </SectionDescription>
              </Reveal>
            </ReturnProcessSection>

            <FormField
              control={form.control}
              name="deliveryOption"
              render={({ field }) => (
                <FormItem className="flex justify-center space-y-3">
                  <FormControl>
                    <ExtendedToggleGroup
                      type="single"
                      selectionType="keep-selected"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex max-w-screen-lg flex-col justify-center gap-x-5 gap-y-4 sm:flex-row sm:gap-x-10 sm:gap-y-0 md:gap-x-20"
                    >
                      <ExtendedToggleGroupItem value="Direct Handoff" asChild>
                        <Card className={cardClassnames}>
                          <CardHeader className="flex flex-row items-center space-y-0 pl-5 pr-0 sm:flex-col sm:space-y-2 sm:pr-5">
                            {/* Big Screen Card Title */}
                            <Reveal>
                              <CardTitle
                                className={`${cardTitleClassnames} hidden sm:flex`}
                              >
                                <div className="flex items-end justify-center align-bottom">
                                  <HandingPackage className="h-12 w-12 fill-primary xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                                </div>
                                Direct Handoff
                              </CardTitle>
                            </Reveal>
                            {/* Small Screen Card Title */}
                            <div className="mr-4 flex items-center justify-center align-bottom sm:hidden">
                              <Reveal>
                                <HandingPackage className="fill-primary xxs:h-12 xxs:w-12 xs:h-24 xs:w-24" />
                              </Reveal>
                            </div>
                            <Reveal>
                              <div className="flex flex-col gap-2 sm:block">
                                <CardTitle
                                  className={`${cardTitleClassnames} flex sm:hidden`}
                                >
                                  Direct Handoff
                                </CardTitle>
                                <CardDescription
                                  className={cardDescriptionClassNames}
                                >
                                  Hand the package directly to our specialist at
                                  your door
                                </CardDescription>
                              </div>
                            </Reveal>
                          </CardHeader>
                        </Card>
                      </ExtendedToggleGroupItem>

                      <ExtendedToggleGroupItem
                        value="Leave on Doorstep"
                        asChild
                      >
                        <Card className={cardClassnames}>
                          <CardHeader className="flex flex-row items-center space-y-0 pl-2 pr-0 sm:flex-col sm:space-y-2 sm:pr-5">
                            {/* Big Screen Card Title */}
                            <Reveal>
                              <CardTitle
                                className={`${cardTitleClassnames} hidden sm:flex`}
                              >
                                <div className="flex items-end justify-center align-bottom">
                                  <Door className="xxs:h-16 xxs:w-16 xs:h-24 xs:w-24" />
                                  <Box className="mb-3 xxs:h-12 xxs:w-12 xs:h-10 xs:w-10" />
                                </div>
                                Leave on Doorstep
                              </CardTitle>
                            </Reveal>
                            {/* Small Screen Card Title */}
                            <div className="mr-4 flex items-end justify-center align-bottom sm:hidden">
                              <Door className="h-12 w-12 xxs:h-12 xxs:w-12 xs:h-24 xs:w-24" />
                              <Box className="mb-1.5 h-5 w-5 xxs:h-4 xxs:w-5 xs:h-10 xs:w-10" />
                            </div>
                            <Reveal>
                              <div className="flex flex-col gap-2 sm:block">
                                <CardTitle
                                  className={`${cardTitleClassnames} flex sm:hidden`}
                                >
                                  Leave on Doorstep
                                </CardTitle>
                                <CardDescription
                                  className={cardDescriptionClassNames}
                                >
                                  Place items outside your door ahead of your
                                  pick up window
                                </CardDescription>
                              </div>
                            </Reveal>
                          </CardHeader>
                        </Card>
                      </ExtendedToggleGroupItem>
                    </ExtendedToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Big Screen Buttons, Back moved to top */}
            <span className="mt-5 hidden justify-between sm:flex">
              <Reveal>
                <ReturnProcessBackButton />
              </Reveal>
              <Reveal>
                <ReturnProcessNextButton />
              </Reveal>
            </span>
            <span className="flex w-full sm:hidden">
              <Reveal width="100%">
                <ReturnProcessNextButton className="w-full" />
              </Reveal>
            </span>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
