"use client";
import Inputs from "@/components/Input";
import { RootState } from "@/store";
import { addResumeHeading } from "@/store/slices/resumeSlice";
import { Headings } from "@/types/type";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaCircleMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { SlideinformLeftChild, SlideinformLeftParent } from "@/animations";
import { useNavigation } from "@/hooks/useNavigation";
import FormNavigation from "../../components/formnavigation";
import useSaveResumeData from "@/hooks/useSaveResumeData";

export default function Heading() {
  const paths = usePathname();
  const PageName = paths.split("/")[2];
  const templateName = paths.includes("template2");
  const router = useRouter();
  const dispatch = useDispatch();
  const headingData = useSelector(
    (state: RootState) => state.resumeBuilder.heading
  );
  const { prevPath, nextPath, firstPart } = useNavigation();
  const SaveResumeData = useSaveResumeData();
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<Headings>({
    defaultValues: {
      name: headingData.name || "",
      phone: headingData.phone || "",
      email: headingData.email || "",
      profilephoto: headingData?.profilephoto || undefined,
      locationtitle:headingData.locationtitle || "",
      jobtitle: headingData.jobtitle || "",
      communicatelink:
        headingData?.communicatelink?.length > 0
          ? [...headingData.communicatelink]
          : [{ id: crypto.randomUUID(), link: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "communicatelink",
  });
  const handleAddLink = useCallback(async () => {
    const lastIndex = fields.length - 1;
    const fieldName = `communicatelink.${lastIndex}.link` as const;
    const isFieldValid = await trigger(fieldName);
    if (!isFieldValid) return;
    append({ id: crypto.randomUUID(), link: "" });
  }, [append, trigger, fields]);
  
  const onSubmit: SubmitHandler<Headings> = (data) => {
  const fileList  = data.profilephoto as unknown as FileList;
  if(fileList && fileList.length > 0 ){
    const file = fileList[0];
    const reader = new FileReader();
    reader.onload = ()=> {
      const photoDataUrl = reader.result as string;
      dispatch(addResumeHeading({...data,profilephoto:photoDataUrl}));
       SaveResumeData(dispatch,true,{first:[],second:[],other:[]},{...data,profilephoto:photoDataUrl})
       if (nextPath) {
      router.push(`/${firstPart}${nextPath}`);
    }};
    reader.readAsDataURL(file);
  }else{
    dispatch(addResumeHeading(data));
    SaveResumeData(dispatch,true,{first:[],second:[],other:[]},data)
    if (nextPath) {
      router.push(`/${firstPart}${nextPath}`);
    }
  } 
  sessionStorage.setItem(PageName,JSON.stringify(data));
  }
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={SlideinformLeftParent}
      initial="hidden"
      animate="visible"
      className="pt-8 relative"
    >
        <FormNavigation
        nextPath={nextPath}
        prevPath={prevPath}
        firstPart={firstPart}
      />
      <div className="block space-y-5 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-8 lg:items-center lg:justify-between md:px-4 mt-5">
        <Inputs
          type="text"
          label="Name"
          name="name"
          placeholder="Please Enter Your Name"
          register={register}
          validation={{
            required: "Name is Required",
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name must contain only letters ",
            },
            minLength: { value: 3, message: "Minimum 3 Character required" },
          }}
          error={errors.name}
        />
        <Inputs
          type="tel"
          label="Phone Number"
          name="phone"
          placeholder="Please Enter Your Number"
          register={register}
          validation={{
            required: "Number is Required",
            pattern: { value: /^\d+$/, message: "Only digits  are allowed" },
            validate:{
                exactlyTen: (v)=> v!.toString()?.length === 10 || "Phone number must be exactly 10 digits"
            }
          }}
          error={errors.phone}
        />
        <Inputs
          type="text"
          label="Job title"
          name="jobtitle"
          placeholder="Please Enter Your Job title"
          validation={{
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name must be character ",
            },
          }}
          register={register}
          error={errors.jobtitle}
        />
        <Inputs
          type="email"
          label="Email"
          name="email"
          placeholder="Please Enter Your Email"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email Address",
            },
          }}
          error={errors.email}
        />
        <Inputs 
        type="text"
        label="Location"
        name = "locationtitle"
        placeholder="Please Enter Your Location"
        register={register}
        validation={{pattern:{value:/^[A-Za-z\s,]+$/i,
          message:"Location may include letters, spaces, and commas only"}}}
          error={errors.locationtitle}
        />
        {templateName && (
          <div>
            <label htmlFor="profile" className="font-medium text-lg">
              Profile Photo
            </label>
            <br />
            <input
              type="file"
              id="profile"
              {...register("profilephoto")}
              className="border border-gray-300 rounded-md cursor-pointer file:cursor-pointer md:w-72 w-full
               file:bg-gray-400 file:py-2 file:px-2 file:text-white"
              accept="image/jpeg,image/jpg,image/png"
            />
          </div>
        )}

        {fields.map(({ id }, i) => (
          <motion.div
            className={`flex items-center gap-4  lg:w-fit  w-full  ${
              i % 2 !== 0 ? "lg:flex-row flex-row-reverse" : "lg:flex-row-reverse flex-row"
            }`}
            key={id}
            variants={SlideinformLeftChild}
            initial="hidden"
            animate="visible"
          >
            <Inputs
              type="url"
              label={`Link ${i + 1}`}
              name={`communicatelink.${i}.link`}
              placeholder="https://example.com"
              register={register}
              validation={{
                validate: {
                  notEmpty: (val) => {
                    if (typeof val !== "string" || !val.trim()) {
                      return "Link is required";
                    }
                    return true;
                  },
                  isUrl: (val) => {
                    if (typeof val !== "string") return "Link is required";
                    // if(typeof val !== "string") return true;
                    // const trimmed = val.trim();
                    // if(!trimmed) return true
                    try {
                      new URL(val);
                      return true;
                    } catch {
                      return "Please enter a valid URL";
                    }
                  },
                },
              }}
              error={errors.communicatelink?.[i]?.link}
            />
            <div className="flex flex-col gap-2 translate-y-4">
              {i === fields.length - 1 && (
                <BsFillPlusCircleFill
                  className="text-2xl cursor-pointer text-gray-400"
                  onClick={handleAddLink}
                />
              )}
              {fields.length > 1 && (
                <FaCircleMinus
                  className="text-2xl cursor-pointer text-gray-400"
                  onClick={() => remove(i)}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    
    </motion.form>
  );
}
