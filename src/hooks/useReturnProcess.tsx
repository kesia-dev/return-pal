import { ReturnProcessContext } from '@/context/ReturnProcessContext'
import { useCallback, useContext, useMemo } from 'react'

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

  const getCurrentStep = useCallback(() => {
    // console.log('getCurrentStep changed')
    context.steps[context.currentStepIndex]
  }, [context.currentStepIndex, context.steps])

  const getCurrentMemo = useMemo(() => {
    const t = context.steps[context.currentStepIndex]
    // console.log('getCurrentMemo changed ', t)
    return t
  }, [context.currentStepIndex, context.steps])

  function forward() {
    if (context.currentStepIndex === context.steps.length - 1) {
      return
    }
    console.log('should call')
    context.setCurrentStepIndex(context.currentStepIndex + 1)
  }

  function back() {
    if (context.currentStepIndex <= 0) {
      return
    }
    context.setCurrentStepIndex((prev) => prev - 1)
  }

  // console.log('currentStepIndex', currentStepIndex)

  return {
    steps: context.steps,
    currentStepIndex: context.currentStepIndex,
    getCurrentStep,
    getCurrentMemo,
    forward,
    back,
  }
}
