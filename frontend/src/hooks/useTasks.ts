// this hook get tasks from api, set them in swr cache,
// set them in redux store tasks, and return tasks from api

import axios from "@/config/axios";
import { AppDispatch } from "@/store/store";
import { addTasks } from "@/store/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import useSWR from "swr";

export function useTasks() {
  const dispatch = useDispatch<AppDispatch>();
  
  const url = `/tasks`;
  
  const fetcher = (url: string) => axios(url).then((res) => res.data);
  
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    dedupingInterval: 2000, // Evita solicitudes duplicadas en un corto tiempo
  });

  if(error) {
    console.log(error)

  }
  
  dispatch(addTasks(data));

  return { tasks: data, error, isLoading, mutate };
}
