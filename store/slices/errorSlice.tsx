import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState{
    visible:boolean;
    message:string;
}
const initialState:ErrorState = {
    visible:false,
    message:""
}
const errorState = createSlice({
    name:"error",
    initialState,
    reducers:{
        showError(state,action:PayloadAction<string>){
            state.visible = true;
            state.message = action.payload;
        },
        hideError(state){
            state.visible = false;
            state.message = state.message;
        },
    }
})
export const {showError,hideError} = errorState.actions;
export default errorState.reducer;