"use client";
import Inputs from "@/components/Input";
import { RootState } from "@/store";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "@/store/slices/resumeSlice";
import { ExperienceProps } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "../../components/formnavigation";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import PopupError from "@/components/popuperror";
import { hideError, showError } from "@/store/slices/errorSlice";
import { AnimatePresence } from "motion/react";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";
const todayYear = new Date().getFullYear();
export default function ExperiencePage() {
  const Experiences = useSelector(
    (state: RootState) => state.resumeBuilder.experience
  );
  const {visible} = useSelector((state:RootState)=> state.error); 
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { nextPath, firstPart, prevPath } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const router = useRouter();
  const [isClient,setIsClient]  = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    setValue,
    control,
    trigger,
    setError,
    formState: { errors },
  } = useForm<ExperienceProps>({
    defaultValues: {
      company: "",
      jobtitle: "",
      explocation: "",
      startDate: "",
      endDate: "",
      month:"",
      present: false,
      noexperience: false,
      description: [{ value: "" }],
    },
    mode: "onChange",
  });
  const noExperience = watch("noexperience");
  const isPresent = watch("present");
  const endDate = watch("endDate");
  const watchValues = watch([
    "company",
    "endDate",
    "jobtitle",
    "explocation",
    "startDate",
    "present",
  ]);
  const des = watch("description").some((d) => d.value.trim() !== "");
  const BackAndRealodpage = Experiences.some((d) => d.noexperience === true);

  const isnoExperienceDisabled = watchValues.some(
    (d) =>
      (typeof d === "string" && d.trim() !== "") ||
      (typeof d === "boolean" && d === true) ||
      des
  );
 const isDisabled = isnoExperienceDisabled || (!BackAndRealodpage && Experiences.length > 0);
 useEffect(()=>{
  setIsClient(true);
 },[])
  useEffect(() => {
    if (isnoExperienceDisabled) {
      clearErrors("noexperience");
    }
  }, [clearErrors, isnoExperienceDisabled]);

  useEffect(() => {
    if (isPresent) {
      clearErrors("endDate");
    }
  }, [clearErrors, isPresent]);

  useEffect(() => {
    if (BackAndRealodpage) {
      setValue("noexperience", BackAndRealodpage);
    }
  }, [setValue, BackAndRealodpage]);

  useEffect(() => {
    if (noExperience) {
      const d = {
      id:crypto.randomUUID(),
      company: "",
      jobtitle: "",
      explocation: "",
      startDate: "",
      endDate: "",
      month:"",
      present: false,
      noexperience: noExperience,
      description: [{ value: "" }],
    }
      sessionStorage.setItem("experience",JSON.stringify([d]));
      dispatch(addExperience(d))
      clearErrors();
    }
  }, [clearErrors, noExperience,dispatch]);
  useEffect(()=>{
    if(!visible) return;
    const timeout = setTimeout(()=>{
      dispatch(hideError())
    },3000);
    return ()=> clearTimeout(timeout);
  },[dispatch,visible])

  const { append, remove, fields } = useFieldArray({
    control,
    name: "description",
  });
  const onSubmit: SubmitHandler<ExperienceProps> = (data) => {
    const templateData = {first:[],second:[],other:[]}
    const SaveData = { ...data, id: crypto.randomUUID() }
    if (isEdit) {
      dispatch(updateExperience(data));
      modifyResumeData(data,true)
    } else if (BackAndRealodpage) {
      dispatch(addExperience(SaveData));
      SaveResumeData(dispatch,true,templateData,SaveData)
    } else {
      dispatch(addExperience(SaveData));
      SaveResumeData(dispatch,true,templateData,SaveData)
    }
    setIsEdit(false);
    reset();
  };

  const handleEdit = (id: string) => {
    const findIndex = Experiences.find((d) => d.id === id);
    if (findIndex !== undefined) {
      Object.entries(findIndex).forEach(([key, value]) => {
        setValue(key as keyof ExperienceProps, value);
      });
    }
    setIsEdit(true);
  };

  const handleAddDescription = useCallback(async () => {
    const lastIndex = fields.length - 1;
    const FieldName = `description.${lastIndex}.value` as const;
    const isFieldValid = await trigger(FieldName);
    if (!isFieldValid) {
      setError(FieldName, {
        type: "manual",
        message:
          "You can't add an empty description you have to write something!",
      });
      return;
    }
    append({ value: "" });
  }, [append, trigger, fields, setError]);

  const onNext = async () => {
    const isValid = await trigger();
    const allValues = watch();
    const EmptyDataChecked =
      Object.values(watchValues).every(
        (d) =>
          (typeof d === "string" && d === "") ||
          (typeof d === "boolean" && d === false)
      ) && !des;
      
    if (noExperience) {
      clearErrors();
      router.push(`/${firstPart}${nextPath}`);
      dispatch(addExperience({ ...allValues, id: crypto.randomUUID() }));
    } else if (EmptyDataChecked && Experiences.length > 0) {
      clearErrors();
      router.push(`/${firstPart}${nextPath}`);
    }
     else if (EmptyDataChecked && Experiences.length === 0) {
      const msg = "Please add at least one Experience before proceeding.";
      dispatch(showError(msg));
    }
     else if (isValid) {
      const msg = "Please submit the form before proceeding.";
      dispatch(showError(msg))
    }
  };

  return (
    <div className="relative pt-8">
        <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
      <div className="flex items-center gap-x-2 pt-3">
        <label htmlFor="isFresher">No Experience(Fresher)</label>
        <input
          type="checkbox"
          id="isFresher"
          {...register("noexperience", {
            required:
              !isnoExperienceDisabled &&
              "No Experience is Required if You are Fresher",
          })}
          className="size-4"
          {...(isClient ? {disabled:isDisabled} : {})}
        />
        {isClient && Experiences.length === 0 && errors.noexperience && (
          <p className="text-red-500 text-sm ms-5">
            {errors?.noexperience.message}
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-between mt-5 gap-5"
      >
        <Inputs
          type="text"
          label="Company"
          name="company"
          placeholder="Please Enter Your Company Name"
          register={register}
          validation={{
            required: "Company Name is Required",
            minLength: { value: 3, message: "Company at lease 3 Character" },
          }}
          error={errors?.company}
          disabled={noExperience}
        />
        <Inputs
          type="text"
          label="Jobtitle"
          name="jobtitle"
          placeholder="Please Enter Your Jobtitle Name"
          register={register}
          validation={{ required: "JobTitle Name is Required" }}
          error={errors?.jobtitle}
          disabled={noExperience}
        />
        <Inputs
          type="text"
          label="Location"
          name="explocation"
          placeholder="Please Enter Your Location Name"
          register={register}
          validation={{ required: "Location Name is Required " }}
          error={errors?.explocation}
          disabled={noExperience}
        />
        <Inputs
          type="text"
          label="To"
          name="startDate"
          placeholder="Enter Year (e.g., 2023)"
          register={register}
          validation={{
            // required: "Please Write your Start Date",
            pattern: {
              value: /^\d{4}$/,
              message: "Year must be 4 digits",
            },
            validate: {
             empty:(v)=> (v === "" || v === null) || true,
              notFuture: (v) =>
                Number(v) <= todayYear || "Start Date can't be in the future",
              beforEnd: (v) => {
                const endDateval = watch("endDate");
                if(!endDate) return true
                return (
                  Number(v) < Number(endDateval) ||
                  "Start Date must be before End Date"
                );
              },
            },
          }}
          error={errors?.startDate}
          disabled={noExperience}
        />
        <div className="flex items-end gap-x-5 mb-3">
          <Inputs
            type="text"
            label="Form"
            name="endDate"
            placeholder="Enter Year (e.g., 2023)"
            register={register}
            validation={{
              // required:
              //   !isPresent &&
              //   "End Date is Required if present is not Checked",
              pattern: {
                value: /^\d{4}$/,
                message: "Year must be 4 digits",
              },
              validate: {
                empty:(v)=> (v === "" || v === null) || true,
                notFuture: (v) =>
                  isPresent
                    ? true
                    : Number(v) <= todayYear ||
                      "End Date can't be in the future",
                afterStart: (v) => {
                  if (isPresent) return true;
                  const startDateVal = watch("startDate");
                  if(!startDateVal) return true;
                  return (
                    Number(v) > Number(startDateVal) ||
                    "End Date must be after Start Date"
                  );
                },
              },
            }}
            disabled={noExperience || isPresent}
            error={errors?.endDate}
          />
          <div className="flex flex-col items-center">
            <input
              type="checkbox"
              id="present"
              className={`size-4 ${
                (noExperience || !!endDate) && "bg-gray-400 cursor-not-allowed"
              }`}
              {...register("present")}
              disabled={noExperience || !!endDate}
            />
            <label
              htmlFor="present"
              className={`${
                (noExperience || !!endDate) &&
                "text-gray-400 cursor-not-allowed"
              }`}
            >
              Present
            </label>
          </div>
        </div>
        <Inputs
         type = "number"
         label="Month"
         name = "month"
         placeholder="Enter Month (e.g.,1)"
         register={register}
         validation={{
          validate:{
            notMonth:(v)=>{
              if(v === "" || v === null) return true;
              const n = Number(v);
              if (Number?.isNaN(n)) return "Month must be a number";
              return (n >= 1 && n <= 12) || "Please month Should be 1 to 12";
            }
          }
         }}
         error={errors?.month}
        />
        <div className="w-full">
          {fields?.map((field, index) => (
            <div key={field?.id} >
              <Inputs
                key={field?.id}
                type="text"
                name={`description.${index}.value`}
                label={`Description ${index + 1}`}
                placeholder="Please Enter Your Description"
                register={register}
                // validation={{ required: "Description is Required" }}
                disabled={noExperience}
                error={errors?.description?.[index]?.value}
              />
              {fields?.length > 1 && (
                <div className="text-end">
                  <button
                  type="button"
                  className="text-red-500 cursor-pointer"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className={`mt-5 underline-offset-2 font-semibold ${
              noExperience
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-teal-500 hover:underline"
            }`}
            onClick={handleAddDescription}
            disabled={noExperience}
          >
            Add Description
          </button>
        </div>
        <button
          type="submit"
          className={`px-3 py-2 rounded-md me-9 text-white ${
            noExperience
              ? "bg-gray-400 cursor-not-allowed"
              : " bg-teal-600 cursor-pointer"
          }`}
          disabled={noExperience}
        >
          {isEdit ? "Update " : "Add "}Experience
        </button>
        {isEdit && (
          <button
            type="button"
            className={`px-4 py-2  rounded-md mt-2 text-white ${
              noExperience
                ? "cursor-not-allowed bg-gray-400"
                : "bg-gray-600 cursor-pointer"
            }`}
            onClick={() => {
              reset();
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
        )}
      
      </form>
      {isClient && (
        <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Experiences</h3>
        { Experiences[0]?.noexperience === true ? (
          ""
        ) : Experiences.length > 0 ? (
          Experiences.map((exp) => (
            <div key={exp.id} className="mb-6 p-4 border rounded-lg">
              <div className=" flex gap-x-5 justify-end">
                <button
                  onClick={() => handleEdit(exp.id)}
                  className={`text-blue-500 hover:text-blue-700 cursor-pointer`}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                     dispatch(deleteExperience(exp.id))
                    modifyResumeData(exp,false)
                  }
                  }
                  className={` ms-8 ${isEdit ? "text-gray-400 cursor-not-allowed" : "text-red-600 cursor-pointer"}`}
                   disabled={isEdit}
                >
                  Delete
                </button>
              </div>
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold">{exp.jobtitle}</h4>
                  <span className="text-gray-500">
                    {exp.startDate} - {exp.present ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600">
                  {exp?.company} - {exp?.explocation} {exp?.month && <span>{exp?.month} Months</span>}
                </p>
                {exp?.description?.length > 0 && exp?.description[0]?.value !== "" && <ul className="list-disc pl-5 mt-2">
                  {exp?.description?.map((d, i) => (
                    <li key={i}>{d?.value}</li>
                  ))}
                </ul>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No experiences added yet.</p>
        )}
      </div>
      )}
      <AnimatePresence mode="wait">
        {
        visible && <PopupError/>
         }
      </AnimatePresence>
    </div>
  );
}
