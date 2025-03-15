import axios from '@/config/axios'


export const createTask = async (data: {}) => {
    try {
        const url = '/tasks'

        const res = await axios.post(url, data)

        return true
        
    } catch (error) {
        return false
    }
}