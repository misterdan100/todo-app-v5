import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript'
import Project from './Project.model'
import Tag from './Tag.model'
import TaskTag from './TaskTag.model'
import User from './User.model'

@Table({
    tableName: 'tasks'
})

class Task extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    declare id: string

    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.STRING()
    })
    declare description: string

    @Default('pending')
    @Column({
        type: DataType.STRING()
    })
    declare status: 'pending' | 'completed' | 'overdue'

    @Default('low')
    @Column({
        type: DataType.STRING()
    })
    declare priority: 'low' | 'medium' | 'high'

    @Column({
        type: DataType.DATE()
    })
    declare dueDate: Date

    @Default(false)
    @Column({
        type: DataType.BOOLEAN()
    })
    declare favorite: boolean

    // Clave foranea de project
    @ForeignKey(() => Project)
    @Column({
        type: DataType.UUID
    })
    declare projectId: string

    // Relation with Project (one to many)
    @BelongsTo(() => Project)
    project?: Project

    // Define relation with user
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    declare userId: string

    @BelongsTo(() => User)
    user: User


    // Relation with Tags (many to many)
    @BelongsToMany(() => Tag, () => TaskTag)
    tags!: Tag[]
}

export default Task
