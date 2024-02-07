// pages/api/edit-profile.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB, disconnectDB } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { UserInfo } from '@/components/DashBoard/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    await connectDB();

    try {
      const userId = new ObjectId(req.body.userId);
      const updatedUserData: UserInfo = req.body.updatedUserData;

      // TODO: Validate and sanitize updatedUserData as needed

      // Example: Update the user profile in the database
      // You'll need to implement this based on your database setup
      // const result = await updateUserProfile(userId, updatedUserData);

      // Send a success response
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: 'Error updating profile', error });
    } finally {
      await disconnectDB();
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
