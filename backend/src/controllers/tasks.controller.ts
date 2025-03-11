import { Request, response, Response } from 'express'
import Task from '../models/Task.model'
import Project from '../models/Project.model'
import { seedData } from '../data/seed_data'
import Tag from '../models/Tag.model'
import TaskTag from '../models/TaskTag.model'

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll({
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

        // Validate if task has a name
        if(!newTaskData.name) {
            res.status(400).json({error: 'Task name is required'})
            return
        }
        const { projectId, ...rest } = newTaskData 
        
        // Create task with project
        if(projectId && projectId !== '') {
            const project = await Project.findByPk(newTaskData.projectId)
            if(!project) {
                res.status(400).json({error: 'Project id not found'})
                return
            }

            const newTask = await Task.create(rest)
            
            // await project.$add( 'tasks' , newTask)
            newTask.projectId = projectId
            await newTask.save()
            res.status(200).json(newTask)
            return
        }

        const newTask = await Task.create(rest)

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

export const seedTasks = async (req, res: Response) => {
    try {
        // + change title by name
        // + convert due date in a new Date type
        // + become status to completed, pending and overdue
        // + look for project id and relationate
        // + look for tags id and relationate
        // + mark as a favorite in a random way

        // clean tasks in db
        await Task.destroy({where: {}})

        const randomBoolean = (): boolean => {
            return Math.random() >= 0.5
        }

        const chooseStatus = (current: string): string => {
            const dictionary = {
                "inProgress": 'overdue',
                "notStarted": 'pending',
                "done": 'completed',
            }

            return dictionary[current]
        }

        const convertDate = (current: string): Date => {
            const reverseDate = current.split('/').reverse().join('-')
            return new Date(reverseDate)
        }

        const projectsDB = await Project.findAll()
        const tagsDB = await Tag.findAll()

        const chooseProject = (projectName: string): string => {
            return projectsDB.find(item => item.name.toLowerCase() === projectName.toLowerCase()).id
        }

        const chooseTags = (currentTags: string[]): string[] => {
            return currentTags.map(item => {
                const tag = tagsDB.find( itemDB => itemDB.name.toLowerCase() === item.toLowerCase())

                return tag.id
            })
        }

        const tasks = seedData.todos.map( task => {
            const newTask = {
                name: task.title,
                description: task.description,
                favorite: randomBoolean(),
                status: chooseStatus(task.status),
                priority: task.priority,
                dueDate: convertDate(task.dueDate),
                projectId: chooseProject(task.project),
                tags: chooseTags(task.tags)
            }
            return newTask
        })

        await Task.bulkCreate(tasks)
        const tasksDB = await Task.findAll()

        // relation tags / tasks
        const bulkTagsTasks: {taskId: string, tagId: string}[] = []

        tasksDB.forEach( taskDB => {
            const todo = seedData.todos.find( t => t.title.toLowerCase() === taskDB.name.toLowerCase())

            todo.tags.forEach( tagToDo => {
                const tagId = tagsDB.find( i => i.name.toLowerCase() === tagToDo.toLowerCase())
                bulkTagsTasks.push({taskId: taskDB.id, tagId: tagId.id})
            })
        })

        await TaskTag.bulkCreate(bulkTagsTasks)

        res.status(200).json(tasksDB)

    } catch (error) {
        console.log('ERROR_SEEDTASKS', error.message)
        res.status(500).json({error: 'Error seeding tasks'})
    }
}