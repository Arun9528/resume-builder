"use client";
import { useNavigation } from "@/hooks/useNavigation";
import { RootState } from "@/store";
import { hideError, showError } from "@/store/slices/errorSlice";
import {
  addVolunteering,
  deleteVolunteering,
  updateVolunteering,
} from "@/store/slices/resumeSlice";
import { VolunteeringData } from "@/types/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "../../components/formnavigation";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import Inputs from "@/components/Input";
import AllSectionValue from "../../components/allsectionvalue";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
export default function Volunteering() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false);
  const Volunteering = useSelector(
    (state: RootState) => state.resumeBuilder.volunteering
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const EmptyForm: VolunteeringData = {
    id: "",
    jobtitle: "",
    companyname: "",
    startdate: "",
    enddate: "",
    present: false,
    description: "",
  };
  const {
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<VolunteeringData>({
    defaultValues: EmptyForm,
    mode: "onChange",
  });
  const router = useRouter();
  const present = watch("present");
  const endDate = watch("enddate");

  useEffect(() => {
    if (!present) return;
    if (present) {
      setValue("enddate", "");
      clearErrors("enddate");
    }
  }, [present, setValue, clearErrors]);
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => dispatch(hideError()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);
  const onSubmit: SubmitHandler<VolunteeringData> = (data) => {
    if (isEdit) {
      dispatch(updateVolunteering(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addVolunteering(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    reset(EmptyForm);
    setIsEdit(false);
  };
  const handleEdit = (id: string) => {
    const found = Volunteering.find((d) => d.id === id);
    if (!found) return;
    reset(found);
    setIsEdit(true);
  };
  const onNext = async () => {
    const isValid = await trigger();
    const allValues = watch();
    const EmptyDataChecked = Object.values(allValues).every(
      (d) =>
        (typeof d === "string" && d === "") ||
        (typeof d === "boolean" && d === false)
    );
    if (EmptyDataChecked) {
      if (Volunteering.length === 0) {
        const msg = "Please add at least one Volunteer before proceeding.";
        dispatch(showError(msg));
        return;
      }
      clearErrors();
      router.push(`/${firstPart}${nextPath}`);
    } else if (isValid) {
      const msg = "Please submit the form before proceeding.";
      dispatch(showError(msg));
    }
  };
  useEffect(()=>{
    setIsClient(true);
   },[])
  return (
    <div>
      <form className="relative pt-8" onSubmit={handleSubmit(onSubmit)}>
        {isClient && (
             <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-y-4 pt-4">
          <Inputs
            type="text"
            label="Job Title"
            name="jobtitle"
            placeholder="Please Enter Your Title Name"
            register={register}
            validation={{ required: "Title Name is Required" }}
            error={errors.jobtitle}
          />
          <Inputs
            type="text"
            label="Company Name"
            name="companyname"
            placeholder="Please Enter Your Company Name"
            register={register}
            validation={{ required: "Company Name is Required" }}
            error={errors.companyname}
          />
          <Inputs
            type="text"
            label="To"
            name="startdate"
            placeholder="Please Enter Your Start Date"
            register={register}
            validation={{
              required: "Please Write your Start Date",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{4}$/,
                message:
                  "Date must be in MM/YYYY format, month 01–12 and four-digit year",
              },
              validate: {
                notFuture: (v) => {
                  const [xStr, yStr] = v.toString().split("/");
                  const month = Number(xStr);
                  const year = Number(yStr);
                  if (
                    year > currentYear ||
                    (year === currentYear && month > currentMonth)
                  ) {
                    return "Start Date can't be in the future";
                  }
                  return true;
                },
                beforEnd: (v) => {
                  const end = getValues("enddate");
                  if (!end) return true;
                  if (end.toLowerCase() === "present") return true;
                  const [sm, sy] = v.toString().split("/");
                  const [em, ey] = end.toString().split("/");
                  const startYear = Number(sy),
                    startMonth = Number(sm);
                  const endYear = Number(ey),
                    endMonth = Number(em);
                  if (
                    endYear < startYear ||
                    (endYear === startYear && endMonth <= startMonth)
                  )
                    return "Start Date must be before End Date";
                  return true;
                },
              },
              maxLength: { value: 7, message: "Month/Year Must be 6 digit" },
            }}
            error={errors.startdate}
          />
          <div className="flex items-end gap-x-5">
            <Inputs
              type="text"
              label="From"
              name="enddate"
              placeholder="Please Enter Your End Year"
              register={register}
              validation={{
                required:
                  !present && "End Date is Required if Present is not Checked",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{4}$/,
                  message:
                    "Date must be in MM/YYYY format, month 01–12 and four-digit year",
                },
                validate: {
                  notBeforeStart: (v) => {
                    if (!v || v.toString().toLowerCase() === "present")
                      return true;
                    const start = getValues("startdate");
                    if (!start) return true;
                    const [sm, sy] = start.split("/");
                    const [em, ey] = v.toString().split("/");
                    const startYear = Number(sy),
                      startMonth = Number(sm);
                    const endYear = Number(ey),
                      endMonth = Number(em);
                    if (
                      endYear < startYear ||
                      (endYear === startYear && endMonth <= startMonth)
                    ) {
                      return "End Date must be after Start Date";
                    }
                    return true;
                  },
                  notFutureEnd: (v) => {
                    if (!v || v.toString().toLowerCase() === "present")
                      return true;
                    const [mStr, yStr] = v.toString().split("/");
                    const month = Number(mStr),
                      year = Number(yStr);
                    if (
                      year > currentYear ||
                      (year === currentYear && month > currentMonth)
                    ) {
                      return "End Date can't be in the future";
                    }
                    return true;
                  },
                },
                maxLength: { value: 7, message: "Month/Year Must be 6 digit" },
              }}
              disabled={present}
              error={errors.enddate}
            />
            <div className="flex flex-col items-center">
              <input
                type="checkbox"
                id="still"
                className={`size-5 ${
                  !!endDate && "bg-gray-400 cursor-not-allowed"
                }`}
                {...register("present")}
                disabled={!!endDate}
              />
              <label
                htmlFor="still"
                className={`${!!endDate && "text-gray-400 cursor-not-allowed"}`}
              >
                Present
              </label>
            </div>
          </div>
        </div>
        <div className="relative pt-5">
          <label htmlFor="description" className="block text-lg font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2
             placeholder:text-gray-400 placeholder:font-semibold"
            rows={5}
            placeholder="Please Tell me About Your Training/Courses"
            {...register("description", {
              required: "Description is Required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm absolute top-full">
              {errors.description.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-teal-600 text-white rounded-md cursor-pointer mt-5 me-4"
        >
          {isEdit ? "Update " : "Add "}Volunteer
        </button>
        {isEdit && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white cursor-pointer rounded-md mt-2"
            onClick={() => {
              reset(EmptyForm);
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
        )}
     
      </form>
      <AllSectionValue<VolunteeringData>
        title="Volunteering"
        items={Volunteering}
        onEdit={(item) => handleEdit(item?.id)}
        onDelete={(item) =>{
          dispatch(deleteVolunteering(item?.id))
          modifyResumeData(item,false)
        }}
        isEdit={isEdit}
        isClient={isClient}
        isCustomPageData = {false} 
        renderItem={({
          jobtitle,
          companyname,
          startdate,
          enddate,
          present,
          description,
        }) => (
          <div>
            <div className="flex justify-between mt-3">
              <div>
                <h2>{jobtitle}</h2>
                <p>{companyname}</p>
              </div>
              
                <p>
                  {startdate} - {present ? "Present" : enddate}
                </p>
            
            </div>
            <p className="text-justify">{description}</p>
          </div>
        )}
      />
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
