import axios from '@/config/axios'


export const deleteTask = async ({taskId}: {taskId: string}) => {

    try {
        const url = `/tasks/${taskId}`
        const {data} = await axios.delete(url)

        return data
    } catch (error) {
        console.log('Error deleting task')
        return {success: false, message: 'Error deleting task'}
    }

}