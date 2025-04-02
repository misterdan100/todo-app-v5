import { Router } from "express";
import { changeFavoriteTask, changeStatusTask, createTask, deleteTask, getTaskById, getTasks, seedTasks, updateTask } from "../controllers/tasks.controller";
import authenticate from "../middleware/auth";

const router = Router()

router.use('/tasks', authenticate)
router.use('/tasks/*', authenticate)

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTaskById)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.put('/tasks/:id/favorite', changeFavoriteTask)
router.put('/tasks/:id/status', changeStatusTask)
router.delete('/tasks/:id', deleteTask)

router.post('/tasks/seed', seedTasks)

export default router