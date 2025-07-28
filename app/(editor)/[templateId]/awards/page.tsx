"use client";
import Inputs from "@/components/Input";
import { AwardsData } from "@/types/type";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormNavigation from "../../components/formnavigation";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import { useDispatch, useSelector } from "react-redux";
import { addAward, deleteAward, updateAward } from "@/store/slices/resumeSlice";
import { RootState } from "@/store";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { hideError, showError } from "@/store/slices/errorSlice";
import AllSectionValue from "../../components/allsectionvalue";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";

export default function Awards() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false);
  const Awards = useSelector((state: RootState) => state.resumeBuilder.awards);
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const EmptyForm: AwardsData = {
    id: "",
    awardsname: "",
    awardcompanyname: "",
  };
  const {
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<AwardsData>({
    defaultValues: EmptyForm,
    mode: "onChange",
  });
  const router = useRouter();

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => dispatch(hideError()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);
  const onSubmit: SubmitHandler<AwardsData> = (data) => {
    if (isEdit) {
      dispatch(updateAward(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addAward(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    reset(EmptyForm);
    setIsEdit(false);
  };
  const handleEdit = (id: string) => {
    const found = Awards.find((d) => d.id === id);
    if (!found) return;
    reset(found);
    setIsEdit(true);
  };
  const onNext = async () => {
    const isValid = await trigger();
    const allValues = watch();
    const EmptyDataChecked = Object.values(allValues).every(
      (d) => typeof d === "string" && d === ""
    );
    if (EmptyDataChecked) {
      if (Awards.length === 0) {
        const msg = "Please add at least one Award before proceeding.";
        dispatch(showError(msg));
        return;
      }
      clearErrors();
      router.push(`/${firstPart}${nextPath}`);
    }
    else if (isValid) {
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
          {
            isClient && (
              <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
            )
          }
        <Inputs
          type="text"
          name="awardsname"
          label="Award Name"
          placeholder="Please Fill The Award Name"
          register={register}
          validation={{
            required: "Awards Name is Required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only Letter Are Allowed",
            },
          }}
          error={errors.awardsname}
        />
        <Inputs
          type="text"
          name="awardcompanyname"
          label="Company Name"
          placeholder="Please Fill The Company Name"
          register={register}
          validation={{
            required: "Company Name is Required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only Letter Are Allowed",
            },
          }}
          error={errors.awardcompanyname}
        />
        <button
          type="submit"
          className="px-3 py-2 bg-teal-600 rounded-md mt-3 cursor-pointer me-9 text-white"
        >
          {isEdit ? "Update " : "Add "}Awards
        </button>
        {isEdit && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 cursor-pointer rounded-md mt-2 text-white"
            onClick={() => {
              reset(EmptyForm);
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
        )}
      
      </form>
      <AllSectionValue<AwardsData>
        title="Awards"
        items={Awards}
        onEdit={(item) => handleEdit(item.id)}
        onDelete={(item) =>{
           dispatch(deleteAward(item.id))
           modifyResumeData(item,false)
        }}
        isEdit = {isEdit}
        isClient={isClient}
        isCustomPageData = {false} 
        renderItem = {(item)=> (
          <div>
                <h2>{item.awardsname}</h2>
                <p>{item.awardcompanyname}</p>
           </div>
        )}
      />
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
