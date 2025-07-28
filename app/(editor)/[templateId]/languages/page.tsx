"use client";
import Inputs from "@/components/Input";
import { LanguageData } from "@/types/type";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormNavigation from "../../components/formnavigation";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import { useDispatch, useSelector } from "react-redux";
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
} from "@/store/slices/resumeSlice";
import { RootState } from "@/store";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { hideError, showError } from "@/store/slices/errorSlice";
import AllSectionValue from "../../components/allsectionvalue";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";

export default function Languages() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const Languages = useSelector(
    (state: RootState) => state.resumeBuilder.languages
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const EmptyForm: LanguageData = {
    id: "",
    languagename: "",
    level: "",
  };
  const {
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<LanguageData>({
    defaultValues: EmptyForm,
    mode: "onChange",
  });
  const router = useRouter();
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => dispatch(hideError()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);
  const onSubmit: SubmitHandler<LanguageData> = (data) => {
    if (isEdit) {
      dispatch(updateLanguage(data));
      modifyResumeData(data, true);
    } else {
      const formData = { ...data, id: crypto.randomUUID() };
      const templateData = { first: [], second: [], other: [] };
      dispatch(addLanguage(formData));
      SaveResumeData(dispatch, true, templateData, formData);
    }
    reset(EmptyForm);
    setIsEdit(false);
  };
  const handleEdit = (id: string) => {
    const found = Languages.find((d) => d.id === id);
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
      if (Languages.length === 0) {
        const msg = "Please add at least one Language before proceeding.";
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
  useEffect(() => {
    setIsClient(true);
  }, []);
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
          name="languagename"
          label="Language Name"
          placeholder="Please Fill The Language Name"
          register={register}
          validation={{
            required: "Language Name is Required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only Letter Are Allowed",
            },
          }}
          error={errors.languagename}
        />
        <div className="relative">
          <h3 className="text-lg font-semibold">How Good Is Your Language ?</h3>
          <Inputs
            type="radio"
            label="Good"
            value="Good"
            name="level"
            register={register}
            validation={{required:"Please Choose How Good is Your Language"}}
          />
          <Inputs
            type="radio"
            label="Very Good"
            value="Very Good"
            name="level"
            register={register}
            validation={{required:"Please Choose How Good is Your Language"}}
          />
          <Inputs
            type="radio"
            label="Excellent"
            value="Excellent"
            name="level"
            register={register}
            validation={{required:"Please Choose How Good is Your Language"}}
          />
          <Inputs
            type="radio"
            label="Native"
            value="Native"
            name="level"
            register={register}
            validation={{required:"Please Choose How Good is Your Language"}}
          />
          {
            errors.level  && (
              <p className="text-red-500 text-sm  absolute top-full">
          {errors.level.message}
        </p>
            )
          }
        </div>

        <button
          type="submit"
          className="px-3 py-2 bg-teal-600 rounded-md mt-3 cursor-pointer me-9 text-white"
        >
          {isEdit ? "Update " : "Add "}Language
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
      <AllSectionValue<LanguageData>
        title="Languages"
        items={Languages}
        onEdit={(item) => handleEdit(item.id)}
        onDelete={(item) => {
          dispatch(deleteLanguage(item.id));
          modifyResumeData(item, false);
        }}
        isEdit={isEdit}
        isClient={isClient}
        isCustomPageData = {false} 
        renderItem={(item) => (
          <div>
            <p>{` ${item.languagename} (${item.level})`}</p>
          </div>
        )}
      />
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
