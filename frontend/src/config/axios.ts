import axios, { AxiosInstance } from 'axios'

const isDevelopment = process.env.NODE_ENV !== 'production'

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    withCredentials: true // to allows get and send cookies

})

if(typeof window !== 'undefined') {
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

export default api

//! configurar axios con un interceptor para evitar que intente acceder al localStorage en el middleware