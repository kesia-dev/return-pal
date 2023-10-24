import { useReturnProcess } from '@/hooks/useReturnProcess'
import { getLayout } from '@/layouts/ReturnProcessLayout'

export default function ContextTest() {
  const returnProcess = useReturnProcess()
  return returnProcess.currentStep.component
}

ContextTest.getLayout = getLayout
