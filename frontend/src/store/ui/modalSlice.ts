import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// create a slice

//define types for state
interface ModalState {
    isOpen: boolean
}

// define inital state
const initialState: ModalState = {
    isOpen: false
}

//define slice / state group
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        switchModal: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        }
    }
})


export const { switchModal } = modalSlice.actions
export default modalSlice.reducer
