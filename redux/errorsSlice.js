import { createSlice } from "@reduxjs/toolkit";

export const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
        msg: null
    },
    reducers: {
        returnErrors: (state, action) => {
            state.msg = action.payload
        },
        clearErrors: state => {
            state.msg = null
        }
    }
})

export const { returnErrors, clearErrors} = errorsSlice.actions;

export default errorsSlice.reducer;