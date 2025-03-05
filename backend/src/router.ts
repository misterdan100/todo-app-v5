import { Router } from "express";
import db from "./config/db";

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

export default router