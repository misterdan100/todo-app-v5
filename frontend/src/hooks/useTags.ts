import axios from "@/config/axios";
import useSWR from "swr";

export const useTags = () => {
  const url = "/tags";

  const fetcher = (url: string) => axios(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    dedupingInterval: 2000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Only retry up to 2 times (for a total of 3 requests including the initial one)
      if (retryCount >= 2) return;
    },
  });

  return { data, error, isLoading, mutate };
};
