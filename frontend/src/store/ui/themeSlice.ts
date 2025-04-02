import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// define types for state
export type Theme = 'light' | 'dark'

interface ThemeSlice {
    theme: Theme
}

const initialState: ThemeSlice = {
    theme: (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme || 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'

            if(typeof window !== 'undefined') {
                localStorage.setItem('theme', state.theme)
            }
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload
            if(typeof window !== 'undefined') {
                localStorage.setItem('theme', state.theme)
            }
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer