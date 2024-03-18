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
import NextArrow from '@components/SvgComponents/NextArrow'
import { motion } from 'framer-motion'
import { container, item } from '@styles/framer'
import { isPostalCodeValid } from '@lib/utils'
import SignUpModule from '@/popups/SignUpModal'
import { useState } from 'react'
import SigninButton from '@components/SigninButton';
import Router from 'next/router';

//postal code regex to verify canadian postal code format
const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/

const formSchema = z.object({
  postalCode: z
    .string()
    .min(6, { message: 'Postal Code should be 6 characters long' })
    .regex(postalCodeRegex, {
      message: 'Please make sure postal code entered properly',
    }),
})

function PostalCodeForm({
  onFailRedirect,
  handleLoggedInRedirect
}: {
  onFailRedirect: (invalidPostalCode: string) => void
  handleLoggedInRedirect: () => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postalCode: '',
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const postalIsValid = isPostalCodeValid(values.postalCode);
    if (postalIsValid) {
      // open SignUpModule
      const token = localStorage.getItem('token');

      if (token) {
        return handleLoggedInRedirect();
      }else{
        Router.push('/signup')
      }
      
    } else {
      // Redirect to /mailing
      onFailRedirect(values.postalCode.toUpperCase())
    }
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
              name="postalCode"
              render={({ field }) => (
                <FormItem className="mt-4 h-16 sm:mt-6 sm:h-20">
                  <FormControl>
                    <motion.div variants={item}>
                      <Input
                        className="h-10 w-[300px] rounded-xl border-4 border-primary text-lg placeholder:text-grey sm:h-14 sm:w-[300px]"
                        type="text"
                        placeholder="Enter Postal Code e.g. L4H9K0"
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
                className="mt-2 h-10 w-[150px] rounded-3xl text-lg sm:h-12 sm:w-[150px]"
              >
                Submit&nbsp;&nbsp;
                <NextArrow />
              </Button>
            </motion.div>
          </form>
          <motion.div variants={item}>
            <p className="my-8 flex flex-col items-center justify-center font-semibold text-grey">
              Already have an account?
              <SigninButton headerType="mobile" />
            </p>
          </motion.div>
          {isModalOpen && (
            <SignUpModule setIsOpen={toggleModal} isOpen={isModalOpen} />
          )}
        </div>
      </motion.div>
    </Form>
  )
}

export default PostalCodeForm
