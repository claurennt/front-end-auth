import React, { useEffect, useState } from "react";
import Info from "./components/Info";
import Authentication from "./components/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import { authenticate, logout, setAuthHeaders } from "./utils/auth";
import Admin from "./components/Admin";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";

const App = () => {
  const [credentials, setCredentials] = useState(null);
  const [authType, setAuthType] = useState('login')

  const [info, setInfo] = useState({
    open: false,
    message: "",
    style: "",
  });

  const history = useHistory();

  useEffect(() => {
    setAuthHeaders() && history.push("/admin")
  }, [history])

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuthentication = async (type) => {
    const isAuthenticated = await authenticate(type, credentials);
    if (isAuthenticated) {
      history.push("/admin");
      setInfo({
        open: true,
        message: `${type} successful!`,
        style: "success",
      });
    } else {
      setInfo({
        open: true,
        message: `Failed to ${type} `,
        style: "error",
      });
    }
  }

  const handleLogout = () => {
    logout();
    history.push("/auth");
    setInfo({
      open: true,
      message: "You've been logged out!",
      style: "info",
    });
  };


  return (
    <>
      <Switch>
        <Route path="/auth">
          <Authentication
            onAuth={handleAuthentication}
            onSetCredentials={handleSetCredentials}
            authType={authType}
            setAuthType={setAuthType}
          />
        </Route>
        <ProtectedRoute
          path="/admin"
          component={Admin}
          onLogout={handleLogout}
        />
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
      <Info info={info} setInfo={setInfo} />
    </>
  );
};

export default App;
