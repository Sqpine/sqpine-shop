import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type StateType = {
    error: null | string,
}
const initialState: StateType = {
    error: null,
}
export const slice = createSlice({
    name: 'appPage',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        }
    }
})
export const {setError} = slice.actions
export const appReducer = slice.reducer