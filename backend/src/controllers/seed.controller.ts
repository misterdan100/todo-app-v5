import { Request, Response} from 'express'
import Project from "../models/Project.model"
import Task from "../models/Task.model"
import TaskTag from "../models/TaskTag.model"
import { seedTags } from "./tags.controller"
import { seedProjects } from './projects.controller'
import { seedData } from '../data/seed_data'
import { seedTasks } from './tasks.controller'

export const clearAndSeed = async (req: Request, res: Response) => {
    try {

        res.status(200).json('Seed completed')

    } catch (error) {
        console.log('[ERROR_GETPROJECT]', error.message)
        res.status(400).json({error: 'Error getting projects'})
    }
}