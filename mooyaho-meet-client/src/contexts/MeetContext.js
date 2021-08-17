import { createContext, useContext, useState } from 'react'

const MeetContext = createContext(null)

export function MeetContextProvider({ children }) {
  const meetState = useState({
    name: '',
    meet: null,
  })
  return (
    <MeetContext.Provider value={meetState}>{children}</MeetContext.Provider>
  )
}

export function useMeetState() {
  const meetState = useContext(MeetContext)
  if (!meetState) {
    throw new Error('MeetContextProvider is not found')
  }
  return meetState
}
