import axios, { AxiosInstance } from 'axios'

const isDevelopment = process.env.NODE_ENV !== 'production'

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
      },
    withCredentials: true // to allows get and send cookies
})

export default api