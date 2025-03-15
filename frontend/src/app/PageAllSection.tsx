'use client'

import { ErrorGetData } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasks } from "@/hooks"

export const PageAllSection = () => {
  const { tasks, error, isLoading, mutate } = useTasks({showTasks: true})

  if(isLoading) return <LoadingSpinner message="Loading Pending Tasks..."/>

  if(error) return <ErrorGetData message="Error getting tasks, please refresh the page."/>
  
  return (
    <>
        <ShowTasksSection />
    </>
  )
}