import { RootState } from "@/store";
import { SectionProps } from "./headingsection";
import { BiSolidCalendar } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import React from "react";

export default function ExperienceSections({
  highlightShow,
  paths,
  fontColor,
  fontSize,
  lineHeight,
}: SectionProps) {
  const experience = useSelector(
    (state: RootState) => state.resumeBuilder.experience
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "experience" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2
        className="font-medium"
        style={{ color: fontColor.outer, fontSize: fontSize.heading }}
      >
        Experience
      </h2>
      <div style={{ border: `1.5px solid ${fontColor.outer}` }}></div>
      <div>
        {experience.length > 0
          ? experience?.map(
              ({
                company,
                jobtitle,
                explocation,
                startDate,
                endDate,
                present,
                // month,
                description,
                id,
                noexperience,
              }) => (
                <div key={id}>
                  {noexperience ? (
                    <h2
                      className="font-semibold"
                      key={id}
                      style={{
                        color: fontColor.inner,
                        fontSize: fontSize.mainpara,
                      }}
                    >
                      Fresher
                    </h2>
                  ) : (
                    <div
                      style={{
                        fontSize: fontSize.para,
                        lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
                      }}
                    >
                      <p
                        className="font-bold"
                        style={{
                          fontSize: fontSize?.mainpara,
                          color: fontColor?.inner,
                        }}
                      >
                        {jobtitle}
                      </p>
                      <div className="flex justify-between">
                        <p>{company}</p>
                        <div className="flex gap-x-3 flex-wrap">
                          <div className="flex items-center gap-x-1">
                            <BiSolidCalendar
                              style={{ color: fontColor?.inner }}
                            />
                            {/* {startDate && (present || endDate) && ( */}
                              <p className="translate-y-[1.5px]">
                                {startDate} - {present ? "Present" : endDate}{" "}
                              </p>
                            {/* )} */}
                            {/* {month && <p className="translate-y-[1.5px]">
                              {month} Months
                            </p>} */}
                          </div>
                          <div className="flex items-center gap-x-1">
                            <IoLocationSharp
                              style={{ color: fontColor?.inner }}
                            />
                            <p className="translate-y-[1.5px]">
                              {" "}
                              {explocation}
                            </p>
                          </div>
                        </div>
                      </div>
                      {description?.length > 0 && description[0].value !== "" &&(
                        <ul className="ps-4 list-disc">
                        {description?.map((d, i) => (
                          <li
                            key={i}
                            className="text-justify custom-li"
                            style={
                              {
                                "--bullet-color": fontColor.inner,
                              } as React.CSSProperties & {
                                [key: string]: string;
                              }
                            }
                          >
                            {d?.value}
                          </li>
                        ))}
                      </ul>
                      )}
                    </div>
                  )}
                </div>
              )
            )
          : ["Google"].map((d, i) => (
              <div
                key={i}
                style={{
                  fontSize: fontSize.para,
                  lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
                }}
              >
                <p
                  className="font-bold"
                  style={{
                    fontSize: fontSize.mainpara,
                    color: fontColor.inner,
                  }}
                >
                  {d}
                </p>
                <div className="flex justify-between">
                  <p>Web Developer</p>
                  <div className="flex flex-wrap ">
                    <div className="flex items-center me-3 gap-x-1">
                      <BiSolidCalendar style={{ color: fontColor.inner }} />
                      <p className="translate-y-[1.5px]">2025 - Present</p>
                      {/* <span>-</span>
                      <p>Present</p> */}
                    </div>
                    <div className="flex items-center gap-x-1">
                      <IoLocationSharp style={{ color: fontColor.inner }} />
                      <p className="translate-y-[1.5px]">California</p>
                    </div>
                  </div>
                </div>
                <ul className="ps-4 list-disc">
                  {[...Array(3)].map((_, i) => (
                    <li
                      key={i}
                      className="custom-li text-justify"
                      style={
                        {
                          "--bullet-color": fontColor.inner,
                        } as React.CSSProperties & { [key: string]: string }
                      }
                    >
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Cum consequatur eius id laborum voluptatum deserunt
                      consectetur veniam enim non molestiae.
                    </li>
                  ))}
                </ul>
              </div>
            ))}
      </div>
    </div>
  );
}
