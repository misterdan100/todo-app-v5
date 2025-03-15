import axios from '@/config/axios'
import { Project, Task } from '@/interface'
import { AppDispatch } from '@/store/store'
import { addKeyCache, addTasksToShow } from '@/store/tasks/tasksSlice'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'

export const useProjectTasks = (projectName: string) => {
    const dispatch = useDispatch<AppDispatch>()

    const url = `/projects/name/${projectName}`

    const fetcher = (url: string) => axios(url).then( res => res.data as Project) 

    const { data, error, isLoading } = useSWR(url, fetcher)

    if(data?.tasks) {
        dispatch(addTasksToShow(data.tasks))
        dispatch(addKeyCache(url))
    }

    return { data, error, isLoading }
}