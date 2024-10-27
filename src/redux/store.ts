import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './CartSlice'
import  filterReducer  from "./FilterSlice";

const store = configureStore({
    reducer :{
         filters :filterReducer,
            cart : CartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


