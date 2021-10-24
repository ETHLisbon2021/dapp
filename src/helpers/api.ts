import axios from 'axios'


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 1000,
  withCredentials: false,
})


export default instance
