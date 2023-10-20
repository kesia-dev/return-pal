import { type ChangeEvent } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface UserInfo {
  username: string
  email: string
}

function Profile() {
  const [isEditing, setEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: 'john_doe',
    email: 'john@example.com',
  })

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleSaveClick = () => {
    setEditing(false)
  }

  const handleCancelClick = () => {
    setEditing(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  return (
    <div className="w-full">
      <div className="relative h-[15rem] w-full bg-[url('/images/returnpal-gta.webp')]  bg-cover bg-center text-title text-white">
        <div className="absolute h-full w-full backdrop-blur-sm"></div>
        <div className="absolute bottom-0">banner</div>
      </div>

      <h2 className="mb-4 text-title font-semibold">Profile</h2>
      <div className="mb-2">
        <label className="block">Username:</label>
        {isEditing ? (
          <Input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className="w-full"
          />
        ) : (
          <span>{userInfo.username}</span>
        )}
      </div>
      <div className="mb-2">
        <label className="block">Email:</label>
        {isEditing ? (
          <Input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full"
          />
        ) : (
          <span>{userInfo.email}</span>
        )}
      </div>
      {isEditing ? (
        <div className="space-x-2">
          <Button onClick={handleSaveClick} className="bg-green-500 text-white">
            Save
          </Button>
          <Button onClick={handleCancelClick} className="bg-red-500 text-white">
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={handleEditClick} className="bg-blue-500 text-white">
          Edit Profile
        </Button>
      )}
    </div>
  )
}

export default Profile
