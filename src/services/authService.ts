import axios from 'axios'
import Router from 'next/router'

export const authorizeUser = async () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  if (!token) {
    await Router.push('/signin')
  }

  try {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + '/api/authorize', { userId, token })
      .then((a) => console.log(a))
      .catch((a) => console.log(a))
  } catch (err) {
    console.error(err)
  }
}
