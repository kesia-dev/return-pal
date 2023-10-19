import { useMemo, type PropsWithChildren, useState, createContext } from 'react'

export type ReturnProcessContextType = {
  editing: boolean
  setEditing: (value: boolean) => void
}

export const UserProfileContext = createContext<
  ReturnProcessContextType | undefined
>(undefined)

export default function ReturnProcessContext({ children }: PropsWithChildren) {
  const [editing, setEditing] = useState(false)
  const userProfileContextValue = useMemo(
    () => ({
      editing,
      setEditing,
    }),
    [editing, setEditing]
  )

  return (
    <UserProfileContext.Provider value={userProfileContextValue}>
      {children}
    </UserProfileContext.Provider>
  )
}
