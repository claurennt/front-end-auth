import client from "./client";
import Cookies from "js-cookie";

const { REACT_APP_AUTH } = process.env;

const setToken = (value) => Cookies.set(`${REACT_APP_AUTH}-auth-token`, value);
/*  alternatively we can use Local Storage
localStorage.setItem(`${REACT_APP_AUTH}-auth-token`, token); */

const getToken = () => Cookies.get(`${REACT_APP_AUTH}-auth-token`);
/*  alternatively we can use Local Storage
localStorage.getItem(`${REACT_APP_AUTH}-auth-token`); */

const removeToken = () => Cookies.remove(`${REACT_APP_AUTH}-auth-token`);
// localStorage.removeItem(`${REACT_APP_AUTH}-auth-token`);

//util function to send a login request to the backend
const login = async (loginData) => {
  try {
    /*makes a POST request to the login endpoint and 
    retrieves the x-authorization-token as token from the headers of the response */
    const {
      headers: { "x-authorization-token": token },
    } = await client.post("users/login", {
      ...loginData,
    });

    //if we get an auth token we store it in the cookies to have data persistency
    if (token) {
      setToken(token);
      return true;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export { login, getToken, setToken, removeToken };
