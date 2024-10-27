import {createSlice ,PayloadAction} from '@reduxjs/toolkit'
import { FilterState } from '../types/FilterState'

const initialState : FilterState ={
    sort :'asc',
    rating:0,
    outofstock:false,
    fastDelivery:false,
};

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers :{
        setSort(state, action : PayloadAction<'asc'|'desc'>){
            state.sort = action.payload
        },
        setRating(state, action:PayloadAction<number>){
            state.rating = action.payload
        },
        setOuTofStock(state,action : PayloadAction<boolean>){
            state.outofstock = action.payload
        },
        setFastDelivery (state,action: PayloadAction<boolean>){
            state.fastDelivery = action.payload
        },
        clearFilters(){
            return initialState;
        }
    },
});

export const {setSort,setRating,setOuTofStock,setFastDelivery,clearFilters} = filterSlice.actions
export default filterSlice.reducer;