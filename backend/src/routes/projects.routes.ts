import { Router } from "express";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projects.controller";

const router = Router()

router.get('/projects', getProjects)
router.get('/projects/:id')
router.post('/projects', createProject)
router.put('/projects/:id',updateProject)
router.delete('/projects/:id', deleteProject)

export default router