import axios from '@/config/axios'

export const deleteUser = async () => {
    try {
        const url = '/users'
        const res = await axios.delete(url)

        return true
        
    } catch (error) {
        console.log('[ERROR_DELETEUSER]')
        return false
    }
}