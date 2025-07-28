import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";
import { RootState } from "@/store";

export default function LanguagesSection({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps){
 const Languages = useSelector((state:RootState)=> state.resumeBuilder.languages);
     return (
        <div className={`${highlightShow && paths.split("/")[3] === "languages" && "border-4 border-amber-500" }`}>
        <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Languages</h2>
            <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
            <div className="grid grid-cols-2 px-1">
                {
                    Languages.length > 0 ? (
                        Languages.map(({id,languagename,level})=>(
                            <div key={id} className="flex gap-x-2 items-center" style={{fontSize:fontSize.para}}>
                 
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>{languagename}</p>
                        <p style={{lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>({level})</p>
                     </div>
                        ) )
                    ) 
                    :
                     (
                        ["Russian","German","Italian"].map((d,i)=>(
                    <div key={i} className="flex gap-x-2 items-center" style={{fontSize:fontSize.para}}>
                 
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>{d}</p>
                        <p style={{lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>(Beginner)</p>
                     </div>
                    ))
                     )
                }
            </div>
      </div>
     )
}