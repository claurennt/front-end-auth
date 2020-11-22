import axios from "axios";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken'

const APP_NAME = 'electric-sheep'

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_LOCAL;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_HEROKU;
  }

const setAuthHeaders = () => {
  const token = Cookies.get(`${APP_NAME}-auth-token`);
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

const decodeToken = () => {
    const token = Cookies.get(`${APP_NAME}-auth-token`);
    let decodedToken
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
        decodedToken = jwt.decode(token)
      }
    } catch (error) {
      console.log(error.message)
    }
    return decodedToken
  }
    
const login = async (credentials) => {
    const { username, password } = credentials
    try {
      const data = await axios.post('/auth/login', {
        username,
        password
      })
      const token = data.headers['x-authorization-token'];
      if (token) {
          Cookies.set(`${APP_NAME}-auth-token`, token);
          setAuthHeaders()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const logout = () => {
    Cookies.remove(`${APP_NAME}-auth-token`);
  }

  const me = async () => {
    setAuthHeaders()
    try {
        const data = await axios.get('/auth/me')
        return data
      } catch (error) {
        console.log(error.message)
        return false
      }
  }

export { 
    axios as client,
    setAuthHeaders,
    login,
    logout,
    decodeToken
 }