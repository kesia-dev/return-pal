import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form,FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'; // Assuming these are correctly imported
import { Input } from '@components/ui/input';
import { dummyData } from './api/manage-account/dummy-data';
import DashboardLayout from '@layouts/DashboardLayout';
import Reveal from '@components/common/reveal';
import { Section } from '@components/common/section';
const formSchema  = z.object({
  first_name: z.string(),
  last_name: z.string(),
    defaultAddress: z.string(),
  phoneNumber: z.string(),
  emailAddress: z.string().email(),
  password: z.string().min(3)
 })
export default function editUserProfile(){
  type FormType = z.infer<typeof formSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: dummyData
  })

const handleSubmit = () => {

}


  return (
    
    <DashboardLayout isHeaderShow={true} isFooterShow={true} >  
    
      <Section>
    
    <div className="max-w-mx-auto p-4  " >
      <div className="recent-orders-container mt-14 flex flex-col items-start">
   
     <div className='recent-order-header flex items-center space-x-4 mb-4'> 
      <h2 className=" md-2 text-3xl font-bold">General Information</h2>
      <p>
        Set your basic profile Information here.
      </p>
    </div>
    </div> 
    <Reveal>
    <Form {...form} border-2 >
      
   
          
<form onSubmit={form.handleSubmit(handleSubmit)} className='mb-4 flex flex-col  bg-white rounded shadow-lg w-[1300px] h-[300px]   p-10'>

                  
<div className="flex flex-1 w-full flex-col p-5 ">
                     
                     
                     <div className="flex  mb-4 w-full flex-1 flex-row space-x-10 ">   
                    
<FormField control={form.control} name="first_name" render={({field}) => {
  return <FormItem>
<FormLabel className="text-black sm:text-lg">First Name</FormLabel>
<FormControl>
  <Input 
  className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
  placeholder="first name"
  size={30}
  {...field}
 />
</FormControl>
    <FormMessage/>
    </FormItem>
   
}}/>
 

<FormField control={form.control} name="last_name" render={({field}) => {
  return <FormItem>
<FormLabel className="text-black sm:text-lg">Last Name</FormLabel>
<FormControl>
  <Input 
   className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
   placeholder="last name"
   size={30}
   {...field}
  />
</FormControl>
    <FormMessage/>
    </FormItem>
}}/>

</div>
<div className="flex  flex-row  space-x-10 ">  

<FormField control={form.control} name="defaultAddress" render={({field}) => {
  return <FormItem>
<FormLabel className="text-black sm:text-lg">Default Address</FormLabel>
<FormControl>
  <Input 
   className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
   placeholder="default address"
   size={60}
   {...field}
  
  />
</FormControl>
    <FormMessage/>
    </FormItem>
}}/>


<FormField control={form.control} name="phoneNumber" render={({field}) => {
  return <FormItem>
<FormLabel className="text-black sm:text-lg">Phone Number</FormLabel>
<FormControl>
  <Input 
  className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
  placeholder="phone number"
  size={30}
  {...field}
  />
</FormControl>
    <FormMessage/>
    </FormItem>
}}/>

</div>
</div>

</form>

    </Form>
    </Reveal>

   

    <div className="recent-orders-container mt-14 flex flex-col items-start">
   
   <div className='recent-order-header flex items-center space-x-4 mb-4'> {/* Added mb-4 for spacing */}
    <h2 className=" md-2 text-3xl font-bold">General Information</h2>
    <p>
      Set your basic profile Information here.
    </p>
  </div>
  </div> 
  <Reveal>
  <Form {...form}>
    
<form onSubmit={form.handleSubmit(handleSubmit)} className=' flex flex-col  bg-white rounded shadow-lg w-[1300px] '>

<div className='flex space-x-10  w-full p-5'>
<FormField control={form.control} name="emailAddress" render={({field}) => {
  return <FormItem>
<FormLabel className="text-black sm:text-lg">email address</FormLabel>
<FormControl>
  <Input 
   className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
   placeholder="email address"
   type='email'
   size={30}
   {...field}
 />
</FormControl>
    <FormMessage/>
    </FormItem>
}}/>

<FormField control={form.control} name="password" render={({field}) => {
  return <FormItem>
<FormLabel className="text-black sm:text-lg">password</FormLabel>
<FormControl>
  <Input 
  className="h-10 rounded-md  text-sm placeholder:text-grey sm:h-12 sm:text-lg"
  placeholder="email address"
  type='password'
  size={30}
  {...field}
  />
</FormControl>
    <FormMessage/>
    </FormItem>
}}/>

</div>

</form>

    </Form>
    </Reveal>
    </div>
    
    </Section>
    </DashboardLayout>
    
    
    )
    }
    