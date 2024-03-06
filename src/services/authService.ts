import axios from 'axios'
import Router from 'next/router'

export const authorizeUser = async () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  if (!token) {
    Router.push('/signin')
  }

  try {
    axios
      .post('http://localhost:4200/api/authorize', { userId, token })
      .then((a) => console.log(a))
      .catch((a) => console.log(a))
  } catch (err) {
    console.error(err)
  }
}
