import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { validateSession } from "@/api";
import { UserSession } from "@/interface";

export const verifySession = createAsyncThunk<UserSession | null, void, { rejectValue: string }>(
    "session/verifySession",
    async (_, { rejectWithValue }) => {
        try {
            const user = await validateSession();
            if (user) {
                return user; // Return the user data if the session is valid
            } else {
                return rejectWithValue("Session is invalid");
            }
        } catch (error) {
            console.error("Error verifying session:", error);
            return rejectWithValue("Error verifying session");
        }
    }
);

// define types for state
interface Props {
    user: UserSession | null
    activeSession: boolean
    loadingSession: boolean
}

const initialState: Props = {
    user: null,
    activeSession: false,
    loadingSession: true,
}

const sessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserSession>) => {
            state.user = action.payload
            state.activeSession = true
            state.loadingSession = false
        },
        switchLoading: (state, action: PayloadAction<boolean>) => {
            state.loadingSession = action.payload
        },
        removeSession: (state) => {
            state.user = null
            state.activeSession = false
            state.loadingSession = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifySession.pending, (state) => {
                state.loadingSession = true;
            })
            .addCase(verifySession.fulfilled, (state, action: PayloadAction<UserSession | null>) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.activeSession = true;
                } else {
                    state.user = null;
                    state.activeSession = false;
                }
                state.loadingSession = false;
            })
            .addCase(verifySession.rejected, (state) => {
                state.user = null;
                state.activeSession = false;
                state.loadingSession = false;
            });
    },
})

export const { addUser, switchLoading, removeSession } = sessionSlice.actions
export default sessionSlice.reducer