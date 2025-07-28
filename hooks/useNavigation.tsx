"use client"
import { TemplateKey } from "@/app/(editor)/[templateId]/layout";
import { RootState } from "@/store";
import { PathState } from "@/types/type";
import { usePathname } from "next/navigation";
import {useMemo } from "react";
import {useSelector } from "react-redux";
const template = [
  "heading",
  "skills",
  "experience",
  "projects",
  "summary",
  "education",
  "achievements",
  "strengths",
  "review",
];

export function useNavigation():PathState{
  // const pathNames = useSelector((state: RootState) => state.navigation.pathnames);
  const pathname = usePathname();
  const templateId = pathname.split("/")[1];
  const {first = [],second = [],other = []} = useSelector((state:RootState)=> state.style.addSection[templateId as TemplateKey]) || {};

 const pathNames = useMemo(()=>{
  const removecustom = other.map((d) => d.replaceAll(" (custom)", "").trim()).filter(Boolean);
  const removeFirst = first.filter((d) => !removecustom.includes(d));
  const removeSecond = second.filter((d) => !removecustom.includes(d));
  const allowed = new Set([...removeFirst, ...removeSecond]);
  const dynamic = template?.filter((item) => allowed.has(item));
  return ["heading", ...dynamic, ...removecustom, "review"];
 },[first,second,other])
 
  return useMemo<PathState>(()=>{
     if(!pathname){
        return { firstPart: null, prevPath: null, nextPath: null };
     }   
    const segments = pathname.split("/").filter(Boolean);
    const firstPart = segments.slice(0,1).join("/");
    if (segments.length < 2) {
      return { firstPart: null, prevPath: null, nextPath: null };
    }
    const currentSegment = segments[1].includes("trainingandcourses") ? "training / courses" : segments[1];
    const currentIndex = pathNames.indexOf(currentSegment);
      if (currentIndex === -1) {
      return { firstPart: null, prevPath: null, nextPath: null };
    }
   
  const prevPath = currentIndex > 0 
      ? `/${pathNames[currentIndex - 1]}` 
      : "/";
    
    const nextPath = currentIndex < pathNames.length - 1 
      ? `/${pathNames[currentIndex + 1] === "training / courses" ? "trainingandcourses" : pathNames[currentIndex + 1]}`
      : null;
    return {firstPart,prevPath,nextPath}
  },[pathname,pathNames]);
}