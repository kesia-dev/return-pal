import { ReturnProcessContext } from '@/context/ReturnProcessContext'
import { useCallback, useContext, useMemo, useState } from 'react'

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

  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const getCurrentStep = useCallback(() => {
    // console.log('getCurrentStep changed')
    context.steps[currentStepIndex]
  }, [context.steps, currentStepIndex])

  const getCurrentMemo = useMemo(() => {
    const t = context.steps[currentStepIndex]
    // console.log('getCurrentMemo changed ', t)
    return t
  }, [context.steps, currentStepIndex])

  function forward() {
    if (currentStepIndex === context.steps.length - 1) {
      return
    }
    setCurrentStepIndex(currentStepIndex + 1)
  }

  function back() {
    if (currentStepIndex <= 0) {
      return
    }
    setCurrentStepIndex((prev) => prev - 1)
  }

  // console.log('currentStepIndex', currentStepIndex)

  return {
    steps: context.steps,
    currentStepIndex,
    getCurrentStep,
    getCurrentMemo,
    forward,
    back,
  }
}
