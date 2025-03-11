import { Router } from "express";
import { changeFavoriteTask, createTask, deleteTask, getTaskById, getTasks, seedTasks, updateTask } from "../controllers/tasks.controller";

const router = Router()

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTaskById)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.put('/tasks/:id/favorite', changeFavoriteTask)
router.delete('/tasks/:id', deleteTask)

router.post('/tasks/seed', seedTasks)

export default router