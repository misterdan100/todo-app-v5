"use client";

import { TaskItem } from "@/components";
import { container, item } from "@/utils";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { switchModal } from "@/store/ui/modalSlice";
import {
  cleanTasks
} from "@/store/tasks/tasksSlice";
import { useEffect } from "react";
import { Task } from "@/interface";

type Props = {
  tasks: Task[]
};

export const ShowTasksSection = ({ tasks }: Props) => {
  // call to redux states and actions
  const isfiltering = useSelector((state: RootState) => state.tasks.filtering);
  const filteredTasks = useSelector((state: RootState) => state.tasks.filteredTasks);
  const dispatch = useDispatch<AppDispatch>();  

  return (
    <>
      {/* Content... */}
      <motion.div
        className="pb-[2rem] pt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {isfiltering
          ? filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
          : tasks?.map((task) => <TaskItem key={task.id} task={task} />)}

        <motion.button
          className="w-full py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out border-2 border-gray-300 border-dashed rounded-md h-36 hover:bg-gray-200 hover:border-none"
          variants={item}
          onClick={() => dispatch(switchModal(true))}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </>
  );
};
