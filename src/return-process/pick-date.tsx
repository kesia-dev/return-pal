import { faClose } from '@fortawesome/free-solid-svg-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import Head from 'next/head'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDateSelection } from '@/hooks/useDateSelection'
import {
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import {
  LastWeekButton,
  NextWeekButton,
  PickDateCard,
} from '@components/common/pick-date'
import Calendar from '@components/calander'
import {
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/common/section'
import Reveal from '@components/common/reveal'
import { motion } from 'framer-motion'
import { fadeIn } from '@styles/framer'
import { useState, useEffect } from 'react'
import type { UserInfo } from '@components/DashBoard/types'
import { Button } from '@components/ui/button'
import NextArrow from '@components/SvgComponents/NextArrow'

export default function PickDate() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const returnProcess = useReturnProcess()
  const dateSelection = useDateSelection(new Date())

  const [user, setUser] = useState<UserInfo>()
  const [selectedDate, setDateSelected] = useState(new Date())
  const [isDateSelected, setIsDateSelected] = useState(false)

  const handleDateSelected = (date: Date) => {
    setDateSelected(date)
    setIsDateSelected(true)
  }

  const formSchema = z.object({
    dateAndTime: z.coerce
      .string()
      .refine((data) => new Date(data) > dateSelection.initialDate, {
        message: 'Start date must be in the future',
      }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateAndTime: returnProcess.currentData.dateAndTime,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    returnProcess.setCurrentData({
      userInfo: user,
      dateAndTime: selectedDate.toString(),
    })
    returnProcess.forward()
  }


  useEffect(() => {

    const userId = localStorage.getItem('userId')
    void retrieveUserInfo(userId)
  }, [])

  const retrieveUserInfo = async (userId): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/api/users/?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const userInfo = (await response.json()) as UserInfo
        setUser(userInfo)
      } else {
        console.error('Error retrieving user info:', response.statusText)
      }
    } catch (error) {
      console.error('Error retrieving user info:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Return Process - Pick Date</title>
      </Head>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ReturnProcessRoot>
            <SectionHeader className="w-full justify-between">
              <div className="flex min-h-[59px] min-w-[50px] items-center justify-end">
                <Reveal>
                  <Link
                    href="/"
                    className="flex flex-col items-center justify-center text-base text-primary hover:cursor-pointer hover:text-brand"
                  >
                    <FontAwesomeIcon
                      icon={faClose}
                      width={'35'}
                      height={'35'}
                    />
                    <p>Cancel</p>
                  </Link>
                </Reveal>
              </div>
            </SectionHeader>

            <div className='grid grid-cols-8 !mt-0'>
              <div className="lg:col-span-3 md:col-span-3 col-span-8 ">
                <label className='font-semibold text-5xl'>What day do you need a pickup?</label><br />
                <p className='text-2xl font-medium mt-8'>We’ll text you the morning of your pickup with an estimated arrival time.</p>
              </div>
              <div className="lg:col-span-5 md:col-span-5 col-span-8 ">
                <label className='text-3xl font-semibold mt-8'>Select pickup date</label>
                <Calendar onDateSelect={handleDateSelected} />
              </div>
            </div>
            <div className="pt-5 pb-5 mt-0 pb-5 flex justify-end">
              <Reveal>
                <Button
                  disabled={!isDateSelected}
                  variant={'default'}
                  type={'submit'}
                  onClick={() => onSubmit({ dateAndTime: selectedDate.toString() })}
                  className={cn('text-md w-28 select-none space-x-2')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <p>Next</p>
                    <NextArrow />
                  </div>
                </Button>
              </Reveal>
            </div>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
