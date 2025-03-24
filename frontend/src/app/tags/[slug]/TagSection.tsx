"use client";

import styled from "styled-components";
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

  const SlyledDivBanner = styled.div`
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    /* background-color: ${tagColor}; */
    font-weight: 700;
    color: white;
    border-radius: 1rem;
    border: 2px solid white;
  `;

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
        <SlyledDivBanner 
          className=""
          style={{
            backgroundColor: tagColor
          }}
        >
          {data.tasks.length} {data.tasks.length === 1 ? "Task" : "Tasks"}
        </SlyledDivBanner>

        <ShowTasksSection tasks={data.tasks} />
      </div>
    );
  }

  if (error) return <ErrorGetData message="Error loading data, plese refresh the page." />
};
