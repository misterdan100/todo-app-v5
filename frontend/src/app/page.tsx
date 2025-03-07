'use client'

import { TaskItem } from "@/components";
import { Button } from "@/components/ui/button";
import { container, item } from "@/utils";
import { motion } from 'motion/react'


export default function Home() {
  return (
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
        {Array.from({length: 15},(_, index) => (
          <TaskItem />
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
