'use client'

import { Spinner } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasksFiltered } from "@/hooks"

export const CompletedPageSection = () => {
  const { tasks, error, isLoading, mutate } = useTasksFiltered({filter: "completed"})


  if(isLoading) return <LoadingSpinner message="Loading Completed Tasks..."/>
  
  return (
    <>
        <ShowTasksSection tasks={tasks}/>
    </>
  )
}