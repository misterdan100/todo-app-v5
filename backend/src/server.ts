import express from 'express'
import dotenv from 'dotenv'
import db from './config/db';
import router from './router';

dotenv.config()

// Connect to db
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('Succesfull connection wit db')
    } catch (error) {
        console.log('Error: in [connectDB]')
    }
}

connectDB()

// create express instance
const app = express();

// middleware que transforma la req.body a un json
app.use(express.json())

// connect with router file
app.use('/', router)

export default app