export type UserSession = {
    id: string,
    email: string,
    name: string
}

export type Task = {
    id: string,
    name: string,
    description?: string,
    dueDate?: string
    favorite: boolean,
    priority:  Priority
    status: Status
    projectId?: string
    createdAt: string,
    updatedAt: string,
    tags?: Tag[]
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

export type TaskFormData = Pick<Task, 'name' | 'description' | 'dueDate' | 'favorite' | 'priority' | 'status' | 'projectId'>

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'overdue' | 'completed'