import axios from '@/config/axios'
import { TaskEditFormData } from '@/interface'

export const updateTask = async (formData: TaskEditFormData) => {
    try {
        const url = `/tasks/${formData.id}`

        console.log('Send formData', formData)

        const task = await axios.put(url, formData)

        return {success: true, data: task.data}
    } catch (error) {
        console.log('ERROR_UPDATETASK')
        return false
    }
}