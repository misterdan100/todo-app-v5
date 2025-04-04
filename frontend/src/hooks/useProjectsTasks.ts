import axios from "@/config/axios";
import { Project } from "@/interface";
import useSWR from "swr";

export function useProjectsTasks() {
  const url = "/projects/tasks";

  const fetcher = (url: string) =>
    axios(url).then((res) => res.data as Project[]);
  const { data, error, isLoading } = useSWR(url, fetcher, {
    dedupingInterval: 2000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 2 times (for a total of 3 requests including the initial one)
      if (retryCount >= 2) return;
    },
  });

  return { data, error, isLoading };
}
