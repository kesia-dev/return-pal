import { getDateFrom } from '@/lib/utils'
import { useMemo, useState } from 'react'

export function useDateSelection(initialDate: Date) {
  const [initialStartingDate] = useState<Date>(initialDate)
  const [cursorStartDate, setCursorStartingDate] = useState<Date>(initialDate)

  const getCurrentDays = useMemo(() => {
    const dateArray = []
    const currentDate = new Date(cursorStartDate)
    for (let i = 0; i < 7; i++) {
      dateArray.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
  }, [cursorStartDate])

  function forward() {
    setCursorStartingDate((prev) => getDateFrom(prev, 7))
  }

  function back() {
    const newDate = getDateFrom(cursorStartDate, -7)
    if (canGoBackwards()) {
      setCursorStartingDate(newDate)
    }
  }

  function canGoBackwards() {
    return cursorStartDate.getTime() > initialStartingDate.getTime()
  }

  return { back, forward, getCurrentDays, canGoBackwards }
}
