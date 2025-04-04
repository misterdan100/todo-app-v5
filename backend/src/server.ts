import express from 'express'
import dotenv from 'dotenv'
import db from './config/db';
import router from './router';
import cors, {CorsOptions} from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const isDevelopment = process.env.NODE_ENV !== 'production'

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

// cors options
const corsOptions: CorsOptions = {
    origin: isDevelopment 
        ? 'http://localhost:3000'
        : process.env.FRONTEND_URL,  // Para producción (desde .env)
      credentials: true,  // Importante para permitir cookies
}

app.use(cors(corsOptions))

// middleware to read cookies
app.use(cookieParser())

// middleware que transforma la req.body a un json
app.use(express.json())

// connect with router file
app.use('/api', router)

// app.use(projectsRoutes)

export default app

// testmail5@gmail.com
// TestPass