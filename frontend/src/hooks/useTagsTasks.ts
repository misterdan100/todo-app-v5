// this hook get all tags with tasks and return them

import axios from "@/config/axios";
import { Tag } from "@/interface";
import useSWR from "swr";

export function useTagsTasks() {
  const url = "/tags/tasks";
  const fetcher = (url: string) => axios(url).then((res) => res.data as Tag[]);

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    dedupingInterval: 2000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 2 times (for a total of 3 requests including the initial one)
      if (retryCount >= 2) return;
    },
  });

  if (error) {
    console.log(error.message);
  }

  return { tags: data, error, isLoading, mutate };
}
