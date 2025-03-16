import { Table, Column, Model, DataType, Default, PrimaryKey, IsUUID, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Task from './Task.model'
import User from './User.model'

@Table({
    tableName: 'projects',
    timestamps: false
})

class Project extends Model {
    // create a uuid as a primary key
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

    // 1. Define Foreign Key of project
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    declare userId: string

    // 2. define relation with projects
    @BelongsTo(() => User)
    user: User

    // Relation with tasks
    @HasMany(() => Task)
    tasks!: Task[]
}

export default Project