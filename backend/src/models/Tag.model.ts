import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import Task from "./Task.model";
import TaskTag from "./TaskTag.model";
import User from "./User.model";

@Table({
    tableName: 'tags',
    timestamps: false
})

class Tag extends Model {
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
        type: DataType.STRING(7)
    })
    declare color: string

    // Relation with task (many to many)
    @BelongsToMany(() => Task, () => TaskTag)
    tasks!: Task[]

    // Ralation with User (one to many)
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    declare userId: string

    @BelongsTo(() => User)
    user: User
}

export default Tag