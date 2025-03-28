import { Request, response, Response } from 'express'
import Task from '../models/Task.model'
import Project from '../models/Project.model'
import { seedData } from '../data/seed_data'
import Tag from '../models/Tag.model'
import TaskTag from '../models/TaskTag.model'
import { createTag } from './utils/createTag'

export const getTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        if(req.query.filter) {
            const tasks = await Task.findAll({
                where: {status: req.query.filter, userId},
                order: [['createdAt', 'DESC']]
            })

            res.status(200).json(tasks)
            return
        }

        const tasks = await Task.findAll({
            where: {userId},
            order: [['createdAt', 'DESC']]
        })

        res.status(200).json(tasks)

    } catch (error) {
        console.log('[ERROR_GETTASKS]', error.message)
        res.status(400).json({error: 'Error getting tasks'})
    }
}

export const getTaskById = async ( req: Request, res: Response) => {
    try {
        const id = req.params.id

        const task = await Task.findByPk(id, {
            include: [Tag, Project]
        })
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
        const userId = req.user.id
        const newTaskData = req.body

        // Validate if task has a name
        if(!newTaskData.name) {
            res.status(400).json({ success: false, message: 'Task name is required'})
            return
        } 
        
        // Create task with project
        if(newTaskData.project) {
            const projectFromBody = newTaskData.project

            // If is a new project
            if(projectFromBody.id.includes('new-')) {
                const newProjectDB = await Project.create({name: projectFromBody.name, userId})
                newTaskData.projectId = newProjectDB.id

            } else {
                // if is a existing project
                const project = await Project.findByPk(newTaskData.project.id)
                if(!project) {
                    res.status(400).json({ success: false ,message: 'Project id not found'})
                    return
                }
    
                newTaskData.projectId = project.id
            }
        }

        // Evaluate Tags
        if(newTaskData.tags.length) {
            const findTagInDB = async (tagId: string) => {
                const tag = await Tag.findByPk(tagId)
                return tag.id
            } 

            const cleanedTags = newTaskData.tags.map( async (item: {id: string, name: string}) => {
                // if is a new tag
                if(item.id.includes('new-')) {
                    const tag = await createTag({name: item.name, userId})
                    return tag.id
                } 

                //if is a existing tag
                return await findTagInDB(item.id)
            }) 

            newTaskData.tags = await Promise.all(cleanedTags)
        }

        newTaskData.priority = newTaskData.priority ?? 'low'

        const {name, description, dueDate, favorite, priority, status, tags} = newTaskData


        const newTask = {
            userId,
            name, 
            description, 
            dueDate, 
            favorite, 
            priority, 
            projectId: newTaskData.projectId ?? undefined, 
            status, 
            tags
        }

        const task = await Task.create(newTask)

        // Relationate task with tags
        const relationObj: {taskId: string, tagId: string, userId: string}[] = [] 

        newTask.tags.forEach( item => {
            relationObj.push({
                taskId: task.id,
                tagId: item,
                userId
            })
        })

        await TaskTag.bulkCreate(relationObj)

        res.status(200).json({success: true, message: 'Task created', data: task})
        
    } catch (error) {
        console.log('[ERROR_CREATETASK]', error.message)
        res.status(400).json({error: 'Error creating new task'})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = req.user.id

        const newData = req.body


        const task = await Task.findByPk(id)

        //Todo: if project is different


        //Todo: Check if tags are different
        //Todo: check if there are unused tags


        if(!task) {
            res.status(404).json({success: false, message: 'Task not found'})
            return
        }

        await task.update(newData)
        const response = await task.save()
        res.status(200).json({success: true, message: 'Task updated'})

    } catch (error) {
        console.log('[ERROR_UPDATETASK]', error.message)
        res.status(400).json({success: false, message: 'Error updating task'})
    }
}

export const changeFavoriteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const task = await Task.findByPk(id)

        if(!task) {
            res.status(404).json({error: 'Task not found'})
            return
        }

        task.favorite = !task.favorite
        task.save()
        res.status(200).json(task)
        
    } catch (error) {
        console.log('[ERROR_CHANGEFAVORITETASK]', error.message)
        res.status(500).json({error: 'Error changing favorite task'})
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const { id } = req.params

        const task = await Task.findByPk(id)
        if(!task) {
            res.status(404).json({success: false, message: 'Task not found by id'})
            return
        }

        await task.destroy()

        await TaskTag.destroy({
            where: {
                userId,
                taskId: task.id
            }
        })

        res.status(200).json({success: true, message: 'Task deleted'})
    } catch (error) {
        console.log('[ERROR_DELETETASK]', error.message)
        res.status(400).json({success: false, message: 'Error deleting task'})
    }
}

export const seedTasks = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id

        // clean tasks in db
        await TaskTag.destroy({where: {userId}})
        await Task.destroy({where: {userId}})
        
        // + mark as a favorite in a random way
        const randomBoolean = (): boolean => {
            return Math.random() >= 0.5
        }
        
        // + become status to completed, pending and overdue
        const chooseStatus = (current: string): string => {
            const dictionary = {
                "inProgress": 'overdue',
                "notStarted": 'pending',
                "done": 'completed',
            }
            return dictionary[current]
        }
        
        // + convert due date in a new Date type
        const convertDate = (current: string): Date => {
            const reverseDate = current.split('/').reverse().join('-')
            return new Date(reverseDate)
        }
        
        const projectsDB = await Project.findAll({where: {userId}})
        const tagsDB = await Tag.findAll({where: {userId}})
        
        // + look for project id and relationate
        const chooseProject = (projectName: string): string => {
            return projectsDB.find(item => item.name.toLowerCase() === projectName.toLowerCase()).id
        }
        
        // + look for tags id and relationate
        const chooseTags = (currentTags: string[]): string[] => {
            return currentTags.map(item => {
                const tag = tagsDB.find( itemDB => itemDB.name.toLowerCase() === item.toLowerCase())
                
                return tag.id
            })
        }
        
        // + Create task object
        const tasks = seedData.todos.map( task => {
            const newTask = {
                name: task.title,
                description: task.description,
                favorite: randomBoolean(),
                status: chooseStatus(task.status),
                priority: task.priority,
                dueDate: convertDate(task.dueDate),
                projectId: chooseProject(task.project),
                tags: chooseTags(task.tags),
                userId
            }
            return newTask
        })

        await Task.bulkCreate(tasks)
        const tasksDB = await Task.findAll({where: {userId}})

        // relation tags / tasks
        const bulkTagsTasks: {taskId: string, tagId: string, userId: string}[] = []

        tasksDB.forEach( taskDB => {
            const todo = seedData.todos.find( t => t.title.toLowerCase() === taskDB.name.toLowerCase())

            todo.tags.forEach( tagToDo => {
                const tagId = tagsDB.find( i => i.name.toLowerCase() === tagToDo.toLowerCase())
                bulkTagsTasks.push({
                    taskId: taskDB.id, 
                    tagId: tagId.id,
                    userId
                })
            })
        })

        await TaskTag.bulkCreate(bulkTagsTasks)

        res.status(200).json(tasksDB)

    } catch (error) {
        console.log('ERROR_SEEDTASKS', error.message)
        res.status(500).json({error: 'Error seeding tasks'})
    }
}