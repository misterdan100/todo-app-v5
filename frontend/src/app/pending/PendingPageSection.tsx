'use client'

import { ErrorGetData } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasksFiltered } from "@/hooks"

export const PendingPageSection = () => {
  const { tasks, error, isLoading, mutate } = useTasksFiltered({filter: "pending"})

  if(isLoading) return <LoadingSpinner message="Loading Pending Tasks..."/>

  if(error) return <ErrorGetData message="Error getting pending tasks, please refresh the page."/>
  
  return (
    <>
        <ShowTasksSection tasks={tasks}/>
    </>
  )
}