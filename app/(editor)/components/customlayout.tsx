import Inputs from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  customtypes,
  setAddSection,
  setCustomlayoutData,
  setCustomlayout,
} from "@/store/slices/styleSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import React, { ChangeEvent, useEffect, useRef } from "react";
import CustomPreviewLayout from "./custompreviewlayout";
import { TemplateKey } from "../[templateId]/layout";
import UpdateDragData from "@/utils/updateDragdata";
const AllSectionName = [
  "custom",
  "customs",
  "volunteering",
  "certification",
  "certifications",
  "awards",
  "award",
  "publication",
  "publications",
  "training/courses",
  "training/course",
  "training / courses",
  "training / course",
  "interests",
  "interest",
  "languages",
  "language",
  "summary",
  "skills",
  "skill",
  "experience",
  "projects",
  "project",
  "educations",
  "education",
  "achievements",
  "achievement",
  "strengths",
  "strength",
];
interface SubmitEvent extends React.BaseSyntheticEvent {
  submitter: HTMLButtonElement;
}
export default function CustomLayout({templateId}:{templateId:TemplateKey}) {
  const AddSection = useSelector((state: RootState) => state.style.addSection);
  const TemplateName = AddSection[templateId]
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<customtypes>({
    defaultValues: {
      maintitle: "",
      title: true,
      subtitle: true,
      withdate: false,
      withoutdate: false,
      startEnddate: false,
      location: false,
      link: false,
      normaldesciption: true,
      listdescription: false,
      layout:"normal"
    },
    mode: "onChange",
  });
  const formData = watch();
  const withDate = watch("withdate");
  const withoutDate = watch("withoutdate");
  const startEnddate = watch("startEnddate");
  const normaldesciption = watch("normaldesciption");
  const listdescription = watch("listdescription");
  const prevFormDataStringRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    const currentFormDataString = JSON.stringify(formData);
    if (currentFormDataString !== prevFormDataStringRef.current) {
      dispatch(setCustomlayout(formData));
      prevFormDataStringRef.current = currentFormDataString;
    }
  }, [formData, dispatch]);
  const onSubmit: SubmitHandler<customtypes> = (data, event) => {
    if (!event) return;
    let first = TemplateName?.first ?? [];
    let second = TemplateName?.second ?? [];
    let other = TemplateName?.other ?? [];
    const clickButton = (event?.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    if (!clickButton) return;
    const customs = AddSection?.unusedsection![0];
    const NewSection = `${data.maintitle} (${customs})`.toLowerCase();
    if (clickButton?.name === "above") {
      first = [...first, NewSection];
    } else if (clickButton?.name === "below") {
      second = [...second, NewSection];
    }
    other = [...other, NewSection];
    if (errors.maintitle) return;
    AllSectionName.push(data.maintitle);
    dispatch(setCustomlayoutData(data));
    dispatch(
      setAddSection({
        isShow: true,
        customsection: false,
        
        [templateId]: { first, second, other },
        tempalteUsedName:templateId
      })
    );
    const getlayoutData = sessionStorage.getItem("customLayouts") || "";
    if(getlayoutData){
      const storedData = JSON.parse(getlayoutData);
      sessionStorage.setItem("customLayouts",JSON.stringify([...storedData,data]));
    }else{
    sessionStorage.setItem("customLayouts",JSON.stringify([data]))
    }
    sessionStorage.setItem("AllSectionName",JSON.stringify(AllSectionName))
    sessionStorage.setItem("templateIdData",JSON.stringify({ first, second, other }));
    sessionStorage.setItem("unusedsectionData", JSON.stringify(AddSection.unusedsection));
    UpdateDragData(dispatch, first, second, templateId,data.maintitle,clickButton.name);
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  useEffect(()=>{
    const getAllSectionName = sessionStorage.getItem("AllSectionName") || "";
    if( !getAllSectionName)return
    if( getAllSectionName){
      const getSectionData = JSON.parse(getAllSectionName);
      const filterData = AllSectionName.filter(d => !getSectionData.includes(d));
      AllSectionName.push(...filterData)
    }
  },[])
  const isTemplatetitle1 = templateId === "template1" ? "Add Above" : templateId === "template2" ? "Add Left" : "Add Section";
  const isTemplatetitle2 = templateId === "template1" ? "Add Below" : templateId === "template2" ? " Add Right" : "";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 items-center relative">
      <div className="w-80 min-h-44 p-4 border border-zinc-300 shadow-2xs rounded-md justify-self-center">
        <CustomPreviewLayout />
      </div>
      <div className=" py-6 sm:pt-0 justify-items-center sm:justify-items-end md:justify-items-start">
        <h2 className="text-lg font-semibold">
          What Should this Section have ?
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <div className="pt-3 pb-1">
            <label htmlFor="maintitle" className="pe-2  font-medium">
              Main Title
            </label>
            <input
              type="text"
              id="maintitle"
              className="outline-0 border-b border-b-gray-300 max-w-64 placeholder:text-zinc-600"
              placeholder="Please Enter the Title"
              autoComplete="off"
              {...register("maintitle", {
                required: "Please Fill the Main Title",
                validate: (v) => {
                  const trimValue = v.trim();
                  const isForbidden = AllSectionName.some(
                    (n) => n.toLowerCase() === trimValue.toLowerCase()
                  );
                  const inOtherValue = TemplateName.other
                    .join(" ")
                    .replaceAll(" (custom)", "")
                    .split(" ");
                  const isForbidden2 = inOtherValue.some(
                    (n) => n.toLowerCase() === trimValue.toLowerCase()
                  );
                  return (
                    !isForbidden ||
                    !isForbidden2 ||
                    `You cannot duplicate the section name "${v}"`
                  );
                },
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const valueWithoutSpaces = e.target.value.trimStart();
                setValue("maintitle", valueWithoutSpaces, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.maintitle && (
              <p className="text-red-500 text-sm absolute translate-x-20">
                {errors.maintitle.message}
              </p>
            )}
          </div>
          <Inputs
            type="checkbox"
            label="Title"
            name="title"
            register={register}
          />
          <Inputs
            type="checkbox"
            label="Sub-Title"
            name="subtitle"
            register={register}
          />
          <div>
            <h5 className="text-sm font-semibold">
              Which type of layout you Want ?
            </h5>
            <Inputs
              type="radio"
              label="Normal"
              value="normal"
              name="layout"
              register={register}
            />
            <Inputs
              type="radio"
              label="Double"
              value="double"
              name="layout"
              register={register}
            />
          </div>
          <Inputs
            type="checkbox"
            label="Normal Description "
            name="normaldesciption"
            register={register}
            disabled={listdescription}
          />
          <Inputs
            type="checkbox"
            label="List Description"
            name="listdescription"
            register={register}
            disabled={normaldesciption}
          />
          <Inputs
            type="checkbox"
            label="With Date"
            name="withdate"
            register={register}
            disabled={startEnddate || withoutDate}
          />
          <Inputs
            type="checkbox"
            label="Without Date(MM/YYYY)"
            name="withoutdate"
            register={register}
            disabled={startEnddate || withDate}
          />
          <Inputs
            type="checkbox"
            label="StartEnddate"
            name="startEnddate"
            register={register}
            disabled={withDate || withoutDate}
          />
          <Inputs
            type="checkbox"
            label="location"
            name="location"
            register={register}
          />
          <Inputs
            type="checkbox"
            label="Link"
            name="link"
            register={register}
          />
          <div className="flex w-full gap-x-7 pb-4 justify-end sm:justify-start md:justify-center absolute -translate-x-52 sm:-translate-x-1/2 -bottom-20 customLayout">
            <button
              type="submit"
              className="py-2.5 px-12 text-lg rounded-md bg-purple-600 text-white cursor-pointer text-center"
              name="above"
            >
              {/* Add Above */}
              {isTemplatetitle1}
            </button>
           {
            templateId !== "template3" &&  <button
              type="submit"
              className="py-2.5 px-12 text-lg rounded-md bg-purple-600 text-white cursor-pointer text-center"
              name="below"
            >
              {/* Add Below */}
              {isTemplatetitle2}
            </button>
           }
          </div>
        </form>
      </div>
    </div>
  );
}
