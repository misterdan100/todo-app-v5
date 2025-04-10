import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './ui/modalSlice'
import tasksReducer from './tasks/tasksSlice'
import sidebarReducer from './ui/sidebarSlice'
import sessionReducer from './auth/sessionSlice'
import themeReducer from './ui/themeSlice'


// configure global store
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        tasks: tasksReducer,
        sidebar: sidebarReducer,
        session: sessionReducer,
        theme: themeReducer
    },
    // devTools: process.env.NODE_ENV !== 'production',
})

// tipos TS para usar en hooks personalizados
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch