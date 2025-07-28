"use client";
import Inputs from "@/components/Input";
import { RootState } from "@/store";
import { EducationData } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FormNavigation from "../../components/formnavigation";
import { useNavigation } from "@/hooks/useNavigation";
import { addEducaiton, updateEducation } from "@/store/slices/resumeSlice";
import { useRouter } from "next/navigation";
import { deleteEducation } from "../../../../store/slices/resumeSlice";
import { hideError, showError } from "@/store/slices/errorSlice";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";
const todayYear = new Date().getFullYear();
export default function Education() {
  const Education = useSelector(
    (state: RootState) => state.resumeBuilder.education
  );
  const {visible} = useSelector((state:RootState)=> state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart} = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<EducationData>({
    defaultValues: {
      collegename: "",
      degree: "",
      startdate: "",
      enddate: "",
      stillgoingon: false,
      Educationlocation: "",
    },
    mode: "onChange",
  });
  const still = watch("stillgoingon");
  const endDate = watch("enddate");

   useEffect(()=>{
      if(!visible) return;
      const timeout = setTimeout(()=>{
        dispatch(hideError());
      },3000);
      return ()=> clearTimeout(timeout);
    },[dispatch,visible])
  useEffect(() => {
    if (still) {
      clearErrors("enddate");
    }
  }, [clearErrors, still]);
  const onSubmit: SubmitHandler<EducationData> = (data) => {
    if (isEdit) {
      dispatch(updateEducation(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addEducaiton(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    setIsEdit(false);
    reset();
  };
  const handleEdit = (id: string) => {
    const findIndex = Education.find((d) => d.id === id);
    if (findIndex !== undefined) {
      
      Object.entries(findIndex).forEach(([key, value]) => {
        setValue(key as keyof EducationData, value);
      });
    }
    setIsEdit(true);
  };
  const onNext = async () => {
   const isValid =  await trigger();
    const allValues = watch();
    const EmptyDataChecked = Object.values(allValues).every(
      (d) => (typeof d === "string" && d === "") || (typeof d === "boolean" && d === false))
    
    if (EmptyDataChecked && Education.length > 0) {
       clearErrors();
        router.push(`/${firstPart}${nextPath}`);
    }else if (EmptyDataChecked && Education.length === 0) {
      const msg = "Please add at least one Education before proceeding.";
       dispatch(showError(msg));
    }else if(isValid){
       const msg = "Please submit the form before proceeding.";
      dispatch(showError(msg))
    }
  };
 useEffect(()=>{
  setIsClient(true);
 },[])
  return (
    <div>
      <form className="relative pt-8 " onSubmit={handleSubmit(onSubmit)}>
           <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
        <div className="flex flex-wrap justify-between gap-y-7 pt-3">
          <Inputs
            type="text"
            label="College Name"
            name="collegename"
            placeholder="Please Enter Your College Name"
            register={register}
            validation={{ required: "College Name is Required" }}
            error={errors.collegename}
          />
          <Inputs
            type="text"
            label="Degree Name"
            name="degree"
            placeholder="Please Enter Your Degree Name"
            register={register}
            validation={{ required: "Degree Name is Required" }}
            error={errors.degree}
          />
          {/* <Inputs
            type="Date"
            label="Start Date"
            name="startdate"
            register={register}
            validation={{
              required: "Start Date is Required",
              validate: {
                notFuture: (v) =>
                  v <= todayString || "Start Date can't be in the future",
                beforeEnd: (v) => {
                  const endDateVal = getValues("enddate");
                  return (
                    !endDateVal ||
                    v < endDateVal ||
                    "Start Date must be before End Date"
                  );
                },
              },
            }}
            error={errors.startdate}
          /> */}
          <Inputs 
            type="text"
            label="To"
            name="startdate"
            placeholder="Please Enter Your Start Date"
            register={register}
            validation={{
              required:"Please Write your Start Date",
              pattern:{
                value:/^\d+$/,
                message:"Only Number are Allowed"
              },
              validate:{
                notFuture:(v)=> Number(v) <= todayYear || "Start Date can't be in the future",
                beforEnd:(v)=>{
                  const endDateval = getValues("enddate");
                  return (
                    !endDateval || v < endDateval || "Start Date must be before End Date"
                  )
                }
              },
              maxLength:{value:4,message:"Year Must be at 4 digit"}
            }}
            error={errors.startdate}
          />
          <div className="flex items-end gap-x-5">
            {/* <Inputs
              type="Date"
              label="End Date"
              name="enddate"
              register={register}
              validation={{
                required:
                  !still &&
                  "End Date is Required if Still going on is not Checked",
                validate: {
                  notFuture: (v) =>
                    still
                      ? true
                      : v <= todayString || "End Date can't be in the future",
                  afterStart: (v) => {
                    if (still) return true;
                    const startDateVal = getValues("startdate");
                    return (
                      !startDateVal ||
                      v > startDateVal ||
                      "End Date must be after Start Date"
                    );
                  },
                },
              }}
              disabled={still}
              error={errors.enddate}
            /> */}

            <Inputs
              type="text"
              label="Form"
              name="enddate"
              placeholder="Please Enter Your End date"
              register={register}
              validation={{
                required:!still && "End Date is Required if Still going on is not Checked",
                pattern:{
                  value:/^\d+$/,
                  message:"Only Number are Allowed"
                },
                validate:{
                  notFuture:(v)=> still ? true : Number(v) <= todayYear || "End Date can't be in the future",
                  afterStart:(v)=>{
                    if(still)return true;
                    const startDateVal = getValues("startdate");
                    return (
                      !startDateVal || v > startDateVal ||  "End Date must be after Start Date"
                    )
                  }
                },
                maxLength:{value:4,message:"Year Must be 4 digit"}
              }} 
              disabled={still}
              error={errors.enddate}
            />
            <div className="flex flex-col items-center">
              <input
                type="checkbox"
                id="still"
                className={`size-5 ${
                  !!endDate && "bg-gray-400 cursor-not-allowed"
                }`}
                {...register("stillgoingon")}
                disabled={!!endDate}
              />
              <label
                htmlFor="still"
                className={`${!!endDate && "text-gray-400 cursor-not-allowed"}`}
              >
                Still Going on{" "}
              </label>
            </div>
          </div>

          <Inputs
            type="text"
            label="Location"
            name="Educationlocation"
            placeholder="Please Enter Your Location"
            register={register}
            validation={{ required: "Location is Required" }}
            error={errors.Educationlocation}
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 bg-teal-600 rounded-md cursor-pointer mt-8 me-9 text-white"
        >
          {isEdit ? "Update " : "Add Education"}
        </button>
        {isEdit && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 cursor-pointer rounded-md mt-2 text-white"
            onClick={() => {
              reset();
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
        )}
     
      </form>
      {
        isClient && (
          <div className="mt-6">
        <h2 className="text-2xl text-white/80 font-bold">Educations</h2>
        {Education?.length > 0 ? (
          Education?.map(
            ({
              id,
              collegename,
              degree,
              startdate,
              enddate,
              stillgoingon,
              Educationlocation,
            }) => (
              <div key={id}>
                <div className="text-end space-x-5">
                  <button
                    type="button"
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={` ms-8 ${isEdit ? "text-gray-400 cursor-not-allowed" : "text-red-600 cursor-pointer"}`}
                    onClick={() => {
                      const data = {id,collegename,degree,startdate,enddate,stillgoingon,Educationlocation}
                      dispatch(deleteEducation(id))
                      modifyResumeData(data,false)
                    }}
                    disabled={isEdit}
                  >
                    Delete
                  </button>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <h2>{collegename}</h2>
                    <p>{degree}</p>
                  </div>
                  <div>
                    <p>
                      {startdate} - {stillgoingon ? "Still Goin on" : enddate}
                    </p>
                    <p>{Educationlocation}</p>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p className="font-medium text-gray-500">Educaiton not Add Yet.</p>
        )}
      </div>
        )
      }
       <AnimatePresence mode="wait">
        {
        visible && <PopupError/>
         }
      </AnimatePresence>
    </div>
  );
}
