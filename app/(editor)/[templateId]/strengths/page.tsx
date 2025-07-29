"use client";
import Inputs from "@/components/Input";
import { StrengthData } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import FormNavigation from "../../components/formnavigation";
import { useEffect, useState } from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addStrength,
  deleteStrength,
  updateStrength,
} from "@/store/slices/resumeSlice";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import { hideError, showError } from "@/store/slices/errorSlice";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";

export default function Strengths() {
  const Strengths = useSelector(
    (state: RootState) => state.resumeBuilder.strength
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false);
  const { firstPart, nextPath, prevPath } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<StrengthData>({
    defaultValues: {
      strengthsname: "",
      description: "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      dispatch(hideError());
    }, 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);
  const onSubmit: SubmitHandler<StrengthData> = (data) => {
    if (isEdit) {
      dispatch(updateStrength(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addStrength(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    setIsEdit(false);
    reset();
  };
  const handleEdit = (id: string) => {
    const findIndex = Strengths.find((d) => d.id === id);
    if (findIndex !== undefined) {
      setValue("id", findIndex.id);
      setValue("strengthsname", findIndex.strengthsname);
      setValue("description", findIndex.description);
    }
    setIsEdit(true);
  };
  const onNext = async () => {
    const isValid = await trigger();
    const allValues = watch();
    const EmptyDataChecked = Object.values(allValues).every(
      (d) => typeof d === "string" && d === ""
    );
    if (EmptyDataChecked && Strengths.length > 0) {
      clearErrors();
      router.push(`/${firstPart}${nextPath}`);
    } else if (EmptyDataChecked && Strengths.length === 0) {
      const msg = "Please add at least one Strength before proceeding.";
      dispatch(showError(msg));
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 pt-8 relative"
      >
           <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
        <Inputs
          type="text"
          name="strengthsname"
          label="Strengths Name"
          placeholder="Please Enter Your Strength"
          register={register}
          validation={{ required: "Strengths Name is Required" }}
          error={errors.strengthsname}
        />
        <div className="relative">
          <label htmlFor="description" className="block text-lg font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2
             placeholder:text-gray-600 placeholder:font-semibold"
            rows={5}
            placeholder="Please Describe Your Project"
            {...register("description",
            //    {
            //   required: "Description is Required",
            // }
          )}
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
          {isEdit ? "Update " : "Add "}Strengths
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
        <h2 className="text-2xl text-white/80 font-bold">Strengths</h2>
        {Strengths?.length > 0 ? (
          Strengths?.map(({ id, strengthsname, description }) => (
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
                  className={` ms-8 ${
                    isEdit
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 cursor-pointer"
                  }`}
                  onClick={() => {
                    const data = { id, strengthsname, description }
                    dispatch(deleteStrength(id))
                    modifyResumeData(data,false)
                  }}
                  disabled={isEdit}
                >
                  Delete
                </button>
              </div>
              <div>
                <h2>{strengthsname}</h2>
                <p>{description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="font-medium text-gray-500">Strengths not Add Yet.</p>
        )}
      </div>
        )
      }
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
