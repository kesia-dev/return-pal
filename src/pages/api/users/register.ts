import type { NextApiRequest, NextApiResponse } from 'next'
import client, { connectDB, disconnectDB } from '../../../lib/db'
import { type UserInfoTempNew } from '../../../components/DashBoard/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB()
  if (req.method === 'POST') {
    //create new user
    try {
      const db = client.db('ReturnPal')
      const users = db.collection<UserInfoTempNew>('users')
      const newUser = req.body as UserInfoTempNew

      console.log(newUser)

      const result = await users.insertOne(newUser)
      res.status(200).json({
        message: 'User registered successfully',
        id: result.insertedId,
      })
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  await disconnectDB()
}
