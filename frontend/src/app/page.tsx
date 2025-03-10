'use client'

import useSWR from 'swr';
import axios from '@/config/axios';
import { FilterButtons, TaskItem } from "@/components";
import { container, item } from "@/utils";
import { motion } from 'motion/react';
import { Task } from '@/interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { switchModal } from '@/store/ui/modalSlice';
import { addTasks, addTasksAndFilter } from '@/store/tasks/tasksSlice';


export default function Home() {
  const tasksState = useSelector( (state: RootState) => state.tasks.tasks)
  const filteredTasks = useSelector( (state: RootState) => state.tasks.filteredTasks)
  const isfiltering = useSelector( (state: RootState) => state.tasks.filtering)
  const dispatch = useDispatch<AppDispatch>()

  const fetcher = (url: string) => axios.get(url).then(res => {
    dispatch(addTasksAndFilter(res.data)) // update tasks state
    return res.data as Task[]
  })
  const { data, error } = useSWR('/tasks', fetcher)

  if(!data) return <p>Loading tasks</p>

  if(data) return (
    <>
    {/* Title */}
      <div className="flex flex-col items-center justify-between sm:flex-row gap-2">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <FilterButtons />
      </div>

      {/* Content... */}
      <motion.div
        className="pb-[2rem] pt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        { isfiltering ? filteredTasks.map( task => (
          <TaskItem key={task.id} task={task} />
        )) : tasksState.map( task => (
          <TaskItem key={task.id} task={task} />
        ))}
        

        <motion.button 
          className="w-full py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out border-2 border-gray-300 border-dashed rounded-md h-36 hover:bg-gray-200 hover:border-none"
          variants={item}
          onClick={() => dispatch(switchModal(true))}
        >
          Add New Task
        </motion.button>
      </motion.div>

    </>
  )
}
