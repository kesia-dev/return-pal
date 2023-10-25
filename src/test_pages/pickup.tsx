import React from 'react'
import Head from 'next/head'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
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
  HomeSection,
  SectionDescription,
  SectionHeader,
} from '@/components/home/Home'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    // returnProcess.forward()
  }

  return (
    <>
      <Head>
        <title>Return Process - Pickup Method</title>
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
                Pickup Details
              </SectionHeader>
              <SectionDescription>
                Which pickup method do you prefer?
              </SectionDescription>
            </HomeSection>

            <FormField
              control={form.control}
              name="pickupType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <ExtendedToggleGroup
                      type="single"
                      selectionType="unselect"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex w-full justify-center gap-x-5"
                    >
                      <ExtendedToggleGroupItem value="direct" asChild>
                        <Card className="flex h-96 w-72 flex-col items-center bg-white text-brand data-[state=off]:bg-slate-300 data-[state=off]:opacity-75">
                          <CardHeader className="flex items-center">
                            <CardTitle className="text-2xl font-bold">
                              Direct Handoff
                            </CardTitle>
                            <CardDescription className="flex items-center">
                              Hand the package directly to our specialist at
                              your door
                            </CardDescription>
                          </CardHeader>
                          <CardContent>Card Content</CardContent>
                        </Card>
                      </ExtendedToggleGroupItem>
                      <ExtendedToggleGroupItem value="doorstep" asChild>
                        <Card className="flex h-96 w-72 flex-col items-center bg-white text-brand data-[state=off]:bg-slate-300 data-[state=off]:opacity-75">
                          <CardHeader className="flex items-center">
                            <CardTitle className="text-2xl font-bold">
                              Leave on Doorstep
                            </CardTitle>
                            <CardDescription className="flex items-center">
                              Place items outside your door ahead of your pick
                              up window
                            </CardDescription>
                          </CardHeader>
                          <CardContent>Card Content</CardContent>
                        </Card>
                      </ExtendedToggleGroupItem>
                    </ExtendedToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="mt-5 flex justify-between">
              <Button type="submit">Submit</Button>
              {/* <ReturnProcessBackButton onClick={() => returnProcess.back()} />

              <ReturnProcessNextButton
                onClick={() => returnProcess.forward()}
              /> */}
            </span>
          </div>
        </form>
      </Form>
    </>
  )
}
