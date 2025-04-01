export type UserSession = {
    id: string,
    email: string,
    name: string
}

export type Task = {
    id: string,
    name: string,
    description?: string,
    dueDate?: Date
    favorite: boolean,
    priority:  Priority
    status: Status
    projectId?: string
    createdAt: string,
    updatedAt: string,
    tags?: Tag[]
    userId: string
}

export type Tag = {
    id: string,
    name: string,
    color: string,
    tasks?: Task[]
}

export type Project = {
    id: string
    name: string
    tasks?: Task[]
}

export type TaskFormData = {project?: Project} & Pick<Task, 'name' | 'description' | 'dueDate' | 'favorite' | 'priority' | 'status' | 'projectId'>

export type TaskEditFormData = TaskFormData & {
    id: string
}

export type TaskFromDB = Task & {
    project: Project
}

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'overdue' | 'completed'