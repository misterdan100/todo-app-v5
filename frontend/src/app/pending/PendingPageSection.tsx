'use client'

import { Spinner } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasksFiltered } from "@/hooks"

export const PendingPageSection = () => {
  const { tasks, error, isLoading, mutate } = useTasksFiltered({filter: "pending"})


  if(isLoading) return <LoadingSpinner message="Loading Pending Tasks..."/>
  
  return (
    <>
        <ShowTasksSection tasks={tasks}/>
    </>
  )
}