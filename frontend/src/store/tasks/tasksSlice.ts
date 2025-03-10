import { Task } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// define types for state
interface Tasks { 
    tasks: Task[]
    filteredTasks: Task[]
    filterValue: string
    filtering: boolean
}

const initialState: Tasks = {
    tasks: [],
    filteredTasks: [],
    filterValue: '',
    filtering: false
}

// define slice 
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTasks: (state, action: PayloadAction<Task[]> ) => {
            state.tasks = action.payload
        },
        cleanTasks: (state) => {
            state.tasks = []
        },
        selectFilter: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
            state.filtering = true

            if(action.payload === 'favorite') {
                state.filteredTasks = state.tasks.filter( task => task.favorite === true)
            } else {
                state.filteredTasks = state.tasks.filter( task => task.priority === action.payload)
            }
        },
        cleanFilter: (state) => {
                state.filtering = false
                state.filteredTasks = []
                state.filterValue = ''
        }

    }
})

export const { addTasks, cleanTasks, selectFilter, cleanFilter } = tasksSlice.actions
export default tasksSlice.reducer