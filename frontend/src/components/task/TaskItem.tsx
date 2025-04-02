"use client";

import { Task } from "@/interface";
import { capitalizeText, formatDate, item } from "@/utils";
import clsx from "clsx";
import { motion } from "motion/react";
import {
  IoCheckmarkCircle, IoEllipseOutline,
  IoRefresh,
  IoReloadCircleOutline,
  IoStar,
  IoTrashBin
} from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import styled from "styled-components";
import { priorityColors } from "@/config/uiConfig";
import { changeStatus, deleteTask, getTask, switchFavorite } from "@/api";
import { useRouter } from "next/navigation";
import { switchIsEditing } from "@/store/tasks/tasksSlice";
import { mutate } from "swr";
import { toast } from "sonner";
import { switchModal } from "@/store/ui/modalSlice";

type Props = {
  task: Task;
};

// priority color text
// with $ - these props won't be passed to the DOM element:
const StyledPriorityP = styled.p<{ $priorityColor: string }>`
  color: ${(props) => props.$priorityColor};
`;

// Component ---------------------------------------------
export const TaskItem = ({ task }: Props) => {
  const router = useRouter()

  const { id, name, description, dueDate, priority, favorite: taskFav, status } = task;
  const [favorite, setFavorite] = useState(task.favorite);
  const [isCompleted, setIsCompleted] = useState(status === 'completed' ? true : false);
  const [loadingDelete, setLoadingDelete] = useState(false)

  // Redux states
  const keyCache = useSelector( (state: RootState) => state.tasks.keyCache)
  const dispatch = useDispatch<AppDispatch>()

  // get priority color or default
  const priorityColor = priorityColors[priority] || "#000000";

  const handleChangeFavorite = async () => {
    try {
      const res = await switchFavorite({ taskId: id });

      // optimistic update
      setFavorite((prev) => !prev);

      if (!res) {
        // return the previews favrotie value if update db fail
        setFavorite((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleDeleteTask = async () => {
    setLoadingDelete(true)
    
    const res = await deleteTask({taskId: id});
    if(res.success) {
      
      mutate(keyCache)
      if(keyCache !== '/tasks') {
        mutate('/tasks')
      }
      toast.success(res.message)
      return
      
    }
    toast.error(res.message)
    setLoadingDelete(false)
  };

  // If this task has been marked as deleted, don't render it

  const handleCheck = async () => {
    try {
      const newStatus = status === 'completed' ? 'pending' : 'completed'
      const res = await changeStatus(id, newStatus)

      setIsCompleted(newStatus === 'completed' ? true : false)
      
      if(!res) {
        setIsCompleted(newStatus === 'completed' ? false : true)
        return
      }

      mutate('/tasks')

    } catch (error) {
      console.error("Error changing task status:", error);
    }
  };

  const handleEditTask = async () => {
    const completedTask = await getTask(task.id)

    dispatch(switchModal(true))
    dispatch(switchIsEditing(completedTask))
  }

  return (
    <motion.div
      className="h-fit px-4 py-3 flex flex-col gap-4 hover:shadow-lg shadow-gray-200 bg-[#f9f9f9] rounded-lg border-2 border-white  dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900 transition-all"
      variants={item}
    >
      <div>
        <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-primary transition-colors"
          onClick={handleEditTask}
        >{name}</h4>
        <p className="line-clamp-3 dark:text-gray-300">{description}</p>
      </div>

      {/* Footer card */}
      <div className="flex items-center justify-between mt-auto">
        {dueDate && (
          <p className="text-sm text-gray-400">{formatDate(dueDate)}</p>
        )}
        <StyledPriorityP
          $priorityColor={priorityColor}
          className="text-sm font-bold text-yellow-500"
        >
          {capitalizeText(priority)}
        </StyledPriorityP>

        {/* Action Icons */}
        <div className="flex items-center gap-3 text-xl text-[1.2rem]">
          <button
            className={clsx({
              "text-gray-400": !favorite,
              "text-yellow-400": favorite,
            })}
            onClick={handleChangeFavorite}
          >
            <IoStar />
          </button>
          <button
            className="text-blue-400 hover:scale-125 transition-transform "
            onClick={handleCheck}
          >
            {isCompleted ? (
              <IoCheckmarkCircle />
            ) : (
              <IoEllipseOutline />
            )}
          </button>
          <button className="text-red-400" onClick={handleDeleteTask}>
            { loadingDelete ? <IoRefresh className="animate-spin text-gray-800 dark:text-gray-300"/> : <IoTrashBin />}
            
          </button>
        </div>
      </div>
    </motion.div>
  );
};
