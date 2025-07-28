"use client";
import { useNavigation } from "@/hooks/useNavigation";
import { RootState } from "@/store";
import { hideError, showError } from "@/store/slices/errorSlice";
import { PublicationData } from "@/types/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "../../components/formnavigation";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import Inputs from "@/components/Input";
import AllSectionValue from "../../components/allsectionvalue";
import {
  addPublication,
  deletePublication,
  updatePublication,
} from "@/store/slices/resumeSlice";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";
export default function Publication() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false);
  const Publication = useSelector(
    (state: RootState) => state.resumeBuilder.publication
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const EmptyForm: PublicationData = {
    id: "",
    maintitle: "",
    publicationsubtitle: "",
    publishdate: "",
    publishlink: "",
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
  } = useForm<PublicationData>({
    defaultValues: EmptyForm,
    mode: "onChange",
  });
  const router = useRouter();

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => dispatch(hideError()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);
  const onSubmit: SubmitHandler<PublicationData> = (data) => {
    if (isEdit) {
      dispatch(updatePublication(data));
       modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addPublication(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    reset(EmptyForm);
    setIsEdit(false);
  };
  const handleEdit = (id: string) => {
    const found = Publication.find((d) => d.id === id);
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
      if (Publication.length === 0) {
        const msg = "Please add at least one Publication before proceeding.";
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
      
      <form className="relative pt-8 " onSubmit={handleSubmit(onSubmit)}>
         {isClient && (
          <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
         )}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-y-4 pt-5">
          <Inputs
            type="text"
            label="Title Name"
            name="maintitle"
            placeholder="Please Enter Your Title Name"
            register={register}
            validation={{ required: "Title Name is Required" }}
            error={errors.maintitle}
          />
          <Inputs
            type="text"
            label="Sub Title"
            name="publicationsubtitle"
            placeholder="Please Enter Your Subtitle"
            register={register}
            validation={{ required: "Subtitle Name is Required" }}
            error={errors.publicationsubtitle}
          />
          <Inputs
            type="date"
            label="Publish Date"
            name="publishdate"
            placeholder="Please Enter Your Start Date"
            register={register}
            validation={{ required: "Please Write your Start Date" }}
            error={errors.publishdate}
          />
          <Inputs
            type="url"
            label="WebSite link"
            name="publishlink"
            placeholder="https://www.example.com"
            register={register}
            validation={{
              required: "Link is Required",
              validate: {
                notEmpty: (val) => {
                  if (typeof val !== "string" || !val.trim()) {
                    return "Link is required";
                  }
                  return true;
                },
                isUrl: (val) => {
                  if (typeof val !== "string") return "Link is required";
                  try {
                    new URL(val.trim());
                    return true;
                  } catch {
                    return "Please enter a valid URL";
                  }
                },
              },
            }}
            error={errors.publishlink}
          />
        </div>
        <div className="relative pt-5">
          <label htmlFor="description" className="block text-lg font-bold">
            Description
          </label>
          <textarea
            id="description"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2 placeholder:text-gray-400 placeholder:font-semibold"
            rows={5}
            placeholder="Please Tell me About Your Publication"
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
          {isEdit ? "Update " : "Add "}Publication
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
      <AllSectionValue<PublicationData>
        title="Publication"
        items={Publication}
        onEdit={(item) => handleEdit(item?.id)}
        onDelete={(item) =>{
           dispatch(deletePublication(item?.id))
            modifyResumeData(item,false)
        }}
        isEdit={isEdit}
        isClient={isClient}
        isCustomPageData = {false} 
        renderItem={({
          maintitle,
          publicationsubtitle,
          publishdate,
          publishlink,
          description,
        }) => (
          <div>
            <div className="flex justify-between mt-3">
              <div>
                <h2>{maintitle}</h2>
                <p>{publicationsubtitle}</p>
              </div>
              <div>
                <p>{publishdate.split("-").reverse().join("-")}</p>
                <p>{publishlink}</p>
              </div>
            </div>
            <p className="text-justify">{description}</p>
          </div>
        )}
      />
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
