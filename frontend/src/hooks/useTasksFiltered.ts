import axios from '@/config/axios'
import { Status } from "@/interface"
import { AppDispatch } from '@/store/store'
import { addKeyCache, addTasksToShow } from '@/store/tasks/tasksSlice'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'

type Props = {
    filter?: Status
}

export const useTasksFiltered = ({ filter }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const url = `/tasks?filter=${filter}`
    const key = `tasks_filter_${filter}`

    const fetcher = (url: string) => axios(url).then(res => res.data)

    const {data, error, isLoading, mutate} = useSWR(key, () => fetcher(url), {
        dedupingInterval: 2000,
    })

    if(data) {
        dispatch(addTasksToShow(data))
        dispatch(addKeyCache(key))
    }

    return { tasks: data, error, isLoading, mutate}
}