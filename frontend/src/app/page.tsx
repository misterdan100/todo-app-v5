"use client";

export const revalidate = 0

import { ErrorGetData, HeaderPage } from "@/components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { useTasks } from "@/hooks";

export default function Home() {
  const { tasks, error, isLoading, mutate, isValidating } = useTasks({ showTasks: true });

  if (isLoading || isValidating) return <LoadingSpinner message="Loding tasks..." />;

  if(error) return <ErrorGetData message="Error getting tasks, please refresh the page."/>

  if (tasks) {
    return (
      <>
        <HeaderPage title="All Tasks" />

        <ShowTasksSection tasks={tasks} />
      </>
    );
  }
}
