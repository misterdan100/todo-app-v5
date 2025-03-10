import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Task from "./Task.model";
import Tag from "./Tag.model";

@Table({
    tableName: 'task_tag',
    timestamps: false
})

class TaskTag extends Model {
    @ForeignKey(() => Task)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    taskId!: string

    @ForeignKey(() => Tag)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    tagId!: string
}

export default TaskTag