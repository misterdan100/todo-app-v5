import axios from '@/config/axios'
import { Project } from '@/interface'
import useSWR from 'swr'

export const useProjects = () => {
    const url = '/projects'

    const fetcher = (url: string) => axios(url).then(res => res.data as Project[])
    const { data, error, isLoading } = useSWR(url, fetcher)

    return { data, error, isLoading }
}