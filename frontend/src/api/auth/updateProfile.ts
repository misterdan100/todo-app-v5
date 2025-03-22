import axios from '@/config/axios'
import { delay } from '@/utils';

type FormData = {
    name: string;
    email: string;
  };

export const updateProfile = async (formData: FormData) => {
    try {
        const url = `/users`
        const res = await axios.put(url, formData)

        return true
        
    } catch (error) {
     console.log('[ERROR_UPDATEPROFILE]', error)   
     return false
    }
}