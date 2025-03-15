'use client'

import { ErrorGetData, Spinner } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasksFiltered } from "@/hooks"

export const OverduePageSection = () => {
  const { tasks, error, isLoading, mutate } = useTasksFiltered({filter: "overdue"})


  if(isLoading) return <LoadingSpinner message="Loading Overdue Tasks..."/>

  if(error) return <ErrorGetData message="Error getting overdue tasks, please refresh the page."/>
  
  return (
    <>
        <ShowTasksSection tasks={tasks}/>
    </>
  )
}