import { AuthContextProvider } from './contexts/AuthContext'
import { MeetContextProvider } from './contexts/MeetContext'
import App from './App'

function Root() {
  return (
    <AuthContextProvider>
      <MeetContextProvider>
        <App />
      </MeetContextProvider>
    </AuthContextProvider>
  )
}

export default Root
