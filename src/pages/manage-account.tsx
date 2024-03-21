import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'; // Assuming these are correctly imported
import { Input } from '@components/ui/input';
import DashboardLayout from '@layouts/DashboardLayout';
import Router from 'next/router'
import Image from 'next/image'
import { Button } from '@components/ui/button'
import { Section } from '@components/common/section';
import { getUser, updateUser } from '@/services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
  _id: z.string()
})
export default function editUserProfile() {

  type FormType = z.infer<typeof formSchema>;
  const notifySuccess = () => toast.success("User Updated successfully");

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      _id: '',
      address: '',
      phoneNumber: ''
    }
  })

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    _id: '',
    address: '',
    phoneNumber: '',
    addressId:''
  });

  const [isEditGeneralInformation, setIsEditGeneralInfo] = useState(false);
  const [isEditAccountInformation, setIsEditAccountInfo] = useState(false);

  const handleSubmit = async () => {
    const id = localStorage.getItem('userId');
    const updated = await updateUser(id, user);
    console.log(updated, '  user updated successfuly');
    notifySuccess()

  }

  const userInfo = async () => {
    const id = localStorage.getItem('userId');
    if (!id) {
      await Router.push('/signin')
    }
    const data = await getUser(id);
    console.log(data, 'data');
    if (data) {
      setUser({firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password:data?.password,
      _id: data?._id,
      address: data.address?.address,
      phoneNumber: data.address?.phoneNumber,
      addressId: data.address?._id
    });
    }
    setTimeout(() => {
      console.log(user,'  here is user set');
      
      
    }, 5000);
  }
  useEffect(() => {
    userInfo();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!token) {
      const funCall = async () => {
        await Router.push("/signin")
      }
      funCall();
    }
  });

  const handleChange = (e: any, name: string) => {
    const val = (e.target && e.target.value) || "";
    setUser((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  }

  const handleGeneralInfo = () => {
    setIsEditGeneralInfo(!isEditGeneralInformation);
  }

  const handleAccountInfo = () => {
    setIsEditAccountInfo(!isEditAccountInformation);
  }

  return (

    <DashboardLayout isHeaderShow={true} isFooterShow={true} >

      <Section>

        <div className="max-w-mx-auto p-4 grid grid-cols-12" >
          <div className="recent-orders-container mt-14 flex flex-col items-start col-span-12">

            <div className='recent-order-header flex items-center space-x-4 mb-4'>
              <h2 className=" md-2 text-3xl font-bold">General Information</h2>
              <p>
                Set your basic profile Information here.
              </p>
            </div>
          </div>
          <Form {...form} border-2 >

            <form className='col-span-12 mb-4 flex flex-col  bg-white rounded shadow-lg w-full'>

              <div className="flex flex-1 w-full flex-col p-5 ">
                <div className="">
                  <Image
                    src={'/images/edit.png'}
                    alt="logo"
                    width="0"
                    height="0"
                    sizes="200px"
                    className="float-right w-5 cursor-pointer"
                    onClick={() => handleGeneralInfo()}
                  />
                </div>
                <div className="flex  mb-4 w-full flex-1 flex-row space-x-10 ">

                  <FormField control={form.control} name="firstName" render={({ field }) => {
                    return <FormItem>
                      <FormLabel className="text-black sm:text-lg">First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                          placeholder="first name"
                          size={30}
                          {...field}
                          name="firstName"
                          disabled={!isEditGeneralInformation}
                          value={user.firstName}
                          onChange={(e) => handleChange(e, e.target.name)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                  }} />


                  <FormField control={form.control} name="lastName" render={({ field }) => {
                    return <FormItem>
                      <FormLabel className="text-black sm:text-lg">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                          placeholder="last name"
                          size={30}
                          {...field}
                          name='lastName'
                          disabled={!isEditGeneralInformation}
                          value={user.lastName}
                          onChange={(e) => handleChange(e, e.target.name)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }} />

                </div>
                <div className="flex  flex-row  space-x-10 ">

                  <FormField control={form.control} name="address" render={({ field }) => {
                    return <FormItem>
                      <FormLabel className="text-black sm:text-lg">Default Address</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                          placeholder="default address"
                          size={60}
                          {...field}
                          name="address"
                          disabled={!isEditGeneralInformation}
                          value={user.address}
                          onChange={(e) => handleChange(e, e.target.name)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }} />


                  <FormField control={form.control} name="phoneNumber" render={({ field }) => {
                    return <FormItem>
                      <FormLabel className="text-black sm:text-lg">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                          placeholder="phone number"
                          size={30}
                          {...field}
                          name="phoneNumber"
                          disabled={!isEditGeneralInformation}
                          value={user.phoneNumber}
                          onChange={(e) => handleChange(e, e.target.name)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }} />

                </div>
              </div>

            </form>

          </Form>


          <div className="col-span-12 recent-orders-container mt-10 flex flex-col items-start">

            <div className='recent-order-header flex items-center space-x-4 mb-4'>
              <h2 className=" md-2 text-3xl font-bold">Account Information</h2>
              <p>
                Change your password or manage your email here.
              </p>
            </div>
          </div>
          <Form {...form}>

            <form className='col-span-12 flex flex-col  bg-white rounded shadow-lg w-full '>
              <div className="">
                <Image
                  src={'/images/edit.png'}
                  alt="logo"
                  width="0"
                  height="0"
                  sizes="200px"
                  className="w-5 float-right mt-5 mr-5 cursor-pointer"
                  onClick={() => handleAccountInfo()}
                />
              </div>
              <div className='flex space-x-10  w-full p-5 pt-0'>
                <FormField control={form.control} name="email" render={({ field }) => {
                  return <FormItem>
                    <FormLabel className="text-black sm:text-lg">email address</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                        placeholder="email address"
                        type='email'
                        size={30}
                        {...field}
                        name="email"
                        disabled={!isEditAccountInformation}
                        value={user.email}
                        onChange={(e) => handleChange(e, e.target.name)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} />

                <FormField control={form.control} name="password" render={({ field }) => {
                  return <FormItem>
                    <FormLabel className="text-black sm:text-lg">password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
                        placeholder="email address"
                        type='password'
                        size={30}
                        {...field}
                        disabled={!isEditAccountInformation}
                        name="password"
                        value={user.password}
                        onChange={(e) => handleChange(e, e.target.name)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }} />

              </div>

            </form>

          </Form>
          <div className='col-span-12'>
            <Button
              disabled={(!isEditAccountInformation && !isEditGeneralInformation)}
              variant={'default'}
              type={'submit'}
              onClick={() => handleSubmit()}
              className='text-md select-none space-x-2 float-right mt-5 mb-3'
            >
              <div className="flex items-center justify-center space-x-2">
                <p>Update</p>
              </div>
            </Button>
          </div>
        </div>

      </Section>
      <ToastContainer />

    </DashboardLayout>


  )
}
