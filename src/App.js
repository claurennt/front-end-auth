import React, { useEffect, useState } from "react"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import { login, logout } from "./utils/auth"
import Admin from "./Admin"

import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";


const App = () => {
  const [credentials, setCredentials] = useState(null)
  const history = useHistory()

  const handleSetCredentials = (e) => {
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [e.target.name]: e.target.value
    }))
  }

  const handleLogin = async () => {
    await login(credentials)
    history.push('/admin')
  }

  const handleLogout = () => {
    logout()
    history.push('/login')
  }


  return (
    <Switch>
    <Route path="/login">
      <Login onLogin={handleLogin} onSetCredentials={handleSetCredentials} />
    </Route>
    <ProtectedRoute path="/admin" component={Admin} onLogout={handleLogout} />
    
    {/* <Route path="/">
      <Home />
    </Route> */}
  </Switch>
  );
}

export default App;
