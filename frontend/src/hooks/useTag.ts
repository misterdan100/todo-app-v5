import axios from '@/config/axios'
import useSWR from 'swr'

type Props = {
    tagName: string
}

export const useTag = ({tagName}: Props) => {
    const url = `/tags/name/${tagName}`

    const fetcher = (url: string) => axios(url).then(res => res.data)

    const { data, error, isLoading, mutate } = useSWR(`tasks_${tagName}`, () => fetcher(url), {
        dedupingInterval: 2000
    })

    return { tag: data, error, isLoading, mutate }
}