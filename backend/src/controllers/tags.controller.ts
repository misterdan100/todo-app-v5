import { Request, Response} from 'express'
import Tag from '../models/Tag.model'
import { seedData } from '../data/seed_data'
import Task from '../models/Task.model'
import { generateRandomReadableColor } from '../utils/genRandomColor'

export const getTags = async (req: Request, res: Response ) => {
    try {
        const tags = await Tag.findAll()

        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_GETTAGS]', error.message)
        res.status(400).json({error: 'Error getting tags'})
    }
}

export const getTagByName = async (req: Request, res: Response ) => {
    try {
        const { tagName } = req.params
        
        const tag = await Tag.findOne({
            where: {name: tagName}
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
        const tags = await Tag.findAll({
            include: [Task]
        })

        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_GETTAGSWITHTASKS]', error.message)
        res.status(400).json({error: 'Error getting tags with tasks'})
    }
}

export const createTag = async (req: Request, res: Response) => {
    try {
        const name = req.body

        if(!name) {
            res.status(400).json({error: 'Name Tag is requerid'})
            return
        }

        const tag = await Tag.create(name)

        res.status(200).json(tag)
        
    } catch (error) {
        console.log('[ERROR_GETTAGBYID]', error.message)
        res.status(400).json({error: 'Error getting tag by Id'})
    }
}

export const deleteTag = async (req: Request, res: Response) => {
    try {
        // const 
        
    } catch (error) {
        console.log('[ERROR_DETETAG]', error.message)
        res.status(500).json({error: 'Error deleting tag'})
    }
}

export const getTasksByTag = async (req: Request, res: Response) => {
    try {
        const name = req.params.name

        const tag = await Tag.findOne({
            where: {name}
        })

        const tasks = await Task.findAll({
            include: [{
                model: Tag,
                where: { name: name }
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

export const seedTags = async (req, res: Response) => {
    try {

        await Tag.destroy({where: {}})

        const seedTags = seedData.tags.map(item => ({name: item, color: generateRandomReadableColor()}))

        await Tag.bulkCreate(seedTags)

        const tags = await Tag.findAll()
        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_SEEDTAGS]', error.message)
        res.status(500).json({error: 'Error seeding tags'})
    }

}