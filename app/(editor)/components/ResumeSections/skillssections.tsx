"use client"
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";

export default function SkillsSections({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps){
     const ResumeSkills = useSelector(
        (state: RootState) => state.resumeBuilder.skills
      );
    return (
        <div
        className={`${
          highlightShow &&
          paths.split("/")[2] === "skills" &&
          "border-4 border-amber-500"
        }`}
      >
        <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Skills</h2>
        <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
        <div className="flex flex-wrap gap-x-2" style={{fontSize:fontSize.para,lineHeight: lineHeight === 1 ? 1.1 : lineHeight}}>
          {ResumeSkills.isWebDev ? (
            ResumeSkills?.WebDevValue!.length > 0
            ?
            ResumeSkills?.WebDevValue?.map(({ id, langugages }) => (<p key={id} className="pt-1">{langugages},</p>))
            :
             ["HTML","CSS","JavaScript","TypeScript","React","Next.js","Node.js","Express.js","MongoDB"].map((lang, i) => <p key={i} className="pt-1">{lang}, </p>)
            )
            : 
            ResumeSkills.skillInputValue ? (
            <p className="pt-1">{ResumeSkills?.skillInputValue}</p>
          ) :
            ["HTML","CSS","JavaScript","TypeScript","React","Next.js","Node.js","Express.js","MongoDB"].map((lang, i) => <p key={i} className="pt-1">{lang}, </p>)}
        </div>
      </div>
    )
}