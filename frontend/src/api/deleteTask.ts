import axios from '@/config/axios'


export const deleteTask = async ({taskId}: {taskId: string}) => {

    try {
        const url = `/tasks/${taskId}`
        await axios.delete(url)


        return true
    } catch (error) {
        console.log('Error deleting task')
        return false
    }

}