import { Request, Response} from 'express'
import Tag from '../models/Tag.model'
import { seedData } from '../data/seed_data'
import Task from '../models/Task.model'
import { generateRandomReadableColor } from '../utils/genRandomColor'
import TaskTag from '../models/TaskTag.model'

export const getTags = async (req: Request, res: Response ) => {
    try {
        const userId = req.user.id
        const tags = await Tag.findAll({where: {userId}})

        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_GETTAGS]', error.message)
        res.status(400).json({error: 'Error getting tags'})
    }
}

export const getTagByName = async (req: Request, res: Response ) => {
    try {
        const userId = req.user.id

        const { tagName } = req.params
        
        const tag = await Tag.findOne({
            where: {
                name: tagName,
                userId
            }
        })

        if(!tag) {
            res.status(404).json({error: 'Tag not found'})
            return
        }

        res.status(200).json(tag)
        
    } catch (error) {
        console.log('[ERROR_GETTAGBYNAME]', error.message)
        res.status(400).json({error: 'Error getting tag by Name'})
    }
}

export const getTagById = async (req: Request, res: Response ) => {
    try {
        const { id } = req.params
        
        const tags = await Tag.findByPk(id)
        if(!tags) {
            res.status(404).json({error: 'Tag not found'})
            return
        }

        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_GETTAGBYID]', error.message)
        res.status(400).json({error: 'Error getting tag by Id'})
    }
}

export const getTagsWithTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        const tags = await Tag.findAll({
            where: {userId},
            include: [Task],
            order: [['name', 'ASC']]
        })

        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_GETTAGSWITHTASKS]', error.message)
        res.status(400).json({error: 'Error getting tags with tasks'})
    }
}

export const createTag = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const name = req.body

        if(!name) {
            res.status(400).json({error: 'Name Tag is requerid'})
            return
        }

        const tag = await Tag.create({...name, userId})

        res.status(200).json(tag)
        
    } catch (error) {
        console.log('[ERROR_GETTAGBYID]', error.message)
        res.status(400).json({error: 'Error getting tag by Id'})
    }
}

export const deleteTag = async (req: Request, res: Response) => {
    try {
        //Todo: create delete tag function
        
    } catch (error) {
        console.log('[ERROR_DETETAG]', error.message)
        res.status(500).json({error: 'Error deleting tag'})
    }
}

export const getTasksByTag = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const name = req.params.name

        const tag = await Tag.findOne({
            where: {name, userId}
        })

        const tasks = await Task.findAll({
            include: [{
                model: Tag,
                where: { name: name, userId }
            }]
        })

        res.status(200).json({
            tag: tag,
            tasks: tasks
        })
        
    } catch (error) {
        console.log('[ERROR_GETTASKSBYTAGS]', error.message)
        res.status(500).json({error: 'Error getting tasks by tag'})
    }
}

export const seedTags = async (req:Request, res: Response) => {
    try {
        const userId = req.user.id

        await TaskTag.destroy({where: {userId}})
        await Tag.destroy({where: {userId}})

        const seedTags = seedData.tags.map(item => ({
            name: item,
            color: generateRandomReadableColor(),
            userId
        }))

        await Tag.bulkCreate(seedTags)

        const tags = await Tag.findAll({where: {userId}})
        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_SEEDTAGS]', error.message)
        res.status(500).json({error: 'Error seeding tags'})
    }

}