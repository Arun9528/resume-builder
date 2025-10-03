"use client"
import { customtypes } from "@/store/slices/styleSlice";
import {
  AchievementData,
  AwardsData,
  CertificateData,
  CustomData,
  CustomPageData,
  EducationData,
  ExperienceProps,
  Headings,
  HobbiesData,
  LanguageData,
  ProjectsData,
  PublicationData,
  StrengthData,
  TrainingandCourseData,
  VolunteeringData,
} from "@/types/type";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<
  T extends
    | Headings
    | ProjectsData
    | EducationData
    | AchievementData
    | StrengthData
    | ExperienceProps
    | customtypes
    | AwardsData
    | CertificateData
    | HobbiesData
    | TrainingandCourseData
    | LanguageData
    | VolunteeringData
    | PublicationData
    | CustomData
    | CustomPageData
> {
  type: string;
  label: string;
  name: Path<T>;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  validation?: RegisterOptions<T, Path<T>>;
  register: UseFormRegister<T>;
  handlePastedata?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: "normal" | "circle" | "Good" | "Very Good" | "Excellent" | "Native" | "double";
}
export default function Inputs<
  T extends
    | Headings
    | ProjectsData
    | EducationData
    | AchievementData
    | StrengthData
    | ExperienceProps
    | customtypes
    | AwardsData
    | CertificateData
    | HobbiesData
    | TrainingandCourseData
    | LanguageData
    | VolunteeringData
    | PublicationData
    | CustomData
    | CustomPageData
>({
  type,
  name,
  placeholder,
  error,
  register,
  validation,
  label,
  handlePastedata,
  disabled,
  value,
}: InputProps<T>) {
  const NameValues = [
    "title",
    "para",
    "subtitle",
    "normaldesciption","listdescription",
    "withdate", "withoutdate",
    "startEnddate",
    "location",
    "level",
    "link",
    "layout",
  ];
  const isIncludes = NameValues?.includes(name);
  const includeName = isIncludes
    ? "inline font-medium ps-2"
    : "block text-lg font-bold";
  const inclucdeNameforStyle = isIncludes
    ? "flex flex-row-reverse justify-end items-center "
    : `space-y-1.5 relative ${name?.includes("communicatelink") ?  "w-full" : "" }`;
  const isRadio = type === "radio" ? "!size-3" : "";
  const uniqueValue = `${name}-${label}`;
  const Names = [
    "projectname",
    "achievementsname",
    "strengthsname",
    "awardsname",
    "awardcompanyname",
    "certificateName",
    "certificationcompanyname",
    "hobbyname",
    "trainingandCoursename",
    "languagename","projectLink"
  ];
  const fullWidth = Names?.includes(name) ? "w-full" : "xl:w-80 lg:w-72 w-full ";
  return (
    <div className={`${inclucdeNameforStyle} `}>
      <label
        htmlFor={uniqueValue}
        className={`${includeName} ${disabled ? "!text-gray-500" : ""}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={uniqueValue}
        autoComplete="off"
        placeholder={placeholder}
        className={`outline-0 ps-2 border border-gray-300 py-2.5 rounded-md placeholder:text-gray-500  ${fullWidth}
        ${name.includes("description") ? "!w-full" : ""} 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : ""}
         ${type === "date" ? "pe-3" : ""} 
         ${label.startsWith("Description") ? "w-full" : ""}
         ${type === "checkbox" ? " cursor-pointer !size-4 accent-green-600 " : ""}
         ${isRadio}
         `}
        {...register(name, validation)}
        onPaste={handlePastedata}
        disabled={disabled}
        value={value}
      />
      {error && (
        <p className="text-red-500 text-sm  absolute top-full">
          {error?.message}
        </p>
      )}
    </div>
  );
}
