import axios from 'axios'
import Router from 'next/router'

interface ReturnLabel {
  file?: File
  attachment: string
  labelType: 'Physical' | 'Digital' | 'Amazon'
  description?: string
}

export const uploadReturnLabel = async (
  returnLabel: ReturnLabel,
  userId: string
) => {
  // MUST BE SENT AS FORMDATA
  const formData = new FormData()
  formData.append('file', returnLabel.file!)
  formData.append('attachment', returnLabel.attachment)
  formData.append('labelType', returnLabel.labelType)
  formData.append('description', returnLabel.description ?? '')
  formData.append('userId', userId)

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/return-labels`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const getAllReturnLabels = async (userId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/return-labels/user/${userId}`
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const updateReturnLabel = async (returnLabel: any) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/return-labels/${returnLabel._id}`,
      returnLabel
    )
  } catch (err) {
    console.error(err)
  }
}

export const deleteReturnLabel = async (returnLabel: any) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/return-labels/${returnLabel._id}`
    )
  } catch (err) {
    console.error(err)
  }
}

export const deleteAllReturnLabels = async () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  if (!token) {
    await Router.push('/signin')
  }

  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/return-labels/user/${userId}`)
  } catch (err) {
    console.error(err)
  }
}
