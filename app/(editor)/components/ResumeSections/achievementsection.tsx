import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";
import React from "react";

export default function AchivementSection({
  highlightShow,
  paths,fontColor,fontSize,lineHeight
}: SectionProps) {
  const Achievements = useSelector(
    (state: RootState) => state.resumeBuilder.achievement
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "achievements" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}> Key Achievements</h2>
      <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>

      { Achievements.length > 0 ?
        Achievements.map(({id,achievementsname,description})=>( 
        <div key={id}  style={{fontSize:fontSize.para,lineHeight:(lineHeight === 1.1 ? 1.2 : lineHeight)}}>
          <h3 className="font-medium" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{achievementsname}</h3>
          <p>
           {description}
          </p>
        </div>
      )) : (["Inspered & Challenged","Developed Strong Brand"].map((d, i) => (
        <div key={i} style={{fontSize:fontSize.para,lineHeight:(lineHeight === 1.1 ? 1.2 : lineHeight)}}>
          <h3 className="font-medium" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{d}</h3>
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            laboriosam.
          </p>
        </div>
      )))
      }
    </div>
  );
}
