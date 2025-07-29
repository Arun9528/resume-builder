"use client";
import { RootState } from "@/store";
import { fontSizetypes } from "@/store/slices/styleSlice";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { useSelector } from "react-redux";

export interface SectionProps {
  highlightShow: boolean;
  paths: string;
  fontColor: { inner: string; outer: string };
  fontSize: fontSizetypes;
  lineHeight: number;
  spacing: string;
  isTemplate?: string;
}

export default function HeadingSection({
  highlightShow,
  paths,
  fontColor,
  fontSize,
  lineHeight,
  isTemplate,
}: SectionProps) {
  const { name, jobtitle, phone, email, communicatelink, profilephoto,locationtitle } =
    useSelector((state: RootState) => state.resumeBuilder.heading);
  const isTemplate2 = isTemplate?.includes("template1") || isTemplate?.includes("template3") 
  return (
    <div
      className={`${!isTemplate2 && "grid grid-cols-[75%_25%] w-full" } mb-0 ${
        highlightShow &&
        paths.split("/")[2] === "heading" &&
        "border-4 border-amber-500  "
      }`}
      style={{ lineHeight }}
    >
      <div className={`${isTemplate2 ? "text-center" : "content-center"} `}>
        <h1
          className="font-bold"
          style={{ color: fontColor.outer, fontSize: fontSize.mainheading }}
        >
          {name || "John Doe"}
        </h1>
        <h3
          className="font-medium"
          style={{ color: fontColor.inner, fontSize: fontSize.heading }}
        >
          {jobtitle || "front End Developer"}
        </h3>
        <div
          className="flex gap-x-2 items-center"
          style={{ fontSize: fontSize.mainpara,justifyContent:`${isTemplate2 ? "center" : "start" }`}}
        >
          <div className="flex items-center gap-x-1">
            <FaPhoneAlt size={13} />
            <p className="text-[14.5px] translate-y-[1.5px] ">
              {phone || "7451332156"}
            </p>
          </div>
          <div className="flex items-center gap-x-1">
            <FaLocationDot/>
            <p className="text-[14.5px] translate-y-[1.5px]">{locationtitle || "City,State"}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <IoMail /> <a href={`mailto:${email}`} className="hover:underline underline-offset-1">{email || "xxxxx@gmail.com"}</a>
          </div>
          <div className="flex items-center space-x-2">
            {communicatelink.length > 0 ? (
              communicatelink.map(({ id, link }) => {
                const links = link.split("//")[1];
                const linkIcon = link.includes("linkedin") ? (
                  <FaLinkedin />
                ) : link.includes("github") ? (
                  <FaGithub />
                ) : (
                  <FaLink />
                );
                return (
                  <div key={id} className="flex items-center gap-x-1">
                    {linkIcon}
                    <Link href={links ?? link} className="-translate-y-[1.5px]">{links ?? link} </Link>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-x-1">
                <FaLinkedin />
                <Link href="#" className="translate-y-[1px] hover:underline underline-offset-1" >
                  https://github.com/xxxxxxxxx
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isTemplate2 && (
        <div className="size-28 rounded-full overflow-hidden justify-self-end drop-shadow-lg/20  ">
          <Image
            src={profilephoto || "/images/avatar.jpg"}
            alt="Girl Avatar"
            width={200}
            height={200}
            priority
            className="object-cover w-full h-full "
          />
        </div>
      )}
    </div>
  );
}
