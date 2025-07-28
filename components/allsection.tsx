"use client"
import { TemplateKey } from "@/app/(editor)/[templateId]/layout";
import { setAddSection } from "@/store/slices/styleSlice";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";

interface AllSectionsProps {
  title: string;
  usedsection: boolean;
  handleAdd?: (title: string, value: string) => void;
  handleRemove?: (title: string) => void;
  AddAbove?: boolean;
  templateId :TemplateKey;
}
export default function AllSections({
  title,
  usedsection,
  handleAdd,
  handleRemove,
  AddAbove,
  templateId
}: AllSectionsProps) {
  const handleClickbtn1 = () => {
    if (usedsection) {
      if (AddAbove) {
        handleRemove?.(title);
      } else {
        handleAdd?.(title, "above");
      }
    } else {
      handleAdd?.(title, "above");
    }
  };
  const handleClickbtn2 = () => {
    if (AddAbove) {
      handleAdd?.(title, "below");
    } else if (usedsection) {
      handleRemove?.(title);
    } else {
      handleAdd?.(title, "below");
    }
  };
  const dispatch = useDispatch();
  const imageTitle = title.includes("custom");
  const istemplate3 = templateId.includes("template3");
  const templateTitle1 = templateId === "template1" ? "Add Above" : templateId === "template2" ? "Add Left" : "Add Section";
  const templateTitle2 = templateId === "template1" ? "Add Below" : templateId === "template2" && "Add Right";
  return (
    <div>
      <div
        className="w-72 h-48 shadow-lg inset-shadow-sm text-center rounded-md relative group overflow-hidden bg-origin-content p-2.5 "
        style={{
          backgroundImage: `url(/images/sections/${
            title === "training / courses"
              ? "trainingcourse"
              : imageTitle
              ? "custom"
              : title
          }.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute opacity-0 translate-y-96  group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out  bg-zinc-900/60 inset-0">
          {title === "custom" ? (
            <button
              type="button"
              className="py-2 px-4 w-max bg-purple-600 cursor-pointer font-medium rounded-md text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onClick={() =>
                dispatch(setAddSection({ customsection: true, isShow: true }))
              }
            >
              Add Section
            </button>
          ) : (
            <>
              <button
                type="button"
                className={`py-2 px-4 w-max cursor-pointer font-medium  rounded-md text-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 ${istemplate3 ? "-translate-y-1/2" : "-translate-y-12"} ${
                  usedsection
                    ? AddAbove
                      ? "bg-red-600"
                      : "bg-purple-600"
                    : "bg-purple-600"
                }`}
                onClick={handleClickbtn1}
              >
                {usedsection
                  ? AddAbove
                    ? "Remove Section"
                    : templateTitle1
                  : templateTitle1}
              </button>
              {
                !istemplate3 && (
                  <button
                type="button"
                className={`py-2 px-4 w-max cursor-pointer font-medium  rounded-md text-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-0 ${
                  AddAbove
                    ? "bg-purple-600"
                    : usedsection
                    ? "bg-red-600"
                    : "bg-purple-600"
                } `}
                onClick={handleClickbtn2}
              >
                {usedsection
                  ? AddAbove
                    ? templateTitle2
                    : "Remove Section"
                  : templateTitle2}
              </button>
                )
              }
            </>
          )}

          {/* // !usedsection &&  */}
        </div>
        {usedsection && (
          <div className="size-16 -right-9 absolute -bottom-8 rotate-45 bg-green-600">
            <FaCheck
              color="white"
              className="text-md rotate-[-60deg] translate-x-0.5 translate-y-[25px]"
            />
          </div>
        )}
      </div>
      <p className="text-center capitalize font-medium">{title}</p>
    </div>
  );
}
