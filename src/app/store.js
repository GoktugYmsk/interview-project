import { configureStore } from '@reduxjs/toolkit'
import configure from '../components/configure/configure'

export const store = configureStore({
    reducer: {
        inputValue: configure,
    },
})