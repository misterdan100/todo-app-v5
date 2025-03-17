import axios from '@/config/axios'

type Props = {
    email: string
    password: string

}

export const loginUser = async ({email, password}: Props) => {
    try {
        const url = '/auth/login'

        const res = await axios.post(url, {email, password})

        return res.data
    } catch (error) {
        console.log('[ERROR_LOGINUSER]', error)
        return {success: false, error: true, message: 'Error loging user'}
    }
}