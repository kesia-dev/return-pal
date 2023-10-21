import { type UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

export const addressSchema = z.object({
  apartmentUnitNumber: z
    .string()
    .min(1)
    .max(10)
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Please enter a valid apartment unit number',
    })
    .optional(),
  streetNumber: z.coerce
    .number()
    .min(1, {
      message: 'Please enter a valid number',
    })
    .max(999999, {
      message: 'Please enter a valid number',
    }),
  streetName: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  province: z.string().min(2).max(2),
  postal: z
    .string()
    .min(6)
    .max(6)
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, {
      message: 'Please enter a valid postal code',
    }),
})

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required',
    })
    .max(60, {
      message: 'First name must be less than 60 characters',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required',
    })
    .max(60, {
      message: 'Last name must be less than 60 characters',
    }),
  primaryAddress: addressSchema,
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  addtionalAddress: z.array(addressSchema).optional(),
})

export type UserInfo = z.infer<typeof profileFormSchema>

export type EditProfileFormPropsType = {
  form: UseFormReturn<{
    firstName: string
    lastName: string
    primaryAddress: {
      streetNumber: number
      streetName: string
      city: string
      province: string
      postal: string
      apartmentUnitNumber?: string | undefined
    }
    email: string
    additionalAddress:
      | {
          streetNumber: number
          streetName: string
          city: string
          province: string
          postal: string
          apartmentUnitNumber?: string | undefined
        }[]
      | undefined
  }>
  onSubmit: (values: z.infer<typeof profileFormSchema>) => void
}
