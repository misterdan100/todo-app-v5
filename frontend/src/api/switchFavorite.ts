import axios from '@/config/axios'

type Props = {
    taskId: string
}

export const switchFavorite = async ({ taskId }: Props) => {

    try {

        const url = `/tasks/${taskId}/favorite`
        await axios.put(url)
        
        return true
    } catch (error) {
        console.log('Error switchFavorite')
        return false
    }

}