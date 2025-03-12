'use client'

import { Tag } from "@/interface";
import { statusColors, uiConfig } from "@/config/uiConfig";
import clsx from "clsx";

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

// Types
interface TagCardProps extends React.ComponentProps<typeof Card> {
  tag: Tag;
}

const StyledTitle = styled.div`
  cursor: pointer;

  &:hover {
    color: ${uiConfig.mainColor}
  }
`

export function TagCard({ tag, className, ...props }: TagCardProps) {
  const { id, name, color, tasks } = tag;

  return (
    <Card className={cn(" h-fit", className)} {...props}>
      <CardHeader className="pb-0">
        <CardTitle>
          <Link 
            href={`/tags/${name}`}
          >
            <StyledTitle>
            {name.toLocaleUpperCase()}
            </StyledTitle>
          </Link>
        </CardTitle>
        <CardDescription
          className="border-b-2 pb-"
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
              // className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 hover:cursor-pointer"
              className="p-2 w-full hover:bg-gray-100 rounded-md grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0  hover:cursor-pointer"
            >
              <span 
                className='flex h-2 w-2 translate-y-1 rounded-full'
                style={{
                  backgroundColor: statusColors[task.status]
                }}
              />
              <div className="space-y-1">
                <p className="text-gray-68 text-sm font-medium leading-none hover:text-black">{task.name}</p>
                <p className="text-sm text-muted-foreground italic">{task.status}</p>
              </div>
            </div>
          ))}


      </CardContent>
    </Card>
  );
}
