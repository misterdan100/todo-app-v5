import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjectByName, getProjects, getProjectsWithTasks, getTasksByProject, seedProjects, updateProject } from "../controllers/projects.controller";

const router = Router()

router.get('/projects', getProjects)
router.get('/projects/tasks', getProjectsWithTasks)
router.get('/projects/name/:name', getProjectByName)
router.get('/projects/:id', getProjectById)
router.get('/projects/:id/tasks', getTasksByProject)
router.post('/projects', createProject)
router.put('/projects/:id',updateProject)
router.delete('/projects/:id', deleteProject)

router.post('/projects/seed', seedProjects)

export default router