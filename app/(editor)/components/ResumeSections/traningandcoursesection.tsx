import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";
import { RootState } from "@/store";

export default function TraningAndCourseSection({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps){
    const TrainingAndCourses = useSelector((state:RootState)=> state.resumeBuilder.trainingandcourses);
    return(
        <div className={`${highlightShow && paths.split("/")[3] === "traning/course" && "border-4 border-amber-500" }`}>
            <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Training / Course</h2>
            <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
            <div>
                {
                   TrainingAndCourses.length > 0 ?
                   (
                     TrainingAndCourses.map(({id,trainingandCoursename,description})=> <div key={id} style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{trainingandCoursename}</p>
                        <p>{description}</p>
                     </div>)
                   ) 
                   :
                   (
                     ["Creative Writing","Introduction to Photoshop"].map((d,i)=>(
                        <div key={i} style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
                        <p className="font-bold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{d}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab cumque explicabo odit, officiis nostrum tenetur tempore aspernatur voluptates ipsum esse!</p>
                     </div>
                    ))
                   )
                }
            </div>
        </div>
    )
}