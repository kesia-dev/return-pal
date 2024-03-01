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
import Link from 'next/link'
import NextArrow from '@components/SvgComponents/NextArrow'
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'
import ForgotPasswordModule from '@components/ForgotPasswordModal'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4200'

function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  //potentially change this later to leave modal open with a message
  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false)

  const toggleModal = () => {
    setIsForgotPassModalOpen(!isForgotPassModalOpen)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { email, password } = values

    axios
      .post(`${BASE_URL}/api/login`, { email, password })
      .then(
        (res) => {
          console.log('l', { res })
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('token', res.data.token)

          Router.push('/dashboard')
        }

        //TODO: save login session cookies and use jwt token
      )
      .catch(() => {
        toast.error('Invalid email or password.', {
          position: 'top-right',
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
  }

  return (
    <Form {...form}>
      <motion.div
        className="m-0 h-full w-full p-0"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex w-full flex-col items-center">
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-start"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4 h-16 sm:mt-6 sm:h-20">
                  <FormControl>
                    <motion.div variants={item}>
                      <Input
                        className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
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
                <FormItem className="mt-4 h-16 sm:mt-6 sm:h-20">
                  <FormControl>
                    <motion.div variants={item}>
                      <Input
                        className="h-10 w-[200px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[275px]"
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
            <motion.div variants={item}>
              <ForgotPasswordModule
                setIsOpen={toggleModal}
                isOpen={isForgotPassModalOpen}
              />
            </motion.div>
            <motion.div variants={item}>
              <Button
                type="submit"
                className="h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
              >
                Sign In&nbsp;&nbsp;
                <NextArrow />
              </Button>
            </motion.div>
          </form>
          <motion.div variants={item}>
            <p className="my-8 font-semibold text-grey underline">
              <Link href="/signup">Don't have an account yet?</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Form>
  )
}

export default SignInForm
