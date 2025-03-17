import axios from '@/config/axios'
import { isAxiosError } from 'axios'

type Props = {
    email: string
    name: string
    password: string
}

export const registerUser = async ({email, name, password}: Props) => {
    try {

        const url = '/auth/register'

        const dataUser = {
            email: email.trim().toLowerCase(),
            name: name.trim(),
            password: password.trim()
        }

        const { data } = await axios.post(url, dataUser)

        return {success: true, ...data}

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log('[ERROR_REGISTERUSER]', error)
            return { success: false, error: true, message: error.response.data.message}
        }
    }
}