import React from "react";
import { SectionProps } from "./headingsection";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function StrengthSection({
  highlightShow,
  paths,fontColor,fontSize,lineHeight
}: SectionProps) {
  const Strengths = useSelector(
    (state: RootState) => state.resumeBuilder.strength
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "strengths" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Strengths</h2>
      <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
      {Strengths.length > 0
        ? Strengths.map(({ id, strengthsname, description }) => (
            <div key={id} className={`${!!description ? "" : "grid grid-cols-2"}`} style={{fontSize:fontSize.para,lineHeight:(lineHeight === 1.1 ? 1.2 : lineHeight)}}>
              <h3 className="font-semibold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{strengthsname}</h3>
              {!!description && <p >{description}</p>}
            </div>
          ))
        : ["Delegation","Analytical thinking","Teamwork"].map((d, i) => (
            <div key={i}  style={{fontSize:fontSize.para,lineHeight:(lineHeight === 1.1 ? 1.2 : lineHeight)}}>
              <h3 className="font-semibold" style={{fontSize:fontSize.mainpara,color:fontColor.inner}}>{d}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores, laboriosam.
              </p>
            </div>
          ))}
    </div>
  );
}
