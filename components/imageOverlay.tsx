"use client";
import {  motion } from "motion/react";
import { TemplateKey } from "@/app/(editor)/[templateId]/layout";
import { RootState } from "@/store";
import { setTemplateChange } from "@/store/slices/styleSlice";
import ChangeTemplate from "@/utils/changeTemplate";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
export default function ImageOverlay({Onsettingtab}: {Onsettingtab: boolean,}) {
  const paths = usePathname();
  const TemplateName = paths.split("/")[1]?.slice(-1);
  const [templateNo, setTemplateNo] = useState<string>(TemplateName);
  const router = useRouter();
  const Addsection = useSelector((state:RootState)=> state.style.addSection);
  const dispatch = useDispatch();
  const handleClick = (id: number) => {
    if (!Onsettingtab) return;
    setTemplateNo(id.toString());
    const isdragContents = sessionStorage.getItem("dragContents") || "";
    const newPath = paths.replace(TemplateName, id.toString());
    const newTemplateName = newPath.split("/")[1];
    router.replace(newPath);
     dispatch(setTemplateChange(true));
    const unusedData = Addsection["unusedsection"] ?? [];
    const z =  Addsection[newTemplateName as TemplateKey]
      if(isdragContents){
        ChangeTemplate(z,isdragContents,dispatch,unusedData,id,newTemplateName)
      }
  };
  return (
    <motion.div
    
      className={`grid z-10 ${Onsettingtab ? "grid-cols-1 lg:grid-cols-2 space-y-6  mt-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} justify-center gap-7 p-5`}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`relative scale-110 lg:scale-100 overflow-hidden box-border transition-all duration-200 ease-in-out  justify-self-center z-0 group ${
            Onsettingtab
              ? "hover:outline-4 outline-sky-600 w-56"
              : "hover:outline-4 outline-sky-600 w-72 md:w-80"
          }`}
          // onClick={() => handleClick(i + 1)}
        >
          <Image
            src={`/images/thumbnails/template-${i + 1}.png`}
            alt="Web Developer"
            width={400}
            height={350}
            className="w-auto h-auto  cursor-pointer"
            priority
            // loading="lazy"
            onClick={() => handleClick(i + 1)}
          />
          {!Onsettingtab && (
            <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 z-30 flex justify-center items-center ">
              <Link
                href={`/template${i + 1}/heading`}
                className="text-white font-semibold bg-sky-500 px-2 py-1.5 rounded-md"
              >
                Use Template {i + 1}
              </Link>
            </div>
          )}
          {+templateNo === i + 1 && (
            <div className="size-16 -right-9 absolute -bottom-8  rotate-45 bg-green-600">
              <FaCheck
                color="white"
                className="text-lg rotate-[-60deg] translate-x-0.5 translate-y-[25px]"
              />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}
