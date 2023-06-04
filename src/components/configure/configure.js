import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    input: '',
    amount: '0',
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        }
    }
})

export const {setInput,setAmount } = configure.actions

export default configure.reducer
