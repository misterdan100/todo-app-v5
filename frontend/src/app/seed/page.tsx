'use client'

import { useState } from 'react';
import { mutate } from 'swr';
import axios from '@/config/axios'

import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { IoAlbumsOutline, IoCopy, IoFileTrayFull, IoRefresh, IoReload, IoTrash } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { revalidate } from '../page';
import { revalidatePath } from 'next/cache';
import { revalidateAllData } from '@/actions';

export default function SeedPage() {
    const router = useRouter()
    const [loading, setLoading] = useState<{loading: boolean, button: string}>({loading: false, button: ''})
    
    
    
    
    const handleSeedTasks = async () => {
        setLoading({loading: true, button: 'tasks'})

        const res = await axios.post('/tasks/seed')

        if(!res) {
            toast.error('Seed Tasks failed')
            return
        }

        mutate('/tasks')
        revalidateAllData({})
        setLoading({loading: false, button: ''})
        toast.success('Seed Tasks successfull')
    }
    
    const handleSeedProjects = async () => {
        setLoading({loading: true, button: 'projects'})

        const res = await axios.post('/projects/seed')
        const resTasks = await axios.post('/tasks/seed')

        if(!resTasks) {
            toast.error('Seed Tasks failed')
            setLoading({loading: false, button: ''})
            return
        }

        mutate('/tasks')
        setLoading({loading: false, button: ''})
        toast.success('Seed Tasks successfull')
    }
    
    const handleSeedAll = async () => {
        setLoading({loading: true, button: 'all'})

        const resProjects = await axios.post('/projects/seed')
        const resTags = await axios.post('/tags/seed')
        const resTasks = await axios.post('/tasks/seed')

        if(!resTasks || !resProjects) {
            toast.error('Seed Tasks failed')
            setLoading({loading: false, button: ''})
            return
        }

        setLoading({loading: false, button: ''})
        mutate('/tasks')
        revalidateAllData({})
        router.refresh()
        toast.success('Seed Tasks successfull')
    }

    const handleCleanData = async () => {
        setLoading({loading: true, button: 'clean'})

        const res = await axios('/users/cleanData')

        if(!res) {
            toast.error('Clean Data failed')
            setLoading({loading: false, button: ''})
            return
        }

        setLoading({loading: false, button: ''})
        mutate('/tasks')
        revalidateAllData({})
        router.refresh()
        toast.success('Clean Data successfull')
    }
  
  return (
    <div className="grid gap-4">

        <Button className="w-52 h-fit border-sky-600 dark:bg-slate-700 grid justify-center" variant='outline'
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

        {/* <Button className="w-52 h-fit border-lime-600 dark:bg-slate-700 grid justify-center" variant='outline'
            onClick={handleSeedProjects}
        >
            <div className='flex items-center justify-center gap-3'>
                {loading.loading && loading.button === 'projects' ? <IoReload className='animate-spin'/> : <IoAlbumsOutline className='scale-110'/> }
                Seed Projects
            </div>
            <p
                className=' font-normal text-sm dark:text-gray-400'
            >Create demo projects</p>
        </Button> */}

        <Button className="w-52 h-fit border-violet-600 dark:bg-slate-700 grid justify-center" variant='outline'
            onClick={handleSeedAll}
        >
            <div className='flex items-center justify-center gap-3'>
                {loading.loading && loading.button === 'all' ? <IoReload className='animate-spin'/> : <IoFileTrayFull className='scale-110'/> }
                Seed All
            </div>
            <p
                className=' font-normal text-sm dark:text-gray-400'
            >Create projects, tasks, and tags</p>
        </Button>

        <Button className="w-52 h-fit grid justify-center" variant='destructive'
            onClick={handleCleanData}
        >
            <div className='flex items-center justify-center gap-3'>
                {loading.loading && loading.button === 'clean' ? <IoReload className='animate-spin'/> : <IoTrash className='scale-110'/> }
                Clean Data
            </div>
            <p
                className=' font-normal text-sm dark:text-gray-400'
            >Remove tasks, tags, and projects</p>
        </Button>
    </div>
  )
}