"use client";
import { useEffect, useState } from "react";
import StyleTab from "./StyleTab/styletab";
import { useDispatch } from "react-redux";
import { setIsModal, setLayout} from "@/store/slices/styleSlice";
import ImageOverlay from "@/components/imageOverlay";
import { TemplateKey } from "../../[templateId]/layout";
export default function SettingPanel({templateId}:{templateId:TemplateKey}) {
  const [showSettingpanel, setShowSettingpanel] = useState<{templates: boolean;styles: boolean;}>({ templates: true, styles: false });
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!showSettingpanel.styles)return
    if(showSettingpanel.styles){
      dispatch(setIsModal(false))
    }
  },[showSettingpanel.styles,dispatch]);

   useEffect(()=>{
      const savedLayout = sessionStorage.getItem("layoutStyle");
     if(savedLayout){
        const { layoutClass: savedClass, reverse: savedReverse } = JSON.parse(savedLayout);
        dispatch(setLayout({ layoutClass: savedClass, reverse: savedReverse }));
     }
    },[]);
  return (
    <>
      <div className="grid grid-cols-2 mx-3 gap-x-3 ">
        <button
          type="button"
          className={`text-center  rounded-2xl py-1 cursor-pointer  ${
            showSettingpanel.templates ? "bg-sky-600 text-white" : "border"
          }`}
          onClick={() =>
            setShowSettingpanel({ templates: true, styles: false })
          }
        >
          Templates
        </button>
        <button
          type="button"
          className={`text-center rounded-2xl py-1 cursor-pointer ${
            showSettingpanel.styles ? "bg-sky-600 text-white" : "border"
          }`}
          onClick={() => setShowSettingpanel({templates:false,styles:true})}
        >
          Styles
        </button>
      </div>
      
        {showSettingpanel.templates && <ImageOverlay Onsettingtab={true} />}
        {showSettingpanel.styles && <StyleTab tempalteId={templateId}/>}

    </>
  );
}
