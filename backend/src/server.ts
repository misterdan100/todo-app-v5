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
const allowedOrigins = [
    'http://localhost:3000',  // Tu frontend en desarrollo
    process.env.FRONTEND_URL  // Para producción (desde .env)
]
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) {
          return callback(null, true);
        }
        
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          console.log(`Origin ${origin} not allowed by CORS`);
          return callback(new Error('CORS policy violation'), false);
        }
      },
      credentials: true,  // Importante para permitir cookies
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['set-cookie']
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