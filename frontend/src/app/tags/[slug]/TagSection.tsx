"use client";

import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { useTag, useTaskByTag } from "@/hooks";
import { capitalizeText } from "@/utils";
import { Tag } from "@/interface";
import { ErrorGetData } from "@/components";
import { useEffect, useState } from "react";

type Props = {
  tagName: string 
}

export const TagSection = ({ tagName }: Props) => {
  const [tagColor, setTagColor] = useState('')
  const { tag } = useTag({tagName})
  const { data, error, isLoading, mutate } = useTaskByTag(tagName);

  useEffect(() => {
    if(tag) {
      setTagColor(tag.color)
    }
  }, [tag])

  if (isLoading)
    return (
      <LoadingSpinner
        message={`Loding tasks of ${capitalizeText(tagName)} tag...`}
      />
    );

    
    if (data) {

      return (
        <div>
        <div 
          className="w-full py-2 px-4 mt-4 font-bold text-white rounded-2xl border-2 border-white"
          style={{
            backgroundColor: tagColor
          }}
        >
          {data.tasks.length} {data.tasks.length === 1 ? "Task" : "Tasks"}
        </div>

        <ShowTasksSection tasks={data.tasks} />
      </div>
    );
  }

  if (error) return <ErrorGetData message="Error loading data, plese refresh the page." />
};
