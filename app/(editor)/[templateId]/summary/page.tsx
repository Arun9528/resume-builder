"use client";
import { useForm, useWatch } from "react-hook-form";
import FormNavigation from "../../components/formnavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { SummaryData } from "@/types/type";
import { addSummary } from "@/store/slices/resumeSlice";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import { useEffect } from "react";
export default function TrainingAndCourses() {
  const Summary = useSelector(
    (state: RootState) => state.resumeBuilder.summary
  );
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<SummaryData>({
    defaultValues: {
      description: Summary.description || "",
    },
    mode: "onChange",
  });
  const descriptionValue = useWatch({control,name:"description"});
  const router = useRouter();
  useEffect(()=>{
    if(descriptionValue !== undefined){
      const DesValue = descriptionValue.trim()
      dispatch(addSummary({description:DesValue}));
      sessionStorage.setItem("summary",JSON.stringify({description:DesValue}))
    }
  },[descriptionValue,dispatch,SaveResumeData])

  const onNext = async () => {
    const isValid = await trigger("description");
    if(isValid){
      router.push(`/${firstPart}${nextPath}`);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(()=>{})}
        className="space-y-6 pt-8 relative"
      >
        <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
        <div className="relative">
          <label htmlFor="description" className="block text-lg font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2 placeholder:text-gray-400
             placeholder:font-semibold"
            rows={5}
            placeholder="Please Fill Summary"
            {...register("description", {
              required: "Please Summary is Required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm absolute top-full">
              {errors.description.message}
            </p>
          )}
        </div>
      </form>

    </div>
  );
}
