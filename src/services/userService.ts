import axios from 'axios'
import Router from 'next/router'

export const getUser = async (id: string) => {
  if (!id) {
    Router.push('/signin')
  }

  try {
    const res = await axios.get(`http://localhost:4200/api/users/${id}`)
    if (res.status !== 200) {
      throw new Error(res.statusText)
    }

    return res.data
  } catch (err) {
    console.error(err)
  }
}
