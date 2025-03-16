import express from 'express'
import dotenv from 'dotenv'
import db from './config/db';
import router from './router';
import cors, {CorsOptions} from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

// Connect to db
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync({alter: true})
        console.log('Succesfull connection wit db')
    } catch (error) {
        console.log('Error: in [connectDB]')
    }
}

connectDB()

// create express instance
const app = express();

// CORS polityes
const allowedOrigins = [process.env.FRONTEND_URL]
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(allowedOrigins.includes(origin)) {
            return callback(null, true)
        } else {
            return callback(null, true)
            return callback(new Error('CORS policy violation'), false)
        }
    }
}

app.use(cors(corsOptions))

// middleware que transforma la req.body a un json
app.use(express.json())

// middleware to read cookies
app.use(cookieParser())

// connect with router file
app.use('/api', router)

// app.use(projectsRoutes)

export default app

// testmail5@gmail.com
// TestPass