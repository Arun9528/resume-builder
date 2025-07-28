import { customtypes } from "@/store/slices/styleSlice";
import { AiOutlineLink } from "react-icons/ai";
import { BiSolidCalendar } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";

export default function CustomLayoutData({
  customlayout,
}: Partial<{ customlayout: customtypes }>) {
  return (
    <div>
      {customlayout?.title && <p className="font-medium">Title</p>}
      <div className={`${customlayout?.layout === "normal" ? "flex justify-between gap-x-1.5 items-center" : ""} text-xs`}>
        {customlayout?.subtitle && (
          <p className="font-medium flex-5/12">Paragraph</p>
        )}
        <div className="flex flex-7/12 flex-wrap gap-x-1">
          {customlayout?.withdate && (
            <div className="flex gap-x-1 justify-end w-full items-center">
              <BiSolidCalendar
                size={11}
                className="flex-shrink-0"
              />
              <p className="w-max text-[11px] text-end">01/01/2025</p>
            </div>
          )}

          {customlayout?.withoutdate && (
            <div className="flex gap-x-1 justify-end w-full  items-center">
              <BiSolidCalendar
                size={11}
                className="flex-shrink-0"
              />
              <p className="w-max text-[11px]">01/2025</p>
            </div>
          )}
          {customlayout?.startEnddate && (
            <div className="flex items-center gap-x-1 justify-end w-full ">
              <BiSolidCalendar size={11} className="flex-shrink-0" />
              <p className="w-max text-[11px] truncate">
                02/2025 - (03/2025 or Present)
              </p>
            </div>
          )}
          {customlayout?.location && (
            <div className="flex items-center gap-x-1 justify-end w-full ">
              <IoLocationSharp size={11} className="flex-shrink-0" />
              <p className="w-max text-[11px] truncate">
                {" "}
                California,Los Angeles,USA
              </p>
            </div>
          )}
          {customlayout?.link && (
            <div className="flex items-center gap-x-1 justify-end w-full ">
              <AiOutlineLink size={11} className="flex-shrink-0" />
              <p className="w-max text-[11px] truncate">www. helloWorld.com</p>
            </div>
          )}
        </div>
      </div>
      {customlayout?.normaldesciption && (
        <p className="text-xs text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil omnis
          corporis porro harum repudiandae impedit voluptate eaque eligendi
          sapiente aliquid.
        </p>
      )}
      {customlayout?.listdescription && (
        <ul className="text-xs list-disc ps-3.5">
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
      )}
    </div>
  );
}
