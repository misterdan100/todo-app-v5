import { createSlice, PayloadAction } from "@reduxjs/toolkit"


// define Types for state
interface SidebarState {
    isSidebarRightOpen: boolean
    isSidebarMainOpen: boolean
}

const initialState: SidebarState = {
    isSidebarRightOpen: false,
    isSidebarMainOpen: true,
}

// define slice / state groups
const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        switchSidebarRight: (state, action: PayloadAction<boolean>) => {
            state.isSidebarRightOpen = action.payload
        },
        switchSidebarMain: (state, action: PayloadAction<boolean>) => {
            state.isSidebarMainOpen = action.payload
        },
    }
})

export const { switchSidebarMain, switchSidebarRight } = sidebarSlice.actions
export default sidebarSlice.reducer