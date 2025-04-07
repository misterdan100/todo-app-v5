import axios from '@/config/axios'

export const validateSession = async () => {
    try {

        const { data } = await axios.post('/auth/session', )

        if(data.success) {
            return data.data
        } else {
            return null
        }
    } catch (error) {
        console.error("Error fetching session:", error);
        return null
    }
}