"use client"
import { AppDispatch } from "@/store"
import { setAddSection } from "@/store/slices/styleSlice"

export default function AddSections({dispatch}:{dispatch:AppDispatch}){
    return (
        <div className="my-2 w-full">
            <h2>Add Section</h2>
            <button type="button" className="py-2 bg-teal-600 w-full text-white rounded-md cursor-pointer" onClick={()=>dispatch(setAddSection({isShow:true}))}>Add Section</button>
        </div>
    )
}