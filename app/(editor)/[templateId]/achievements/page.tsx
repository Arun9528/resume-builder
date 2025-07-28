"use client";
import Inputs from "@/components/Input";
import { useNavigation } from "@/hooks/useNavigation";
import { RootState } from "@/store";
import {
  addAchievement,
  deleteAchievement,
  updateAchievement,
} from "@/store/slices/resumeSlice";
import { AchievementData } from "@/types/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "../../components/formnavigation";
import { hideError, showError } from "@/store/slices/errorSlice";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import useEditSaveData from "@/utils/editSaveData";
import useSaveResumeData from "@/hooks/useSaveResumeData";

export default function Achievements() {
  const Achievements = useSelector(
    (state: RootState) => state.resumeBuilder.achievement
  );
  const {visible} = useSelector((state:RootState)=> state.error);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
   const [isClient,setIsClient] = useState<boolean>(false);
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,watch,clearErrors,
    formState: { errors },
  } = useForm<AchievementData>({
    defaultValues: {
      achievementsname: "",
      description: "",
    },
    mode: "onChange",
  });

    useEffect(()=>{
        if(!visible) return;
        const timeout = setTimeout(()=>{
          dispatch(hideError());
        },3000);
        return ()=> clearTimeout(timeout);
      },[dispatch,visible]);
  const onSubmit: SubmitHandler<AchievementData> = (data) => {
    if (isEdit) {
      dispatch(updateAchievement(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addAchievement(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    setIsEdit(false);
    reset();
  };
  const handleEdit = (id: string) => {
    const findIndex = Achievements.find((d) => d.id === id);
    if (findIndex !== undefined) {
      setValue("id", findIndex.id);
      setValue("achievementsname", findIndex.achievementsname);
      setValue("description", findIndex.description);
    }
    setIsEdit(true);
  };
  const onNext = async()=>{
    const isValid = await trigger();
    const allValues = watch();
    const EmptyDataChecked = Object.values(allValues).every(d=> (typeof d === "string" && d === ""));
    if(EmptyDataChecked && Achievements.length > 0){
      clearErrors();
       router.push(`/${firstPart}${nextPath}`);
    }else if(EmptyDataChecked && Achievements.length === 0){
         const msg = "Please add at least one Achievments before proceeding.";
        dispatch(showError(msg));
    }else if(isValid){
         const msg = "Please submit the form before proceeding.";
      dispatch(showError(msg))
    }
  }
  useEffect(()=>{
    setIsClient(true);
   },[])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-8 relative">
      <FormNavigation nextPath={nextPath} prevPath={prevPath} firstPart={firstPart} onNext={onNext}/>
        <Inputs
          type="text"
          name="achievementsname"
          label="Achivement Name"
          placeholder="please Enter Your Achivements Name"
          register={register}
          validation={{
            required: "Achivements Name is Required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only Letter Are Allowed",
            },
          }}
          error={errors.achievementsname}
        />
        <div className="relative">
          <label htmlFor="description" className="block text-lg font-bold">Description</label>
          <textarea
            id="description"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2 placeholder:text-gray-400 placeholder:font-semibold"
            rows={5}
            placeholder="Please Describe Your Project"
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
          className="px-3 py-2 bg-teal-600 rounded-md mt-3 cursor-pointer me-9 text-white"
        >
          {isEdit ? "Update " : "Add "}Achievements
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
         <div className="mt-2">
        <h2 className="text-2xl text-white/80 font-bold">Achievements</h2>
        {Achievements?.length > 0 ? (
          Achievements?.map(({ id, achievementsname, description }) => (
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
                    const data = { id, achievementsname, description }
                    dispatch(deleteAchievement(id))
                    modifyResumeData(data,false)
                  }}
                  disabled={isEdit}
                >
                  Delete
                </button>
              </div>
              <div>
                <h2>{achievementsname}</h2>
                <p>{description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="font-medium text-gray-500">Achievements not Add Yet.</p>
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
