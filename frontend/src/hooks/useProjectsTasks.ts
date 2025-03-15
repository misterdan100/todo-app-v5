import axios from '@/config/axios'
import { Project } from '@/interface'
import useSWR from 'swr'

export function useProjectsTasks() {
    
    const url = '/projects/tasks'

    const fetcher = (url: string) => axios(url).then( res => res.data as Project[])
    const {data, error, isLoading} = useSWR(url, fetcher, {
        dedupingInterval: 2000
    })

    return {data, error, isLoading}
}