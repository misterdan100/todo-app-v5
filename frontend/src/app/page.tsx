"use client";

import { HeaderPage } from "@/components";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ShowTasksSection } from "@/components/task/ShowTasksSection";
import { useTasks } from "@/hooks";
import { AppDispatch } from "@/store/store";
import { addTasksAndFilter, addTasksToShow } from "@/store/tasks/tasksSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const { tasks, error, isLoading } = useTasks();
  const dispatch = useDispatch<AppDispatch>();

  if (isLoading) return <LoadingSpinner message="Loding tasks..." />;

  if (tasks) {
    dispatch(addTasksAndFilter(tasks));

    return (
      <>
        <HeaderPage title="All Tasks" />

        <ShowTasksSection tasks={tasks} />
      </>
    );
  }
}
