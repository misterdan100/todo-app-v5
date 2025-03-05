import { Sequelize } from 'sequelize'
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL, {
    dialectModule: pg,
})

export default db