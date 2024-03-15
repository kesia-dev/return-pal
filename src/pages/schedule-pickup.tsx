import { useReturnProcess } from '@/hooks/useReturnProcess'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import axios from 'axios'
import { useEffect } from 'react'
import Router from 'next/router'
import { authorizeUser } from '@/services/authService'
import { deleteAllReturnLabels } from '@/services/returnLabelService'

export default function ReturnProcess() {
  useEffect(() => {
    authorizeUser()
    deleteAllReturnLabels()
  }, [])
  const { getCurrentStep } = useReturnProcess()
  return getCurrentStep.component
}

ReturnProcess.getLayout = getLayout
