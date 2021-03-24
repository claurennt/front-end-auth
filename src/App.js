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
      <Authentication />
    </>
  );
};

export default App;
