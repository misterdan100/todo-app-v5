import { Task } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyedMutator } from "swr";


// define types for state
interface Props { 
    allTasks: Task[]
    tasksToShow: Task[]
    loadingTasks: boolean
    keyCache: string
    filteredTasks: Task[]
    filterValue: string
    filtering: boolean
}

const initialState: Props = {
    allTasks: [],
    tasksToShow: [],
    loadingTasks: true,
    keyCache: '',
    filteredTasks: [],
    filterValue: '',
    filtering: false
}

// Define a thunk to handle adding tasks and applying filters
// export const addTasksAndFilter = createAsyncThunk(
//     'tasks/addTasksAndFilter', // thunk name
//     async (tasks: Task[], { dispatch, getState }) => {
//         dispatch(addTasksToShow(tasks))  // add tasks throught actions
//         const state = getState() as RootState
//         const filterValue = state.tasks.filterValue

//         if(filterValue) {
//             dispatch(selectFilter(filterValue))
//         }
//     }
// )

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
        }

    }
})

export const { addTasks, addTasksToShow, addKeyCache, cleanTasks, selectFilter, switchLoading,  cleanFilter } = tasksSlice.actions
export default tasksSlice.reducer