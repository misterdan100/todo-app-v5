import { Request, Response} from 'express'
import Tag from '../models/Tag.model'

export const getTags = async (req: Request, res: Response ) => {
    try {
        const tags = await Tag.findAll()

        res.status(200).json(tags)
        
    } catch (error) {
        console.log('[ERROR_GETTAGS]', error.message)
        res.status(400).json({error: 'Error getting tags'})
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