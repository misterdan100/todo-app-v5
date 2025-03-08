import { DataTypes } from "sequelize";
import db from "../config/db";


export const Task = db.define('tasks',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    priority: {
        type: DataTypes.STRING,
        defaultValue: 'low'
    },
    dueDate: {
        type: DataTypes.DATE
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})