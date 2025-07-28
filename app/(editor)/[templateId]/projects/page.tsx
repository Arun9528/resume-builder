"use client";

import Inputs from "@/components/Input";
import { RootState } from "@/store";
import {
  addProjects,
  deleteProjects,
  updateProjects,
} from "@/store/slices/resumeSlice";
import { ProjectsData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "../../components/formnavigation";
import { useNavigation } from "@/hooks/useNavigation";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import { hideError, showError } from "@/store/slices/errorSlice";
import useSaveResumeData from "@/hooks/useSaveResumeData";
import useEditSaveData from "@/utils/editSaveData";

export default function Projects() {
  const ProjectsData = useSelector(
    (state: RootState) => state.resumeBuilder.project
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isClient,setIsClient] = useState<boolean>(false)
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ProjectsData>({
    defaultValues: {
      projectname: "",
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
  const onSubmit: SubmitHandler<ProjectsData> = (data) => {
    if (isEdit) {
      dispatch(updateProjects(data));
      modifyResumeData(data,true);
    } else {
      const ProjectData = {...data,id:crypto.randomUUID()}
      const templateData = {first:[],second:[],other:[]}
      dispatch(
        addProjects(ProjectData)
      );
      SaveResumeData(dispatch,true,templateData,ProjectData)
    }
    setIsEdit(false);
    reset();
  };
  const handleEdit = (id: string) => {
    const findIndex = ProjectsData.find((d) => d.id === id);
    if (findIndex !== undefined) {
      setIsEdit(true);
      setValue("id", findIndex.id);
      setValue("projectname", findIndex.projectname);
      setValue("description", findIndex.description);
    }
  };
  const onNext = async () => {
    const isValid = await trigger();
    const allValues = watch();
    const EmptyDataChecked = Object.values(allValues).every(
      (d) => typeof d === "string" && d === ""
    );
    if (EmptyDataChecked && ProjectsData.length > 0) {
      clearErrors();
      router.push(`/${firstPart}${nextPath}`);
    } else if (EmptyDataChecked && ProjectsData.length === 0) {
      const msg = "Please add at least one Project before proceeding.";
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
        className="space-y-6 relative pt-8"
      >
             <FormNavigation
          nextPath={nextPath}
          prevPath={prevPath}
          firstPart={firstPart}
          onNext={onNext}
        />
        <div>
          <Inputs
            type="text"
            label="Project Name"
            name="projectname"
            placeholder="Please Write you Project Name"
            register={register}
            validation={{
              required: "Project Name is Required",
              minLength: { value: 3, message: "Minimum 3 Character required" },
            }}
            error={errors.projectname}
          />
        </div>
        <div className="relative">
          <label htmlFor="projectd" className="text-lg font-semibold">
            Description
          </label>
          <br />
          <textarea
            id="projectd"
            className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2 placeholder:text-gray-400 placeholder:font-semibold"
            rows={5}
            placeholder="Please Describe Your Project"
            {...register("description", {
              required: "Project description is required",
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
          className="px-3 py-2 bg-teal-600 cursor-pointer rounded-md mt-2 me-5 text-white"
        >
          {isEdit ? "Update Project" : " Add More Project"}
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
          <div className="mt-5">
        <h2 className="mt-4 text-3xl font-bold text-gray-500">Projects</h2>
        <div>
          {ProjectsData.length > 0 ? (
            ProjectsData.map(({ id, projectname, description }) => (
              <div key={id} className="mt-3 flex justify-between items-center">
                <div>
                  <h3>Project Name:- {projectname}</h3>
                  <p>Description:- {description}</p>
                </div>
                <div>
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
                      const data = {id,projectname,description}
                      dispatch(deleteProjects(id))
                      modifyResumeData(data,false)
                    }}
                    disabled={isEdit}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-3">Project not Added Yet.</p>
          )}
        </div>
      </div>
        )
      }
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
