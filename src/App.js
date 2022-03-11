import React, { useEffect, useState, useCallback } from "react";
import Authentication from "./components/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/Admin";

import { login, getToken, removeToken } from "./utils/auth";
import client from "./utils/client";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  const [loginData, setLoginData] = useState();

  const navigate = useNavigate();

  //GET request to the protected endpoint in the backend to get information about the current user
  const getCurrentUserContext = useCallback(async () => {
    try {
      const res = await client.get("/auth/currentUser");
      console.log(res);
      setCurrentUser(res.data);
      navigate("/admin", { state: res.data });
    } catch (err) {
      console.log("No user is authenticated at the moment", err.message);
    }
  }, [navigate]);

  useEffect(() => {
    //if there is a token we get the current user context from the backend
    if (getToken()) {
      getCurrentUserContext();
    }
  }, [navigate, getCurrentUserContext]);

  const handleLoginData = (e) => {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    const isAuthSuccessfull = await login(loginData);

    if (isAuthSuccessfull) {
      getCurrentUserContext();
    } else {
      alert("Login Failed");
    }
  };

  const handleLogout = () => {
    removeToken();

    navigate("/auth");
  };

  return (
    <>
      <Routes>
        <Route
          path="auth"
          element={
            <Authentication
              handleLoginData={handleLoginData}
              handleLoginRequest={handleLoginRequest}
            />
          }
        />

        <Route
          path="admin"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Admin handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="auth" />} />
      </Routes>
    </>
  );
};

export default App;
