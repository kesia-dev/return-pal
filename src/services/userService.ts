import axios from 'axios'
import Router from 'next/router'

export const getUser = async (id: string | null) => {
  if (!id) {
    await Router.push('/signin')
  }

  try {
    const res:any = await axios.get(`
         ${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}
             `)
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }

    return res.data
  } catch (err:any) {
    console.error(err)
  }
}
export const updateUser = async (id: string | null, body: any) => {
  if (!id) {
    await Router.push('/signin')
  }

  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,body);
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }
    return res.data
  } catch (err) {
    console.error(err)
  }
}
