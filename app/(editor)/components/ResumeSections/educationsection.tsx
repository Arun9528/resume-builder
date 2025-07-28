import { RootState } from "@/store";
import { BiSolidCalendar } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { SectionProps } from "./headingsection";

export default function EducationSection({highlightShow,paths,fontColor,fontSize,lineHeight}:SectionProps) {
  const education = useSelector(
    (state: RootState) => state.resumeBuilder.education
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "education" &&
        "border-4 border-amber-500 "
      }`}
    >
      <h2 className="font-medium" style={{color:fontColor.outer,fontSize:fontSize.heading}}>Education</h2>
      <div style={{border:`1.5px solid ${fontColor.outer}`}}></div>
        {education.length > 0 ? (
          education.map(
            ({
              id,
              collegename,
              degree,
              startdate,
              enddate,
              stillgoingon,
              Educationlocation,
            }) => (
              <div key={id} >
                <div style={{lineHeight:(lineHeight === 1 ? 1.1 : lineHeight)}}>
                  <p>{degree}</p>
                  <div className="flex justify-between">
                     <h3>{collegename}</h3>
                     <div className="flex gap-x-3 ">
                    <div className="flex items-center gap-x-1">
                      <BiSolidCalendar />
                      <p>{startdate} - {stillgoingon ? "Still Going ON" : enddate}</p>
                      {/* <span>-</span>
                      <p>{stillgoingon ? "Still Going ON" : enddate}</p> */}
                    </div>
                    <div  className="flex items-center gap-x-1">
                        <IoLocationSharp />
                        <p className="translate-y-[1.5px]">{Educationlocation}</p>
                    </div>
                    
                  </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <>
            <div style={{fontSize:fontSize.para,lineHeight:(lineHeight === 1 ? 1.2 : lineHeight)}} >
              <p style={{fontSize:fontSize.mainpara,color:fontColor.inner,fontWeight:"500"}}>MCA</p>
              <h3>Harvard University</h3>
              <div className="flex gap-x-3">
                <div className="flex items-center gap-x-1">
                  <BiSolidCalendar style={{color:fontColor.inner}} />
                   <p className="translate-y-[1.5px]">2024 - 2025</p>
                  {/* <p>2024</p>
                  <span>-</span>
                  <p>2025</p> */}
                </div>
                <div className="flex items-center gap-x-1">
                   <IoLocationSharp style={{color:fontColor.inner}}  /> 
                    <p className="translate-y-[1.5px]" >Cambridge, Massachusetts</p>
                </div>
               
              </div>
            </div>
            <div style={{fontSize:fontSize.para,lineHeight:(lineHeight === 1 ? 1.1 : lineHeight)}}>
              <p style={{fontSize:fontSize.mainpara,color:fontColor.inner,fontWeight:"500"}} >BCA</p>
              <h3>Columbia University</h3>
              <div className="flex gap-x-3">
                <div className="flex items-center gap-x-1">
                  <BiSolidCalendar  style={{color:fontColor.inner}}   />
                  <p className="translate-y-[1.5px]">2024 - 2025</p>
                  {/* <span>-</span>
                  <p>2025</p> */}
                </div>
                <div className="flex items-center gap-x-1">
                  <IoLocationSharp  style={{color:fontColor.inner}}/>
                  <p className="translate-y-[1.5px]">New York City</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
  );
}
