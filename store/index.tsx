import { configureStore } from "@reduxjs/toolkit";
import  resumeReducer from "./slices/resumeSlice";
import errorReducer from "./slices/errorSlice";
import styleReducer from "./slices/styleSlice";

export const makeStore = ()=> {
    return configureStore({
        reducer:{
            resumeBuilder:resumeReducer,
            error:errorReducer,
            style:styleReducer,
        },
    })
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
