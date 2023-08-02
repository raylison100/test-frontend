import axios from 'axios'

const axiosIns = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  },
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
})

export default axiosIns
