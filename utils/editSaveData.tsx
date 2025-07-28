"use client"
import { usePathname } from "next/navigation"
export default function useEditSaveData<T extends {id:string}>(){
    const path = usePathname();
    const pageName  = path.split("/")[2];
    const modifyData = (data:T, isUpdate:boolean)=>{
    const getData = sessionStorage.getItem(pageName) || "";
      if(!getData) return
      const arr:T[] = JSON.parse(getData);
      let newData:T[]
      if(isUpdate){
        const item = data as T;
        const Index = arr.findIndex(d => d.id === item.id);
        if (Index === -1) return
        newData = [...arr];
        newData[Index] = item
      }else{
        const idToDelete = typeof data  === 'string' ? data : data.id;
        newData = arr.filter(d => d.id !== idToDelete)
      }
      sessionStorage.setItem(pageName,JSON.stringify(newData));
    }
    return modifyData
}