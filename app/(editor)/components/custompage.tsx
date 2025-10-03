"use client";
import Inputs from "@/components/Input";
import { useNavigation } from "@/hooks/useNavigation";
import { RootState } from "@/store";
import { hideError, showError } from "@/store/slices/errorSlice";
import { customtypes } from "@/store/slices/styleSlice";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FieldPath,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormNavigation from "./formnavigation";
import { CustomPageData } from "@/types/type";
import {
  addCustomPageData,
  deleteCustomPageData,
  updateCustomPageData,
} from "@/store/slices/resumeSlice";
import { AnimatePresence } from "motion/react";
import PopupError from "@/components/popuperror";
import AllSectionValue from "./allsectionvalue";
import { TemplateKey } from "../[templateId]/layout";
import useEditSaveData from "@/utils/editSaveData";
import useSaveResumeData from "@/hooks/useSaveResumeData";
export const EmptyForms: CustomPageData = {
  id: "",
  maintitle: "",
  customtitle: "",
  customsubtitle: "",
  customwithdate: "",
  customwithoutdate: "",
  customstartEnddate: {
    startdate: "",
    endate: "",
    present: false,
  },
  customlocation: "",
  customlink: "",
  customlayout:"normal",
  customdescription: [{ value: "" }],
};
export const customShow: customtypes = {
    maintitle: "",
    title: true,
    subtitle: true,
    withdate: false,
    withoutdate: false,
    startEnddate: false,
    location: false,
    link: false,
    normaldesciption: true,
    listdescription: false,
    layout:"normal"
  };
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
export default function Custompage({ customName }: { customName: TemplateKey }) {
  const CapitilizeCustomName =
    customName?.at(0)?.toUpperCase() + customName?.slice(1);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const custom = useSelector(
    (state: RootState) => state.style.addSection.customlayoutData
  );
  const customPageData = useSelector(
    (state: RootState) => state.resumeBuilder.customPageData
  );
  const { visible } = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const { nextPath, prevPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const modifyResumeData = useEditSaveData();
  const [isClient,setIsClient] = useState<boolean>(false);
  const [Showdata, setShowdata] = useState<customtypes>(customShow);
  const [EmptyForm, setEmptyForm] = useState<Partial<CustomPageData>>({});
  const {
    register,
    reset,
    handleSubmit,
    trigger,
    watch,
    clearErrors,
    getValues,
    control,
    setError,
    formState: { errors },
  } = useForm<CustomPageData>({
    defaultValues: EmptyForm,
    mode: "onChange",
  });
  const router = useRouter();
  const present = watch("customstartEnddate.present");
  const endDate = watch("customstartEnddate.endate");
  const { append, remove, fields, replace } = useFieldArray({
    control,
    name: "customdescription",
  });

  useEffect(() => {
    const showKeys = Object.keys(Showdata) as Array<keyof customtypes>;
    const activeKeys = showKeys.filter((flagkey) => Showdata[flagkey] === true);
    const fieldMap: Record<keyof customtypes, keyof CustomPageData> = {
      maintitle: "maintitle",
      title: "customtitle",
      subtitle: "customsubtitle",
      withdate: "customwithdate",
      withoutdate: "customwithoutdate",
      startEnddate: "customstartEnddate",
      location: "customlocation",
      link: "customlink",
      normaldesciption: "customdescription",
      listdescription: "customdescription",
      layout:"customlayout"
    };
    const activeFields = activeKeys.map((flagkey) => fieldMap[flagkey]);
    const subset = activeFields.reduce((acc, key) => {
      acc[key] = EmptyForms[key] as never;
      return acc;
    }, {} as Partial<CustomPageData>);
    const result = { ...subset};
    setEmptyForm(result);
  }, [Showdata, customName]);
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => dispatch(hideError()), 3000);
    return () => clearTimeout(timeout);
  }, [dispatch, visible]);

  useEffect(() => {
    const findCustomData = custom.find(
      (d) => d.maintitle.toLowerCase() === customName
    );
    if (findCustomData) {
      setShowdata(findCustomData);
    }
  }, [custom, customName]);
  useEffect(() => {
    if (!Showdata.normaldesciption && !Showdata.listdescription) return;
    if (Showdata.normaldesciption) {
      const currentArr = getValues("customdescription");
      const firstValue =
        Array.isArray(currentArr) && currentArr.length > 0
          ? currentArr[0].value
          : "";
      replace([{ value: firstValue }]);
    } else {
      if (fields.length === 0) {
        append({ value: "" });
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Showdata.normaldesciption, Showdata.listdescription]);
  const onSubmit: SubmitHandler<CustomPageData> = (data) => {
    if (isEdit) {
      dispatch(updateCustomPageData(data));
      modifyResumeData(data,true);
    } else {
      const formData = {...data,id:crypto.randomUUID(),maintitle: customName,}
      const templateData = {first:[],second:[],other:[]}
      dispatch(addCustomPageData(formData));
      SaveResumeData(dispatch,true,templateData,formData)
    }
    reset(EmptyForm);
    setIsEdit(false);
  };
  const handleEdit = (id: string) => {
    const found = customPageData.find((d) => d.id === id);
    if (!found) return;
    reset(found);
    setIsEdit(true);
  };
  const handleAddDescription = useCallback(async () => {
    if (fields.length > 0) {
      const lastIndex = fields.length - 1;
      const FieldName =
        `customdescription.${lastIndex}.value` as const as FieldPath<CustomPageData>;
      const isFieldValid = await trigger(FieldName);
      if (!isFieldValid) {
        setError(FieldName, {
          type: "manual",
          message:
            "You can't add an empty description you have to write something!",
        });
        return;
      }
    }
    append({ value: "" });
  }, [append, trigger, fields, setError]);
  const onNext = async () => {
    const isValid = await trigger();
    const allValues = watch();
    const isEmptyValue = (value:unknown):boolean => {
    if (typeof value === "string") return value === "";
    if (typeof value === "boolean") return value === false;
    if (Array.isArray(value)) return value.every(isEmptyValue);
    if (typeof value === "object" && value !== null) {
      return Object.values(value).every(isEmptyValue);
    }
    return false;
  };
  const EmptyDataChecked = Object.values(allValues).every(isEmptyValue);
    const filtercutompageData = customPageData.filter(
      (d) => d?.maintitle?.toLowerCase().trim() === customName.toLowerCase()
    );
    if (EmptyDataChecked) {
      if (filtercutompageData.length === 0) {
        const msg = `Please add at least one ${CapitilizeCustomName} before proceeding.`;
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
    setIsClient(true)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 pt-4">
          {Showdata.title && (
            <Inputs
              type="text"
              label="Title Name"
              name="customtitle"
              placeholder="Please Enter Your Title Name"
              register={register}
              validation={{ required: "Title Name is Required" }}
              error={errors.customtitle}
            />
          )}

          {Showdata.subtitle && (
            <Inputs
              type="text"
              label="Subtitle Name"
              name="customsubtitle"
              placeholder="Please Enter Your Subtitle Name"
              register={register}
              validation={{ required: "Subtitle Name is Required" }}
              error={errors.customsubtitle}
            />
          )}

          {Showdata.withdate && (
            <Inputs
              type="date"
              label="Date"
              name="customwithdate"
              register={register}
              validation={{ required: "Date is Required" }}
              error={errors.customwithdate}
            />
          )}
          {Showdata.withoutdate && (
            <Inputs
              type="text"
              label="Date"
              name="customwithoutdate"
              placeholder="Please Enter Your Date"
              register={register}
              validation={{
                required: "Please Write your Date",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{4}$/,
                  message:
                    "Date must be in MM/YYYY format, month 01–12 and four-digit year",
                },
                validate: {
                  notFuture: (v) => {
                    const [xStr, yStr] = v!.toString().split("/");
                    const month = Number(xStr);
                    const year = Number(yStr);
                    if (
                      year > currentYear ||
                      (year === currentYear && month > currentMonth)
                    ) {
                      return "Date can't be in the future";
                    }
                    return true;
                  },
                },
                maxLength: {
                  value: 7,
                  message: "Month/Year Must be 6 digit",
                },
              }}
              error={errors.customwithoutdate}
            />
          )}
          {Showdata.startEnddate && (
            <>
              <Inputs
                type="text"
                label="To"
                name="customstartEnddate.startdate"
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
                      const [xStr, yStr] = v!.toString().split("/");
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
                      const end = getValues("customstartEnddate.endate");
                      if (!end) return true;
                      if (end.toLowerCase() === "present") return true;
                      const [sm, sy] = v!.toString().split("/");
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
                  maxLength: {
                    value: 7,
                    message: "Month/Year Must be 6 digit",
                  },
                }}
                error={errors.customstartEnddate?.startdate}
              />
              <div className="flex items-end gap-x-5">
                <Inputs
                  type="text"
                  label="From"
                  name="customstartEnddate.endate"
                  placeholder="Please Enter Your End Year"
                  register={register}
                  validation={{
                    required:
                      !present &&
                      "End Date is Required if Present is not Checked",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{4}$/,
                      message:
                        "Date must be in MM/YYYY format, month 01–12 and four-digit year",
                    },
                    validate: {
                      notBeforeStart: (v) => {
                        if (!v || v.toString().toLowerCase() === "present")
                          return true;
                        const start = getValues("customstartEnddate.startdate");
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
                    maxLength: {
                      value: 7,
                      message: "Month/Year Must be 6 digit",
                    },
                  }}
                  disabled={present}
                  error={errors.customstartEnddate?.endate}
                />
                <div className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    id="still"
                    className={`size-5 ${
                      !!endDate && "bg-gray-400 cursor-not-allowed"
                    }`}
                    {...register("customstartEnddate.present")}
                    disabled={!!endDate}
                  />
                  <label
                    htmlFor="still"
                    className={`${
                      !!endDate && "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Present
                  </label>
                </div>
              </div>
            </>
          )}
          {Showdata.location && (
            <Inputs
              type="text"
              label="Location Name"
              name="customlocation"
              placeholder="Please Enter Your Location Name"
              register={register}
              validation={{ required: "Location Name is Required" }}
              error={errors.customlocation}
            />
          )}
          {Showdata.link && (
            <Inputs
              type="url"
              label="WebSite link"
              name="customlink"
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
              error={errors.customlink}
            />
          )}
        </div>
        {Showdata.normaldesciption && (
          <div className="relative pt-5">
            <label htmlFor="description" className="block text-lg font-bold">
              Description
            </label>
            <textarea
              id="description"
              className="outline-0 w-full border border-gray-300 rounded-md p-4 mt-2 placeholder:text-gray-400 
            placeholder:font-semibold"
              rows={5}
              placeholder="Please Write Something......."
              {...register("customdescription.0.value", {
                required: "Description is Required",
              })}
            />
            {errors.customdescription && (
              <p className="text-red-500 text-sm absolute top-full">
                {errors.customdescription[0]?.value?.message}
              </p>
            )}
          </div>
        )}
        {Showdata.listdescription && (
          <div className="w-full pt-5">
            {fields.map((field, index) => (
              <div key={field.id}>
                <Inputs
                  type="text"
                  name={`customdescription.${index}.value`}
                  label={`Description ${index + 1}`}
                  placeholder="Please Enter Your Description"
                  register={register}
                  validation={{ required: "Description is Required" }}
                  error={errors.customdescription?.[index]?.value}
                />
                {fields.length > 1 && (
                  <div className="text-end">
                    <button
                      type="button"
                      className="text-red-500 cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-5 underline-offset-2 font-semibold cursor-pointer text-teal-500 hover:underline"
              onClick={handleAddDescription}
            >
              Add Description
            </button>
          </div>
        )}
        <button
          type="submit"
          className="px-3 py-2 bg-teal-600 text-white rounded-md cursor-pointer mt-5 me-4"
        >
          {isEdit ? "Update " : "Add "}
          {CapitilizeCustomName}
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
      <AllSectionValue<CustomPageData>
        title={CapitilizeCustomName}
        items={customPageData}
        onEdit={(item) => handleEdit(item?.id)}
        onDelete={(item) => {
          dispatch(deleteCustomPageData(item?.id))
          modifyResumeData(item,false)
        }}
        isEdit={isEdit}
        isClient={isClient}
        isCustomPageData = {true} 
        renderItem={({
          customtitle,
          customsubtitle,
          customwithdate,
          customwithoutdate,
          customstartEnddate,
          customlink,
          customlocation,
          customdescription,
        }) => (
          <div>
            <div className="flex justify-between mt-3">
              <div>
                {Showdata.title && <h2>{customtitle}</h2>}
                {Showdata.subtitle && <p>{customsubtitle}</p>}
              </div>
              <div>
                {Showdata.withdate && (
                  <p>{customwithdate.split("-").reverse().join("-")}</p>
                )}
                {Showdata.withoutdate && <p>{customwithoutdate}</p>}
                {Showdata.startEnddate && (
                  <p>
                    {customstartEnddate.startdate} -{" "}
                    {customstartEnddate.present
                      ? "Present"
                      : customstartEnddate.endate}
                  </p>
                )}
                {Showdata.location && <p>{customlocation}</p>}
                {Showdata.link && <p>{customlink}</p>}
              </div>
            </div>
            {Showdata.normaldesciption && (
              <p className="text-justify">{customdescription[0].value}</p>
            )}
            {Showdata.listdescription && (
              <ul className="list-disc pl-5 mt-2">
                {customdescription.map((d, i) => (
                  <li key={i}>{d.value}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
      <AnimatePresence mode="wait">{visible && <PopupError />}</AnimatePresence>
    </div>
  );
}
