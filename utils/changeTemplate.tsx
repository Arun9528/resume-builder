import { initialSection } from "@/app/(editor)/components/SettingPanel/StyleTab/rearrange";
import { setAddSection, tempaltetypes } from "@/store/slices/styleSlice";
import SplitColumns from "./splitColumns";
import ReorderArray from "./reorderArray";
import { AppDispatch } from "@/store";

export default function ChangeTemplate(templatesData:tempaltetypes,sessionDragData:string,dispatch:AppDispatch,unusedData:string[],id:number,tempalteNames:string):void{
    const dragData = JSON.parse(sessionDragData) as initialSection ;
    let newLayout:initialSection = {first: [],secondLeft: [],secondRight: [],secondAll: []};
    const usedSection = [...(dragData.first || []),...(dragData.secondLeft || []),...(dragData.secondRight || []),...(dragData.secondAll || [])];
    const allSections = Array.from(new Set([...unusedData,...usedSection]));
    const defaultFirst = ReorderArray(allSections.filter(section => templatesData.first.includes(section)),templatesData.first);
    if(id === 1){
        const customFirst = dragData.first.filter(
      section => !templatesData.first.includes(section) && !templatesData.second.includes(section)
    );
    const firstSections = [...defaultFirst, ...customFirst];

    const defaultSecond = ReorderArray(
      allSections.filter(section => templatesData.second.includes(section)),
      templatesData.second
    );
    const customSecond = [
      ...dragData.secondLeft,
      ...dragData.secondRight,
      ...dragData.secondAll,
    ].filter(section => !templatesData.first.includes(section) && !templatesData.second.includes(section));
    const allSecondSections = [...defaultSecond, ...customSecond];
    const { left, right } = SplitColumns(allSecondSections);
    newLayout = { first: firstSections, secondLeft: left, secondRight: right, secondAll: [] };
    }else if(id === 2){
    const customFirst = dragData.first.filter(
      section => !templatesData.first.includes(section) && !templatesData.second.includes(section)
    );
    const firstSections = [...defaultFirst, ...customFirst];

    const defaultSecondAll = ReorderArray(
      allSections.filter(section => templatesData.second.includes(section)),
      templatesData.second
    );
    const customSecondAll = [
      ...dragData.secondLeft,
      ...dragData.secondRight,
      ...dragData.secondAll,
    ].filter(section => !templatesData.first.includes(section) && !templatesData.second.includes(section));
    const secondAllSections = [...defaultSecondAll, ...customSecondAll];
    newLayout = { first: firstSections, secondLeft: [], secondRight: [], secondAll: secondAllSections };
    }else if(id === 3){
        const customFirst = usedSection.filter(section=> !templatesData.first.includes(section));
        const firstSections = [...defaultFirst,...customFirst];

        newLayout = { first: firstSections, secondLeft: [], secondRight: [], secondAll: [] };
    }
    const usedInNewLayout = [...newLayout.first,...newLayout.secondLeft,...newLayout.secondRight,...newLayout.secondAll];
    const newUnused = allSections.filter(section => !usedInNewLayout.includes(section));
    const secondData = id === 1 ? [...newLayout.secondLeft,...newLayout.secondRight] : newLayout.secondAll;

    dispatch(setAddSection({isShow:false,[tempalteNames]:{first:newLayout.first,second:secondData,other:templatesData.other},unusedsection:newUnused,tempalteUsedName:tempalteNames}));
    sessionStorage.setItem("dragContents", JSON.stringify(newLayout));
    sessionStorage.setItem("templateIdData",JSON.stringify({first:newLayout.first,second:secondData,other:templatesData.other}));
    sessionStorage.setItem("unusedsectionData",JSON.stringify(newUnused));
}