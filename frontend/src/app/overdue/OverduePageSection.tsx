'use client'

import { Spinner } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasksFiltered } from "@/hooks"

export const OverduePageSection = () => {
  const { tasks, error, isLoading, mutate } = useTasksFiltered({filter: "overdue"})


  if(isLoading) return <LoadingSpinner message="Loading Overdue Tasks..."/>
  
  return (
    <>
        <ShowTasksSection tasks={tasks}/>
    </>
  )
}