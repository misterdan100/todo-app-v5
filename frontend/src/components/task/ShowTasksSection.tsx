"use client";

import useSWR, { mutate } from "swr";
import axios from "@/config/axios";
import { FilterButtons, Spinner, TaskItem } from "@/components";
import { container, item } from "@/utils";
import { motion } from "motion/react";
import { Task } from "@/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { switchModal } from "@/store/ui/modalSlice";
import { addTasks, addTasksAndFilter, cleanTasks } from "@/store/tasks/tasksSlice";
import { useEffect } from "react";
import { LoadingSpinner } from "../spinner/LoadingSpinner";

type Props = {
  page: "all" | "pending" | "completed" | "overdue";
};

export const ShowTasksSection = ({ page }: Props) => {
  // call to redux states and actions
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const isfiltering = useSelector((state: RootState) => state.tasks.filtering);
  const filteredTasks = useSelector(
    (state: RootState) => state.tasks.filteredTasks
  );

  const dispatch = useDispatch<AppDispatch>();

  // fetch data from db throught swr
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      // add tasks from db to view state
      dispatch(addTasksAndFilter(res.data));
      mutate('/tasks')
      return res.data as Task[];
    });
  // choose filter
  const urlFetch = page !== "all" ? `/tasks?filter=${page}` : "/tasks";
  const { data, error } = useSWR('filteredTasks', () => fetcher(urlFetch));

    useEffect(() => {
      // first clean tasks state to avoid ui interferences
      dispatch(cleanTasks())
    },[])

  if (!data)
    return (
      <LoadingSpinner message="Loding tasks..."/>
    );

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
          : tasksState.map((task) => <TaskItem key={task.id} task={task} />)}

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
