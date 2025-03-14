// this hook get tasks from api, set them in swr cache,
// set them in redux store tasks, and return tasks from api

import axios from "@/config/axios";
import { Task } from "@/interface";
import { AppDispatch } from "@/store/store";
import { addTasks, addTasksToShow } from "@/store/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import useSWR from "swr";

export function useTasks({showTasks = false}: {showTasks?: boolean}) {
  const dispatch = useDispatch<AppDispatch>();
  
  const url = `/tasks`;
  
  const fetcher = (url: string) => axios(url).then((res) => res.data as Task[]);
  
  const { data, error, isLoading, mutate, isValidating } = useSWR(url, fetcher, {
    dedupingInterval: 2000, // Evita solicitudes duplicadas en un corto tiempo
  });

  if(error) {
    console.log(error)
  }
  
  if(data) {
    dispatch(addTasks(data));

    if(showTasks){
      dispatch(addTasksToShow(data))
    }
  }

  return { tasks: data, error, isLoading, mutate, isValidating };
}
