import axios from '@/config/axios'

export const logoutUser = async () => {
    try {

        const url = '/auth/logout'

        const { data } = await axios(url)

        return data
        
    } catch (error) {
        console.log('[ERROR_LOGINUSER]', error)
        return {success: false, error: true, message: 'Error loging out user'}
    }
}