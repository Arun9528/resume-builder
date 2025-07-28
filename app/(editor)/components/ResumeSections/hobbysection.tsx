import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";
import { RootState } from "@/store";

export default function HobbySection({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps){
    const Hobbies = useSelector((state:RootState)=> state.resumeBuilder.hobbies);
    return (
      <div className={`${highlightShow && paths.split("/")[3] === "hobbies" && "border-4 border-amber-500" }`}>
        <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Hobbies</h2>
            <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
            <div  className="grid grid-cols-2 pt-1">
                {
                    Hobbies.length > 0 ?
                     (
                        Hobbies?.map(({id,hobbyname,description})=> (
                             <div key={id} style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{hobbyname}</p>
                        <p>{description}</p> 
                        </div>
                        ))
                     )
                     :
                  (
                      ["Cricket","Chess"].map((d,i)=>(
                        <div key={i} style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{d}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit sequi ex dicta iure voluptatibus itaque.</p>
                     </div>
                    ))
                  )
                }
            </div>
      </div>
    )
}