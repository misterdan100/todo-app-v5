"use client";
import { HeaderPage, Spinner } from "@/components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import axios from "@/config/axios";
import { Tag } from "@/interface";
import Link from "next/link";
import useSWR from "swr";

// ShadCN imports
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function TagsPage() {
  const fetcher = (url: string) => axios(url).then((res) => res.data as Tag[]);
  const { data, error, isLoading } = useSWR("/tags/tasks", () => fetcher("/tags/tasks"));

  if (isLoading)
    return (
      <LoadingSpinner message="Loding tags..."/>
    );

    if(data) return (
      <>
        <HeaderPage title="Tags" filters={false} />

        <Accordion type="single" collapsible className="w-full flex flex-wrap gap-4">
          {data.map((item, index) => (
            <AccordionItem 
                value={`item-${index}`} 
                key={item.id} 
                className="font-bold hover:bg-gray-200 mb-2"
                
                >
              <AccordionTrigger
                    className={`font-bold hover:bg-gray-200 px-4 py-2 rounded-lg`}
                    style={{backgroundColor: item.color}}
              >{item.name.toUpperCase()} {" ("} {item.tasks?.length} {") "}</AccordionTrigger>

              {item.tasks?.map( task => (
                <AccordionContent 
                    key={task.id}
                    className="text-gray-700 font-normal hover:bg-gray-200 ps-4"
                >
                    {task.name}
                </AccordionContent>

              ))}
            </AccordionItem>
          ))}

        </Accordion>

      </>
    );
}
