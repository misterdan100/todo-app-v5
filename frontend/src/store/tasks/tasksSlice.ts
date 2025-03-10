import { Task } from "@/interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


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

// Define a thunk to handle adding tasks and applying filters
export const addTasksAndFilter = createAsyncThunk(
    'tasks/addTasksAndFilter', // thunk name
    async (tasks: Task[], { dispatch, getState }) => {
        dispatch(addTasks(tasks))  // add tasks throught actions
        const state = getState() as RootState
        const filterValue = state.tasks.filterValue

        if(filterValue) {
            dispatch(selectFilter(filterValue))
        }
    }
)

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