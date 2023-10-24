import { Button } from '@/components/ui/button'
import { useReturnProcess } from '@/hooks/useReturnProcess'

export default function TestReturnProcessRender() {
  const { getCurrentStep, currentStepIndex, forward, back } = useReturnProcess()
  console.log('ContextTest getCurrentMemo', currentStepIndex)
  return (
    <>
      {' '}
      <Button
        onClick={() => {
          console.log('111')
          back()
        }}
      >
        Back
      </Button>
      {currentStepIndex}{' '}
      <Button
        onClick={() => {
          console.log('111')
          forward()
        }}
      >
        Next
      </Button>
      {getCurrentStep?.component}
    </>
  )
}
