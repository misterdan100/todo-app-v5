// import { Sequelize } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize( process.env.DATABASE_URL! ,{
    dialectModule: pg,
    logging: false,
    models: [__dirname + '/../models/**/*']
})

// with 'sequelize' --------------------------------
// const db = new Sequelize(process.env.DATABASE_URL, {
//     dialectModule: pg,
// },)

export default db