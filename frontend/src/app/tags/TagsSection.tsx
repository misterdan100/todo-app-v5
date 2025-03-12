"use client";

import useSWR from "swr";
import axios from "@/config/axios";
import { Tag } from "@/interface";
import clsx from "clsx";

// ShadCN imports
import { TagCard } from "@/components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";


export default function TagsSecction() {
  const fetcher = (url: string) => axios(url).then((res) => res.data as Tag[]);
  const { data, error, isLoading } = useSWR("/tags/tasks", () => fetcher("/tags/tasks"));

  if (isLoading)
    return (
      <LoadingSpinner message="Loding tags..."/>
    );

    if(data) return (
      <>
        <div 
          className={clsx('py-6 gap-6', {
            // 'flex flex-wrap justify-between' : false,
            'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4' : true
          })}
        >
          {data.map((item) => (
            <TagCard 
              key={item.id}
              tag={item}
            />
          ))}

        </div>

      </>
    );
}
