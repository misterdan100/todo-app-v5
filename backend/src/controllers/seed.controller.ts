import { Request, Response } from 'express'
import TaskTag from "../models/TaskTag.model"
import Tag from '../models/Tag.model'
import Task from '../models/Task.model'
import Project from '../models/Project.model'

export const clearData = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        await TaskTag.destroy({where: {userId}})
        await Tag.destroy({where: {userId}})
        await Task.destroy({where: {userId}})
        await Project.destroy({where: {userId}})

        res.status(200).json('Seed completed')

    } catch (error) {
        console.log('[ERROR_CLEARDATA]', error.message)
        res.status(400).json({error: 'Error clear data'})
    }
}