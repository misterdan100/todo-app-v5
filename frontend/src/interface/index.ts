

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
    updatedAt: string
}

export type TaskFormData = Pick<Task, 'name' | 'description' | 'dueDate' | 'favorite' | 'priority' | 'status' | 'projectId'>

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'overdue' | 'completed'