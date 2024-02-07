'use Client'
// // pages/profile.tsx
// import { useForm } from 'react-hook-form';
// import DashBoardHeader from '@components/DashboardHeader';
// import { Label } from '@components/ui/label';
// import { UserInfo, EditProfileFormPropsType } from '@components/DashBoard/types';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormControl,
// } from '@/components/ui/form'
// import { Input } from '@components/ui/input';


// const EditProfileForm: React.FC<EditProfileFormPropsType> = ({ onSubmit }) => {
//   // Initialize the react-hook-form methods
//   const { register, handleSubmit, formState: { errors } } = useForm<UserInfo>();

  
//   return (
//     <div >
//       <div>
//     <DashBoardHeader/>
//   </div>
 
//   <div className="recent-orders-container mt-14 flex flex-col items-start">
//   <div className="mb-5 w-full">
//     <div className='recent-order-header flex items-center space-x-4 mb-4'> {/* Added mb-4 for spacing */}
//       <h2 className="text-3xl font-bold">General Information</h2>
//       <p>
//         Set your basic profile Information here.
//       </p>
//     </div>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="firstName">First Name</label>
//         <input id="firstName" {...register('first_name', { required: 'First name is required' })} />
//         {errors.first_name && <p>{errors.first_name.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="lastName">Last Name</label>
//         <input id="lastName" {...register('last_name', { required: 'Last name is required' })} />
//         {errors.last_name && <p>{errors.last_name.message}</p>}
//       </div>

//       {/* Add other input fields based on the UserInfo type */}
//       {/* ... */}

      
//     </form>
    
//     <div className='recent-order-header flex items-center space-x-4'>
//       <h2 className="text-3xl font-bold">Account Information</h2>
//       <p>
//         Change your password or manage your email here.
//       </p>
   
//   </div>
//  </div>
//  </div>
//  </div>

//    )
//   }
import React from 'react';
import { useForm } from 'react-hook-form';
import DashBoardHeader from '@components/DashboardHeader';
import { FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { UserInfo, EditProfileFormPropsType,profileFormSchema } from '@components/DashBoard/types';
import { Form,FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'; // Assuming these are correctly imported
import { Input } from '@components/ui/input';

const formSchema  = z.object({
  emailAddress: z.string().email()
})

export default function editUserProfile(){
//   type FormType = z.infer<typeof formSchema>;
//   const form = useForm<FormType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
// emailAddress: ''
    }
  //})

// type FormProps = {
//   onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
//   children: React.ReactNode;
// };

// const CustomForm: React.FC<CustomFormProps> = ({ onSubmit, children }) => {
//   const { handleSubmit } = useFormContext(); // Use useFormContext if form methods are needed


// const EditProfileForm: React.FC = () => {
//   const methods = useForm<UserInfo>({
//     resolver: zodResolver(profileFormSchema), // Assuming you're using Zod for validation
//   });
//   const { handleSubmit, control } = methods;

//   const onSubmit = (data: UserInfo) => {
//     console.log(data); // Handle form submission
//   };

  return (
    < >
    <Form {...form}>

    </Form>
    
      {/* <DashBoardHeader />
      {/* Use the Form component from your UI library */}
      {/* <div className="recent-orders-container mt-14 flex flex-col items-start">
   
     <div className='recent-order-header flex items-center space-x-4 mb-4'> {/* Added mb-4 for spacing */}
      {/* <h2 className=" md-2 text-3xl font-bold">General Information</h2>
      <p>
        Set your basic profile Information here.
      </p>
    </div>
    </div> */}
    {/* <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}> */}
          {/* First Name Field */}
          {/* <FormField  name="first_name"
  control={control}
  render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{methods.formState.errors.first_name?.message}</FormMessage>
              </FormItem>
            )}
          /> */} 

          {/* Last Name Field */}
          {/* <FormField  name="first_name"
  control={control}
  render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{methods.formState.errors.last_name?.message}</FormMessage>
              </FormItem>
            )}
          /> */}
{/* 
          Email Field
          <FormField  name="first_name"
  control={control}
  render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage>{methods.formState.errors.email?.message}</FormMessage>
              </FormItem>
            )} */}
          {/* />

          <button type="submit">Save Changes</button>
        </Form>
      </FormProvider> */}
    </> 
 
    
  )
}

//export default editUserProfile;

