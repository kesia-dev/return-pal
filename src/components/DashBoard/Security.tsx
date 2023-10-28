import React from 'react'
import DashBoardHeader from '@/components/DashBoard/DashBoardHeader'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

const securityFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
})

function Security() {
  const form = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof securityFormSchema>) {
    console.log(values)
  }

  return (
    <>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      <div className="flex flex-col items-center justify-center text-brand">
        <h1 className="text-title font-bold">Security</h1>
        <div className="flex flex-col items-center justify-center">
          <label className="block">Reset Password:</label>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Email to Reset Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Security
