import axios from '@/config/axios'
import { Status } from '@/interface'



export const changeStatus = async (id: string, newStatus: Status) => {
    try {
        const url = `/tasks/${id}/status`
        const res = await axios.put(url, {
            status: newStatus
        })

        return true
        
    } catch (error) {
        return false
        
    }
}