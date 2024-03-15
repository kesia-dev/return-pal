import { Address } from '@returnprocess/types'
import axios from 'axios'
import Router from 'next/router'

export const getAddresses = async (): Promise<Address[]> => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  if (!token) {
    Router.push('/signin')
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/address/user/${userId}`
    )
    if (res.status !== 200) {
      throw new Error(`unable to grab addresses for user id: ${userId}`)
    }

    return res.data // array of address objects
  } catch (err) {
    console.error(err)
  }
  return []
}

export const createAddress = async (
  address: Address
): Promise<Address | undefined> => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const addressToSend: Address = {
    ...address,
    user: userId!,
  }

  if (!token) {
    Router.push('/signin')
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/address`,
      addressToSend
    )
    if (res.status !== 201) {
      throw new Error(`unable to create address`)
    }
    return res.data // address
  } catch (err) {
    console.error(err)
  }
}

export const updateAddress = async (
  address: Address
): Promise<Address | undefined> => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const addressToUpdate: Address = {
    ...address,
    user: userId!,
  }

  if (!token) {
    Router.push('/signin')
  }

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/address/${address._id!}`,
      addressToUpdate
    )
    if (res.status !== 200) {
      throw new Error(`unable to update address`)
    }
    return res.data // message of success
  } catch (err) {
    console.error(err)
  }
}
