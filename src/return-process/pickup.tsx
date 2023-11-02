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

const formSchema = z.object({
  pickupType: z.union([z.literal('direct'), z.literal('doorstep')]),
})

export default function Pickup() {
  const returnProcess = useReturnProcess()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupType: returnProcess.currentData.pickupType,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitted:', values)
    returnProcess.setCurrentData(values)
    returnProcess.forward()
  }

  const cardClassnames =
    'data-[state=on]:border-6 flex h-96 w-1/2 select-none flex-col items-center border-brand bg-white text-brand data-[state=on]:scale-110 data-[state=on]:border-primary data-[state=off]:bg-slate-300 data-[state=off]:opacity-50 data-[state=on]:shadow-2xl sm:w-96 sm:data-[state=on]:border-8'

  const cardTitleClassnames =
    'flex flex-col text-xl sm:text-2xl  text-center font-semibold sm:font-bold sm:h-36'

  const cardDescriptionClassNames =
    'flex w-4/5 items-center text-xs xxs:text-sm text-brand xs:w-full xs:text-base sm:font-semibold'

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
              <SectionHeader>Pickup Details</SectionHeader>
              <SectionDescription className="text-start sm:text-center">
                Which pickup method do you prefer?
              </SectionDescription>
            </ReturnProcessSection>

            <FormField
              control={form.control}
              name="pickupType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <ExtendedToggleGroup
                      type="single"
                      selectionType="keep-selected"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex justify-center gap-x-5 sm:w-full sm:gap-x-10"
                    >
                      <ExtendedToggleGroupItem value="direct" asChild>
                        <Card className={cardClassnames}>
                          <CardHeader className="flex items-center pl-5">
                            <CardTitle className={cardTitleClassnames}>
                              <div className="flex items-end justify-center align-bottom">
                                <HandingPackage className="h-16 w-16 fill-primary xs:h-24 xs:w-24" />
                              </div>
                              Direct Handoff
                            </CardTitle>

                            <CardDescription
                              className={cardDescriptionClassNames}
                            >
                              Hand the package directly to our specialist at
                              your door
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </ExtendedToggleGroupItem>
                      <ExtendedToggleGroupItem value="doorstep" asChild>
                        <Card className={cardClassnames}>
                          <CardHeader className="flex items-center pl-5">
                            <CardTitle className={cardTitleClassnames}>
                              <div className="flex items-end justify-center align-bottom">
                                <Door className="h-16 w-16 xs:h-24 xs:w-24" />
                                <Box className="h-7 w-7 xs:h-10 xs:w-10" />
                              </div>
                              Leave on Doorstep
                            </CardTitle>
                            <CardDescription
                              className={cardDescriptionClassNames}
                            >
                              Place items outside your door ahead of your pick
                              up window
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </ExtendedToggleGroupItem>
                    </ExtendedToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="mt-5 flex justify-between">
              <ReturnProcessBackButton />

              <ReturnProcessNextButton />
            </span>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
