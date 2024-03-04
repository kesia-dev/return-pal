import {
  ReturnProcessContext,
  type ReturnProcessFullObjectType,
} from '@/context/ReturnProcessContext'
import { useContext, useMemo } from 'react'

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

  const getCurrentStep = useMemo(() => {
    return context.steps[context.currentStepIndex]!
  }, [context.currentStepIndex, context.steps])

  function forward() {
    if (!canGoForwards()) {
      return
    }
    const nextStep = context.currentStepIndex + 1
    if (nextStep === context.steps.length - 1) {
      context.setIsFinished(true)
    }
    context.setCurrentStepIndex(nextStep)
  }

  function jump(stepToJump: number) {
    context.setCurrentStepIndex(stepToJump)
    if (stepToJump === context.steps.length - 1) {
      context.setIsFinished(true)
    }
  }

  function back() {
    if (!canGoBack()) {
      return
    }
    context.setCurrentStepIndex((prev) => prev - 1)
  }

  function canGoForwards() {
    return context.currentStepIndex < context.steps.length - 1
  }

  function canGoBack() {
    return context.currentStepIndex > 0
  }

  function setCurrentData(data: Partial<ReturnProcessFullObjectType>) {
    context.setCurrentData((prev) => ({ ...prev, ...data }))
  }

  return {
    steps: context.steps,
    currentStepIndex: context.currentStepIndex,
    getCurrentStep: getCurrentStep,
    forward,
    back,
    jump,
    canGoForwards,
    canGoBack,
    setCurrentData,
    currentData: context.currentData,
    isFinished: context.isFinished,
    setIsFinished: context.setIsFinished,
  }
}
