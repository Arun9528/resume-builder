import { BiSolidCalendar } from "react-icons/bi";
import { SectionProps } from "./headingsection";
import { AiOutlineLink } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

export default function PublicationSection({
  highlightShow,
  paths,
  fontColor,
  fontSize,
  lineHeight,
}: SectionProps) {
  const Publication = useSelector(
    (state: RootState) => state.resumeBuilder.publication
  );
  return (
    <div
      className={`${
        highlightShow &&
        paths.split("/")[2] === "publication" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2
        className="font-medium"
        style={{ color: fontColor.outer, fontSize: fontSize.heading }}
      >
        Publication
      </h2>
      <div style={{ border: `1.5px solid ${fontColor.outer}` }}></div>
      <div>
        {Publication.length > 0 ? (
          Publication.map(
            ({ id, publishdate, publishlink, maintitle, publicationsubtitle, description }) => (
              <div
                key={id}
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
                  {maintitle}
                </p>
                <div className="grid grid-cols-[45% 55%]">
                  <p>{publicationsubtitle}</p>
                  <div>
                     <div className="flex justify-end flex-wrap gap-x-4">
                    <div className="flex gap-x-1 items-center">
                      <BiSolidCalendar style={{ color: fontColor.inner }} className="-translate-y-[1.5px]"/>
                      <p>{publishdate.split("-").reverse().join("-")}</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <AiOutlineLink style={{ color: fontColor.inner }} className="-translate-y-[1.3px]" />
                      <Link href={publishlink} target="_blank" className="hover:underline underline-offset-1" >{publishlink}</Link>
                    </div>
                  </div>
                  </div>
                </div>
                <p>{description}</p>
              </div>
            )
          )
        ) : (
          <div
            style={{
              fontSize: fontSize.para,
              lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
            }}
          >
            <p
              className="font-bold"
              style={{ fontSize: fontSize.mainpara, color: fontColor.inner }}
            >
              Dublin 101
            </p>
            <div className="flex justify-between ">
              <p>Dublin Giobe</p>
              <div className="flex justify-end flex-wrap gap-x-4">
                <div className="flex gap-x-1 items-center">
                  <BiSolidCalendar style={{ color: fontColor.inner }} />
                  <p>04/03/2025</p>
                </div>
                <div className="flex gap-x-1 items-center">
                  <AiOutlineLink style={{ color: fontColor.inner }} />
                  <Link href="https://www.google.com/" target="_blank" className="hover:underline underline-offset-1" >www.dublinglobe.com/101</Link>
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quis
              et eos ullam sapiente voluptatibus.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
