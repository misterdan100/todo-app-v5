import axios from '@/config/axios'
import useSWR from 'swr'

export const useTags = () => {
    const url = '/tags'

    const fetcher = (url: string) => axios(url).then(res => res.data)

    const {data, error, isLoading, mutate} = useSWR(url, fetcher, {
        dedupingInterval: 2000
    })

    return {data, error, isLoading, mutate}
}