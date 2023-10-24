import { ReturnProcessContext } from '@/context/ReturnProcessContext'
import { useContext, useState } from 'react'

export function useReturnProcess() {
  const context = useContext(ReturnProcessContext)

  if (!context) {
    throw new Error(
      'useReturnProcess is supposed to be used in a component thats wrapped in ReturnProcessContext'
    )
  }

  if (!context.steps || context.steps.length === 0) {
    throw new Error('useReturnProcess is supposed to have at least one step')
  }

  const [currentStep, setCurrentStep] = useState(context.steps[0]!)

  return { ...context, currentStep }
}
