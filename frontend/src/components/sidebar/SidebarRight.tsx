"use client";

import clsx from "clsx";
import Image from "next/image";
import { RadialChart } from "./RadialChart";
import { Button } from "../ui/button";
import { uiConfig } from "@/config/uiConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMemo } from "react";

export const SidebarRight = () => {

  const tasks = useSelector( (state: RootState) => state.tasks.allTasks)
  const isSidebarRightOpen = useSelector( (state: RootState) => state.sidebar.isSidebarRightOpen)

  const metrics = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.reduce( (total, item) => (item.status === 'completed' ? (total + 1) : total), 0),
      pending: tasks.filter(item => item.status === 'pending').length,
      overdue: tasks.reduce( (total, item) => (item.status === 'overdue' ? total + 1 : total), 0)
    }
  },[tasks])
  
if( isSidebarRightOpen ) return (
    <div className="w-[20rem] h-full md:flex flex-col overflow-y-auto pt-6">
      <div className="mx-6 ">

        {/* Profile card */}
        <div
          className="px-2 py-4 flex items-center gap-3 hover:bg-[#ededed] transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white rounded-lg"
          onClick={() => console.log("click profile")}
        >
          <Image
            src={"/logo.png"}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full"
          />

          <div>
            <h1 className="flex flex-col text-xl">
              <span className="font-medium">Hello, </span>
              <span className="font-bold">Daniel Merchan</span>
            </h1>
          </div>
          
        </div>


        {/* Metrics tasks */}
        <div className="flex flex-col gap-8 mt-6">

          <div className="grid grid-cols-2 gap-4">

          <div className="text-gray-400">
            <p>Total Tasks:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute h-[80%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
              {metrics.total}
              </span>
            </p> 
          </div>

          <div className="text-gray-400">
            <p>Completed:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute h-[80%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-teal-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {metrics.completed}
              </span>
            </p> 
          </div>

          <div className="text-gray-400">
            <p>Pending:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute h-[80%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
              {metrics.pending}
              </span>
            </p> 
          </div>

          <div className="text-gray-400">
            <p>Overdue:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute h-[80%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-lime-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
              {metrics.overdue}
              </span>
            </p> 
          </div>

          </div>

        </div> 

        <h3 className="mt-8 font-medium">Activity</h3>

        {/* Chart Graphic */}
        <div className="mt-4 ">
            <RadialChart 
              completed={metrics.completed}
              total={metrics.total}
            />
        </div>

        <Button className={clsx('w-full mt-4')}
            style={{
                backgroundColor: uiConfig.contrastColor,
            }}
            onClick={() => console.log('Log out button')}
        >
            Sign out
        </Button>

      </div>
    </div>

  );

};
