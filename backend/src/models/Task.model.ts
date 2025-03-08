import { Column, DataType, Default, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript'

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
}

export default Task
