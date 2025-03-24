'use client'

import { useState } from 'react';
import { mutate } from 'swr';
import axios from '@/config/axios'

import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { IoAlbumsOutline, IoCopy, IoFileTrayFull, IoRefresh, IoReload, IoTrash } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

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
        router.refresh()
        toast.success('Seed Tasks successfull')
    }
  
  return (
    <div className="grid gap-4">
        <Button className="w-52 border-sky-600" variant='outline'
            onClick={handleSeedTasks}
        >
            {loading.loading && loading.button === 'tasks' ? <IoReload className='animate-spin'/> : <IoCopy className='scale-110'/> }
            Seed Tasks
        </Button>

        <Button className="w-52 border-lime-600" variant='outline'
            onClick={handleSeedProjects}
        >
            {loading.loading && loading.button === 'projects' ? <IoReload className='animate-spin'/> : <IoAlbumsOutline className='scale-110'/> }
            Seed Projects
        </Button>

        <Button className="w-52 border-violet-600" variant='outline'
            onClick={handleSeedAll}
        >
            {loading.loading && loading.button === 'all' ? <IoReload className='animate-spin'/> : <IoFileTrayFull className='scale-110'/> }
            Seed All
        </Button>

        <Button className="w-52 border-sky-600" variant='destructive'>
            {loading.loading && loading.button === 'clean' ? <IoReload className='animate-spin'/> : <IoTrash className='scale-110'/> }
            Clean Data
        </Button>
    </div>
  )
}