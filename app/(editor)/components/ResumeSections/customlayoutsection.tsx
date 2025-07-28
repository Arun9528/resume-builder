import { BiSolidCalendar } from "react-icons/bi";
import { LayoutDataProps } from "./customsection";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";
import { CustomPageData } from "@/types/type";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
// import { useEffect } from "react";

export default function CustomLayoutSection({
  fontSize,
  lineHeight,
  fontColor,
  layoutData,
  data,
}: Partial<LayoutDataProps & { data: CustomPageData }>) {
  const { first } = useSelector(
    (state: RootState) => state.style.addSection.template1
  );
  const RemoveCustomFirst = first
    .join(" ")
    .replaceAll(" (custom)", "")
    .split(" ")
    .includes(layoutData?.maintitle ?? ""); 
  return (
    <div
      style={{
        fontSize: fontSize?.para,
        lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
      }}
    >
      {layoutData?.title && (
        <p
          className="font-bold"
          style={{ fontSize: fontSize?.mainpara, color: fontColor?.inner }}
        >
          {data?.customtitle || "Title"}
        </p>
      )}
      <div
        className={`${
          layoutData?.layout === "normal"
            ? "flex justify-between gap-x-1.5 items-center"
            : ""
        }`}
      >
        {layoutData?.subtitle && (
          <p className=" flex-5/12">{data?.customsubtitle || "Paragraph"}</p>
        )}
        <div
          className={`${
            layoutData?.layout === "normal"
              ? "flex flex-7/12 flex-wrap justify-end gap-x-1 w-full"
              : `${!RemoveCustomFirst && "text-[13px]"}`
          }`}
        >
          {layoutData?.withdate && (
            <div className={`flex gap-x-1 justify-end items-center ${!RemoveCustomFirst &&  "w-full"}`}>
              <BiSolidCalendar
                style={{ color: fontColor?.inner }}
                className="-translate-y-[2px]"
              />
              <p className="w-max text-end">
                {data?.customwithdate || "01/01/2025"}
              </p>
            </div>
          )}
          {layoutData?.withoutdate && (
            <div className={`flex gap-x-1 justify-end items-center ${!RemoveCustomFirst &&  "w-full"}`}>
              <BiSolidCalendar
                style={{ color: fontColor?.inner }}
                className="-translate-y-[2px]"
              />
              <p className="w-max text-end">
                {data?.customwithoutdate || "01/2025"}
              </p>
            </div>
          )}
          {layoutData?.startEnddate && (
            <div className={`flex gap-x-1 justify-end items-center ${!RemoveCustomFirst &&  "w-full"}`}>
              <BiSolidCalendar
                className="-translate-y-[2px]"
                style={{ color: fontColor?.inner }}
              />
              <p className="w-max truncate">
                {`${data?.customstartEnddate.startdate || "02/2025"}-${
                  (data?.customstartEnddate.present
                    ? "Present"
                    : data?.customstartEnddate.endate) || "03/2025 or Present"
                }  `}
              </p>
            </div>
          )}
          {layoutData?.location && (
            <div className={`flex gap-x-1 justify-end items-center ${!RemoveCustomFirst &&  "w-full"}`}>
              <IoLocationSharp
                className="-translate-y-[2px]"
                style={{ color: fontColor?.inner }}
              />
              <p className="w-max truncate">
                {data?.customlocation || "California,Los Angeles,USA"}
              </p>
            </div>
          )}
          {layoutData?.link && (
            <div className={`flex gap-x-1 justify-end items-center ${!RemoveCustomFirst &&  "w-full"}`}>
              <AiOutlineLink
                className="-translate-y-[1px]"
                style={{ color: fontColor?.inner }}
              />
              <Link href={data?.customlink || "#"} target="_blank" className="w-max truncate underline-offset-1 hover:underline ">
                {data?.customlink || "www. helloWorld.com"}
              </Link>
            </div>
          )}
        </div>
      </div>
      {layoutData?.normaldesciption && (
        <p className="text-justify">
          {data?.customdescription[0].value ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil omnis corporis porro harum repudiandae impedit voluptate eaque eligendisapiente aliquid."}
        </p>
      )}
      {layoutData?.listdescription &&
        ((data?.customdescription?.length ?? [].length) > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {data?.customdescription?.map((d, i) => (
              <li key={i}>{d.value}</li>
            ))}
          </ul>
        ) : (
          <ul className="list-disc ps-3.5">
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              veritatis a voluptate.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              veritatis a voluptate.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              veritatis a voluptate.
            </li>
          </ul>
        ))}
    </div>
  );
}
