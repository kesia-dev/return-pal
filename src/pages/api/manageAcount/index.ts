 // pages/api/manage-account/index.ts
// // // import type.ts as it hold the data for the userprofile

 import type { NextApiRequest, NextApiResponse } from 'next'
 import client, { connectDB, disconnectDB } from '@/lib/db'
 import type { UserInfo, Address } from '@/components/DashBoard/types'
 import { ObjectId } from 'mongodb'

 export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = new ObjectId(req.query.userId as string)
  await connectDB()
  if (req.method === 'GET') {
    // Get addresses based on userid
    try {
      const dbName = process.env.DATABASE
      const database = client.db(dbName)
      
      const usersCollection = database.collection<UserInfo>('users')
      const user = await usersCollection.findOne({
        _id: userId,
      })
      // Use the imported User type here
       user: User | null = await getUserById(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Cannot find the user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  const newAdditionalAddress = req.body as Address
  console.log(newAdditionalAddress)
  // const result = await userCollection.updateOne(
  await userCollection.updateOne(
    { _id: userId },
    {
      $push: {
        additionalAddress: newAdditionalAddress,
      },
    }
  )

//   res
//     .status(200)
//     .json({ message: 'Additional address added successfully', id: userId })
// } catch (error) {
//   res.status(500).json({
//     message: 'Error creating Error adding additional address',
//     error,
//   })
// }
// } else {
// res.setHeader('Allow', ['GET', 'POST'])
// res.status(405).end(`Method ${req.method} Not Allowed`)
// }

// await disconnectDB()
}