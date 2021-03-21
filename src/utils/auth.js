import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const {
  REACT_APP_BACKEND_API_HEROKU,
  REACT_APP_BACKEND_API_LOCAL,
  REACT_APP_NAME,
} = process.env;

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = REACT_APP_BACKEND_API_HEROKU;
  // axios.defaults.baseURL = REACT_APP_BACKEND_API_LOCAL;
} else {
  axios.defaults.baseURL = REACT_APP_BACKEND_API_HEROKU;
}

const setAuthHeaders = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true
  } else {
    return false
  }
};

const decodeToken = () => {
  const token = Cookies.get(`${REACT_APP_NAME}-auth-token`);
  let decodedToken;
  try {
    if (token) {
      // The hard way:
      // const base64Url = token.split('.')[1]
      // const base64 = base64Url.replace('-', '+').replace('_', '/')
      // decodedToken = JSON.parse(window.atob(base64))
      // Window.atob ?
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
      // Decodes a string of data which has been encoded using Base64 encoding

      // The easy way:
      // https://www.npmjs.com/package/jsonwebtoken#jwtdecodetoken--options
      decodedToken = jwt.decode(token);
    }
  } catch (error) {
    console.log(error.message);
  }
  return decodedToken;
};

const login = async (credentials) => {
  const { username, password } = credentials;
  try {
    const data = await axios.post("/auth/login", {
      username,
      password,
    });
    const token = data.headers["x-authorization-token"];
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      setAuthHeaders();
      return true
    } else {
      throw new Error('Login failed')
    }
  } catch (e) {
    console.log({ message: e.message, stack: e.stack });
    return false
  }
};

const authenticate = async (type, credentials) => {
  try {
    const data = await axios.post(`/auth/${type}`, {
      ...credentials
    });
    const token = data.headers["x-authorization-token"];
    if (token) {
      Cookies.set(`${REACT_APP_NAME}-auth-token`, token);
      setAuthHeaders();
      return true
    } else {
      throw new Error(`Authentication - ${type} - failed`)
    }
  } catch (e) {
    console.log({ message: e.message, stack: e.stack });
    return false
  }
};

const logout = () => {
  Cookies.remove(`${REACT_APP_NAME}-auth-token`);
};



export {
  axios as client,
  setAuthHeaders,
  login,
  authenticate,
  logout,
  decodeToken,
};
