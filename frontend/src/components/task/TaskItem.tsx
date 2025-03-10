"use client";

import { Task } from "@/interface";
import axios from "@/config/axios";
import { item } from "@/utils";
import clsx from "clsx";
import { motion } from "motion/react";
import { IoCreate, IoStar, IoTrashBin } from "react-icons/io5";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addTasksAndFilter } from "@/store/tasks/tasksSlice";

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const tasksState = useSelector( (state: RootState) => state.tasks.tasks)
  const dispatch = useDispatch<AppDispatch>()

  const { id, name, description, dueDate, priority, favorite: taskFav } = task;
  const [favorite, setFavorite] = useState(taskFav);

  const handleChangeFavorite = async () => {
    try {
      await mutate(
        `/tasks/${id}`,
        axios.put(`/tasks/${id}/favorite`).then((res) => {
          dispatch(addTasksAndFilter(tasksState.map(task => {
            if(task.id === id) {
              task.favorite = !task.favorite
            }
            return task
          })))

          return res.data as Task
        }),
        {
          optimisticData: setFavorite((_prev) => !_prev),
          rollbackOnError: true,
          revalidate: true,
        }
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
        await mutate(`/tasks`, 
            axios.delete(`/tasks/${id}`).then(() => {
                return axios.get('/tasks').then(res => res.data)
            }),{
                rollbackOnError: true,
                revalidate: true,
            }
        )
    } catch (error) {
        console.error("Error deleting task:", error);
    }
  }

  const handleCheck = async () => {
    
  }

  return (
    <motion.div
      className="h-44 px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="text-2xl font-bold text-gray-800">{name}</h4>
        <p className="line-clamp-3">{description}</p>
      </div>

      {/* Footer card */}
      <div className="flex items-center justify-between mt-auto">
        <p className="text-sm text-gray-400">2 days ago</p>
        <p className="text-sm font-bold text-yellow-500">{priority}</p>

        {/* Action Icons */}
        <div className="flex items-center gap-3 text-xl text-[1.2rem]">
          <button
            // className='text-gray-400'
            className={clsx({
              "text-gray-400": !favorite,
              "text-yellow-400": favorite,
            })}
            onClick={handleChangeFavorite}
          >
            <IoStar />
          </button>
          <button
            className="text-blue-400"
            onClick={() => console.log("edit button")}
          >
            <IoCreate />
          </button>
          <button
            className="text-red-400"
            onClick={handleDeleteTask}
          >
            <IoTrashBin />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
