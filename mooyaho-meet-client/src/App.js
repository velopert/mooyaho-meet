import { Route } from 'react-router'
import Create from './pages/Create'
import Home from './pages/Home'
import Login from './pages/Login'
import Meet from './pages/Meet'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/meet/:slug">
        <Meet />
      </Route>
    </>
  )
}

export default App
