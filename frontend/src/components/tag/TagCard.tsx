"use client";

import { Tag } from "@/interface";
import { statusColors, uiConfig } from "@/config/uiConfig";
import clsx from "clsx";
import { motion } from "motion/react";

// ShadCN imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import styled from "styled-components";
import Link from "next/link";
import { item } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getTask } from "@/api";
import { switchModal } from "@/store/ui/modalSlice";
import { addKeyCache, switchIsEditing } from "@/store/tasks/tasksSlice";
import { mutate } from "swr";
import { useRouter } from "next/navigation";


// Types
interface TagCardProps extends React.ComponentProps<typeof Card> {
  tag: Tag;
}

const StyledTitle = styled.div`
  cursor: pointer;

  &:hover {
    color: ${uiConfig.mainColor};
  }
`;

export function TagCard({ tag, className, ...props }: TagCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { id, name, color, tasks } = tag;

  const nameToLinks = name.replaceAll(' ', '-')

  const handleEditTask = async (taskId: string) => {
    const completedTask = await getTask(taskId)

    dispatch(switchModal(true))
    dispatch(switchIsEditing(completedTask))
    dispatch(addKeyCache('/tags/tasks'))

  }

  return (
    <motion.div variants={item}>
      <Card className={cn("dark:bg-slate-900 dark:border-slate-700 dark:border-2  h-fit", className)} {...props}>
        <CardHeader className="pb-0">
          <CardTitle>
            <Link href={`/tags/${nameToLinks}`}>
              <StyledTitle>{name.toLocaleUpperCase()}</StyledTitle>
            </Link>
          </CardTitle>
          <CardDescription
            className="border-b-2"
            style={{
              borderColor: color,
            }}
          >
            {tasks?.length} {tasks?.length === 1 ? "Task" : "Tasks"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid pb-4 px-4 pt-4 ">
          {tasks?.map((task, index) => (
            <div
              key={index}
              className="p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700  rounded-md grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0  hover:cursor-pointer transition-colors"
            >
              <span
                className="flex h-2 w-2 translate-y-1 rounded-full"
                style={{
                  backgroundColor: statusColors[task.status],
                }}
              />
              <div className="space-y-1">
                <p className="text-gray-68 text-sm font-medium leading-none hover:text-black dark:hover:text-gray-300"
                  onClick={() => handleEditTask(task.id)}
                >
                  {task.name}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  {task.status}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
