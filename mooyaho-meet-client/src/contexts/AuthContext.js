import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthContextProvider({ children }) {
  const authState = useState(null)
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}

export function useAuthState() {
  const authState = useContext(AuthContext)
  if (!authState) {
    throw new Error('AuthContextProvider is not found')
  }
  return authState
}
