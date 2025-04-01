// this hook get tasks from api, set them in swr cache,
// set them in redux store tasks, and return tasks from api

import { revalidate } from "@/app/page";
import axios from "@/config/axios";
import { Task } from "@/interface";
import { AppDispatch } from "@/store/store";
import { addKeyCache, addTasks, addTasksToShow } from "@/store/tasks/tasksSlice";
import { config } from "process";
import { useDispatch } from "react-redux";
import useSWR from "swr";

export function useTasks({showTasks = false}: {showTasks?: boolean}) {
  const dispatch = useDispatch<AppDispatch>();
  
  const url = `/tasks`;
  const key = url
  
  const fetcher = (url: string) => axios(url).then((res) => res.data as Task[]);
  
  const { data, error, isLoading, mutate, isValidating } = useSWR(url, fetcher, {
    dedupingInterval: 2000, // Evita solicitudes duplicadas en un corto tiempo
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 2 times (for a total of 3 requests including the initial one)
      if (retryCount >= 2) return;
    }
  });
  
  if(data) {
    dispatch(addTasks(data));

    if(showTasks){
      dispatch(addTasksToShow(data))
      dispatch(addKeyCache(key))
    }
  }

  return { tasks: data, error, isLoading, mutate, isValidating };
}
