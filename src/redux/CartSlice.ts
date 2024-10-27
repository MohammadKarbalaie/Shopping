import {createSlice ,PayloadAction} from '@reduxjs/toolkit'
import { Product } from '../types/Product'

interface CartState{
    items:Product[];
}


const initialState: CartState ={
    items:[],
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action:PayloadAction<Product>){
            state.items.push(action.payload)
        },
        removeFromCart(state,action : PayloadAction<number>){
          state.items = state.items.filter (item => item.id !== action.payload)   
        },
    },
});

export const {addToCart,removeFromCart} = CartSlice.actions
export default CartSlice.reducer; 
