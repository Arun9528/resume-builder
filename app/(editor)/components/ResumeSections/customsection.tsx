import { RootState } from "@/store";
// import { BiSolidCalendar } from "react-icons/bi";
// import { IoLocationSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
// import { AiOutlineLink } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { customtypes} from "@/store/slices/styleSlice";
import { SectionProps } from "./headingsection";
import { CustomPageData } from "@/types/type";
import CustomLayoutSection from "./customlayoutsection";

export interface LayoutDataProps extends SectionProps {
  layoutData: customtypes;
}
export default function CustomSection({
  highlightShow,
  paths,
  layoutData,
  fontColor,
  fontSize,
  lineHeight,
}: LayoutDataProps) {
  const [showPageData, setShwopageData] = useState<Partial<CustomPageData[]>>(
    []
  );
  const Custom = useSelector(
    (state: RootState) => state.resumeBuilder.customPageData
  );
  useEffect(() => {
    const pageData = Custom.filter(
      (d) => d.maintitle.toLowerCase() === layoutData?.maintitle.toLowerCase()
    );
    if (pageData) {
      setShwopageData(pageData);
    }
  }, [layoutData, Custom]);
  return (
    <div
      className={`${
        highlightShow &&
        paths?.split("/")[3] === "custom" &&
        "border-4 border-amber-500"
      }`}
    >
      <h2
        className="font-medium"
        style={{ color: fontColor.outer, fontSize: fontSize.heading }}
      >
        {layoutData?.maintitle}
      </h2>
      <div style={{ border: `1.5px solid ${fontColor.outer}` }}></div>
      <div className={`grid ${layoutData?.layout === "normal" ? "grid-cols-1" : "grid-cols-2 gap-x-3.5"}`}
      >
        {showPageData.length > 0 ? (
          showPageData.map((data) => (
        //     <div key={data?.id}  style={{
        //   fontSize: fontSize.para,
        //   lineHeight: lineHeight === 1 ? 1.1 : lineHeight,
        // }}>
        //       {layoutData?.title && (
        //         <p
        //           className="font-bold"
        //           style={{
        //             fontSize: fontSize.mainpara,
        //             color: fontColor.inner,
        //           }}
        //         >
        //           {data?.customtitle}
        //         </p>
        //       )}
        //       <div className="flex justify-between gap-x-1.5 items-center">
        //         {layoutData?.subtitle && (
        //           <p className=" flex-5/12">{data?.customsubtitle}</p>
        //         )}
        //         <div className="flex flex-7/12 flex-wrap gap-x-1">
        //           {layoutData?.withdate && (
        //             <div className="flex gap-x-1 justify-end w-full items-center">
        //               <BiSolidCalendar
        //                 style={{ color: fontColor?.inner }}
        //                 className="-translate-y-[2px]"
        //               />
        //               <p className="w-max text-end">{data?.customwithdate}</p>
        //             </div>
        //           )}
        //           {layoutData?.withoutdate && (
        //             <div className="flex gap-x-1 justify-end w-full  items-center">
        //               <BiSolidCalendar
        //                 style={{ color: fontColor?.inner }}
        //                 className="-translate-y-[2px]"
        //               />
        //               <p className="w-max text-end">
        //                 {data?.customwithoutdate}
        //               </p>
        //             </div>
        //           )}
        //           {layoutData?.startEnddate && (
        //             <div className="flex items-center gap-x-1 justify-end w-full ">
        //               <BiSolidCalendar
        //                 className="-translate-y-[2px]"
        //                 style={{ color: fontColor.inner }}
        //               />
        //               <p className="w-max truncate">
        //                 {data?.customstartEnddate?.startdate}
        //               </p>
        //             </div>
        //           )}
        //           {layoutData?.location && (
        //             <div className="flex items-center gap-x-1 justify-end w-full ">
        //               <IoLocationSharp
        //                 className="-translate-y-[2px]"
        //                 style={{ color: fontColor.inner }}
        //               />
        //               <p className="w-max truncate">{data?.customlocation}</p>
        //             </div>
        //           )}
        //           {layoutData?.link && (
        //             <div className="flex items-center gap-x-1 justify-end w-full ">
        //               <AiOutlineLink
        //                 className="-translate-y-[1px]"
        //                 style={{ color: fontColor.inner }}
        //               />
        //               <p className="w-max truncate">{data?.customlink}</p>
        //             </div>
        //           )}
        //         </div>
        //       </div>
        //       {layoutData?.normaldesciption && (
        //         <p className="text-justify">
        //           {data?.customdescription?.[0]?.value}
        //         </p>
        //       )}
        //       {layoutData?.listdescription &&
        //         ((data?.customdescription?.length ?? [].length) > 0 ? (
        //           <ul className="list-disc pl-5 mt-2">
        //             {data?.customdescription?.map((d, i) => (
        //               <li key={i}>{d.value}</li>
        //             ))}
        //           </ul>
        //         ) : (
        //           ""
        //         ))}
        //     </div>
        <CustomLayoutSection key={data?.id} fontColor={fontColor} fontSize={fontSize} lineHeight={lineHeight} layoutData={layoutData} data={data}/>
          ))
        ) : (
          <>
            <CustomLayoutSection fontColor={fontColor} fontSize={fontSize} lineHeight={lineHeight} layoutData={layoutData} />
          {
            layoutData.layout === "double" && ( <CustomLayoutSection fontColor={fontColor} fontSize={fontSize} lineHeight={lineHeight} layoutData={layoutData} />)
          }
          </>
        )}
      </div>
    </div>
  );
}
