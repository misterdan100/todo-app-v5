'use client'

import { ErrorGetData } from "@/components"
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner"
import { ShowTasksSection } from "@/components/task/ShowTasksSection"
import { useTasksFiltered } from "@/hooks"
import { AppDispatch } from "@/store/store"
import { addKeyCache, addTasksToShow } from "@/store/tasks/tasksSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const PendingPageSection = () => {

  const { tasks, error, isLoading } = useTasksFiltered({filter: "pending"})
  const keyCache = `tasks_filter_pending`

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if(tasks) {
      dispatch(addTasksToShow(tasks))
      dispatch(addKeyCache(keyCache))
    }
  }, [tasks])
  

  if(isLoading) return <LoadingSpinner message="Loading Pending Tasks..."/>

  if(error) return <ErrorGetData message="Error getting pending tasks, please refresh the page."/>
  
  return (
    <>
        <ShowTasksSection tasks={tasks}/>
    </>
  )
}