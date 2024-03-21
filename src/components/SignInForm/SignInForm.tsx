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
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Router from 'next/router'
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function SignInForm() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      const funCall = async () => {
        await Router.push("/dashboard")
      }
      funCall();
    }
  }, [])



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
    const { email, password } = values
    axios
      .post(`${NEXT_PUBLIC_BASE_URL}/api/login`, { email, password })
      .then(
        async (res: any) => {
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('token', res.data.token)

          await Router.push('/dashboard')
        }
      )
      .catch((err) => {
        const message = err.response.data.error;
        toast.error(message, {
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
            <div>
              {/* onClick={() => signIn('google')}  */}
              <Link href="http://localhost:4200/api/auth/google">
                <div className='flex gap-2.5 w-72 bg-white border-white shadow-lg rounded-md p-2.5 items-center cursor-pointer'>
                  <Image
                    src={'/images/Google.png'}
                    alt="logo"
                    width="0"
                    height="0"
                    sizes="200px"
                    className="w-5 h-5 "
                  />
                  <label className='text-sm cursor-pointer'>Continue with Google</label>
                </div>
              </Link>
              <div onClick={() => toast("Comming soon")} className='mt-4 flex gap-2.5 w-72 bg-white border-white shadow-lg rounded-md p-2.5 items-center cursor-pointer'>
                <Image
                  src={'/images/Facebook.png'}
                  alt="logo"
                  width="0"
                  height="0"
                  sizes="200px"
                  className="w-5 h-5 "
                />
                <label className='text-sm cursor-pointer'>Continue with Facebook</label>
              </div>
            </div>

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
