import { Task, TaskFromDB } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// define types for state
interface Props { 
    allTasks: Task[]
    tasksToShow: Task[]
    loadingTasks: boolean
    keyCache: string
    filteredTasks: Task[]
    filterValue: string
    filtering: boolean
    isEditing: boolean
    editTask: TaskFromDB | undefined
}

const initialState: Props = {
    allTasks: [],
    tasksToShow: [],
    loadingTasks: true,
    keyCache: '',
    filteredTasks: [],
    filterValue: '',
    filtering: false,
    isEditing: false,
    editTask: undefined,
}

// define slice 
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTasks: (state, action: PayloadAction<Task[]> ) => {
            state.allTasks = action.payload
        },
        addTasksToShow: (state, action: PayloadAction<Task[]> ) => {
            state.filtering = false
            state.filteredTasks = []
            state.filterValue = ''

            state.tasksToShow = action.payload
        },
        addKeyCache: (state, action: PayloadAction<string>) => {
            state.keyCache = action.payload
        },
        cleanTasks: (state) => {
            state.allTasks = []
            state.tasksToShow = []
        },
        selectFilter: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
            state.filtering = true

            if(action.payload === 'favorite') {
                state.filteredTasks = state.tasksToShow.filter( task => task.favorite === true)
            } else {
                state.filteredTasks = state.tasksToShow.filter( task => task.priority === action.payload)
            }
        },
        cleanFilter: (state) => {
                state.filtering = false
                state.filteredTasks = []
                state.filterValue = ''
        },
        switchLoading: (state, action: PayloadAction<boolean>) => {
            state.loadingTasks = action.payload
        },
        switchIsEditing: (state, action: PayloadAction<TaskFromDB | undefined>) => {
            if(action.payload !== undefined) {
                state.isEditing = true
                state.editTask = action.payload
            } else {
                state.isEditing = false
                state.editTask = undefined
            }
        }


    }
})

export const { addTasks, addTasksToShow, addKeyCache, cleanTasks, selectFilter, switchLoading, cleanFilter, switchIsEditing } = tasksSlice.actions
export default tasksSlice.reducer