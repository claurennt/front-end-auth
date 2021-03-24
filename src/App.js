import React, { useEffect, useState } from "react";
import Authentication from "./components/Authentication";
import Admin from "./components/Admin";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";

const App = () => {
  const [credentials, setCredentials] = useState();

  const history = useHistory();

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <>
      <Switch>
        <Route path="/auth">
          <Authentication
            onAuth={() => {}}
            onSetCredentials={handleSetCredentials}
          />
        </Route>
        <Route path="/admin">
          <Admin onLogout={() => {}}/>
        </Route>
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
