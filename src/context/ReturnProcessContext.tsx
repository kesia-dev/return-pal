import {
  useMemo,
  type PropsWithChildren,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

export type ReturnProcessStep = {
  id: string
  name: string
  component: JSX.Element
}

export type ReturnProcessContextType = {
  steps: ReturnProcessStep[]
  currentStepIndex: number
  setCurrentStepIndex: Dispatch<SetStateAction<number>>
}

export const ReturnProcessContext = createContext<ReturnProcessContextType>(
  {} as ReturnProcessContextType
)

type ReturnProcessContextProviderType = {
  steps: ReturnProcessContextType['steps']
}

export default function ReturnProcessContextProvider({
  children,
  steps,
}: PropsWithChildren<ReturnProcessContextProviderType>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const returnProcessContextValue = useMemo(
    () => ({
      currentStepIndex,
      setCurrentStepIndex,
      steps,
    }),
    [currentStepIndex, steps]
  )
  return (
    <ReturnProcessContext.Provider value={returnProcessContextValue}>
      {children}
    </ReturnProcessContext.Provider>
  )
}
