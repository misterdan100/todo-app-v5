"use client";

import styled from "styled-components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { capitalizeText, generateRandomReadableColor } from "@/utils";
import { Project } from "@/interface";
import { ErrorGetData } from "@/components";
import { useProjectTasks } from "@/hooks/useProjectTasks";

type Props = {
  project: string 
}

  const SlyledDivBanner = styled.div`
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    background-color: ${generateRandomReadableColor()};
    font-weight: 700;
    color: white;
    border-radius: 1rem;
    border: 2px solid white;
  `;

export const ProjectSection = ({ project }: Props) => {
  const { data, error, isLoading } = useProjectTasks(project);


  if (isLoading)
    return (
      <LoadingSpinner
        message={`Loding tasks of ${capitalizeText(project)} Project...`}
      />
    );

    
    if (data) {

      return (
        <div>
        <SlyledDivBanner className="">
          {data.tasks?.length} {data.tasks?.length === 1 ? "Task" : "Tasks"}
        </SlyledDivBanner>

        <ShowTasksSection />
      </div>
    );
  }

  if (error) return <ErrorGetData message="Error loading data, plese refresh the page." />
};
