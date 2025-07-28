import { initialSection } from "@/app/(editor)/components/SettingPanel/StyleTab/rearrange";
import SplitColumns from "./splitColumns";
import { tempaltetypes } from "@/store/slices/styleSlice";

export default function SaveDragData(templatesData:tempaltetypes,sessionDragData:string,templateName:string):initialSection{
    const dragData = JSON.parse(sessionDragData) as initialSection ;
    let one:initialSection = {first: [],secondLeft: [],secondRight: [],secondAll: []};
    const b = dragData?.first?.filter(data => templatesData.first.includes(data));
    if(templateName === "template1"){
        if(dragData.secondLeft.length > 0 || dragData.secondRight.length > 0){
           one = {first:dragData.first,secondLeft:dragData.secondLeft,secondRight:dragData.secondRight,secondAll:[]}
        }else{
         const firstC = dragData?.first?.filter((data)=> templatesData?.second?.includes(data));
           const firstD = dragData?.secondAll?.filter((data)=> templatesData?.second?.includes(data));
           const RealfirstData = firstC.length > 0 ? firstC : firstD
           const {left,right} = SplitColumns(RealfirstData);
           one = {first:b,secondLeft:left,secondRight:right,secondAll:[]}
        }
       
    }else if(templateName === "template2"){
        if(dragData.secondAll.length > 0){
           one = {first:dragData.first,secondLeft:[],secondRight:[],secondAll:dragData.secondAll}
        }else{
         const secondC = dragData?.first?.filter((data)=> templatesData?.second?.includes(data));
         const secondD = [...dragData.secondLeft,...dragData.secondRight]
         const RealsecondData = secondC.length > 0 ? secondC :secondD
         one = {first:b,secondLeft:[],secondRight:[],secondAll:RealsecondData}
        }
    }else if( templateName === "template3"){
        const thirdC = [...dragData.secondLeft,...dragData.secondRight]
        const RealthirdData = thirdC.length > 0 ? thirdC : dragData.secondAll; 
        one = {first:[...dragData.first,...RealthirdData],secondLeft:[],secondRight:[],secondAll:[]}
    }
    sessionStorage.setItem("dragContents", JSON.stringify(one));
    return one
}