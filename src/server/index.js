import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api'

// axios.interceptors.request.use(config => {
//   const jwt = JSON.parse(localStorage.getItem("token"))
//   const authorization = jwt ? `Bearer ${jwt}` : ""
//   config.headers.authorization = authorization
//   return config
// })

export default axios