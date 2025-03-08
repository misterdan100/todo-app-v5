import { Request, Response } from 'express'
import Task from '../models/Task.model'

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll()

        res.status(200).json(tasks)

    } catch (error) {
        console.log('[ERROR_GETTASKS]', error.message)
        res.status(400).json({error: 'Error getting tasks'})
    }
}

export const getTaskById = async ( req: Request, res: Response) => {
    try {
        const id = req.params.id

        const task = await Task.findByPk(id)
        if(!task) {
            res.status(404).json({error: 'Task not found by id'})
            return
        }

        res.status(200).json(task)

    } catch (error) {
        console.log('[ERROR_GETTASKBYID]', error.message)
        res.status(400).json({error: 'Error getting task by id'})
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const newTaskData = req.body

        if(!newTaskData.name) {
            res.status(400).json({error: 'Task name is required'})
            return
        }

        const newTask = await Task.create(newTaskData)

        res.status(200).json(newTask)
        
    } catch (error) {
        console.log('[ERROR_CREATETASK]', error.message)
        res.status(400).json({error: 'Error creating new task'})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newData = req.body


        const task = await Task.findByPk(id)

        if(!task) {
            res.status(404).json({error: 'Task not found'})
            return
        }

        await task.update(newData)
        const response = await task.save()
        res.status(200).json(response)

    } catch (error) {
        console.log('[ERROR_UPDATETASK]', error.message)
        res.status(400).json({error: 'Error updating task'})
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const task = await Task.findByPk(id)
        if(!task) {
            res.status(404).json({error: 'Task not found by id'})
            return
        }

        await task.destroy()
        res.status(200).json({message: 'Task deleted'})
    } catch (error) {
        console.log('[ERROR_DELETETASK]', error.message)
        res.status(400).json({error: 'Error deleting task'})
    }
}