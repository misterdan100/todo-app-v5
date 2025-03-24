import { Router } from "express";
import db from "./config/db";
import projectsRoutes from './routes/projects.routes'
import tasksRoutes from './routes/tasks.routes'
import tagsRoutes from './routes/tags.routes'
import usersRoutes from './routes/users.routes'
import { clearData } from "./controllers/seed.controller";
import authenticate from "./middleware/auth";

const router = Router()

// Routing of API
router.get('/', (req, res) => { // respuesta en '/'
    res.send('Hellow Dan!')
})


// Test db connection
router.get('/ping', async (req, res) => {
    const result = await db.query('SELECT NOW()')
    res.send(result[0][0])
})

router.get('/clearData',authenticate, clearData)


router.use(projectsRoutes)
router.use(tasksRoutes)
router.use(tagsRoutes)
router.use(usersRoutes)

export default router