import { Column, DataType, Default, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import Project from "./Project.model";
import Task from "./Task.model";
import Tag from "./Tag.model";

// id, name, email, password, token, tasks, projects

@Table({
    tableName: 'users'
})

class User extends Model {
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
        type: DataType.STRING(100)
    })
    declare email: string

    @Column({
        type: DataType.STRING()
    })
    declare password: string

    @Column({
        type: DataType.STRING
    })
    declare token?: string

    // 3. Define user can have many projects
    @HasMany(() => Project)
    projects!: Project[]

    @HasMany(() => Task)
    tasks!: Task[]

    @HasMany(() => Tag)
    tags!: Tag[]
}

export default User