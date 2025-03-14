"use client";

import styled from "styled-components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { useTaskByTag } from "@/hooks";
import { capitalizeText } from "@/utils";
import { Tag } from "@/interface";
import { ErrorGetData } from "@/components";

type Props = {
  tag: Tag 
}

export const TagSection = ({ tag }: Props) => {
  const { data, error, isLoading, mutate } = useTaskByTag(tag.name);

  const SlyledDivBanner = styled.div`
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    background-color: ${tag.color};
    font-weight: 700;
    color: white;
    border-radius: 1rem;
    border: 2px solid white;
  `;

  if (isLoading)
    return (
      <LoadingSpinner
        message={`Loding tasks of ${capitalizeText(tag.name)} tag...`}
      />
    );

    
    if (data) {

      return (
        <div>
        <SlyledDivBanner className="">
          {data.tasks.length} {data.tasks.length === 1 ? "Task" : "Tasks"}
        </SlyledDivBanner>

        <ShowTasksSection tasks={data.tasks} />
      </div>
    );
  }

  if (error) return <ErrorGetData message="Error loading data, plese refresh the page." />
};
