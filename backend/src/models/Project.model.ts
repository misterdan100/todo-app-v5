import { Table, Column, Model, DataType, Default, PrimaryKey, IsUUID, HasMany } from 'sequelize-typescript'
import Task from './Task.model'

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

    // Relation with tasks
    @HasMany(() => Task)
    tasks!: Task[]
}

export default Project