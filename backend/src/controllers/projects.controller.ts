import { Request, Response } from 'express';
import Project from '../models/Project.model';
import Task from '../models/Task.model';
import { seedData } from '../data/seed_data';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        const projects = await Project.findAll({
            where: {userId},
            order: [['name', 'ASC']]
        })

        res.status(200).json(projects);
        return
    } catch (error) {
        console.log('[ERROR_GETPROJECT]', error.message)
        res.status(400).json({error: 'Error getting projects'})
    }
};

export const getProjectsWithTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        const projects = await Project.findAll({
            where: {userId},
            include: [Task]
        })

        if(!projects) {
            res.status(404).json({error: 'Projects not found'})
        }

        res.status(200).json(projects)
        
    } catch (error) {
        console.log('[ERROR_GETPROJECTSWITHTASKS]', error.message)
        res.status(400).json({error: 'Error getting Projects with Tasks'})
    }
}

export const getProjectByName = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        const { name } = req.params

        const project = await Project.findOne({
            where: {name: name, userId}, 
            include: [Task]})

        if(!project) {
            res.status(404).json({error: 'Project not found'})
            return 
        }

        res.status(200).json(project)
        
    } catch (error) {
        console.log('[ERROR_GETPROJECTBYNAME]', error.message)
        res.status(400).json({error: 'Error getting Projects with Tasks'})
    }
}

export const getProjectById = async (req:Request, res: Response) => {
    try {
        const { id } = req.params

        const project = await Project.findByPk(id, {
            include: [Task]
        })
        if(!project) {
            res.status(404).json({error: 'Project not found'})
            return 
        }

        res.status(200).json(project)
        
    } catch (error) {
        console.log('[ERROR_GETPROJECTBYID]', error.message)
        res.status(400).json({error: 'Error getting project byid'}) 
    }
}

export const getTasksByProject = async (req: Request, res: Response) => {
    try {
        const { id: projectId } = req.params

        const tasks = await Task.findAll({
            where: {projectId: projectId}
        })

        res.status(200).json(tasks)
        
    } catch (error) {
        console.log('[ERROR_GETTASKBYID]', error.message)
        res.status(400).json({error: 'Error getting task by id'})
    }
}

export const createProject = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id

        // validate if name exists
        if (!req.body.name) {
            res.status(500).json({ error: 'A project name is required' });
            return
        }

        const newProject = await Project.create({ 
            name: req.body.name.trim(),
            userId
        });

        if (!newProject) {
            res.status(500).json({ error: 'Error creating project' });
            return
        }

        res.json(newProject);
        return
    } catch (error) {
        console.log('[CREATEPROJECT]', error.message);
        res.status(400).json({error: 'Error creating project'});
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newName = req.body.name

        if(!id || !newName) {
            res.status(400).json({error: 'Data to edit project is missing'})
            return
        }
        
        const project = await Project.findByPk(id)
        
        if(!project) {
            res.status(404).json({error: 'Project not found'})
            return    
        }

        project.name = newName.trim()
        await project.save()
        
        res.status(200).json(project)

    } catch (error) {
        console.log('[ERROR_UPDATEPROJECT]', error.message)
        res.status(400).json({error: 'Error updating project'})
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Project.destroy({
            where: {
                id,
            }
        })

        res.status(200).json({message: 'Project deleted'})
        
    } catch (error) {
        console.log('[ERROR_DELETEPROJECT]', error.message)
        res.status(400).json({error: 'Error deleting project'})
    }
}

export const seedProjects = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        await Project.destroy({where: {
            userId
        }})

        const projects = seedData.projects.map(item => ({name: item, userId}))

        await Project.bulkCreate(projects)
        const projectsDB = await Project.findAll({where: {userId}})

        res.status(200).json(projectsDB)
        
    } catch (error) {
        console.log('[ERROR_SEEDPROJECTS]', error.message)
        res.status(500).json({error: 'Error seeding projects'})
    }
}