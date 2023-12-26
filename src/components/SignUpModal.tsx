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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import useAuth from '@/services/authentication/useAuth'
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const postalCodeRegex = new RegExp(/^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/)

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
    phone: z.string().regex(phoneRegex, 'Please enter a valid number'),
    street: z.string().min(1, 'Please enter a valid address'),
    unit_number: z.string().max(60, 'Max 60 characters').optional(),
    city: z.string().min(3).max(60),
    postalCode: z
      .string()
      .regex(postalCodeRegex, 'Please enter a valid postal code'),
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

function SignUpModule() {
  const { writeUserInfoToFragment } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // writeUserInfoToFragment(values.email, values.firstName, values.lastName)

    const userData = {
      first_name: values.firstName,
      last_name: values.lastName,
      subscription: null,
      email: values.email,
      phone_number: values.phone,
      password: values.password,
      addresses: [
        {
          contact_full_name: `${values.firstName} ${values.lastName}`,
          contact_phone_number: values.phone,
          street: values.street,
          unit_number: values.unit_number || null,
          city: values.city,
          province: 'British Columbia',
          country: 'Canada',
          postal_code: values.postalCode,
          instructions: null,
          primary: true,
        },
      ],
    }

    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('User registered')
        } else {
          console.error('Failed to register user:', response.statusText)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link href="/" className="font-semibold text-primary">
          <span>&nbsp;Sign Up</span>
        </Link>
      </DialogTrigger>
      <DialogContent className="m-0 h-3/4 min-h-[95%] w-full p-0">
        <motion.div
          className="m-0 flex flex-col flex-nowrap items-center justify-start gap-0 bg-paleBlue p-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="mb-4 mt-6 h-auto w-[50%] sm:mb-2"
          >
            <Image
              src="/images/returnpal-short-logo.png"
              alt="Return Pal logo"
              width={333}
              height={134}
            />
          </motion.div>
          <motion.div variants={item}>
            <h1 className="mt-2 w-[200px] text-base tracking-wide text-grey sm:w-[275px] sm:text-lg">
              Sign Up{' '}
              <span className="hidden sm:inline-block">and let&apos;s</span>
              <span className="inline-block sm:hidden">to</span> get started...
            </h1>
          </motion.div>

          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-start"
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
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
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
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                    <FormControl>
                      <motion.div variants={item}>
                        <Input
                          minLength={1}
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
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
                name="street"
                render={({ field }) => (
                  <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                    <FormControl>
                      <motion.div variants={item}>
                        <Input
                          minLength={1}
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
                          placeholder="Primary Street Address"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row space-x-4">
                <FormField
                  control={form.control}
                  name="unit_number"
                  render={({ field }) => (
                    <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                      <FormControl>
                        <motion.div variants={item}>
                          <Input
                            className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
                            placeholder="Office, Apt."
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
                            minLength={3}
                            className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
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
                    <FormItem className="mt-4 h-14 sm:mt-6 sm:h-14">
                      <FormControl>
                        <motion.div variants={item}>
                          <Input
                            minLength={6}
                            className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
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
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
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
                          className="h-10 w-[200px] rounded-xl border-4 border-primary text-sm placeholder:text-grey sm:h-12 sm:w-[275px] sm:text-lg"
                          type="password"
                          placeholder="Confirm password"
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
                  Sign Up&nbsp;&nbsp;
                  <NextArrow />
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
export default SignUpModule
