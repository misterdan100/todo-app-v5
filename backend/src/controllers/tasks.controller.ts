import { Request, response, Response } from 'express'
import Task from '../models/Task.model'
import Project from '../models/Project.model'
import { seedData } from '../data/seed_data'
import Tag from '../models/Tag.model'
import TaskTag from '../models/TaskTag.model'
import { createTag } from './utils/createTag'
import { Op } from 'sequelize'
import { generateRandomReadableColor } from '../utils/genRandomColor'

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

        if(!task) {
            res.status(404).json({success: false, message: 'Task not found'})
            return
        }

        // Title => .............
        if( task.name.trim() !== newData.name.trim()) {
            task.name = newData.name
        }
        
        // Description => 
        if( task.description.trim() !== newData.description.trim()) {
            task.description = newData.description
        }
        
        // status => 
        if( task.status !== newData.status) {
            task.status = newData.status
        }

        // favorite => 
        if( task.favorite !== newData.favorite) {
            task.favorite = newData.favorite
        }
        
        // Priority => 
        if( task.priority !== newData.priority) {
            task.priority = newData.priority
        }
        
        // Priority => 
        if( task.dueDate !== newData.dueDate) {
            task.dueDate = newData.dueDate
        }

        //Project =>  if project is different
        if(newData.project && newData.project.id !== task.projectId) {
            // if project is new
            if(newData.project.id.includes('new-')) {
                const newProject = await Project.create({name: newData.project.name, userId})
                task.projectId = newProject.id
            } else {
                // search existing different project
                const existingDifferentProject = await Project.findByPk(newData.project.id)
                task.projectId = existingDifferentProject.id
            }
        }

        //Project => if newProject is empty
        if(!newData.project) {
            task.projectId = null
        }

        
        // Tags => ......................................
        // list tags from req and old tags from task
        const oldTagsPromise = await TaskTag.findAll({where: {
            taskId: task.id,
            userId: userId
        }})
        const oldTags = oldTagsPromise.map( item => ({taskId: item.dataValues.taskId, tagId: item.dataValues.tagId, userId}))

        // list old tags from task in db
        const oldTagsIds: string[] = oldTags.map( item => item.tagId) || []

        let reqTags: {id: string, name: string}[] = newData.tags || []

        // 1. check if there are new- tags and create them
        const newTagsToCreate = reqTags.filter( item => item.id.includes('new-'))
                                    .map( item => ({
                                        name: item.name,
                                        color: generateRandomReadableColor(),
                                        userId
                                    }))

        if(newTagsToCreate.length > 0) {
            const resNewTags = await Tag.bulkCreate(newTagsToCreate)
            reqTags = reqTags.map( reqTag => {
                if( reqTag.id.includes('new-')) {

                    const newTag = resNewTags.find( i => i.name === reqTag.name)
                    return {id: newTag.id ,name: newTag.name}
                }
                return reqTag
            })
        }

        // 3. check if there are unused task and delete relation
        const reqTagsId = reqTags.map(tag => tag.id)
        const unusedTags = oldTagsIds.filter( oldTagId => !reqTagsId.includes(oldTagId))
                                    
        if(unusedTags.length > 0) {
            await TaskTag.destroy({where: {
                taskId: task.id,
                userId,
                tagId: {
                    [Op.in]: unusedTags
                }
            }})
        }

        // 4. check if there are new added tags and create relation
        const addedTags = reqTags.filter( tag => !oldTagsIds.includes(tag.id))
                                    .map( tag => ({
                                        taskId: task.id,
                                        userId,
                                        tagId: tag.id
                                    }))

        if(addedTags.length > 0) {
            await TaskTag.bulkCreate(addedTags)
        }
        
    
        await task.save()
        res.status(200).json({success: true, message: 'Task updated'})

    } catch (error) {
        console.log('[ERROR_UPDATETASK]', error)
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

export const changeStatusTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const task = await Task.findByPk(id)

        if(!task) {
            res.status(404).json({error: 'Task not found'})
            return
        }

        task.status = task.status !== 'completed' ? 'completed' : 'pending'
        task.save()
        res.status(200).json(task)
        
    } catch (error) {
        console.log('[ERROR_CHANGESTATUSTASK]', error.message)
        res.status(500).json({error: 'Error changing status task'})
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