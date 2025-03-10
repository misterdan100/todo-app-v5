import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, getTasksByProject, updateProject } from "../controllers/projects.controller";

const router = Router()

router.get('/projects', getProjects)
router.get('/projects/:id', getProjectById)
router.get('/projects/:id/tasks', getTasksByProject)
router.post('/projects', createProject)
router.put('/projects/:id',updateProject)
router.delete('/projects/:id', deleteProject)

export default router