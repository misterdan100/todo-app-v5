'use client'

import useSWR from 'swr'
import axios from '@/config/axios'
import { TaskItem } from "@/components";
import { container, item } from "@/utils";
import { motion } from 'motion/react';
import { Task } from '@/interface';

const fetcher = (url: string) => axios.get(url).then(res => res.data as Task[])


export default function Home() {
  const { data, error } = useSWR('/tasks', fetcher)

  if(!data) return <p>Loading tasks</p>

  if(data) return (
    <>
    {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <h3 className="font-bold">Filters.. components</h3>
      </div>

      {/* Content... */}
      <motion.div
        className="pb-[2rem] pt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {data?.map( task => (
          <TaskItem key={task.id} task={task} />
        ))}
        

        <motion.button 
          className="w-full py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out border-2 border-gray-300 border-dashed rounded-md h-36 hover:bg-gray-200 hover:border-none"
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>

    </>
  )
}
