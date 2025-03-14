import axios from '@/config/axios'
import { Tag, Task } from '@/interface'
import { AppDispatch } from '@/store/store'
import { addTasksToShow } from '@/store/tasks/tasksSlice'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'

export const useTaskByTag = (nameTag: string) => {

    const dispatch = useDispatch<AppDispatch>()

    const url = `/tags/${nameTag}/tasks`

    const fetcher = (url: string) => axios(url).then( res => res.data as {tag: Tag, tasks: Task[]})

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        dedupingInterval: 2000,
    })

    if(data) {
        dispatch(addTasksToShow(data.tasks))
    }

    return { data, error, isLoading, mutate }
}