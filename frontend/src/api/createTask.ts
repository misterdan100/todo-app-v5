import axios from '@/config/axios'


export const createTask = async (dataTask: {}) => {
    try {
        const url = '/tasks'

        const { data } = await axios.post(url, dataTask)
        return data
        
    } catch (error) {
        return false
    }
}