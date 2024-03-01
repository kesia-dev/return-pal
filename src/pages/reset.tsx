import React from 'react'
import DefaultLayout from '@/layouts/DefaultLayout'
import Reveal from '@components/common/reveal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Button } from '@components/ui/button'
import { item } from '@styles/framer'
import { Input } from '@components/ui/input'
import NextArrow from '@components/SvgComponents/NextArrow'
import axios from 'axios'
import { useSearchParams } from 'next/navigation';
import Router from 'next/router'


// const BACKEND_URL = process.env.BACKEND_URL || "";


const formSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }
  )

function Reset() {
  const searchParams = useSearchParams()

  const passwordResetToken = searchParams.get("token")
  console.log("token", passwordResetToken)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { email, password } = values;
    axios.post(`http://localhost:4100/api/reset/${passwordResetToken}`, { email, password })
    // axios.post(`${BACKEND_URL}/reset`, { password })
    .then(() => Router.push("/signin"))
    .catch((err) => console.log(err));
  }

  return (
    <div className="mx-auto mt-8 flex w-11/12 justify-end sm:mx-0 sm:w-5/6 sm:justify-end md:w-3/4 lg:w-1/2">
      <section className="flex w-full flex-col space-y-8 sm:w-5/6">
        <Reveal>
          <h2 className="text-subtitle">
            <span className="mr-2 font-thin text-brand">RESET</span>
            <span className="bg-gradient-to-r from-gradientL to-primary bg-clip-text font-bold text-transparent">
              PASSWORD
            </span>
          </h2>
        </Reveal>

          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-start"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                    <FormControl>
                      <motion.div variants={item}>
                        <Input
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
                          type="email"
                          placeholder="Email"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                    <FormControl>
                      <motion.div variants={item}>
                        <Input
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
                          type="password"
                          placeholder="New Password"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                    <FormControl>
                      <motion.div variants={item}>
                        <Input
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
                          type="password"
                          placeholder="Confirm New Password"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <motion.div variants={item}>
                <Button
                  type="submit"
                  className="mt-4 h-10 w-[150px] scale-75 rounded-3xl text-lg sm:mt-6 sm:h-12 sm:w-[150px] sm:scale-100"
                >
                  Reset Password&nbsp;&nbsp;
                  <NextArrow />
                </Button>
              </motion.div>
            </form>
          </Form>
      </section>
    </div>
  )
}
Reset.getLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout isHeaderShow={true} isFooterShow={true}>
      {page}
    </DefaultLayout>
  )
}

export default Reset
