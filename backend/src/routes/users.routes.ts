import { Router } from "express";
import { createUser, deleteUser, getUserById, logingUser, updateProfile } from "../controllers/users.controller";

const router = Router()

// router.get('/users')
router.post('/users', createUser)
router.put('/users', updateProfile)
router.get('/users/tasks')
router.get('/users/projects')
router.get('/users', getUserById)
router.delete('/users', deleteUser)

router.post('/auth/login', logingUser)

router.post('/users/seed')

export default router