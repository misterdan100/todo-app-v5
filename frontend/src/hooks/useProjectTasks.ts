import axios from "@/config/axios";
import { Project, Task } from "@/interface";
import { AppDispatch } from "@/store/store";
import { addKeyCache, addTasksToShow } from "@/store/tasks/tasksSlice";
import { useDispatch } from "react-redux";
import useSWR from "swr";

export const useProjectTasks = (projectName: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const url = `/projects/name/${projectName}`;

  const fetcher = (url: string) =>
    axios(url).then((res) => res.data as Project);

  const { data, error, isLoading } = useSWR(url, fetcher, {
    dedupingInterval: 2000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 2 times (for a total of 3 requests including the initial one)
      if (retryCount >= 2) return;
    },
  });

  if (data?.tasks) {
    dispatch(addTasksToShow(data.tasks));
    dispatch(addKeyCache(url));
  }

  return { data, error, isLoading };
};
