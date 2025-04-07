import { Router } from "express";
import { cleanDataUser, createUser, deleteUser, getUserById, logingUser, logoutUser, updateProfile, verifySession } from "../controllers/users.controller";
import authenticate from "../middleware/auth";

const router = Router()

// router.get('/users')
router.post('/users', createUser)
router.put('/users', authenticate ,updateProfile)
router.get('/users/tasks')
router.get('/users/projects')
router.get('/users', authenticate ,getUserById)
router.delete('/users', authenticate ,deleteUser)

router.post('/auth/login', logingUser)
router.post('/auth/register', createUser)
router.post('/auth/session', verifySession)
router.get('/auth/logout', authenticate, logoutUser)

router.post('/users/seed')
router.get('/users/cleanData', authenticate, cleanDataUser)

export default router