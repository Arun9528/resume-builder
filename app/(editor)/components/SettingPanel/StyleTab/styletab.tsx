"use client"
import InputRange from "@/components/inputrange";
import {useEffect, useState } from "react";
import ColorPicker from "./colorpicker";
import Rearrange from "./rearrange";
import { useDispatch } from "react-redux";
import { fontSizetypes, setFontSize, setlineHeight, setPadding, setSpacing, setSpacingNumber } from "@/store/slices/styleSlice";
import FontSelector from "./fontselector";
import LayoutOption from "./layoutoption";
import AddSections from "./addsection";
import { TemplateKey } from "@/app/(editor)/[templateId]/layout";

export interface Counts {
  padding: number;
  spacing: number;
  font: number;
  height: number;
}

export default function StyleTab({tempalteId}:{tempalteId:TemplateKey}) {
  const isTemplate2 = tempalteId === "template2";
  const dispatch = useDispatch()
  const [Count, setCount] = useState<Counts>(()=>{
    const saved = sessionStorage.getItem("stylelayout");
    return saved ? JSON.parse(saved) : {padding: 1,spacing: 1,font: 1,height: 1}
  });
  const prevStyles = JSON.parse(sessionStorage.getItem("styletype") || "{}");
  const handleChange = (label:keyof Counts,value:number)=>{
    setCount((prev)=>({...prev,[label]:value}));
   switch (label) {
      case "padding":
        const p = 12 + (value * 4) + "px";
        dispatch(setPadding(p));
        sessionStorage.setItem("styletype",JSON.stringify({...prevStyles,[label]:p}))
        break;
      case "spacing":
        const s = 2 + (value * 5) + "px";
        dispatch(setSpacing(s));
        dispatch(setSpacingNumber(value))
         sessionStorage.setItem("styletype",JSON.stringify({...prevStyles,[label]:s}))
        break;
      case "font":
        const fontSize:fontSizetypes = {
          mainheading:20  + (value * 2.5)  + "px",
          heading:18 + (value * 1.8) + "px",
          mainpara:16 + (value - 1.3 ) + "px",
          para:14 + (value * .5) + "px"
        }
        dispatch(setFontSize(fontSize)); 
        sessionStorage.setItem("styletype",JSON.stringify({...prevStyles,[label]:fontSize}))
        break;
      case "height":
        const lineHeightValue = value > 1 ? value < 3 ? value - .7 : value - 1.6 : 1;
        dispatch(setlineHeight(lineHeightValue));
        sessionStorage.setItem("styletype",JSON.stringify({...prevStyles,[label]:lineHeightValue}))
        break;
      default:
        break;
    }
  }
  useEffect(()=>{
    sessionStorage.setItem("stylelayout",JSON.stringify(Count));
  },[Count])
  return (
    <div className="px-2 h-full">
      <div className="flex flex-wrap justify-between">
        <InputRange
          value={Count.padding}
          onChange={(v)=> handleChange("padding",v)}
          title="Page Padding"
          label="padding"
        />
        <InputRange
          value={Count.spacing}
          onChange={(v)=> handleChange("spacing",v)}
          title="Space Spacing"
          label="spacing"
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <InputRange
          value={Count.font}
          onChange={(v)=> handleChange("font",v)}
          title="Font Size"
          label="font"
        />
        <InputRange
          value={Count.height}
          onChange={(v)=> handleChange("height",v)}
          title="Line Height"
          label="height"
        />

      <ColorPicker/>
      <FontSelector/>
      <AddSections dispatch={dispatch}/>
      {isTemplate2 && <LayoutOption/>}
        <Rearrange/>
      </div>
    </div>
  );
}
