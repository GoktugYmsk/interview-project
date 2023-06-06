import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    input: '',
    amount: '0',
    selectedProductList: [],
    active: false,
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
        },
        setSelectedProductList: (state, action) => {
            state.selectedProductList = action.payload;
        },
        setActive: (state, action) => {
            state.active = action.payload;
        }
    }
})

export const {setInput,setAmount,setSelectedProductList,setActive } = configure.actions

export default configure.reducer
