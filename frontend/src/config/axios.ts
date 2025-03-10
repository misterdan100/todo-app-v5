import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
})

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('AUTH_TOKEN_UPTASKS_V2')
//     if(token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })

export default api