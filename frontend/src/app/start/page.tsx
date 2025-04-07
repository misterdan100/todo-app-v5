'use client'

import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { switchModal } from "@/store/ui/modalSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/config/axios";
import { mutate } from "swr";
import { toast } from "sonner";
import { IoCopy, IoReload } from "react-icons/io5";

export default function StartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<{loading: boolean, button: string}>({loading: false, button: ''})

  const handleSeedTasks = async () => {
    setLoading({loading: true, button: 'tasks'})

    const res = await axios.post('/tasks/seed')

    if(!res) {
        toast.error('Seed Tasks failed')
        return
    }

    mutate('/tasks')
    setLoading({loading: false, button: ''})
    toast.success('Seed Tasks successfull')
}
  
  return (
    <div className="flex items-center flex-col gap-6">
      <h3
        className="text-xl font-bold text-gray-700 dark:text-gray-300"
      >You don&apos;t have tasks.</h3>

        <Button
          className="w-64 h-full py-2 px-4 primary"
          onClick={() => dispatch(switchModal(true))}
        >
          Start adding a new Task
        </Button>

        <Button className="w-64 h-fit border-sky-600 dark:bg-slate-700 grid justify-center" variant='outline'
            onClick={handleSeedTasks}
        >
            <div className='flex items-center justify-center gap-3'>
                {loading.loading && loading.button === 'tasks' ? <IoReload className='animate-spin'/> : <IoCopy className='scale-110'/> }
                Seed Tasks
            </div>
            <p
                className=' font-normal text-sm dark:text-gray-400'
            >Create demo tasks</p>
        </Button>
    </div>
  )
}