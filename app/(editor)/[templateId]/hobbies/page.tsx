"use client";
import Inputs from "@/components/Input";
import { HobbiesData } from "@/types/type";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormNavigation from "../../components/formnavigation";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { hideError, showError } from "@/store/slices/errorSlice";
import AllSectionValue from "../../components/allsectionvalue";
import { addHobby, deleteHobby, updateHobby } from "@/store/slices/resumeSlice";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";


export default function Hobby() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false);
  const Hobbies = useSelector(
    (state: RootState) => state.resumeBuilder.hobbies
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const EmptyForm: HobbiesData = {
    id: "",
    hobbyname: "",
    description: "",
  };
  const {
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<HobbiesData>({
    defaultValues: EmptyForm,
    mode: "onChange",
  });
  const router = useRouter();

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => dispatch(hideError()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);
  const onSubmit: SubmitHandler<HobbiesData> = (data) => {
    if (isEdit) {
      dispatch(updateHobby(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addHobby(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    reset(EmptyForm);
    setIsEdit(false);
  };
  const handleEdit = (id: string) => {
    const found = Hobbies.find((d) => d.id === id);
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
      if (Hobbies.length === 0) {
        const msg = "Please add at least one Hobby before proceeding.";
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 pt-8 relative"
      >
        {isClient && (
             <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
        )}
        <Inputs
          type="text"
          name="hobbyname"
          label="Hobby Name"
          placeholder="Please Fill your Hobby Name"
          register={register}
          validation={{
            required: "Your Hobby Name is Required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only Letter Are Allowed",
            },
          }}
          error={errors.hobbyname}
        />
        <div className="relative">
          <label htmlFor="description" className="block text-lg font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2
             placeholder:text-gray-400 placeholder:font-semibold"
            rows={5}
            placeholder="Please Tell me About Your Hobby"
            {...register("description")}
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
          {isEdit ? "Update " : "Add "}Hobby
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
      <AllSectionValue<HobbiesData>
        title="Hobbies"
        items={Hobbies}
        onEdit={(item) => handleEdit(item?.id)}
        onDelete={(item) =>{
           dispatch(deleteHobby(item?.id))
          modifyResumeData(item,false)
        }}
        isEdit={isEdit}
        isClient={isClient}
        isCustomPageData = {false} 
        renderItem={(item) => (
          <div>
            <h2>{item.hobbyname}</h2>
            <p>{item.description}</p>
          </div>
        )}
      />
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
