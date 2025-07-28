import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";
import { RootState } from "@/store";

export default function CertificationSection({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps){
const Certificate = useSelector((state:RootState)=> state.resumeBuilder.certificates);
    return (
        <div className={`${highlightShow && paths.split("/")[3] === "certification" && "border-4 border-amber-500" }`}>
            <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Certification</h2>
            <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
            <div  className="grid grid-cols-2 px-1 pt-1">
                {
                    Certificate.length > 0 ? 
                    Certificate.map(({id,certificateName,certificationcompanyname})=> (
                      
                     <div key={id} style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{certificateName}</p>
                        <p>{certificationcompanyname}</p>
                     </div>
                  
                    )) : 
                    ["Google Analytics","Contextual Marketing"].map((d,i)=>(
                     <div key={i} style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{d}</p>
                        <p>Google</p>
                     </div>
                    ))
                }
            </div>
        </div>
    )
}