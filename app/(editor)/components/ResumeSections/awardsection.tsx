import { FaAward } from "react-icons/fa"
import { SectionProps } from "./headingsection"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export default function AwardSection({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps){
    const Awards = useSelector((state:RootState)=> state.resumeBuilder.awards);
    return (
        <div className={`${highlightShow && paths.split("/")[3] === "awards" && "border-4 border-amber-500" }`}>
            <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Awards</h2>
            <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
           <div className="grid grid-cols-2 px-1 pt-1">
            {
                Awards.length > 0 ? (
                    Awards.map(({id,awardcompanyname,awardsname})=> (
                          <div key={id} className="flex gap-x-2 items-center" style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <FaAward style={{color:fontColor.inner,fontSize:"22px"}} />
                        <div>
                            <p className="font-bold" style={{fontSize:fontSize.mainpara}}>{awardsname}</p>
                            <p>{awardcompanyname}</p>
                        </div>
                     </div>
                    ))
                ) 
                :
                 (
                     ["Dean's List","Valedictorian"].map((d,i)=>
                    <div key={i} className="flex gap-x-2 items-center" style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <FaAward style={{color:fontColor.inner,fontSize:"22px"}} />
                        <div>
                            <p className="font-bold" style={{fontSize:fontSize.mainpara}}>{d}</p>
                            <p>Google</p>
                        </div>
                     </div>
                )
                 )
             }
            
           </div>
        </div>
    )
}