import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/ui/button'
import { toast } from 'react-toastify'
import { item } from '@styles/framer'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import NextArrow from '@components/SvgComponents/NextArrow'
import axios from 'axios'
import Router from 'next/router'

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, {
        message: 'First name is required',
      })
      .max(60, {
        message: 'Max 60 characters',
      }),
    lastName: z
      .string()
      .min(1, {
        message: 'Last name is required',
      })
      .max(60, {
        message: 'Max 60 characters',
      }),
    email: z.string().email({ message: 'Please enter a valid email' }),
    phoneNumber: z
      .string()
      .max(10, { message: 'Please enter a valid phone number' })
      .min(1, { message: 'Please enter a valid phone number' }),
    address: z.string().min(1, { message: 'Address is required' }),
    suiteNo: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    password: z.string().min(8, { message: 'Must be at least 8 characters' }),
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

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4200'

function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      suiteNo: '',
      city: '',
      postalCode: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)

    axios
      .post(`${BASE_URL}/api/register`, values)
      .then(() => {
        toast.success('Verification email sent!', {
          position: 'top-right',
          hideProgressBar: true,
          autoClose: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        Router.push('/signin')
      })
      .catch((err) => console.log(err))
    // Show success toast
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
              <FormControl>
                <motion.div variants={item}>
                  <Input
                    minLength={1}
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    placeholder="First Name"
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
          name="lastName"
          render={({ field }) => (
            <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
              <FormControl>
                <motion.div variants={item}>
                  <Input
                    minLength={1}
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    placeholder="Last Name"
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
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
              <FormControl>
                <motion.div variants={item}>
                  <Input
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
              <FormControl>
                <motion.div variants={item}>
                  <Input
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    type="phoneNumber"
                    placeholder="Phone Number"
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
          name="address"
          render={({ field }) => (
            <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
              <FormControl>
                <motion.div variants={item}>
                  <Input
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    type="address"
                    placeholder="Primary Street Address"
                    {...field}
                  />
                </motion.div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row">
          <FormField
            control={form.control}
            name="suiteNo"
            render={({ field }) => (
              <FormItem className="mr-3 mt-4 h-14 w-2/3 sm:mt-6 sm:h-14">
                <FormControl>
                  <motion.div variants={item}>
                    <Input
                      // className="h-10 w-1/2 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      type="suiteNo"
                      placeholder="Office, Apt. (optional)"
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
            name="city"
            render={({ field }) => (
              <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                <FormControl>
                  <motion.div variants={item}>
                    <Input
                      className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      type="city"
                      placeholder="City"
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
            name="postalCode"
            render={({ field }) => (
              <FormItem className="ml-3 mt-4 h-14 sm:mt-6 sm:h-14">
                <FormControl>
                  <motion.div variants={item}>
                    <Input
                      className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                      type="postalCode"
                      placeholder="Postal Code"
                      {...field}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
              <FormControl>
                <motion.div variants={item}>
                  <Input
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    type="password"
                    placeholder="Password"
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
                    className="h-10 rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                    type="password"
                    placeholder="Confirm Password"
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
            className="mx-auto mb-4 mt-4 flex h-10 w-[150px] scale-75 rounded-3xl text-lg sm:mt-6 sm:h-12 sm:w-[150px] sm:scale-100"
          >
            Sign Up&nbsp;&nbsp;
            <NextArrow />
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}

export default SignUpForm
